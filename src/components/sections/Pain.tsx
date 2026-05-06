const items = [
  {
    num: "01",
    title: "The £20k quote that quietly went cold",
    body: "You sent the quote. They said they'd think about it. You got busy on the next job. Three weeks later they signed with someone who followed up. The work was already yours to lose.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Enquiries land while your team is on the tools",
    body: "A renovation lead comes in mid-afternoon. By the time the office has read it, sized it up and called back, the homeowner has already booked a competitor who replied within the hour.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Past customers forget you exist",
    body: "The kitchen you fitted two years ago is now a bathroom job for a competitor. Without a system to stay in touch, the easiest revenue you have — repeat work — quietly walks across the road.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
        <path d="M21 12a9 9 0 11-3-6.7L21 8" />
        <polyline points="21 3 21 8 16 8" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "You can't tell a £500 callout from a £30k refurb",
    body: "Without a qualification step, every enquiry looks identical in the inbox. Real jobs sit next to time-wasters and you only spot the difference after a 20-minute call you didn't need to take.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
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
            Where good work<br /><em>quietly slips away</em>
          </h2>
          <p className="section-intro">
            Most firms don&apos;t lose work because of bad craftsmanship. They lose it in the gaps between the enquiry and the signed quote — where the office runs out of hours and the leads run cold.
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
