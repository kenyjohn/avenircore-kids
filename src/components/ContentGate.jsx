// ─── ContentGate.jsx ─────────────────────────────────────────────────────────
// Metered free-access gate for stories and blog posts.
// - Tracks reads via localStorage (no auth, no cookies, COPPA-safe)
// - Shows full content within freeLimit
// - Blurs + overlays a subscribe card when limit is hit
// - On subscribe: calls /api/subscribe-gate, sets isSubscriber, reveals content
// - Copy is COPPA-safe: no "login", no "account", no "sign in"
// - localStorage failure defaults to OPEN (never blocks users)
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import {
  getAccessState,
  incrementRead,
  markAsSubscriber,
} from "../utils/accessMeter";
import {
  FREE_BLOG_LIMIT,
  FREE_STORY_LIMIT,
  SUBSCRIBE_API_ENDPOINT,
  SUBSCRIBE_SOURCE_TAG,
} from "../utils/accessConstants";
import "./ContentGate.css";

/**
 * ContentGate
 * @param {Object}  props
 * @param {"story"|"blog"} props.contentType
 * @param {React.ReactNode} props.children   - Full content (always in DOM; blurred when gated)
 * @param {React.ReactNode} [props.teaser]   - Always-visible intro above the gate
 * @param {number}  [props.freeLimit]        - Override default from accessConstants
 */
export default function ContentGate({ contentType, children, teaser, freeLimit }) {
  const limit =
    freeLimit ?? (contentType === "story" ? FREE_STORY_LIMIT : FREE_BLOG_LIMIT);

  // Start "open" to avoid flash of gate for already-subscribed users
  const [gateState, setGateState] = useState("open");
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const hasCounted = useRef(false);

  useEffect(() => {
    // Run once per page mount — count this read, then decide gate state
    if (hasCounted.current) return;
    hasCounted.current = true;

    const before = getAccessState();

    // Already a subscriber — always open, no flash
    if (before.isSubscriber) {
      setGateState("open");
      return;
    }

    const countBefore =
      contentType === "story" ? before.storiesRead : before.blogRead;

    // Within free allowance — count it and show content
    if (countBefore < limit) {
      incrementRead(contentType);
      setGateState("open");
      return;
    }

    // Over limit — show gate
    setGateState("gated");
  }, [contentType, limit]);

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim()) return;

    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setSubmitState("loading");
    setErrorMsg("");

    try {
      const res = await fetch(SUBSCRIBE_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source: SUBSCRIBE_SOURCE_TAG }),
      });

      if (!res.ok) {
        throw new Error(`Server error ${res.status}`);
      }

      markAsSubscriber();
      setSubmitState("success");
      // Short delay so the success message is readable, then reveal
      setTimeout(() => setGateState("open"), 900);
    } catch (err) {
      console.error("ContentGate subscribe error:", err);
      setSubmitState("error");
      setErrorMsg("Something went wrong — please try again in a moment.");
    }
  }

  // ── Open state — render children directly ───────────────────────────────────
  if (gateState === "open") {
    return <>{children}</>;
  }

  // ── Gated state ─────────────────────────────────────────────────────────────
  return (
    <div className="cg-root">
      {/* Always-visible teaser */}
      {teaser && <div className="cg-teaser">{teaser}</div>}

      {/* Blurred content behind the overlay — stays in DOM for SEO */}
      <div className="cg-blur-wrapper" aria-hidden="true">
        {children}
      </div>

      {/* Overlay card */}
      <div className="cg-overlay" role="dialog" aria-modal="true" aria-label="Continue reading">
        <div className="cg-card">
          <div className="cg-icon">
            {contentType === "story" ? "📖" : "✉️"}
          </div>

          <h2 className="cg-heading">
            {contentType === "story"
              ? "Keep reading — it's free"
              : "Enjoyed this? Keep reading free"}
          </h2>

          <p className="cg-subtext">
            {contentType === "story"
              ? `You've read ${limit} free ${limit === 1 ? "story" : "stories"}. Enter your email for free access to every story — no login, no password.`
              : `You've read ${limit} free ${limit === 1 ? "article" : "articles"}. Enter your email for free access — no login, no password.`}
          </p>

          <p className="cg-promise">
            🔒 No login. No ads. Unsubscribe anytime.
          </p>

          {submitState === "success" ? (
            <div className="cg-success">
              <span className="cg-success-icon">✅</span>
              <p>You're in! Loading your story…</p>
            </div>
          ) : (
            <form className="cg-form" onSubmit={handleSubscribe} noValidate>
              <label htmlFor="cg-email" className="cg-label">
                Your email address
              </label>
              <input
                id="cg-email"
                type="email"
                className="cg-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={submitState === "loading"}
              />
              {errorMsg && (
                <p className="cg-error" role="alert">
                  {errorMsg}
                </p>
              )}
              <button
                type="submit"
                className={`cg-button${submitState === "loading" ? " cg-button--loading" : ""}`}
                disabled={submitState === "loading"}
              >
                {submitState === "loading" ? (
                  <span className="cg-spinner" aria-label="Sending…" />
                ) : (
                  "Continue reading free →"
                )}
              </button>
            </form>
          )}

          <p className="cg-fine-print">
            Occasional updates about new stories for kids. No marketing without
            your consent. We never share or sell your email.{" "}
            {contentType === "story" && (
              <>
                AvenirCore is a{" "}
                <abbr title="Children's Online Privacy Protection Act">COPPA</abbr>
                -safe platform.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
