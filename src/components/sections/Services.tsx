export default function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <div className="reveal section-head-center">
          <span className="section-label">Our Services</span>
          <h2 className="section-h2">
            Three systems built around<br /><em>how the work actually comes in</em>
          </h2>
        </div>

        <div className="services-grid">
          <div className="service-card card-blue reveal rd1">
            <div className="service-icon icon-blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <h3>A Website That Sells Your Craft</h3>
            <p>
              Branded to your business, built to convert. Photography, copy and structure dialled in to turn a casual visitor into a qualified enquiry — not a faceless template that looks like every other firm in your postcode.
            </p>
            <ul className="service-features">
              <li>Designed around your portfolio and positioning</li>
              <li>Built to convert visitors into qualified enquiries</li>
              <li>Wired into the lead system from day one</li>
            </ul>
          </div>

          <div className="service-card card-mid reveal rd2">
            <div className="service-icon icon-mid">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h3>Smart Lead Capture</h3>
            <p>
              Every enquiry is screened, summarised in plain English, and on your phone within 60 seconds. You see who it is, what the job is, what it&apos;s worth — before deciding whether to call back.
            </p>
            <ul className="service-features">
              <li>Instant AI qualification of every enquiry</li>
              <li>WhatsApp alerts with job summary and verdict</li>
              <li>Every lead logged automatically</li>
            </ul>
          </div>

          <div className="service-card card-terra reveal rd3">
            <div className="service-icon icon-terra">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 11-3-6.7L21 8" />
                <polyline points="21 3 21 8 16 8" />
              </svg>
            </div>
            <h3>Smarter Follow-Up</h3>
            <p>
              Quotes that go cold get worked. Past customers get reminded. Reviews get asked for. The revenue sitting in your CRM that nobody&apos;s had time to chase — it gets chased automatically, in your tone of voice.
            </p>
            <ul className="service-features">
              <li>Automated nurture for cold quotes</li>
              <li>Past-customer reactivation campaigns</li>
              <li>Review and referral requests, on autopilot</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
