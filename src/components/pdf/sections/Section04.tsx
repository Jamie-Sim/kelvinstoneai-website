import {
  ChapterDivider,
  ContentPage,
  Figure,
  PullQuote,
  TimelineH,
} from "..";

function ToolCards() {
  const tools = [
    {
      name: "Claude",
      maker: "Anthropic",
      bestFor:
        "Long documents, careful writing, coding, anything where accuracy matters.",
      watch:
        "Smaller plugin ecosystem, no built-in image generation.",
      price: "Free tier · £15/mo Pro",
    },
    {
      name: "ChatGPT",
      maker: "OpenAI",
      bestFor:
        "General use, brainstorming, quickest to learn, biggest plugin library.",
      watch: "Occasionally drifts on long, multi-step prompts.",
      price: "Free tier · £15/mo Plus",
    },
    {
      name: "Gemini",
      maker: "Google",
      bestFor:
        "Anyone living in Google Workspace. Very large documents, multimodal tasks.",
      watch: "Less consistent quality round-to-round.",
      price: "Free tier · £15/mo Pro",
    },
  ];
  return (
    <>
      <h4
        style={{
          fontFamily: "var(--font-dm-serif-display), DM Serif Display, serif",
          fontSize: "14pt",
          margin: "2mm 0 4mm 0",
          color: "var(--ink)",
          fontWeight: 400,
          letterSpacing: "-0.01em",
        }}
      >
        The three you&rsquo;ll actually use.
      </h4>
      <div className="lm-tools">
        {tools.map((t) => (
          <div key={t.name} className="lm-tool">
            <div className="lm-tool-name">{t.name}</div>
            <div className="lm-tool-maker">{t.maker}</div>
            <div className="lm-tool-row">
              <b>Best for</b>
              {t.bestFor}
            </div>
            <div className="lm-tool-row">
              <b>Watch out for</b>
              {t.watch}
            </div>
            <div className="lm-tool-price">{t.price}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export function Section04() {
  return (
    <>
      <ChapterDivider
        num="04"
        title="The Current Tool Landscape"
        blurb="A field guide, not an encyclopedia. The three AI assistants worth knowing, what else you'll hear about, and why the principle matters more than the product."
      />

      {/* Page 1 — Opener */}
      <ContentPage chapter="The Current Tool Landscape" chapterNum="04" pageNumber={24}>
        <span className="lm-kicker">A field guide, not a spec sheet</span>
        <h2>
          There are dozens of AI tools out there. Most articles trying to cover
          them all end up as <em>exhausting feature comparisons</em> nobody reads.
        </h2>
        <p className="lm-lead">This one won&rsquo;t do that.</p>
        <p>By the end of this section you&rsquo;ll know:</p>
        <ul>
          <li>
            The three main AI assistants worth knowing about, and where each
            one is genuinely better.
          </li>
          <li>What the picture looks like for image and video generation.</li>
          <li>
            Why every software company is suddenly stuffing &ldquo;AI&rdquo; into
            their products — and why most of it isn&rsquo;t worth getting
            excited about.
          </li>
          <li>
            What &ldquo;vibe coding&rdquo; means, and how a separate category of
            developer tools has quietly changed who can build software.
          </li>
          <li>
            The most important principle for choosing tools: don&rsquo;t marry
            one.
          </li>
        </ul>
        <p>
          Let&rsquo;s start with the assistants you&rsquo;ll actually use.
        </p>
      </ContentPage>

      {/* Page 2 — Three main AI assistants */}
      <ContentPage chapter="The Current Tool Landscape" chapterNum="04" pageNumber={25}>
        <h3>The three main AI assistants</h3>
        <p>
          If you&rsquo;ve been paying attention, you&rsquo;ve heard of ChatGPT.
          Maybe Claude and Gemini too. These are the three that matter for
          most small businesses.
        </p>
        <ToolCards />
        <p>
          They all do roughly the same thing: type something, get a response.
          All three have free tiers that are genuinely useful, and paid tiers
          around £15 a month. Pricing is essentially identical. But
          they&rsquo;re not interchangeable — each has developed real strengths,
          and using the right one for the right job makes a noticeable
          difference.
        </p>
        <p>
          <strong>Claude</strong>{" "}
          is the one we use most at Kelvinstone. Strongest at writing quality,
          long documents, and accuracy. Hallucinates less than the others.
          It&rsquo;s what we&rsquo;d recommend if you&rsquo;re going to pick
          one primarily — though we&rsquo;re not married to it. If something
          better comes along, we&rsquo;ll switch without hesitation.
        </p>
      </ContentPage>

      {/* Page 3 — Other names */}
      <ContentPage chapter="The Current Tool Landscape" chapterNum="04" pageNumber={26}>
        <h3>The other names you&rsquo;ll hear</h3>
        <p>
          Beyond the main three, there are a few others worth knowing about —
          mostly so you understand what people are talking about, not because
          you necessarily need to use them.
        </p>
        <p>
          <strong>Grok</strong>{" "}
          is xAI&rsquo;s model (Elon Musk&rsquo;s AI company), integrated into
          X and pulling heavily from real-time data on the platform. If
          you&rsquo;re not heavily on X, there&rsquo;s not much reason to use
          it over the main three.
        </p>
        <p>
          <strong>DeepSeek</strong>{" "}
          is a Chinese AI company that made waves in early 2025 by releasing
          open-source models competitive with the big Western players at much
          lower cost. It shifted the conversation about how expensive AI has to
          be — but for day-to-day small business use, you&rsquo;ll probably
          never touch it directly.
        </p>
        <p>
          <strong>Llama</strong>{" "}
          is Meta&rsquo;s open-source model family, released freely. Unlikely
          you&rsquo;ll use it directly, but you may use products built on top
          of it.
        </p>
        <p>
          <strong>Microsoft Copilot</strong>{" "}
          is baked into Office 365. Essentially ChatGPT under the hood, wrapped
          to work inside Word, Excel, Outlook, and Teams. If your business
          lives in Microsoft&rsquo;s apps, this is the obvious option.
        </p>
      </ContentPage>

      {/* Page 4 — Developer tools and vibe coding */}
      <ContentPage chapter="The Current Tool Landscape" chapterNum="04" pageNumber={27}>
        <span className="lm-kicker">A parallel toolset, and a new way of working</span>
        <h3>Developer tools — and the rise of &ldquo;vibe coding&rdquo;</h3>
        <p>
          Alongside the chat assistants, each of the big three has released a
          separate tool aimed squarely at people who write software:{" "}
          <strong>Claude Code</strong> from Anthropic,{" "}
          <strong>Codex</strong> from OpenAI, and{" "}
          <strong>Gemini CLI</strong> from Google. These don&rsquo;t live inside
          a chat window. They run inside a programmer&rsquo;s terminal or
          editor, and they can read, write, and change the code on a computer
          directly. They are how most serious AI automation actually gets built
          today.
        </p>
        <p>
          Over the last year, one piece of language has broken out from the
          developer world into general use:{" "}
          <strong>&ldquo;vibe coding.&rdquo;</strong>{" "}
          It describes what happens when someone without a traditional
          programming background uses one of these tools to build real, working
          software — describing the outcome they want in plain English, and
          letting the AI handle the syntax. It has quietly shifted who can build
          what. Internal tools, small apps, custom automations — the kind of
          thing that would once have needed a six-figure software project is
          now being put together by small teams in a matter of days.
        </p>
        <p>
          <strong>At Kelvinstone, Claude Code is the tool we specialise in.</strong>{" "}
          We believe it&rsquo;s currently the most powerful of the three —
          strongest at following long, complex instructions, and the least
          likely to produce code that looks right but isn&rsquo;t. Codex and
          Gemini CLI are both serious alternatives, and the gap narrows every
          few months. As with the chat assistants, we&rsquo;re not loyal to the
          logo. We&rsquo;re loyal to what works.
        </p>
        <p>
          For running your business day to day, you don&rsquo;t need to touch
          any of these yourself. Knowing they exist is enough. But it&rsquo;s
          worth understanding that when a small agency can now build something
          a ten-person development team would have quoted you six figures for a
          couple of years ago — this is how.
        </p>
      </ContentPage>

      {/* Page 5 — Image, video, media generation */}
      <ContentPage chapter="The Current Tool Landscape" chapterNum="04" pageNumber={28}>
        <h3>Image, video, and other media generation</h3>
        <p>
          The conversational tools are only half the story. There&rsquo;s a
          separate world of AI that generates images, video, audio, and other
          media — and it moves even faster than chat. The leaders change every
          few months.
        </p>
        <p>
          <strong>For images:</strong>{" "}
          Nano Banana 2 (Google&rsquo;s current flagship, integrated into
          Gemini), Midjourney (long the favourite of designers, mostly through
          Discord), and Adobe Firefly (built into Photoshop and the rest of
          Adobe&rsquo;s suite). For most small business needs — social
          graphics, mock-ups, simple marketing assets — any of these does the
          job.
        </p>
        <p>
          <strong>For video:</strong>{" "}
          Veo 3.1 (Google&rsquo;s leader, generates clips with synchronised
          audio), Runway and Kling (longer-form video with more creative
          control). Until very recently, OpenAI&rsquo;s Sora dominated the
          conversation — until OpenAI announced its shutdown in March 2026.
          More on that on the next page.
        </p>
        <p>
          <strong>For other media:</strong>{" "}
          ElevenLabs for realistic voice synthesis, Descript for podcast
          editing, Suno for full song generation, HeyGen and Synthesia for
          avatar-based explainer videos.
        </p>
        <p>
          You don&rsquo;t need to know all of these. They&rsquo;re listed so
          the names aren&rsquo;t unfamiliar when you bump into them. For most
          small businesses, the priority should be getting one chat assistant
          working well first.
        </p>
      </ContentPage>

      {/* Page 6 — Sora story + timeline */}
      <ContentPage chapter="The Current Tool Landscape" chapterNum="04" pageNumber={29}>
        <h3>The Sora story (and why you shouldn&rsquo;t marry a tool)</h3>
        <p>
          In February 2024, OpenAI announced Sora — an AI video generation
          model. The demos were stunning. Disney was reportedly planning a $1
          billion investment in OpenAI partly off the back of it. Sora 1
          launched publicly in December 2024 at $20/month; Sora 2 followed on
          30 September 2025. By early 2026 the platform had over four million
          active users.
        </p>
        <p>
          On 24 March 2026, OpenAI announced they were pulling the plug. The
          consumer Sora app shut down on 26 April 2026; the Sora API follows
          on 24 September 2026.
        </p>
        <TimelineH
          nodes={[
            {
              date: "Feb 2024",
              title: "Announced",
              detail: "Demos go viral",
            },
            {
              date: "Dec 2024",
              title: "Sora 1 launches",
              detail: "$20/mo, 4m+ users",
            },
            {
              date: "Sep 2025",
              title: "Sora 2 launches",
              detail: "Better video, audio sync",
            },
            {
              date: "Apr 2026",
              title: "Shut down",
              detail: "API ends Sept 2026",
            },
          ]}
          caption="From breakthrough to deprecated in 26 months. This is why you don't build your business around one tool."
        />
        <p>
          The reasons were essentially economic: Sora reportedly cost OpenAI
          $8–12 million a month in compute against $2 million in revenue.
          They decided the resources were better spent elsewhere. The tool
          millions of people had built workflows around was switched off with
          about a month&rsquo;s notice for the consumer app, and a six-month
          runway for anyone using the API.
        </p>
        <p>
          This isn&rsquo;t a story about Sora being a bad product. It&rsquo;s a
          story about what happens when you build your business around a single
          tool from a single company. The lesson:{" "}
          <strong>understand the principles, not just the tools.</strong>{" "}
          The tools will keep changing. The principles won&rsquo;t.
        </p>
      </ContentPage>

      {/* Page 7 — The pace of change (principle page) */}
      <ContentPage chapter="The Current Tool Landscape" chapterNum="04" pageNumber={30}>
        <span className="lm-kicker">A note on the pace of change</span>
        <h3>
          These tools will look different in six months. That&rsquo;s the
          point.
        </h3>
        <p>
          The AI field is moving faster than almost any technology shift of the
          last thirty years — and the rate of change is{" "}
          <em>accelerating</em>, not slowing down. Models released eighteen
          months ago have already been matched or beaten by free, open-source
          alternatives. Tools that dominated the conversation last year have
          been shut down, replaced, or quietly absorbed into something bigger.
          New flagship versions arrive every few weeks. What&rsquo;s
          best-in-class today is very unlikely to still be best-in-class by the
          end of the year.
        </p>
        <p>
          That has to shape how you think about all of this. It&rsquo;s
          tempting to pick a tool, learn its quirks, wire your workflows around
          it, and quietly start treating it as &ldquo;our AI.&rdquo;{" "}
          <strong>Don&rsquo;t.</strong>{" "}
          Every tool you use today is a current-best-option, not a permanent
          choice. Keep your processes portable. Stay interested in what&rsquo;s
          new without being seduced by every headline.
        </p>
        <PullQuote>
          The question is never &ldquo;am I using the newest thing?&rdquo; —
          it&rsquo;s &ldquo;am I getting the outcome I care about?&rdquo;
        </PullQuote>
        <p>
          That&rsquo;s the scoreboard that matters. Hours saved. Mistakes
          avoided. Work you couldn&rsquo;t take on before. Revenue that
          didn&rsquo;t exist last year. Focus on those, and the question of
          which logo sits at the top of the screen becomes a detail — not a
          strategy.
        </p>
      </ContentPage>

      {/* Page 8 — AI in everything parody */}
      <ContentPage chapter="The Current Tool Landscape" chapterNum="04" pageNumber={31}>
        <h3>Why &ldquo;AI&rdquo; is suddenly in everything</h3>
        <p>
          Walk through any software company&rsquo;s marketing in 2026 and
          you&rsquo;ll struggle to find a product that doesn&rsquo;t claim to
          be &ldquo;AI-powered&rdquo;. Photoshop has AI. Notion has AI. Your
          accounting software has AI. The app you book restaurant tables with
          probably has AI now too.
        </p>
        <Figure
          src="/lead-magnet/Not%20All%20AI%20Is%20Created%20Equal.png"
          alt="Not all AI is created equal — illustration"
        />
        <p>
          Most of it is marketing decoration. A company struggling to compete
          slaps &ldquo;AI&rdquo; on every feature, existing things get renamed
          (&ldquo;Smart Search&rdquo; becomes &ldquo;AI-Powered Search&rdquo;),
          a chatbot appears in the corner, and usually none of it actually
          makes the product better. The genuine exceptions — Adobe Firefly
          inside Photoshop, Microsoft Copilot inside Office — are tools where
          AI is added thoughtfully to work people already do.
        </p>
        <p>
          When evaluating anything claiming AI features, ask yourself:{" "}
          <em>
            is this making my actual job easier, or is this just AI for the
            sake of saying you have AI?
          </em>{" "}
          If you can&rsquo;t answer clearly, it probably isn&rsquo;t worth
          paying extra for.
        </p>
      </ContentPage>

      {/* Page 9 — Section recap */}
      <ContentPage chapter="The Current Tool Landscape" chapterNum="04" pageNumber={32}>
        <h3>Section recap</h3>
        <ul>
          <li>
            <strong>Three main AI assistants</strong>{" "}
            worth knowing: Claude (best for writing, accuracy, long docs),
            ChatGPT (most versatile, biggest ecosystem), Gemini (best if
            you&rsquo;re in Google Workspace). All around £15/month paid, all
            with usable free tiers.
          </li>
          <li>
            <strong>Other names</strong>{" "}
            you&rsquo;ll hear (Grok, DeepSeek, Llama, Microsoft Copilot) —
            useful to recognise, but for most small businesses the main three
            cover the ground.
          </li>
          <li>
            <strong>Developer tools and &ldquo;vibe coding&rdquo;</strong>{" "}
            (Claude Code, Codex, Gemini CLI) are a parallel category aimed at
            programming work. You won&rsquo;t use them directly, but they&rsquo;re
            how small agencies — Kelvinstone included — now build custom
            software that would have cost six figures a few years back. Claude
            Code is the one we specialise in and, for now, the most powerful of
            the three.
          </li>
          <li>
            <strong>Image and video generation</strong>{" "}
            are separate categories with their own leaders (Nano Banana 2,
            Midjourney, Veo 3.1). The space moves fast — what&rsquo;s best
            today won&rsquo;t be in six months.
          </li>
          <li>
            <strong>The Sora shutdown</strong>{" "}
            is one example, not a one-off. Companies pivot, products get
            killed, and your business shouldn&rsquo;t depend on any one of
            them.
          </li>
          <li>
            <strong>The pace of change is accelerating.</strong>{" "}
            Don&rsquo;t get hung up on any specific tool. Focus on the
            outcome — hours saved, mistakes avoided, work you couldn&rsquo;t
            take on before — and the logo at the top of the screen becomes a
            detail, not a strategy.
          </li>
          <li>
            <strong>Be sceptical of &ldquo;AI&rdquo; badges</strong>{" "}
            stuffed onto existing products. Some of it is genuinely useful
            (Adobe Firefly, Microsoft Copilot). Most is marketing noise that
            adds friction rather than removing it.
          </li>
        </ul>
        <p>
          That&rsquo;s the landscape. Next, we cover something almost no other
          guide bothers to explain: the difference between AI automation and
          old-fashioned deterministic automation — and why understanding the
          difference is one of the most useful things a small business owner
          can do.
        </p>
      </ContentPage>
    </>
  );
}
