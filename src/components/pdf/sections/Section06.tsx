import {
  ChapterDivider,
  ContentPage,
  CategoryGrid,
  PromptBox,
} from "..";

const PROMPT = `You are a business operations consultant helping me identify
where AI and automation could genuinely help my business.

Here's my business:
- What I do: [describe your business in 2-3 sentences]
- How I get customers: [briefly explain your main lead sources]
- Typical week: [describe the repetitive tasks that take up your time]
- Tools I currently use: [list the main software/apps you use day-to-day]
- Team size: [just me / X employees / etc]

Based on this, do the following:

1. Identify the top 5 repetitive tasks in my business that are
   strong candidates for automation. For each, explain whether
   it needs AI judgment or whether deterministic automation
   would be enough.

2. For each candidate, give me a rough sense of how much time
   it could save per week if automated well.

3. Rank the 5 in order of which I should tackle first, based on
   ROI and ease of implementation.

4. Flag any tasks that seem repetitive but probably shouldn't
   be automated — anywhere the human element is genuinely part
   of the value I provide.

Be specific and grounded. Don't suggest things that sound
impressive but wouldn't actually move the needle. I'd rather
have 5 useful suggestions than 15 generic ones.`;

export function Section06() {
  return (
    <>
      <ChapterDivider
        num="06"
        title="What's Actually Being Automated"
        blurb="Six categories where small businesses are getting real returns from AI in 2026, a simple test for spotting opportunities in your own work, and a free prompt you can use today."
      />

      {/* Page 1 — Section opener */}
      <ContentPage chapter="What's Actually Being Automated" chapterNum="06" pageNumber={40}>
        <span className="lm-kicker">Where the boring repetitive bits get faster</span>
        <h2>
          Most &ldquo;AI for business&rdquo; content lists{" "}
          <em>forty-seven things it could do</em> and leaves you to work
          out where to start.
        </h2>
        <p className="lm-lead">
          This one does the opposite. Six categories where small businesses
          are actually getting value. A simple test for spotting
          opportunities in your own work. And a free prompt at the end you
          can use today.
        </p>
        <p>By the end of this section you&rsquo;ll have:</p>
        <ul>
          <li>
            A clear sense of where AI is producing real returns for
            businesses like yours.
          </li>
          <li>
            A simple test for figuring out which tasks are worth
            automating — and which aren&rsquo;t.
          </li>
          <li>
            A practical exercise you can apply to your own business
            before you build a single automation.
          </li>
        </ul>
        <p>Let&rsquo;s get into it.</p>
      </ContentPage>

      {/* Page 2 — The six categories */}
      <ContentPage chapter="What's Actually Being Automated" chapterNum="06" pageNumber={41}>
        <h3>The six categories</h3>
        <p>
          Across thousands of small businesses adopting AI, the same six
          categories keep showing up. Not because they&rsquo;re the most
          exciting — because they&rsquo;re the most <em>frequent</em>. The
          tasks eating 30 minutes here, an hour there, across every working
          day.
        </p>
        <CategoryGrid
          cols={3}
          categories={[
            {
              num: "01",
              title: "Enquiry handling & lead qualification",
              body: "Sorting incoming messages, drafting first replies, flagging spam vs. real leads.",
              foot: "~30–45 mins/day",
            },
            {
              num: "02",
              title: "Appointment scheduling",
              body: "Booking, rescheduling, sending reminders, managing no-shows.",
              foot: "5–10 hrs/week",
            },
            {
              num: "03",
              title: "Follow-ups & customer comms",
              body: "Post-job check-ins, payment reminders, review requests.",
              foot: "3–5 hrs/week",
            },
            {
              num: "04",
              title: "Content creation",
              body: "Drafting social posts, emails, blog content, marketing copy.",
              foot: "4 hrs → under 1",
            },
            {
              num: "05",
              title: "Admin & documentation",
              body: "Invoice processing, expense categorisation, meeting notes, basic reports.",
              foot: "Up to 80% on invoices",
            },
            {
              num: "06",
              title: "Internal knowledge & FAQs",
              body: "Answering common customer questions before they reach you.",
              foot: "60–80% of repeats handled",
            },
          ]}
        />
        <p>
          None of these are exotic. None of them require you to
          fundamentally change how your business works. They&rsquo;re all
          variations on <em>the boring repetitive bits, done faster and
          more consistently.</em> That&rsquo;s what good AI automation
          looks like in 2026 — not science fiction, just removing friction
          from work you already do.
        </p>
      </ContentPage>

      {/* Page 3 — The "broken down into instructions" test */}
      <ContentPage chapter="What's Actually Being Automated" chapterNum="06" pageNumber={42}>
        <h3>The &ldquo;broken down into instructions&rdquo; test</h3>
        <p>
          Here&rsquo;s the most useful test for spotting automation
          opportunities in your own business.
        </p>
        <p className="lm-lead">
          If you can describe how you&rsquo;d train a new employee to do
          the task, it&rsquo;s probably a candidate for automation.
        </p>
        <p>
          Training someone to do a task means you can articulate when it
          starts (the trigger), what information you have (the inputs),
          what steps you take (the logic), and what the output looks like
          (the outcome). If you can do all of that, you&rsquo;ve
          essentially written the spec for an automation. The reverse is
          also useful: if you <em>can&rsquo;t</em> describe how to train
          someone else — because it relies on your specific intuition,
          your relationships, your taste, your physical presence — then
          it&rsquo;s probably not a good candidate. Don&rsquo;t force it.
        </p>
        <div className="lm-split">
          <div className="lm-split-col">
            <div className="lm-split-head">Yes — automatable</div>
            <ul>
              <li>Send a thank-you email after every paid invoice.</li>
              <li>
                Reply to enquiries from outside your service area with a
                polite no.
              </li>
              <li>Post a weekly summary of new bookings to Slack.</li>
              <li>
                Notify me when an enquiry mentions an emergency repair.
              </li>
            </ul>
          </div>
          <div className="lm-split-col lm-split-col-no">
            <div className="lm-split-head">No — keep human</div>
            <ul>
              <li>
                Decide which of two competing job offers to prioritise.
              </li>
              <li>
                Build trust with a worried customer at their front door.
              </li>
              <li>Diagnose an unusual fault on a job site.</li>
              <li>Negotiate a price with a returning client.</li>
            </ul>
          </div>
        </div>
        <p>
          A useful nuance for service businesses, especially trades:{" "}
          <strong>
            the field work isn&rsquo;t what gets automated — the
            back-office work supporting it is.
          </strong>{" "}
          The plumber doing the job, building trust at the door,
          diagnosing the unusual fault — all stays human. The enquiry
          that came in last night, the booking confirmation, the payment
          reminder, the review request afterwards — all fair game.
        </p>
      </ContentPage>

      {/* Page 4 — A free prompt */}
      <ContentPage chapter="What's Actually Being Automated" chapterNum="06" pageNumber={43}>
        <div className="lm-tight-top">
        <h3>A free prompt to find your own opportunities</h3>
        <p>
          Here&rsquo;s a practical tool you can use today. Copy this
          prompt into Claude or ChatGPT, fill in the bracketed bits, and
          let it walk you through your own business.
        </p>
        <PromptBox
          label="Free prompt"
          title="Spot the automation opportunities in your business"
          prompt={PROMPT}
          footer={
            <>
              <strong>How to use it:</strong>
              <ul>
                <li>
                  Fill in the bracketed parts with as much detail as you
                  can. The more specific, the more useful the output.
                </li>
                <li>
                  Use Claude or ChatGPT&rsquo;s free tier — this
                  prompt doesn&rsquo;t need a paid subscription to work.
                </li>
                <li>
                  Treat the output as a starting point, not a definitive
                  answer. Push back on anything that feels off.
                </li>
              </ul>
            </>
          }
        />
        <p>
          Sometimes the highest-leverage use of AI for a small business
          owner isn&rsquo;t building automations — it&rsquo;s using AI
          as a thinking partner to figure out what&rsquo;s worth
          automating in the first place.
        </p>
        </div>
      </ContentPage>

      {/* Page 5 — Section recap */}
      <ContentPage chapter="What's Actually Being Automated" chapterNum="06" pageNumber={44}>
        <h3>Section recap</h3>
        <ul>
          <li>
            <strong>Six categories</strong>{" "}
            cover most of where AI is delivering real returns for small
            businesses today: enquiry handling, scheduling, follow-ups,
            content creation, admin, and internal FAQs.
          </li>
          <li>
            <strong>None of it is exotic.</strong>{" "}
            The boring repetitive bits, done faster and more consistently.
            That&rsquo;s what good automation looks like.
          </li>
          <li>
            <strong>The &ldquo;broken down into instructions&rdquo; test</strong>{" "}
            is the simplest way to spot candidates: if you can describe
            how you&rsquo;d train someone else to do it, it&rsquo;s
            probably automatable.
          </li>
          <li>
            <strong>For service businesses, the field work stays human.</strong>{" "}
            What gets automated is the back-office layer around it.
            That&rsquo;s a feature, not a bug.
          </li>
          <li>
            <strong>AI is useful as a thinking partner</strong>{" "}
            before you build anything. The prompt on the previous page
            is a free way to start mapping your own business.
          </li>
        </ul>
        <p>
          Next, we get into the bits the hype merchants leave out: where
          AI gets things wrong, why it does that, and what to be careful
          of when you start using it for real.
        </p>
      </ContentPage>
    </>
  );
}
