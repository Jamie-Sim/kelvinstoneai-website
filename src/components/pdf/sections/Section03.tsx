import {
  ChapterDivider,
  ContentPage,
  Callout,
  ComparisonTable,
  PhoneAutocomplete,
  ChatPanel,
} from "..";

function NestedRings() {
  const size = 560;
  const cx = size / 2;
  const cy = size / 2;
  // Ring radii. Each annulus is wide enough to hold a two-line label
  // with safe clearance on all sides of the curve.
  const r1 = 270; // AI
  const r2 = 195; // ML     (outer annulus ~75 wide)
  const r3 = 130; // DL     (middle annulus ~65 wide)
  const r4 = 70; //  GenAI  (inner disc)
  // Label y-positions — pushed deep enough into each annulus that the
  // top of the cap-height doesn't intersect the outer curve.
  const yAI = cy - 225;
  const yML = cy - 158;
  const yDL = cy - 98;
  return (
    <div className="lm-rings">
      <svg viewBox={`0 0 ${size} ${size}`} width="100%" role="img">
        <circle cx={cx} cy={cy} r={r1} fill="#efe7d4" stroke="#3232AE" strokeWidth="1.4" />
        <circle cx={cx} cy={cy} r={r2} fill="#e7dcc3" stroke="#3232AE" strokeWidth="1.3" />
        <circle cx={cx} cy={cy} r={r3} fill="#ddd0b1" stroke="#3232AE" strokeWidth="1.2" />
        <circle cx={cx} cy={cy} r={r4} fill="#b84c38" stroke="#7a2e1f" strokeWidth="1.3" />

        {/* AI label */}
        <text
          x={cx}
          y={yAI}
          textAnchor="middle"
          fontFamily="Manrope, sans-serif"
          fontSize="11"
          fontWeight="700"
          letterSpacing="1.6"
          fill="#181422"
        >
          ARTIFICIAL INTELLIGENCE
        </text>
        <text
          x={cx}
          y={yAI + 13}
          textAnchor="middle"
          fontFamily="Manrope, sans-serif"
          fontSize="9"
          fill="rgba(24,20,34,0.62)"
        >
          Machines doing &ldquo;intelligent&rdquo; things.
        </text>

        {/* ML label */}
        <text
          x={cx}
          y={yML}
          textAnchor="middle"
          fontFamily="Manrope, sans-serif"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#181422"
        >
          MACHINE LEARNING
        </text>
        <text
          x={cx}
          y={yML + 12}
          textAnchor="middle"
          fontFamily="Manrope, sans-serif"
          fontSize="8.5"
          fill="rgba(24,20,34,0.62)"
        >
          Learns patterns from data.
        </text>

        {/* DL label */}
        <text
          x={cx}
          y={yDL}
          textAnchor="middle"
          fontFamily="Manrope, sans-serif"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1.3"
          fill="#181422"
        >
          DEEP LEARNING
        </text>
        <text
          x={cx}
          y={yDL + 11}
          textAnchor="middle"
          fontFamily="Manrope, sans-serif"
          fontSize="7.8"
          fill="rgba(24,20,34,0.62)"
        >
          Neural networks.
        </text>

        {/* Generative AI — centred inside the terra disc */}
        <text
          x={cx}
          y={cy - 2}
          textAnchor="middle"
          fontFamily="DM Serif Display, serif"
          fontSize="17"
          fill="#fff"
          letterSpacing="0.3"
        >
          Generative AI
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fontFamily="Manrope, sans-serif"
          fontSize="8.5"
          fill="rgba(255,255,255,0.85)"
        >
          Creates new content.
        </text>
      </svg>
      <p className="lm-rings-caption">
        Four terms nested inside each other. When people today say &ldquo;AI&rdquo;,
        they usually mean the innermost circle.
      </p>
    </div>
  );
}

function TokenBreakdown() {
  const tokens = [
    "The",
    "plumb",
    "er",
    "fixed",
    "the",
    "leak",
    "ing",
    "tap",
    "quickly",
    ".",
  ];
  return (
    <div className="lm-tokens">
      <p className="lm-tokens-sentence">
        &ldquo;The plumber fixed the leaking tap quickly.&rdquo;
      </p>
      <div className="lm-tokens-row">
        {tokens.map((t, i) => (
          <span key={i} className="lm-token">
            {t}
          </span>
        ))}
      </div>
      <p className="lm-tokens-note">
        Ten tokens, not nine words. Tokens average about three-quarters of a word.
      </p>
    </div>
  );
}

