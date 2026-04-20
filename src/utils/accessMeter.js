// ─── accessMeter.js ─────────────────────────────────────────────────────────
// localStorage + Cookie based metered access tracker.
// COPPA-safe: no PII stored — just read counts and a subscriber flag.

const STORAGE_KEY = "avenircore_access";
const COOKIE_KEY = "ac_subscriber";

const DEFAULT_STATE = {
  storiesRead: 0,
  blogRead: 0,
  isSubscriber: false,
};

function isClient() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

// ── Cookie Utilities ─────────────────────────────────────────────────────────
function setAccessCookie(isSub) {
  if (!isClient()) return;
  // Set a 1-year persistent cookie (SameSite=Strict for privacy/security)
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${COOKIE_KEY}=${isSub ? 'true' : 'false'}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
}

function getAccessCookie() {
  if (!isClient()) return false;
  const match = document.cookie.match(new RegExp('(^| )' + COOKIE_KEY + '=([^;]+)'));
  return match ? match[2] === 'true' : false;
}

// ── Access State Logic ───────────────────────────────────────────────────────
export function getAccessState() {
  if (!isClient()) return { ...DEFAULT_STATE };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let state = raw ? JSON.parse(raw) : null;

    if (!state) {
      // Fallback to cookie if localStorage is empty (rehydration)
      const cookieSub = getAccessCookie();
      state = { ...DEFAULT_STATE, isSubscriber: cookieSub };
      if (cookieSub) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    } else {
      // Sync cookie to localStorage if they differ
      const cookieSub = getAccessCookie();
      if (cookieSub && !state.isSubscriber) {
        state.isSubscriber = true;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    }

    return {
      storiesRead: state.storiesRead ?? 0,
      blogRead: state.blogRead ?? 0,
      isSubscriber: state.isSubscriber ?? false,
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function updateAccessState(partial) {
  if (!isClient()) return { ...DEFAULT_STATE };
  const current = getAccessState();
  const next = { ...current, ...partial };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    if (partial.isSubscriber !== undefined) {
      setAccessCookie(partial.isSubscriber);
    }
  } catch {
    // localStorage quota exceeded — fail silently
  }
  return next;
}

export function incrementRead(contentType) {
  const current = getAccessState();
  if (contentType === "story") {
    return updateAccessState({ storiesRead: (current.storiesRead || 0) + 1 });
  }
  return updateAccessState({ blogRead: (current.blogRead || 0) + 1 });
}

export function markAsSubscriber() {
  return updateAccessState({ isSubscriber: true });
}
