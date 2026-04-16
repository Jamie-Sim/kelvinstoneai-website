const benefits = [
  {
    title: "Never miss an enquiry again",
    body: "Every enquiry through your website is captured, assessed, and on your phone within 60 seconds — no matter what you're doing or where you are.",
    icon: (
      <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Built around your business",
    body: "Your phone number, your form, your workflow. We fit around you — not the other way round.",
    icon: (
      <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Pays for itself fast",
    body: "One additional job a month covers your monthly fee several times over. Most clients see that happen within the first 30 days.",
    icon: (
      <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: "Fully done for you",
    body: "You don't touch a line of code or log in to anything new. We set it up, you review it, we launch it. Technical knowledge not required — or helpful.",
    icon: (
      <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Know the job before you call",
    body: "Every lead comes with a qualification summary — job type, budget, urgency. You go into every call informed, not guessing.",
    icon: (
      <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    title: "UK-based, real support",
    body: "Not a faceless help desk. You deal directly with the person who built your system — someone who understands how UK businesses operate.",
    icon: (
      <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function Benefits() {
  return (
    <section id="benefits">
      <div className="wrap">
        <div className="reveal section-head-center">
          <span className="section-label">Why It Works</span>
          <h2 className="section-h2">
            Designed around<br /><em>how you actually work</em>
          </h2>
          <p className="section-intro">
            Not a generic SaaS tool you have to figure out. A system built around your business, your number, and how your day actually runs.
          </p>
        </div>

        <div className="benefits-grid reveal rd1">
          {benefits.map((b) => (
            <div key={b.title} className="benefit-item">
              {b.icon}
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </div>
          ))}
        </div>
        <p className="benefits-tagline reveal rd2">
          We fit around your business — not the other way around.
        </p>
      </div>
    </section>
  );
}
