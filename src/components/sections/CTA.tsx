"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function CTA() {
  const [status, setStatus] = useState<Status>("idle");

  // Webhook wiring is deferred to Session 3 (via /api/submit route).
  // For now, UX states are present but network call is a no-op placeholder.
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 400));
      setStatus("success");
      (e.currentTarget as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  const buttonLabel =
    status === "sending"
      ? "Sending…"
      : status === "success"
      ? "Request Sent ✓"
      : "Book My Free Audit →";

  const noteText =
    status === "success"
      ? "Thanks! We'll be in touch within one business day."
      : status === "error"
      ? "Something went wrong — please try again or email jamie@kelvinstone.ai"
      : "We reply within one business day. And if your system isn't live within 14 days of onboarding — setup is free, no questions asked.";

  const noteColor =
    status === "success"
      ? "var(--blue)"
      : status === "error"
      ? "var(--terra)"
      : "var(--ink-muted)";

  return (
    <section id="cta">
      <div className="wrap">
        <div className="cta-inner reveal">
          <span className="section-label label-center">Get Started</span>
          <h2>
            Find out where you&apos;re<br /><em>losing leads — for free</em>
          </h2>
          <p>
            Tell us about your business in 5 minutes and we&apos;ll show you exactly where enquiries are slipping through — and what it would take to stop it. No pitch. No obligation.
          </p>

          <form id="audit-form" className="cta-form" onSubmit={onSubmit}>
            <div className="form-row">
              <input className="form-input" type="text" name="name" placeholder="Your name" autoComplete="name" required />
              <input className="form-input" type="email" name="email" placeholder="Email address" autoComplete="email" required />
            </div>
            <input className="form-input" type="tel" name="phone" placeholder="Phone number (UK)" autoComplete="tel" required />
            <input className="form-input" type="text" name="business_name" placeholder="Business name" autoComplete="organization" required />
            <div className="form-row">
              <select className="form-input" name="business_type" required defaultValue="">
                <option value="" disabled>Business type</option>
                <option>Trades / Construction</option>
                <option>Property / Real Estate</option>
                <option>Professional Services</option>
                <option>Retail / E-commerce</option>
                <option>Hospitality / Food &amp; Drink</option>
                <option>Creative / Marketing / Media</option>
                <option>Other</option>
              </select>
              <input className="form-input" type="text" name="location" placeholder="Your location (city / town)" autoComplete="address-level2" required />
            </div>
            <textarea className="form-input" name="ideal_outcome" placeholder="Ideal outcome — what would success look like for your business? (optional)" />
            <button type="submit" className="form-submit" disabled={status === "sending" || status === "success"}>
              {buttonLabel}
            </button>
            <p className="form-note" style={{ color: noteColor }}>{noteText}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
