export default function WhatYouGet() {
  return (
    <section id="what-you-get">
      <div className="wrap">
        <div className="reveal section-head-center">
          <span className="section-label">The Detail</span>
          <h2 className="section-h2">
            Everything included.<br /><em>No surprises.</em>
          </h2>
        </div>

        <div className="wyg-grid">
          <div className="wyg-item reveal rd1">
            <div className="wyg-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <span className="wyg-num">01</span>
            <h3>A website that sells your craft</h3>
            <p>
              A clean, branded site built around your work — not a template. Mobile-first, fast, and structured so a homeowner sees the difference between you and the price-led competitor by the time they hit your contact form.
            </p>
          </div>

          <div className="wyg-item reveal rd2">
            <div className="wyg-icon icon-whatsapp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <span className="wyg-num">02</span>
            <h3>Lead alerts straight to your phone</h3>
            <p>
              Every enquiry pings your phone within 60 seconds. Job type, location, scale, urgency — all summarised in plain English. You see it before the homeowner has messaged anyone else.
            </p>
          </div>

          <div className="wyg-item reveal rd3">
            <div className="wyg-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
            </div>
            <span className="wyg-num">03</span>
            <h3>A verdict on every enquiry, before you call</h3>
            <p>
              Each lead arrives with a callback recommendation: pursue, qualify further, or skip. Your office stops triaging. Your estimator stops chasing tyre-kickers. The pipeline stays full of work worth winning.
            </p>
          </div>

          <div className="wyg-item reveal rd4">
            <div className="wyg-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 11-3-6.7L21 8" />
                <polyline points="21 3 21 8 16 8" />
              </svg>
            </div>
            <span className="wyg-num">04</span>
            <h3>Follow-up that runs without you</h3>
            <p>
              Quotes that went cold get a polite nudge. Past customers get a check-in. Recent jobs get a review request. Done in your voice, off your CRM, without anyone having to remember.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
