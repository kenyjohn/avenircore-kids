// ─── ContentGate.jsx ─────────────────────────────────────────────────────────
// Metered free-access gate for stories and blog posts.
// - Tracks reads via localStorage + Cookies (resilient, COPPA-safe)
// - Shows full content within freeLimit
// - Blurs + overlays a subscribe card when limit is hit
// - On subscribe/verify: sets isSubscriber, reveals content
// - Copy is COPPA-safe: no "login", no "account", no "sign in"
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
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
 */
export default function ContentGate({ contentType, children, teaser, freeLimit }) {
  const location = useLocation();
  const limit = freeLimit ?? (contentType === "story" ? FREE_STORY_LIMIT : FREE_BLOG_LIMIT);

  const [gateState, setGateState] = useState("open");
  const [mode, setMode] = useState("subscribe"); // subscribe | verify
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const hasCounted = useRef(false);

  useEffect(() => {
    // 1. Check URL for magic links (?sub=1 or ?restore=1)
    const params = new URLSearchParams(location.search);
    if (params.get("sub") === "1" || params.get("restore") === "1") {
      markAsSubscriber();
      setGateState("open");
      return;
    }

    // 2. Run once per page mount — count this read, then decide gate state
    if (hasCounted.current) return;
    hasCounted.current = true;

    const before = getAccessState();

    // Already a subscriber — always open
    if (before.isSubscriber) {
      setGateState("open");
      return;
    }

    const countBefore = contentType === "story" ? (before.storiesRead || 0) : (before.blogRead || 0);

    // Within free allowance — count it and show content
    if (countBefore < limit) {
      incrementRead(contentType);
      setGateState("open");
      return;
    }

    // Over limit — show gate
    setGateState("gated");
  }, [contentType, limit, location.search]);

  async function handleAction(e) {
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
      const endpoint = mode === "subscribe" ? SUBSCRIBE_API_ENDPOINT : "/api/verify-subscription";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: trimmed, 
          source: `gate-${contentType}`,
          role: 'subscriber' 
        }),
      });

      if (!res.ok) {
        throw new Error(`Server error ${res.status}`);
      }

      const data = await res.json();
      
      if (mode === "verify" && data.isSubscriber === false) {
        setSubmitState("error");
        setErrorMsg("We couldn't find a subscription for this email. Try subscribing instead!");
        return;
      }

      markAsSubscriber();
      setSubmitState("success");
      setTimeout(() => setGateState("open"), 1200);
    } catch (err) {
      console.error("ContentGate error:", err);
      setSubmitState("error");
      setErrorMsg("Something went wrong — please try again in a moment.");
    }
  }

  if (gateState === "open") {
    return <>{children}</>;
  }

  return (
    <div className="cg-root">
      {teaser && <div className="cg-teaser">{teaser}</div>}

      <div className="cg-blur-wrapper" aria-hidden="true">
        {children}
      </div>

      <div className="cg-overlay" role="dialog" aria-modal="true">
        <div className="cg-card">
          <div className="cg-icon">
            {mode === "verify" ? "🔑" : (contentType === "story" ? "📖" : "✉️")}
          </div>

          <h2 className="cg-heading">
            {mode === "verify" 
              ? "Restore your access" 
              : (contentType === "story" ? "Keep reading — it's free" : "Enjoyed this? Keep reading free")}
          </h2>

          <p className="cg-subtext">
            {mode === "verify"
              ? "Enter the email you used to subscribe, and we'll unlock the library on this device."
              : (contentType === "story"
                ? `You've read ${limit} free ${limit === 1 ? "story" : "stories"}. Enter your email for free access to every story.`
                : `You've read ${limit} free ${limit === 1 ? "article" : "articles"}. Enter your email for free access.`)}
          </p>

          {submitState === "success" ? (
            <div className="cg-success">
              <span className="cg-success-icon">✅</span>
              <p>{mode === "verify" ? "Access restored! Unlocking..." : "You're in! Loading your story..."}</p>
            </div>
          ) : (
            <>
              <form className="cg-form" onSubmit={handleAction} noValidate>
                <input
                  type="email"
                  className="cg-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  disabled={submitState === "loading"}
                />
                {errorMsg && <p className="cg-error" role="alert">{errorMsg}</p>}
                <button
                  type="submit"
                  className={`cg-button${submitState === "loading" ? " cg-button--loading" : ""}`}
                  disabled={submitState === "loading"}
                >
                  {submitState === "loading" ? <span className="cg-spinner" /> : (mode === "verify" ? "Verify & Unlock" : "Continue reading free →")}
                </button>
              </form>

              <div className="cg-mode-toggle">
                {mode === "subscribe" ? (
                  <button onClick={() => { setMode("verify"); setErrorMsg(""); }} className="cg-link-btn">
                    Already subscribed? Restore access
                  </button>
                ) : (
                  <button onClick={() => { setMode("subscribe"); setErrorMsg(""); }} className="cg-link-btn">
                    Need to subscribe? Go back
                  </button>
                )}
              </div>
            </>
          )}

          <p className="cg-fine-print">
            🔒 No login or password required. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
