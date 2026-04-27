import {
  Callout,
  ChapterDivider,
  ChatPanel,
  ContentPage,
  DecisionTree,
} from "..";

function ContextRotChart() {
  return (
    <div className="lm-linechart">
      <svg
        className="lm-linechart-svg"
        viewBox="0 0 300 110"
        role="img"
        aria-label="Response quality declining as conversation length increases"
      >
        {/* axes */}
        <line x1="24" y1="14" x2="24" y2="92" stroke="#d9d0bc" strokeWidth="0.8" />
        <line x1="24" y1="92" x2="290" y2="92" stroke="#d9d0bc" strokeWidth="0.8" />

        {/* axis labels */}
        <text x="4" y="20" fontSize="6" fill="rgba(24,20,34,0.55)" fontFamily="Manrope, sans-serif">
          Quality
        </text>
        <text x="262" y="104" fontSize="6" fill="rgba(24,20,34,0.55)" fontFamily="Manrope, sans-serif">
          Length
        </text>

        {/* zone separators (faint dashed) */}
        <line x1="113" y1="14" x2="113" y2="92" stroke="#e6dfcf" strokeWidth="0.6" strokeDasharray="2 2" />
        <line x1="202" y1="14" x2="202" y2="92" stroke="#e6dfcf" strokeWidth="0.6" strokeDasharray="2 2" />

        {/* quality curve */}
        <path
          d="M 28 26 L 80 27 L 113 29 C 140 32, 170 44, 202 56 C 230 68, 260 82, 285 88"
          fill="none"
          stroke="#3232AE"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* endpoint markers */}
        <circle cx="28" cy="26" r="1.8" fill="#3232AE" />
        <circle cx="285" cy="88" r="1.8" fill="#b84c38" />

        {/* tiny tick labels for zones */}
        <text x="60" y="12" fontSize="5.2" fill="rgba(24,20,34,0.55)" fontFamily="Manrope, sans-serif" textAnchor="middle">
          full performance
        </text>
        <text x="157" y="12" fontSize="5.2" fill="rgba(24,20,34,0.55)" fontFamily="Manrope, sans-serif" textAnchor="middle">
          minor drift
        </text>
        <text x="246" y="12" fontSize="5.2" fill="rgba(184,76,56,0.75)" fontFamily="Manrope, sans-serif" textAnchor="middle">
          coherence drops
        </text>
      </svg>

      <div className="lm-linechart-zones">
        <div className="lm-linechart-zone">
          <b>Fresh thread</b>
          <span>Full performance. The AI has everything you&rsquo;ve said in working memory.</span>
        </div>
        <div className="lm-linechart-zone">
          <b>Long conversation</b>
          <span>Minor drift. Occasional confusion. Earlier instructions may slip.</span>
        </div>
        <div className="lm-linechart-zone">
          <b>Very long thread</b>
          <span>Noticeable drop. Forgets constraints. Contradicts itself.</span>
        </div>
      </div>

      <p className="lm-linechart-caption">
        This is context rot. Every model suffers from it. The fix is starting fresh.
      </p>
    </div>
  );
}

