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
            <h3>A lead qualification form on your website</h3>
            <p>
              A clean, mobile-friendly form that asks the right questions upfront — job type, location, scale, timeline. It screens out time-wasters before they ever reach you. Goes live on your existing site or a new one.
            </p>
          </div>

          <div className="wyg-item reveal rd2">
            <div className="wyg-icon icon-whatsapp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <span className="wyg-num">02</span>
            <h3>An instant WhatsApp alert — straight to your phone</h3>
            <p>
              The moment someone submits, you get a WhatsApp notification within 60 seconds. No logging in. No checking email. Just a plain-English summary: who they are, what the job is, where, and how urgent. You&apos;re always the first to know.
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
            <h3>A clear verdict on every lead</h3>
            <p>
              Every notification includes a call-back recommendation based on job size, location, and budget. You make a decision in 10 seconds — not after a 20-minute back-and-forth with someone who had no budget to begin with.
            </p>
          </div>

          <div className="wyg-item reveal rd4">
            <div className="wyg-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
            </div>
            <span className="wyg-num">04</span>
            <h3>Every lead logged, automatically</h3>
            <p>
              Every enquiry is saved in a simple shared spreadsheet — date, name, job type, outcome. Nothing disappears. You&apos;ll always know exactly what came in, what you pursued, and what you didn&apos;t.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
