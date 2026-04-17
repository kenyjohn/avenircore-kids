// ─── accessMeter.js ─────────────────────────────────────────────────────────
// localStorage-based metered access tracker.
// COPPA-safe: no cookies, no PII stored — just read counts and a subscriber flag.

const STORAGE_KEY = "avenircore_access";

const DEFAULT_STATE = {
  storiesRead: 0,
  blogRead: 0,
  isSubscriber: false,
};

function isClient() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function getAccessState() {
  if (!isClient()) return { ...DEFAULT_STATE };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    return {
      storiesRead: parsed.storiesRead ?? 0,
      blogRead: parsed.blogRead ?? 0,
      isSubscriber: parsed.isSubscriber ?? false,
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
  } catch {
    // localStorage quota exceeded — fail silently, let user read
  }
  return next;
}

export function incrementRead(contentType) {
  const current = getAccessState();
  if (contentType === "story") {
    return updateAccessState({ storiesRead: current.storiesRead + 1 });
  }
  return updateAccessState({ blogRead: current.blogRead + 1 });
}

export function markAsSubscriber() {
  return updateAccessState({ isSubscriber: true });
}
