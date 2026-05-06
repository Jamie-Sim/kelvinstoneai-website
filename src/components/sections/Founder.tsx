export default function Founder() {
  return (
    <section id="founder">
      <div className="wrap">
        <div className="founder-inner reveal">
          <div className="founder-photo-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand_assets/headshot.jpg"
              alt="Jamie Sim, founder of Kelvinstone AI"
              className="founder-photo"
            />
          </div>

          <div className="founder-text-col">
            <span className="section-label" style={{ marginBottom: "var(--sp-3)" }}>
              The Founder
            </span>
            <h2 className="founder-name">Jamie Sim</h2>
            <div className="founder-bio">
              <p>Hi, I&apos;m Jamie — founder of Kelvinstone AI.</p>
              <p>
                I studied Architecture at Edinburgh, then Game Development at postgraduate level. Architecture taught me how property work actually flows — the rhythms of a project, the gap between a homeowner&apos;s brief and a buildable answer, the difference between a firm that wins repeat work and one that doesn&apos;t. Game development taught me how to ship working systems under pressure.
              </p>
              <p>
                When AI started reshaping what was possible for small businesses, I noticed something uncomfortable: the property firms keeping the UK&apos;s housing stock standing — kitchen fitters, refurb specialists, multi-trade maintenance teams — were being left behind. Not because they weren&apos;t capable, but because nobody was building tools around how property work actually runs.
              </p>
              <p className="founder-pivot">That&apos;s why Kelvinstone exists.</p>
              <p>
                I work with UK property maintenance and improvement firms who are tired of losing work they should have won — and want a practical fix, not another piece of software to learn. I build systems that handle the lead capture, the follow-up and the admin that quietly costs you jobs — so you can stay focused on the work itself.
              </p>
              <p>
                No buzzwords. No jargon. No software you&apos;ll log into twice. Just a system that works, built around your firm, supported by the person who built it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
