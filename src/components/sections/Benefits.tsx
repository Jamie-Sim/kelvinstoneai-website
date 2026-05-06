const benefits = [
  {
    title: "Stop leaking quote-stage revenue",
    body: "Every quote you send gets a follow-up sequence. Cold leads warm up. The work that was already yours stops walking across the road to the firm with the better admin.",
    icon: (
      <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: "Reactivate the customers you already won",
    body: "Last year's kitchen client is this year's bathroom job. We rebuild the bridge to past work so repeat revenue stops being accidental.",
    icon: (
      <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 11-3-6.7L21 8" />
        <polyline points="21 3 21 8 16 8" />
      </svg>
    ),
  },
  {
    title: "Built around your existing setup",
    body: "Your phone numbers, your CRM, your team's diary, your tone of voice. We fit around your operation — your office manager doesn't learn a single new piece of software.",
    icon: (
      <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "First to reply, every time",
    body: "60-second alerts mean you call back before the homeowner finishes phoning round. Speed wins the work — every time.",
    icon: (
      <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "A clear verdict on every lead",
    body: "Every enquiry arrives qualified — job type, scale, urgency. You stop guessing. Your estimator stops wasting half-days on jobs that were never going to land.",
    icon: (
      <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    title: "One person, real support",
    body: "You deal directly with the person who built your system — not a help desk in a different timezone. Glasgow-based, UK-focused, available.",
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
            Designed around<br /><em>how your firm actually runs</em>
          </h2>
          <p className="section-intro">
            Not a generic SaaS tool you have to bend your business into. A set of systems built around your team, your CRM, your day.
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
          We fit around your firm — not the other way around.
        </p>
      </div>
    </section>
  );
}
