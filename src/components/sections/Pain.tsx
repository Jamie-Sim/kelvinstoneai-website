const items = [
  {
    num: "01",
    title: "Enquiries arrive when you can't respond",
    body: "You're busy when a job request comes in. By the time you see it, read it, and figure out if it's worth pursuing — they've already moved on.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h-.08z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "The window to win the job is hours, not days",
    body: "Research shows most people contact 2–3 businesses at once. Whoever replies first wins. Whoever replies tomorrow doesn't.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "You can't tell a real job from a time-waster",
    body: "Not every enquiry deserves a callback. But without a qualification step, you're either chasing everything or ignoring things you shouldn't.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Enquiries vanish into a busy inbox",
    body: "A form submission on a hectic day disappears. You meant to follow up. You didn't. The client booked someone else and you never even knew.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
      </svg>
    ),
  },
];

export default function Pain() {
  return (
    <section id="pain">
      <div className="wrap">
        <div className="reveal section-head-center">
          <span className="section-label">The Problem</span>
          <h2 className="section-h2">
            Where good businesses<br /><em>quietly lose work</em>
          </h2>
          <p className="section-intro">
            Most businesses don&apos;t lose jobs because of bad work — they lose them because someone else replied first. Here&apos;s how it happens.
          </p>
        </div>

        <div className="pain-grid reveal rd1">
          {items.map((it) => (
            <div key={it.num} className="pain-card">
              <span className="pain-num">{it.num}</span>
              <div className="pain-body">
                <div className="pain-icon-wrap">{it.icon}</div>
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
