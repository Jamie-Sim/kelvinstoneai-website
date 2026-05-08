"use client";

import { useState } from "react";
import CalendlyInline from "@/components/CalendlyInline";

const CALENDLY_URL = "https://calendly.com/james-kelvinstone/30min";

type Status = "idle" | "sending" | "success" | "error";

type Prefill = { name: string; email: string };

export default function CTA() {
  const [status, setStatus] = useState<Status>("idle");
  const [prefill, setPrefill] = useState<Prefill | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setPrefill({
        name: String(data.name ?? ""),
        email: String(data.email ?? ""),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" && prefill) {
    const firstName = prefill.name.trim().split(/\s+/)[0] || "there";
    return (
      <section id="cta">
        <div className="wrap">
          <div className="cta-inner reveal">
            <span className="section-label label-center">Pick a Time</span>
            <h2>
              Thanks {firstName} —<br /><em>now grab a slot.</em>
            </h2>
            <p>
              Your details are in. Pick a 20-minute discovery call below — your name and email are pre-filled, so it&apos;s a single click.
            </p>
            <CalendlyInline url={CALENDLY_URL} prefill={prefill} />
          </div>
        </div>
      </section>
    );
  }

  const buttonLabel = status === "sending" ? "Sending…" : "Book My Discovery Call →";

  const noteText =
    status === "error"
      ? "Something went wrong — please try again or email jamie@kelvinstone.ai"
      : "We reply within one business day. And if your system isn't live within 14 days of sign-off — the build is free, no questions asked.";

  const noteColor = status === "error" ? "var(--terra)" : "var(--ink-muted)";

  return (
    <section id="cta">
      <div className="wrap">
        <div className="cta-inner reveal">
          <span className="section-label label-center">Get Started</span>
          <h2>
            Find out where you&apos;re<br /><em>losing work — for free</em>
          </h2>
          <p>
            Tell us about your firm in 15 minutes and we&apos;ll show you exactly where leads are slipping through, where revenue&apos;s sitting unused in your CRM, and what it would take to fix it. No pitch. No obligation.
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
                <option>Kitchen / bathroom renovation</option>
                <option>Home improvement / refurb</option>
                <option>Property maintenance (multi-trade)</option>
                <option>Joinery / carpentry</option>
                <option>Roofing / external works</option>
                <option>Landscaping / outdoor</option>
                <option>Other property / improvement</option>
              </select>
              <select className="form-input" name="team_size" required defaultValue="">
                <option value="" disabled>Team size</option>
                <option>Just me</option>
                <option>2 – 5</option>
                <option>6 – 15</option>
                <option>16 – 50</option>
                <option>50+</option>
              </select>
            </div>
            <input className="form-input" type="text" name="location" placeholder="Your location (city / town)" autoComplete="address-level2" required />
            <textarea className="form-input" name="ideal_outcome" placeholder="Ideal outcome — what would success look like for your business? (optional)" />
            <button type="submit" className="form-submit" disabled={status === "sending"}>
              {buttonLabel}
            </button>
            <p className="form-note" style={{ color: noteColor }}>{noteText}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
