export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-parchment px-6 py-24">
      <div className="max-w-xl text-center">
        <span className="inline-block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink/60">
          Kelvinstone AI · Scaffold Ready
        </span>
        <h1
          className="mt-6 text-4xl leading-tight text-ink sm:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Brand tokens <em className="text-blue">loaded</em>.
        </h1>
        <div className="mx-auto mt-6 h-0.5 w-11 bg-terra" />
        <p className="mt-6 text-ink/60">
          Manrope on body, DM Serif Display on headline, parchment background,
          brand blue + terra accents — all wired through Tailwind v4 tokens.
          Landing-page rebuild lands in Session 2.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            ["bg-parchment", "text-ink"],
            ["bg-parchment-mid", "text-ink"],
            ["bg-parchment-dark", "text-ink"],
            ["bg-blue", "text-white"],
            ["bg-blue-mid", "text-white"],
            ["bg-blue-light", "text-ink"],
            ["bg-terra", "text-white"],
            ["bg-night", "text-off-white"],
          ].map(([bg, fg]) => (
            <span
              key={bg}
              className={`${bg} ${fg} rounded px-3 py-1 text-xs font-semibold`}
            >
              {bg}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
