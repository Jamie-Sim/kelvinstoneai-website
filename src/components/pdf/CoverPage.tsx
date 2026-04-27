import { Page } from "./Page";

export function CoverPage() {
  return (
    <Page variant="cover">
      <div className="lm-cover-top">
        <span>Kelvinstone AI</span>
        <span>Guide 01 / 02</span>
      </div>

      <div className="lm-cover-center">
        <span className="lm-cover-eyebrow">A Kelvinstone Field Guide</span>
        <h1 className="lm-cover-title">
          The Business Owner&rsquo;s <em>Introduction</em> to AI.
        </h1>
        <div className="lm-cover-rule" />
        <p className="lm-cover-sub">
          A plain-English guide to what it is, how it works, and what it
          actually means for your business. Written for people with ten other
          things on their plate.
        </p>
      </div>

      <div className="lm-cover-bottom">
        <div className="lm-cover-sign">
          Published
          <strong>Spring 2026 · Glasgow, UK</strong>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="lm-cover-logo"
          src="/brand_assets/Logo_White.png"
          alt="Kelvinstone AI"
        />
      </div>
    </Page>
  );
}
