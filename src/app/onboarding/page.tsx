import type { Metadata } from "next";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import TallyEmbed from "@/components/TallyEmbed";
import OnboardingNav from "./OnboardingNav";

export const metadata: Metadata = {
  title: "Get Started — Kelvinstone AI",
  description:
    "Kelvinstone AI — New client onboarding. Tell us about your business and let's get started.",
};

export default function OnboardingPage() {
  return (
    <>
      <RevealObserver />
      <OnboardingNav />
      <main>
        <section id="onboarding-intro">
          <div className="wrap-narrow intro-content">
            <div className="section-label reveal">New Client Onboarding</div>
            <h1 className="intro-h1 reveal rd1">
              Let&apos;s build something<br /><em>that actually works.</em>
            </h1>
            <div className="intro-accent-rule reveal rd2"></div>
            <p className="intro-sub reveal rd2">
              Fill in the details below and we&apos;ll review everything before our first call.
              The more you share, the faster we can get your automation up and running.
            </p>
            <div className="step-chips reveal rd3">
              <div className="step-chip">
                <span className="step-chip-num">1</span>
                Complete this form
              </div>
              <div className="step-chip">
                <span className="step-chip-num">2</span>
                We review your details
              </div>
            </div>
          </div>
        </section>

        <div className="section-rule"></div>

        <section id="onboarding-form-section">
          <div className="wrap-narrow">
            <div className="form-wrapper reveal">
              <div className="tally-container">
                <TallyEmbed
                  formId="2EJG4V"
                  title="Kelvinstone AI — Client Onboarding Form"
                />
              </div>
            </div>

            <div className="trust-strip reveal rd2">
              <div className="trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 1l1.5 3.5L12 5l-2.5 2.5.6 3.5L7 9.5 3.9 11l.6-3.5L2 5l3.5-.5L7 1z" />
                </svg>
                Responses reviewed within 24 hours
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="10" height="8" rx="1.5" />
                  <path d="M4.5 5V3.5a2.5 2.5 0 015 0V5" />
                </svg>
                Your data is kept private
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 7l3.5 3.5L12 3" />
                </svg>
                No commitment required
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
