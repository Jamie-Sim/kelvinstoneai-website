const steps = [
  {
    n: 1,
    title: "20-Minute Audit Call",
    body: "We look at how enquiries currently reach you, where you're losing good jobs, and confirm exactly what needs to be built. Free, no obligation, and useful even if you don't go ahead.",
  },
  {
    n: 2,
    title: "We Build Everything For You",
    body: "We set up your qualification form and connect it directly to your phone. No DIY, no technical knowledge, no back-and-forth. If you need a website too, we build that as well.",
  },
  {
    n: 3,
    title: "Go Live — and Start Winning More Work",
    body: "From the moment you're live, every enquiry is assessed and on your phone within 60 seconds. You'll know who's enquiring, what they need, and whether it's worth picking up the phone — before you even call.",
  },
];

export default function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <div className="reveal section-head-center">
          <span className="section-label">How It Works</span>
          <h2 className="section-h2">
            Live and capturing leads<br /><em>in under a week</em>
          </h2>
          <p className="section-intro">
            No lengthy onboarding. No back-and-forth. You talk to us once, we build it, you approve it, we launch it.
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
