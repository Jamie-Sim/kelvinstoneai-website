import {
  Callout,
  CategoryGrid,
  ChapterDivider,
  ContentPage,
} from "..";

export function Section08() {
  return (
    <>
      <ChapterDivider
        num="08"
        title="What Happens Next"
        blurb="A few predictions held lightly, where the small business advantage actually sits, and what to do with everything you&rsquo;ve just read."
      />

      {/* Page 1 — Section opener (p.53) */}
      <ContentPage chapter="What Happens Next" chapterNum="08" pageNumber={53}>
        <span className="lm-kicker">The final stretch</span>
        <h2>
          You&rsquo;ve made it to the <em>end</em>.
        </h2>
        <p className="lm-lead">
          That&rsquo;s worth something on its own — most people who download
          a guide like this never finish it.
        </p>
        <p>
          You&rsquo;ve covered the mental model, the tool landscape, the two
          kinds of automation, the six categories where the work actually
          sits, and the limitations nobody else writes about. That&rsquo;s a
          real foundation — the kind most small business owners never build
          for themselves.
        </p>
        <p>This last section is short. Three things to cover:</p>
        <ul>
          <li>A few thoughts on where this is heading, held lightly.</li>
          <li>Where the small business advantage actually sits in all this.</li>
          <li>What to do from here.</li>
        </ul>
        <p>
          <strong>Then we&rsquo;re done.</strong>
        </p>
      </ContentPage>

      {/* Page 2 — Where this is heading (p.54) */}
      <ContentPage chapter="What Happens Next" chapterNum="08" pageNumber={54}>
        <h3>Where this is heading</h3>
        <p>
          A few predictions worth taking seriously, held lightly. Nobody
          knows exactly how the next few years go — including the people
          building this stuff.
        </p>
        <p>
          <strong>The capability curve isn&rsquo;t slowing.</strong>{" "}
          Every model release is meaningfully better than the last. Image
          generation that looked dodgy two years ago is now indistinguishable
          from photography. Video is a year or two behind. The trajectory
          is clear, even if the exact pace isn&rsquo;t.
        </p>
        <p>
          <strong>The tools will get cheaper, not more expensive.</strong>{" "}
          Every major provider is racing to undercut the others. The
          capabilities that cost £20 a month today will likely be free or
          near-free within two or three years. Good news for small
          businesses — the cost barrier is falling, not rising.
        </p>
        <p>
          <strong>Most &ldquo;AI features&rdquo; in software today are early versions.</strong>{" "}
          Some will get genuinely useful. Many will be quietly retired. The
          companies that integrate AI thoughtfully will pull ahead of the
          ones that bolted it on as a marketing exercise. You&rsquo;ll feel
          the difference as a user even if you can&rsquo;t always put a
          finger on why.
        </p>
        <p>
          <strong>Agents will be the next shift.</strong>{" "}
          You&rsquo;ll start hearing the word &ldquo;agent&rdquo; a lot, if
          you haven&rsquo;t already. Short version: instead of typing into
          an AI to get a response, agents take actions on your behalf —
          booking, emailing, navigating websites, working through multi-step
          tasks. The early versions are clunky. The good versions, when
          they arrive, will change how a lot of admin work gets done.
        </p>
        <Callout label="Held lightly" variant="terra">
          <p>
            <strong>What probably won&rsquo;t happen — in the next two years.</strong>{" "}
            AI replacing the work that requires human judgment, taste,
            physical presence, or trust. The plumber&rsquo;s job is safe.
            The customer relationship is safe. The creative direction is
            safe. What&rsquo;s <em>not</em> safe is the friction layer
            around all of that — and removing friction is a good thing.
          </p>
        </Callout>
      </ContentPage>

      {/* Page 3 — Where the small business advantage sits (p.55) */}
      <ContentPage chapter="What Happens Next" chapterNum="08" pageNumber={55}>
        <h3>Where the small business advantage actually sits</h3>
        <p>
          There&rsquo;s an assumption built into a lot of the AI discourse
          that bigger companies will inevitably win — more resources, more
          data, more technical capability. It&rsquo;s not necessarily true.
        </p>
        <p>
          <strong>Speed.</strong>{" "}
          A small business can decide to try a new tool today and have it
          running by next week. A mid-sized company spends six months in
          committee. A large company forms a working group. By the time the
          big company has finished evaluating, the small business has
          iterated three times.
        </p>
        <p>
          <strong>Focus.</strong>{" "}
          Big companies have to roll AI out across thousands of workflows
          for thousands of staff. A small business has to apply it to{" "}
          <em>your</em> workflow, run by <em>you</em>. Much more tractable.
        </p>
        <p>
          <strong>Direct customer relationships.</strong>{" "}
          This is the big one. AI can draft an email, but it can&rsquo;t
          shake your client&rsquo;s hand. It can summarise an enquiry, but
          it can&rsquo;t read the room in their kitchen. The trust small
          businesses build — showing up, being reliable, doing good work —
          is the thing AI can&rsquo;t touch. It&rsquo;s also what customers
          will increasingly value as everything else around them gets more
          automated.
        </p>
        <p>
          <strong>Freedom to experiment.</strong>{" "}
          A big company introducing AI into support might disrupt thousands
          of relationships. You introducing AI into your enquiry handling
          affects ten enquiries this week. Small experiments are easier to
          run — and easier to roll back.
        </p>
        <Callout label="The honest version" variant="blue">
          <p>
            AI doesn&rsquo;t take away the small-business competitive
            position. It shifts where the value sits. The boring repetitive
            parts — admin, follow-ups, content drafting, basic enquiries —
            get cheaper and faster. The valuable parts — relationships,
            judgment, craft, taste — become <em>more</em> valuable, because
            they&rsquo;re rarer in a world where the basic stuff is
            automated.
          </p>
        </Callout>
      </ContentPage>

      {/* Page 4 — What to do from here (p.56) */}
      <ContentPage chapter="What Happens Next" chapterNum="08" pageNumber={56}>
        <h3>What to do from here</h3>
        <p>
          That&rsquo;s the guide.
        </p>
        <p>
          If you read all of it, you now know more about AI than the vast
          majority of small business owners do. You understand what it is,
          how it works, where it fits, what it isn&rsquo;t good at, and
          where the genuine opportunities are. A real foundation.
        </p>
        <p className="lm-lead">Three things you could do from here.</p>
        <CategoryGrid
          cols={3}
          categories={[
            {
              num: "01",
              title: "Take what you've learned and run with it.",
              body: "You now know more about AI than 90% of small business owners. Pick one task. Try one tool. See what happens.",
              foot: "Do it yourself",
            },
            {
              num: "02",
              title: "Read Guide 2.",
              body: "Practical, hands-on follow-up. Prompts that work. How to spot opportunities. How to actually start using AI in your own business.",
              foot: "The next guide",
            },
            {
              num: "03",
              title: "Get help.",
              body: "If you want someone to build it for you — or to talk through whether it makes sense for your business — that's what we do.",
              foot: "Work with us",
            },
          ]}
        />
        <p>
          Whichever route you take, the most important thing is that you
          actually do something with what you&rsquo;ve learned. Guides are
          easy to read and easy to forget. The AI shift is happening whether
          or not you act on it — the businesses that come out of it in good
          shape will be the ones who started.
        </p>
        <p>
          <strong>You&rsquo;ve got the foundation. The rest is just doing it.</strong>
        </p>
      </ContentPage>

    </>
  );
}