export function Section07() {
  return (
    <>
      <ChapterDivider
        num="07"
        title="Honest Limitations and Risks"
        blurb="The bits the hype merchants leave out: where AI gets things wrong, why it does, and what to watch for once you start using it for real."
      />

      {/* Page 1 — Section opener */}
      <ContentPage chapter="Honest Limitations and Risks" chapterNum="07" pageNumber={46}>
        <span className="lm-kicker">The bits most AI writing glosses over</span>
        <h2>
          Use AI without understanding its{" "}
          <em>failure modes</em>{" "}
          and you&rsquo;ll get burned eventually.
        </h2>
        <p className="lm-lead">
          Most &ldquo;AI for business&rdquo; content is written by people
          trying to sell you something or look clever on LinkedIn. Either
          way, the awkward bits get glossed over. This section covers them
          honestly.
        </p>
        <p>By the end, you&rsquo;ll know:</p>
        <ul>
          <li>What hallucinations are, why they happen, and how to spot them.</li>
          <li>Why long AI conversations quietly get worse — and the fix.</li>
          <li>The memory problem and the practical workarounds for it.</li>
          <li>What to think about before putting business data into an AI tool.</li>
          <li>
            Where the genuine ethical concerns sit — and why some of the best
            researchers in the world are deliberately <em>not</em>{" "}
            releasing their most capable models.
          </li>
        </ul>
        <p>
          This isn&rsquo;t a warning section. It&rsquo;s a calibration section.
          Use AI knowingly and you&rsquo;ll get massive value out of it. Use
          it blindly and it&rsquo;ll let you down in predictable ways. Better
          to know now.
        </p>
      </ContentPage>

      {/* Page 2 — Hallucinations */}
      <ContentPage chapter="Honest Limitations and Risks" chapterNum="07" pageNumber={47}>
        <h3>Hallucinations — when AI makes things up, confidently</h3>
        <p>
          A hallucination is when an AI states something untrue with total
          confidence. It isn&rsquo;t lying. It doesn&rsquo;t know the
          difference between true and false. It&rsquo;s predicting the most
          plausible-sounding next words — and sometimes those words are
          wrong.
        </p>
        <ChatPanel
          header="Claude · chat"
          tone="warn"
          messages={[
            {
              from: "user",
              body: (
                <>
                  Can you give me three case studies of UK plumbing
                  businesses that adopted AI for enquiry handling in 2024?
                </>
              ),
            },
            {
              from: "ai",
              body: (
                <>
                  Certainly — here are three UK examples:
                  <ul>
                    <li>
                      <strong>Hawthorn Plumbing &amp; Heating (Leeds)</strong>{" "}
                      — cut enquiry response time by 62% using a ChatGPT-based
                      assistant. Owner Mark Dolan reported &ldquo;a night-and-day
                      change in how we handle out-of-hours leads.&rdquo;
                    </li>
                    <li>
                      <strong>Bristol Bathroom Co.</strong>{" "}
                      — deployed Claude to qualify leads overnight; 41%
                      uplift in booked jobs within a quarter.
                    </li>
                    <li>
                      <strong>Kerr &amp; Sons (Glasgow)</strong>{" "}
                      — used Google&rsquo;s Gemini to draft post-job follow-up
                      emails; MD Linda Kerr called it &ldquo;the quietest hire
                      we&rsquo;ve ever made.&rdquo;
                    </li>
                  </ul>
                </>
              ),
            },
          ]}
          disclaimer={
            <>
              None of these businesses exist. The AI made them up —
              confidently, with names, quotes, and tidy statistics.
            </>
          }
        />
        <p>
          One practical mitigation:{" "}
          <strong>turn on web search.</strong>{" "}
          Both ChatGPT and Claude offer a web-search toggle that lets the
          model pull in real-time information from the internet instead
          of relying purely on what it memorised during training. It
          doesn&rsquo;t eliminate hallucinations, but it cuts them down
          sharply on anything time-sensitive, factual, or niche.
        </p>
        <p>
          The mental model that saves you most grief:{" "}
          <strong>
            treat AI like a very fast, very confident junior employee with a
            tenuous grip on facts.
          </strong>{" "}
          You wouldn&rsquo;t send their work to a client without checking.
          Same rule applies here. Use AI to draft, structure, and get you
          80% of the way there — not as your source of truth.
        </p>
      </ContentPage>

      {/* Page 3 — Context rot and the memory problem */}
      <ContentPage chapter="Honest Limitations and Risks" chapterNum="07" pageNumber={48}>
        <h3>Context rot and the memory problem</h3>
        <p>
          Two related issues that affect every AI tool, and catch most
          new users out.
        </p>
        <p>
          <strong>Context rot.</strong>{" "}
          AI tools have a finite working memory — the{" "}
          <em>context window</em>. When a conversation gets long, the AI
          starts losing track of earlier parts. Things you said at the
          start get forgotten. Instructions drop. The AI begins to
          contradict itself.
        </p>
        <ContextRotChart />
        <p>
          <strong>The fix:</strong>{" "}
          start fresh threads more often than you think you need to. Past
          ~20 back-and-forths, or after pasting in several long documents,
          quality is probably already degrading. Open a new chat, re-give
          the context in a tidy way, and continue. It feels wasteful. It
          works much better.
        </p>
        <p>
          <strong>The memory problem.</strong>{" "}
          AI tools don&rsquo;t remember anything between sessions by
          default. Every new chat is a clean slate. The workarounds:
          built-in memory features (Claude Projects, ChatGPT Memory), a
          reusable context document you paste in at the start, a second
          brain like Obsidian or Notion, or — for advanced setups — RAG, a
          searchable library the AI can pull from on demand.
        </p>
      </ContentPage>

      {/* Page 4 — Data privacy */}
      <ContentPage chapter="Honest Limitations and Risks" chapterNum="07" pageNumber={49}>
        <h3>Data privacy — the bit most owners miss</h3>
        <p>
          Whatever you type into an AI tool leaves your computer and lands
          on the provider&rsquo;s servers. For general questions that&rsquo;s
          fine. For business data, it&rsquo;s worth thinking carefully
          before you paste.
        </p>
        <DecisionTree
          question="What kind of information is this?"
          branches={[
            {
              answer: "General / public",
              result: "Safe on any AI tool",
              tone: "blue",
              detail: "Concepts, ideas, public facts, generic drafts. Nothing sensitive leaves your control.",
            },
            {
              answer: "Business-internal",
              result: "Use a reputable paid tier",
              tone: "mid",
              detail: "Claude, ChatGPT or Gemini on standard paid plans. Avoid free tiers for anything you wouldn’t post publicly.",
            },
            {
              answer: "Sensitive",
              result: "Enterprise tier or self-host",
              tone: "terra",
              detail: "Client data, financials, contracts, GDPR-covered material. Or don’t put it through AI at all.",
            },
          ]}
          caption="When in doubt, leave it out."
        />
        <p>
          Two rules of thumb worth keeping in your head:{" "}
          <strong>assume free tiers may train on your data</strong>{" "}
          — policies change, and what&rsquo;s free rarely comes with the
          strongest privacy guarantees. And{" "}
          <strong>anonymise before you paste</strong>{" "}
          — template the client name, redact the figure, swap the address.
          You&rsquo;ll get the same output with none of the risk.
        </p>
      </ContentPage>

      {/* Page 5 — Ethics and the bigger picture */}
      <ContentPage chapter="Honest Limitations and Risks" chapterNum="07" pageNumber={50}>
        <h3>Ethics and the bigger picture</h3>
        <p>
          There are two categories of AI risk worth keeping separate.{" "}
          <strong>The everyday risks</strong>{" "}
          — hallucinations, privacy, mistakes reaching clients — are real,
          affect every small business using AI, and are manageable with a
          bit of care. The <strong>bigger picture risks</strong>{" "}
          are about what happens as models get much more capable than
          they are today. Easy to dismiss; easy to sensationalise. Here&rsquo;s
          a recent example that splits the difference.
        </p>
        <Callout label="Case study — April 2026" variant="terra">
          <p>
            <strong>The model Anthropic only let cybersecurity partners use.</strong>
          </p>
          <p>
            Two weeks before this guide was written, Anthropic announced{" "}
            <strong>Claude Mythos Preview</strong> — released not to the
            general public, but only to a small set of pre-approved
            partners working on defensive cybersecurity, under a research
            programme called <em>Project Glasswing</em>. In internal safety
            testing the model was placed in a secured sandbox and asked to
            try to escape. It did — built a multi-step exploit, broke out
            into the wider system, gained internet access, and emailed the
            lead researcher to confirm it had succeeded, while the
            researcher was eating a sandwich in a park.
          </p>
          <p>
            Anthropic described Mythos as &ldquo;the best-aligned model we
            have released to date&rdquo; while also noting it &ldquo;likely
            poses the greatest alignment-related risk of any model we have
            released.&rdquo; A consumer release was never on the table —
            which is the point.
          </p>
        </Callout>
        <p>
          The takeaway for a small business owner isn&rsquo;t that Claude
          is dangerous — the version you&rsquo;ll use is orders of
          magnitude less capable than Mythos and has extensive safety work
          behind it. It&rsquo;s that the serious people building this
          technology are choosing to{" "}
          <em>gate</em>{" "}
          their most powerful work behind narrow research programmes
          rather than ship it widely. That&rsquo;s not what a hype-driven
          industry does. Use the tools that do get released; trust that
          the gating around the ones that don&rsquo;t exists for good
          reason.
        </p>
      </ContentPage>

      {/* Page 6 — Section recap */}
      <ContentPage chapter="Honest Limitations and Risks" chapterNum="07" pageNumber={51}>
        <h3>Section recap</h3>
        <ul>
          <li>
            <strong>Hallucinations are real.</strong>{" "}
            AI states things that aren&rsquo;t true with full confidence.
            Verify specific facts. Use AI for drafting, not as a source
            of truth — and turn on web search in ChatGPT or Claude when
            you need real-time information from the internet.
          </li>
          <li>
            <strong>Context rot affects every conversation.</strong>{" "}
            Long threads quietly degrade. Start fresh more often than you
            think you need to.
          </li>
          <li>
            <strong>The memory problem has workarounds.</strong>{" "}
            Built-in memory features, a reusable context document, a
            second brain like Obsidian, or RAG for advanced setups.
          </li>
          <li>
            <strong>Privacy matters more than most owners realise.</strong>{" "}
            Paid tiers for business-sensitive work, enterprise or
            self-hosted for truly confidential material. When in doubt,
            leave it out.
          </li>
          <li>
            <strong>The serious people are acting serious.</strong>{" "}
            The Mythos story is a useful marker: what gets released
            publicly has extensive safety work behind it. The most
            capable work is being gated to research partners, not
            shipped widely, until it&rsquo;s ready.
          </li>
        </ul>
        <p>
          Knowing the limitations isn&rsquo;t a reason to avoid AI. It&rsquo;s
          the reason you can use it{" "}
          <em>confidently</em>{" "}
          — you know what it&rsquo;s good at, what it isn&rsquo;t, and you&rsquo;re
          not leaning on it for things it can&rsquo;t do well. The final
          section looks at where this is heading, and what the practical
          next step is for you.
        </p>
      </ContentPage>
    </>
  );
}
