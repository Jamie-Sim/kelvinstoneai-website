export default function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <div className="reveal section-head-center">
          <span className="section-label">Our Services</span>
          <h2 className="section-h2">
            Two things that change<br /><em>how you win work</em>
          </h2>
        </div>

        <div className="services-grid services-grid--two">
          <div className="service-card card-blue reveal rd1">
            <div className="service-icon icon-blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h3>Smart Enquiry Handler</h3>
            <p>
              Every online enquiry is qualified automatically and lands on your phone in under 60 seconds — with a plain-English job summary so you know in 10 seconds whether it&apos;s worth a callback.
            </p>
            <ul className="service-features">
              <li>Instant AI qualification of every submission</li>
              <li>WhatsApp notification with lead summary</li>
              <li>Every enquiry logged automatically</li>
            </ul>
          </div>

          <div className="service-card card-terra reveal rd2">
            <div className="service-icon icon-terra">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <h3>Your Business Website</h3>
            <p>
              No website? We build one. Branded to your business, built to convert visitors into enquiries, and wired up with the Smart Enquiry Handler from day one — so it&apos;s earning its keep immediately.
            </p>
            <ul className="service-features">
              <li>Professionally branded to your business</li>
              <li>Enquiry form connected to the handler</li>
              <li>Built to work on mobile and desktop</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
