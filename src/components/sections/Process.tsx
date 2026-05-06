const steps = [
  {
    n: 1,
    title: "20-Minute Audit Call",
    body: "We look at how leads currently reach you, where the gaps are between enquiry and signed quote, and what's worth building. Free, no obligation, useful even if you don't go ahead.",
  },
  {
    n: 2,
    title: "We Build Around Your Business",
    body: "Brand, copy, forms, CRM connections, follow-up flows. We do the lot. You review at one or two checkpoints — no DIY, no support tickets, no learning new software.",
  },
  {
    n: 3,
    title: "Go Live, Stay Supported",
    body: "Within 14 days of the audit call, your systems are live and earning. Changes, fixes and tweaks handled by the same person who built it — picks up the phone when something needs sorting.",
  },
];

export default function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <div className="reveal section-head-center">
          <span className="section-label">How It Works</span>
          <h2 className="section-h2">
            Live and earning<br /><em>in under a fortnight</em>
          </h2>
          <p className="section-intro">
            No three-month onboarding. No agency handoffs. You talk to us once, we build it around your business, you approve it, we launch it.
          </p>
        </div>

        <div className="process-row">
          {steps.map((s, i) => (
            <div key={s.n} className={`process-step reveal rd${i + 1}`}>
              <div className="step-circle">{s.n}</div>
              <div className="step-card">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
