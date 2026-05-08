import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RevealObserver from "@/components/RevealObserver";

export const metadata: Metadata = {
  title: "Free Resources — Kelvinstone AI",
  description:
    "Free, plain-English PDF guides on AI for small businesses. Download Guide 01 — The Business Owner's Introduction to AI. No email wall.",
};

export default function ResourcesPage() {
  return (
    <>
      <RevealObserver />
      <Navbar />
      <main>
        <section id="resources-intro">
          <div className="wrap-narrow intro-content">
            <div className="section-label reveal">Free Resources</div>
            <h1 className="intro-h1 reveal rd1">
              Free guides on AI for
              <br />
              <em>people running a property business.</em>
            </h1>
            <div className="intro-accent-rule reveal rd2"></div>
            <p className="intro-sub reveal rd2">
              Plain-English PDFs. No email wall, no upsell, no fluff. The
              same information we&rsquo;d cover in a paid consultation —
              written for property maintenance, renovation and improvement
              firms where the owner hasn&rsquo;t got time to wade through
              hype.
            </p>
          </div>
        </section>

        <div className="section-rule"></div>

        <section id="resources-list">
          <div className="wrap-narrow">
            <div className="resource-grid">
              <article className="resource-card reveal rd1">
                <span className="resource-card-eyebrow">Guide 01</span>
                <h2 className="resource-card-title">
                  The Business Owner&rsquo;s Introduction to AI
                </h2>
                <p className="resource-card-meta">
                  60 pages · ~45 minute read · Updated April 2026
                </p>
                <p className="resource-card-body">
                  What AI actually is, what it isn&rsquo;t, the leading
                  tools right now, what&rsquo;s worth automating, what
                  isn&rsquo;t, and where this is heading. Honest framing
                  — no hype, no selling at you.
                </p>
                <div className="resource-card-actions">
                  <a
                    className="btn-terra"
                    href="/lead-magnet/kelvinstone-ai-guide.pdf"
                    download
                  >
                    Download the PDF
                  </a>
                </div>
              </article>

              <article className="resource-card reveal rd2">
                <span className="resource-card-eyebrow">Guide 02</span>
                <h2 className="resource-card-title">
                  The Practical Companion
                </h2>
                <p className="resource-card-meta">Coming soon</p>
                <p className="resource-card-body">
                  How to actually start using AI in your business. Prompts
                  that work, common automation patterns, and how to spot
                  the opportunities sitting in your own day-to-day. The
                  hands-on follow-up to Guide 01.
                </p>
                <div className="resource-card-actions">
                  <span className="resource-card-soon">Coming soon</span>
                </div>
              </article>
            </div>

            <p className="resources-foot reveal rd3">
              Want help putting any of this into practice?{" "}
              <a href="/#cta">Book a discovery call</a> — we&rsquo;ll look at
              your business and tell you where AI actually fits.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
