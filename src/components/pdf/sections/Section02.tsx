import {
  ChapterDivider,
  ContentPage,
  StatHero,
  PercentList,
  Callout,
} from "..";

function TwoSpeedChart() {
  const width = 640;
  const height = 260;
  const padL = 60;
  const padR = 24;
  const padT = 30;
  const padB = 60;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const years = ["2023", "2024", "2025"];
  const large = [20, 32, 44];
  const small = [10, 18, 26];
  const max = 50;
  const groupW = innerW / years.length;
  const barW = (groupW - 16) / 2;

  const y = (v: number) => padT + innerH - (v / max) * innerH;

  return (
    <div className="lm-flow" style={{ padding: "6mm 4mm" }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img">
        {/* y grid */}
        {[0, 10, 20, 30, 40, 50].map((v) => (
          <g key={v}>
            <line
              x1={padL}
              y1={y(v)}
              x2={width - padR}
              y2={y(v)}
              stroke="rgba(24,20,34,0.08)"
              strokeWidth="1"
            />
            <text
              x={padL - 8}
              y={y(v) + 3}
              textAnchor="end"
              fontFamily="Manrope, sans-serif"
              fontSize="9"
              fill="rgba(24,20,34,0.5)"
            >
              {v}%
            </text>
          </g>
        ))}
        {/* bars */}
        {years.map((yr, i) => {
          const x0 = padL + i * groupW + 8;
          const lx = x0;
          const sx = x0 + barW + 8;
          return (
            <g key={yr}>
              <rect
                x={lx}
                y={y(large[i])}
                width={barW}
                height={padT + innerH - y(large[i])}
                fill="#3232AE"
              />
              <text
                x={lx + barW / 2}
                y={y(large[i]) - 6}
                textAnchor="middle"
                fontFamily="DM Serif Display, serif"
                fontSize="13"
                fill="#3232AE"
              >
                {large[i]}%
              </text>
              <rect
                x={sx}
                y={y(small[i])}
                width={barW}
                height={padT + innerH - y(small[i])}
                fill="#b84c38"
              />
              <text
                x={sx + barW / 2}
                y={y(small[i]) - 6}
                textAnchor="middle"
                fontFamily="DM Serif Display, serif"
                fontSize="13"
                fill="#b84c38"
              >
                {small[i]}%
              </text>
              <text
                x={x0 + groupW / 2 - 4}
                y={padT + innerH + 16}
                textAnchor="middle"
                fontFamily="Manrope, sans-serif"
                fontSize="10"
                fontWeight="700"
                fill="#181422"
                letterSpacing="0.1em"
              >
                {yr}
              </text>
            </g>
          );
        })}
        {/* legend */}
        <g transform={`translate(${padL},${height - 18})`}>
          <rect width="10" height="10" fill="#3232AE" />
          <text
            x="16"
            y="9"
            fontFamily="Manrope, sans-serif"
            fontSize="9"
            fill="#181422"
          >
            Large UK firms (250+ employees)
          </text>
          <rect x="180" width="10" height="10" fill="#b84c38" />
          <text
            x="196"
            y="9"
            fontFamily="Manrope, sans-serif"
            fontSize="9"
            fill="#181422"
          >
            Small UK firms (under 50 employees)
          </text>
        </g>
      </svg>
      <p
        style={{
          textAlign: "center",
          fontSize: "9.5pt",
          fontStyle: "italic",
          color: "rgba(24,20,34,0.6)",
          marginTop: "3mm",
        }}
      >
        In the UK, large firms are pulling ahead faster than small ones are
        catching up.
      </p>
    </div>
  );
}

export function Section02() {
  return (
    <>
      <ChapterDivider
        num="02"
        title="The Shift That's Happening"
        blurb="AI has moved from research project to mainstream tool in about three years. The cost is falling, the tools are simple, and your competitors are already using it."
      />

      {/* V1 — full-bleed stat hero */}
      <StatHero
        eyebrow="Section 02 · The Shift That's Happening"
        stat="54%"
        label="of UK small and medium businesses now use AI."
        sub="Two years ago, it was 25%."
        source="Source: British Chambers of Commerce, March 2026"
      />

      {/* Page 1 — Opener */}
      <ContentPage chapter="The Shift That's Happening" chapterNum="02" pageNumber={8}>
        <span className="lm-kicker">Where we are now</span>
        <h2>
          Three years ago, AI in your business meant a developer, a custom build, and
          a <em>decent budget</em>. Most small businesses ignored it. That was the
          right call.
        </h2>
        <p className="lm-lead">
          That&rsquo;s no longer the case.
        </p>
        <p>
          The tools are now cheap or free. The interfaces are simple enough that
          anyone can use them. And businesses that have started implementing AI are
          already seeing real, measurable returns — not speculative future benefits,
          but time and money saved this quarter.
        </p>
        <p>
          What follows is what the UK data actually says, what small businesses
          are using AI for, and what it means if you&rsquo;re not using it yet.
        </p>
      </ContentPage>

      {/* Page 2 — The UK picture */}
      <ContentPage chapter="The Shift That's Happening" chapterNum="02" pageNumber={9}>
        <h3>The UK picture</h3>
        <p>
          The numbers vary depending on who&rsquo;s counting and how, but the
          direction is the same across every credible source. A few worth knowing.
        </p>
        <p>
          In March 2026, the British Chambers of Commerce reported that 54% of UK
          small and medium-sized businesses are now actively using AI. Two years
          earlier, that figure was 25%. Adoption has more than doubled, and
          it&rsquo;s still climbing.
        </p>
        <p>
          The shift is showing up in how owners talk about it too. In a UK
          government survey, business owners described AI as{" "}
          <em>&ldquo;imperative to survival&rdquo;</em> and{" "}
          <em>&ldquo;something you have to use to stay competitive.&rdquo;</em>{" "}
          That&rsquo;s a notable change in tone from a few years ago, when most
          small business owners would have shrugged at the question.
        </p>
        <Callout label="What this means" variant="blue">
          <p>
            The headline number hides something more important — and it&rsquo;s
            the bit that should actually concern you if you run a small business.
            The next page breaks it down.
          </p>
        </Callout>
      </ContentPage>

      {/* Page 3 — Two-speed race */}
      <ContentPage chapter="The Shift That's Happening" chapterNum="02" pageNumber={10}>
        <h3>The two-speed race</h3>
        <p>
          The Bennett School of Public Policy at the University of Cambridge,
          analysing Office for National Statistics data, found that between
          2023 and 2025, large UK firms (250+ employees) nearly doubled
          their AI adoption to 44%. Small firms (fewer than 50 employees) gained far
          less ground, reaching just 26%. Their conclusion was blunt: AI uptake in
          the UK looks less like a rising tide and more like a two-speed race, with
          larger firms pulling further ahead.
        </p>
        <TwoSpeedChart />
        <p>
          The reason is structural, not technical. Bigger companies have the budget,
          the staff, and the time to figure this stuff out. Smaller businesses are
          running flat out keeping the lights on, and &ldquo;spend a few weeks
          researching AI&rdquo; doesn&rsquo;t make the priority list.
        </p>
      </ContentPage>

      {/* Page 4 — What AI is actually being used for */}
      <ContentPage chapter="The Shift That's Happening" chapterNum="02" pageNumber={11}>
        <h3>What AI is actually being used for</h3>
        <p>
          Most of the numbers above are about adoption — whether businesses are
          using AI at all. The more useful question is what they&rsquo;re using
          it for. Among UK businesses that <em>are</em> using AI, government
          research (DSIT, 2025) found the most common uses for small and
          medium firms break down like this:
        </p>
        <PercentList
          rows={[
            { label: "Creative and content creation", value: "77%" },
            {
              label:
                "Administrative tasks (scheduling, invoicing, documentation)",
              value: "70%",
            },
            { label: "Data analysis", value: "56%" },
            {
              label: "Customer service (chatbots, enquiry handling)",
              value: "46%",
            },
          ]}
        />
        <p>
          The top use cases aren&rsquo;t exotic. They&rsquo;re the boring,
          repetitive parts of running a business — admin, marketing, customer
          service, enquiry handling. The kind of stuff that eats hours every week
          and that nobody actually enjoys doing.
        </p>
        <p>
          And the time saved is real. A 2025 UK study by Foxit found workers
          using AI saved <strong>5.2 hours per week</strong> on average —
          though close to four of those hours went back into checking and
          correcting the output. The net gain is genuine, but smaller than the
          headlines suggest. Treat AI as a strong drafter, not a finished
          worker.
        </p>
      </ContentPage>

      {/* Page 5 — The honest bit */}
      <ContentPage chapter="The Shift That's Happening" chapterNum="02" pageNumber={12}>
        <h3>The honest bit most guides leave out</h3>
        <p>
          Here&rsquo;s where we have to be straight with you, because a lot of the
          AI content online glosses over this.
        </p>
        <p>
          <em>Not everyone who adopts AI is winning with it.</em>
        </p>
        <p>
          A 2026 PwC study of over 1,200 senior executives found that nearly
          three-quarters (74%) of AI&rsquo;s economic value is captured by just 20%
          of organisations. The majority of businesses using AI are seeing modest
          gains at best — small efficiency improvements, a bit of time saved —
          while a smaller group is pulling seriously ahead.
        </p>
        <p>
          The difference isn&rsquo;t the tools. Everyone has access to the same
          tools. The difference is how they&rsquo;re being used.
        </p>
        <p>The businesses getting the biggest returns are the ones who:</p>
        <ul>
          <li>
            Picked one specific problem to solve first, instead of trying to
            automate everything at once.
          </li>
          <li>
            Built workflows that actually remove work, rather than just adding new
            tools to manage.
          </li>
          <li>
            Understood the technology well enough to know where it fits and where
            it doesn&rsquo;t.
          </li>
          <li>
            Treated AI as something to integrate into how they already work, not a
            separate thing they bolt on.
          </li>
        </ul>
        <p>
          None of that requires being technical. It requires being clear-headed
          about what you&rsquo;re trying to achieve, and having enough
          understanding of the technology to make sensible calls. Which is most of
          the point of this guide.
        </p>
      </ContentPage>

      {/* Page 6 — Where this leaves you */}
      <ContentPage chapter="The Shift That's Happening" chapterNum="02" pageNumber={13}>
        <h3>Where this leaves you</h3>
        <p>
          If you&rsquo;re reading this, you&rsquo;re probably somewhere in one of
          three places.
        </p>
        <Callout label="Group A · Haven't started" variant="terra">
          <p>
            <strong>You haven&rsquo;t used AI at all yet.</strong>{" "}You&rsquo;re
            not behind yet, but you will be if you wait another year. The gap is
            going to keep widening, and the longer you leave it, the harder it is
            to catch up.
          </p>
        </Callout>
        <Callout label="Group B · Dabbled" variant="blue">
          <p>
            <strong>You&rsquo;ve dabbled.</strong>{" "}Used ChatGPT a few times, tried
            a tool or two. This is most people. Dabbling is fine as a starting
            point, but on its own it doesn&rsquo;t move the needle. The returns
            come from picking a specific problem and actually implementing a
            solution.
          </p>
        </Callout>
        <Callout label="Group C · Implemented" variant="mid">
          <p>
            <strong>You&rsquo;ve implemented something and it&rsquo;s working.</strong>{" "}
            Good. The next question is where else it could apply in your business
            — and that gets easier the more you understand the underlying
            technology, which is what the rest of this guide covers.
          </p>
        </Callout>
        <p>
          Whichever group you&rsquo;re in, the rest of this guide is designed to
          give you enough understanding to make sensible decisions. Not to turn
          you into an AI engineer. Just to stop AI from being a black box you
          can&rsquo;t evaluate. Let&rsquo;s start with what it actually is.
        </p>
      </ContentPage>
    </>
  );
}