export function Section03() {
  return (
    <>
      <ChapterDivider
        num="03"
        title="What AI Actually Is"
        blurb="The mental model. AI vs. AGI, how it all fits together, why LLMs are just prediction machines, and the handful of concepts you need to stop treating this as a black box."
      />

      {/* Page 1 — Opener */}
      <ContentPage chapter="What AI Actually Is" chapterNum="03" pageNumber={15}>
        <span className="lm-kicker">The mental model</span>
        <h2>
          The term &ldquo;AI&rdquo; gets used so loosely it&rsquo;s basically{" "}
          <em>meaningless</em>.
        </h2>
        <p className="lm-lead">
          People use it to mean ChatGPT, the recommendation algorithm on TikTok,
          the autopilot on a Tesla, and the spam filter on Gmail. All of those
          are technically AI. None of them are the same thing.
        </p>
        <p>By the end of this section you&rsquo;ll understand:</p>
        <ul>
          <li>The difference between AI and AGI (and why it matters).</li>
          <li>
            How AI, machine learning, deep learning, and generative AI all fit
            together.
          </li>
          <li>What an LLM actually is and how it works.</li>
          <li>What tokens and context windows are.</li>
          <li>The difference between closed and open-source AI models.</li>
        </ul>
        <p>
          Some of this is a bit dense. Take it in chunks if you need to. The good
          news is that once you&rsquo;ve got the basic concepts, the rest of the
          guide is mostly about applying them.
        </p>
      </ContentPage>

      {/* Page 2 — AI vs AGI */}
      <ContentPage chapter="What AI Actually Is" chapterNum="03" pageNumber={16}>
        <h3>AI vs. AGI</h3>
        <p>
          You&rsquo;ll hear two terms thrown around: AI and AGI. They&rsquo;re
          related but they mean different things.
        </p>
        <p>
          <strong>AI (Artificial Intelligence)</strong>{" "}is what we have now. The
          broad field of building systems that can do things we&rsquo;d normally
          need a human brain to do — recognising images, understanding language,
          making predictions, generating text. AI is everywhere already: your
          bank&rsquo;s fraud detection, your phone&rsquo;s voice assistant, the
          chatbot on a delivery company&rsquo;s website, the tool that auto-edits
          your photos.
        </p>
        <p>
          The key thing about today&rsquo;s AI is that it&rsquo;s <em>narrow</em>.
          Each system is built for a specific task and can only do that task.
          ChatGPT is brilliant at language but couldn&rsquo;t drive a car. A
          self-driving system can navigate a motorway but can&rsquo;t write you
          an email. They&rsquo;re specialists, not generalists.
        </p>
        <p>
          <strong>AGI (Artificial General Intelligence)</strong>{" "}is the
          theoretical version that doesn&rsquo;t exist yet — a system that can
          do any intellectual task a human can do, across any domain, without
          being specifically trained for it. The goal of the big labs is to
          build AGI, and they&rsquo;re basically in an arms race to get there
          first.
        </p>
        <Callout label="What this means for you" variant="blue">
          <p>
            Whether AGI is months, decades, or never away depends on who you
            ask. For running a business, it doesn&rsquo;t matter yet —
            you&rsquo;ll be working with narrow AI for the foreseeable future.
            For the rest of this guide, when we say &ldquo;AI&rdquo; we mean
            what&rsquo;s available today.
          </p>
        </Callout>
      </ContentPage>

      {/* Page 3 — How it fits together (nested rings) */}
      <ContentPage chapter="What AI Actually Is" chapterNum="03" pageNumber={17}>
        <h3>How it all fits together</h3>
        <p>
          Four terms you&rsquo;ll hear constantly — AI, machine learning, deep
          learning, and generative AI — all sound similar but mean different
          things. They&rsquo;re nested inside each other.
        </p>
        <NestedRings />
        <p>
          <strong>Machine Learning</strong>{" "}sits inside AI: instead of explicit
          rules, you give the system data and let it learn the patterns.
          Netflix recommendations. Fraud detection. Spam filters.{" "}
          <strong>Deep Learning</strong>{" "}sits inside that — ML using neural
          networks, which is where AI got genuinely impressive around 2012.{" "}
          <strong>Generative AI</strong>{" "}is the innermost ring: deep learning
          systems that don&rsquo;t just classify or predict, they{" "}
          <em>create</em> — text, images, video, audio, code. When most people
          today say &ldquo;AI&rdquo;, this is usually what they mean.
        </p>
      </ContentPage>

      {/* Page 4 — LLMs are prediction machines */}
      <ContentPage chapter="What AI Actually Is" chapterNum="03" pageNumber={18}>
        <span className="lm-kicker">The single most important concept</span>
        <h2>
          LLMs are <em>prediction machines</em>. That&rsquo;s it. That&rsquo;s
          what they do.
        </h2>
        <p>
          When you type a question into ChatGPT, it doesn&rsquo;t
          &ldquo;understand&rdquo; your question the way a human does. It
          doesn&rsquo;t think about it. It predicts what words should come next,
          given the words that came before — one token at a time — until
          it&rsquo;s generated a complete response.
        </p>
        <p>The closest everyday comparison is the autocomplete on your phone.</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6mm",
            alignItems: "start",
            margin: "5mm 0",
          }}
        >
          <PhoneAutocomplete
            typed="I'll be home for"
            suggestions={["dinner", "lunch", "Christmas"]}
          />
          <ChatPanel
            header="Claude"
            messages={[
              {
                from: "user",
                body: "Write a friendly message to a customer to let them know we'll be at their home at 10am tomorrow.",
              },
              {
                from: "ai",
                body: (
                  <>
                    Hi Sarah — just a quick note to confirm we&rsquo;ll be with
                    you tomorrow morning at 10. If anything changes before then
                    or you need to reschedule, just drop us a message. Looking
                    forward to seeing you.
                  </>
                ),
              },
            ]}
          />
        </div>
        <p style={{ textAlign: "center", fontStyle: "italic", color: "rgba(24,20,34,0.65)", fontSize: "10pt", marginTop: "-2mm" }}>
          Same underlying idea. Predict what comes next. The difference is scale.
        </p>
      </ContentPage>

      {/* Page 4b — Why it matters practically (bullets, continuing from p18) */}
      <ContentPage chapter="What AI Actually Is" chapterNum="03" pageNumber={19}>
        <h3>Why this matters practically</h3>
        <p>
          It sounds underwhelming when you put it like that.{" "}
          <em>
            &ldquo;It&rsquo;s just predicting the next word? How is that doing
            all the impressive stuff I&rsquo;ve seen?&rdquo;
          </em>{" "}
          The answer: turns out, if you predict next words really well — based
          on having read most of the text on the internet — you can do a
          surprising amount of useful things. A coherent email. A summary of a
          long document. An explanation of a complex topic. Not because the AI
          understands any of it, but because it&rsquo;s seen enough examples.
        </p>
        <p>Once you understand this, three things become obvious:</p>
        <Callout label="1 · They can be wrong, confidently" variant="terra">
          <p>
            They predict what&rsquo;s <em>likely</em> to come next, not
            what&rsquo;s <em>true</em>. If they&rsquo;ve seen lots of text
            saying something incorrect, they&rsquo;ll predict that incorrect
            thing back to you with total confidence. This is called
            &ldquo;hallucination&rdquo; — covered properly in Section 7.
          </p>
        </Callout>
        <Callout label="2 · They can't read your mind" variant="blue">
          <p>
            They only have what you give them in the prompt. The more context
            you provide, the better the predictions get. Vague prompts produce
            vague answers. This is why prompt quality matters so much —
            covered in Guide 2.
          </p>
        </Callout>
        <Callout label="3 · They don't actually know things" variant="mid">
          <p>
            They&rsquo;ve absorbed patterns from training data. There&rsquo;s
            no internal database of facts they&rsquo;re looking things up in.
            Which is why they sometimes get basic facts wrong — they&rsquo;re
            predicting plausible-sounding answers, not retrieving verified
            information.
          </p>
        </Callout>
      </ContentPage>

      {/* Page 5 — Tokens, context windows, training data */}
      <ContentPage chapter="What AI Actually Is" chapterNum="03" pageNumber={20}>
        <h3>Tokens, context windows, and training data</h3>
        <p>A few more concepts you&rsquo;ll bump into.</p>
        <p>
          <strong>Tokens.</strong>{" "}LLMs don&rsquo;t read words the way you do.
          They break text up into smaller chunks. Common words might be one
          token; longer or unusual words get split into pieces.
        </p>
        <TokenBreakdown />
        <p>
          <strong>Context window.</strong>{" "}The maximum amount of text an AI can
          hold in its &ldquo;working memory&rdquo; at once — your prompt plus
          its response, plus any documents, plus the conversation so far.
          Claude can handle hundreds of thousands of tokens at once.
          ChatGPT&rsquo;s free tier is more limited. When you exceed the
          window, the AI starts forgetting the earliest parts —
          sometimes called <em>context rot</em> (Section 7).
        </p>
        <p>
          <strong>Training data.</strong>{" "}What the model learned from: roughly
          the public internet, large numbers of books, Wikipedia, scientific
          papers, code repositories. Hundreds of billions of words. Models are
          frozen at a cutoff date, reflect the biases of what they were trained
          on, and know nothing about your business unless you tell them.
        </p>
      </ContentPage>

      {/* Page 6 — Closed vs open source */}
      <ContentPage chapter="What AI Actually Is" chapterNum="03" pageNumber={21}>
        <h3>Closed vs. open-source models</h3>
        <p>One last distinction worth knowing about.</p>
        <ComparisonTable
          leftHeader="Closed source"
          rightHeader="Open source"
          rows={[
            {
              label: "Examples",
              left: "ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google), Grok (xAI)",
              right: "Llama (Meta), DeepSeek, Mistral",
            },
            {
              label: "Who controls it",
              left: "The company that built it — weights, training, and interfaces all proprietary.",
              right: "Anyone. Weights are released publicly; can be modified and redistributed.",
            },
            {
              label: "Who can run it",
              left: "Only the provider. You access it through their apps or API.",
              right: "Anyone with the hardware. Runs on your own computer or servers.",
            },
          ]}
        />
        <p>
          For most small businesses this distinction doesn&rsquo;t matter much
          day-to-day — you&rsquo;ll use closed-source models like Claude or
          ChatGPT because they&rsquo;re the most capable and the easiest to use.
          It starts to matter when you care about <strong>data privacy</strong>{" "}
          (open-source models can be run fully in-house), <strong>cost at scale</strong>{" "}
          (closed-model API bills add up fast), or <strong>customisation</strong>{" "}
          (closed models can&rsquo;t be fine-tuned).
        </p>
        <Callout label="Self-hosting" variant="mid">
          <p>
            Running an AI model on your own computer or servers, rather than a
            cloud service. Possible with open-source models; overkill for most
            small businesses; worth knowing the option exists if you handle
            highly sensitive data (legal, medical, financial). Get someone
            technical involved if that applies.
          </p>
        </Callout>
      </ContentPage>

      {/* Page 7 — Section recap */}
      <ContentPage chapter="What AI Actually Is" chapterNum="03" pageNumber={22}>
        <h3>Section recap</h3>
        <p>That was a lot. The short version of what to remember:</p>
        <ul>
          <li>
            <strong>AI</strong>{" "}is a broad term covering any attempt to make
            computers do &ldquo;intelligent&rdquo; things. <strong>AGI</strong>{" "}
            is the theoretical version that can do everything a human can.
            We&rsquo;re nowhere near AGI.
          </li>
          <li>
            <strong>Machine learning, deep learning, and generative AI</strong>{" "}
            are nested inside each other like Russian dolls. Generative AI is
            the bit causing all the recent fuss.
          </li>
          <li>
            <strong>LLMs are prediction machines.</strong>{" "}They predict what
            comes next based on patterns. They&rsquo;re not thinking,
            understanding, or knowing — they&rsquo;re predicting. This explains
            most of their strengths and most of their weaknesses.
          </li>
          <li>
            <strong>Tokens</strong>{" "}are how AI reads and writes text.{" "}
            <strong>Context windows</strong>{" "}are how much they can hold in
            working memory at once. Bigger is better.
          </li>
          <li>
            <strong>Training data</strong>{" "}is what they learned from.
            They&rsquo;re frozen at a point in time and don&rsquo;t know your
            business unless you tell them.
          </li>
          <li>
            <strong>Closed vs. open source.</strong>{" "}For most small businesses,
            you&rsquo;ll use closed source models like Claude or ChatGPT. Open
            source matters for privacy, cost at scale, and customisation.
          </li>
        </ul>
        <p>
          That&rsquo;s the foundation. Next, we&rsquo;ll look at the actual
          tools available — what they&rsquo;re called, what they&rsquo;re for,
          and how to think about which ones to pay attention to.
        </p>
      </ContentPage>
    </>
  );
}
