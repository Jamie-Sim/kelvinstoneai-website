export default function Pricing() {
  return (
    <section id="pricing">
      <div className="wrap">
        <div className="pricing-inner reveal">
          <span className="section-label label-center">Pricing</span>
          <h2 className="pricing-heading">
            Built around <em>your firm</em>.<br />Priced the same way.
          </h2>
          <p className="pricing-sub">
            Pricing depends on the size of your operation and which of the three systems you need. We&apos;ll quote you on the audit call — no hard sell, no surprises, no long contracts.
          </p>
          <a href="#cta" className="btn-terra" style={{ marginTop: "var(--sp-5)" }}>
            Book the Audit Call
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
