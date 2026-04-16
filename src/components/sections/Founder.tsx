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
            <div className="founder-certs">
              <span className="cert-badge">Certified AI Specialist</span>
              <span className="cert-badge">n8n Certified</span>
            </div>
          </div>

          <div className="founder-text-col">
            <span className="section-label" style={{ marginBottom: "var(--sp-3)" }}>
              The Founder
            </span>
            <h2 className="founder-name">Jamie Sim</h2>
            <div className="founder-bio">
              <p>Hi, I&apos;m Jamie — founder of Kelvinstone AI.</p>
              <p>
                I studied Architecture at Edinburgh and Game Development at postgraduate level. Both taught me the same thing: how to take something complex and turn it into something that actually works in the real world.
              </p>
              <p>
                When AI automation started changing what was possible for small businesses, I noticed something uncomfortable: the businesses keeping the UK running — people doing real work, generating real revenue — were being left behind. Not because they weren&apos;t capable, but because nobody was building tools that fit how they actually work.
              </p>
              <p className="founder-pivot">That&apos;s why Kelvinstone exists.</p>
              <p>
                I work with UK businesses who are tired of losing leads they should have won — and want a practical fix, not a technology lecture. I build systems that handle the repetitive stuff so you can focus on what you&apos;re actually good at.
              </p>
              <p>
                No buzzwords. No jargon. No overcomplicated software you have to learn. Just a system that works — and a person you can actually call if something isn&apos;t right.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
