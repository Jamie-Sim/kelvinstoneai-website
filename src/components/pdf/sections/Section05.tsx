import type { ReactNode } from "react";
import {
  ChapterDivider,
  ContentPage,
  DecisionTree,
  ProcessFlow,
} from "..";

type StepKind = "trigger" | "det" | "ai" | "human";

const STEP_LABEL: Record<StepKind, string> = {
  trigger: "Trigger",
  det: "Deterministic",
  ai: "AI-powered",
  human: "Human",
};

function WorkflowSteps({
  steps,
  caption,
}: {
  steps: { kind: StepKind; title: string; detail: ReactNode }[];
  caption?: string;
}) {
  return (
    <div className="lm-workflow">
      {steps.map((s, i) => (
        <div key={i} className="lm-workflow-row">
          <span className={`lm-workflow-tag lm-workflow-tag-${s.kind}`}>
            {STEP_LABEL[s.kind]}
          </span>
          <div className="lm-workflow-body">
            <h4>{s.title}</h4>
            <p>{s.detail}</p>
          </div>
        </div>
      ))}
      {caption && <p className="lm-workflow-caption">{caption}</p>}
    </div>
  );
}

export function Section05() {
  return (
    <>
      <ChapterDivider
        num="05"
        title="Deterministic vs. AI Automation"
        blurb="Not every problem needs AI. The difference between old-school automation and the AI kind — and why the most useful systems quietly combine the two."
      />

      {/* Page 1 — Section opener */}
      <ContentPage chapter="Deterministic vs. AI Automation" chapterNum="05" pageNumber={34}>
        <span className="lm-kicker">Not every problem needs AI</span>
        <h2>
          Here&rsquo;s something almost nobody tells you:{" "}
          <em>not every problem needs AI.</em>
        </h2>
        <p className="lm-lead">
          The AI hype machine has spent the last three years convincing
          everyone that AI is the answer to every business problem. It
          isn&rsquo;t.
        </p>
        <p>
          A lot of what makes a small business inefficient can be solved with
          much simpler tools — automation that&rsquo;s been around for a
          decade and costs almost nothing to run. This section is about
          knowing when to reach for which, so you don&rsquo;t spend money
          using AI for a job a £10-a-month tool could do on its own.
        </p>
        <p>By the end of this section you&rsquo;ll know:</p>
        <ul>
          <li>The difference between deterministic and AI automation.</li>
          <li>When to use which — and when to use both together.</li>
          <li>How every automation is structured, underneath the jargon.</li>
          <li>Why the most useful systems combine the two.</li>
        </ul>
        <p>
          This is the section that separates people who can think clearly
          about automation from people who just throw &ldquo;AI&rdquo; at
          every problem and hope for the best.
        </p>
      </ContentPage>

      {/* Page 2 — Two different kinds of automation */}
      <ContentPage chapter="Deterministic vs. AI Automation" chapterNum="05" pageNumber={35}>
        <h3>Two different kinds of automation</h3>
        <p>
          <strong>Deterministic automation</strong>{" "}
          is the old school — and most small businesses already touch it
          without realising. The principle is simple:{" "}
          <em>if this happens, do that.</em>{" "}
          A form gets filled out, save the data to a spreadsheet. An invoice
          gets paid, send a thank-you email. No thinking, no interpretation;
          the same action every time. It&rsquo;s cheap, reliable, and
          predictable. The one thing it can&rsquo;t do is handle anything
          that needs interpretation — if the situation doesn&rsquo;t match
          the rules, it either does nothing or does the wrong thing.
        </p>
        <p>
          <strong>AI automation</strong>{" "}
          is the newer category. It drops a large language model — Claude or
          ChatGPT, for example — into the workflow to handle the bits that
          need judgment. An enquiry arrives: is it a qualified lead or spam?
          About something you offer, or something unrelated? An LLM can read
          the message and make that call in a way deterministic rules
          simply can&rsquo;t. The trade-off is cost (a little per run),
          speed (seconds, not milliseconds), and consistency (the same
          input won&rsquo;t always give an identical output). Worth it for
          judgment work. Wasteful when the job is just moving data.
        </p>
        <DecisionTree
          question="Does this task need judgment, language understanding, or interpretation?"
          branches={[
            {
              answer: "Yes",
              result: "Use AI",
              detail:
                "Drafting an email reply. Summarising a document. Deciding if an enquiry is qualified.",
              tone: "terra",
            },
            {
              answer: "No",
              result: "Use deterministic automation",
              detail:
                "Copying a form submission to a spreadsheet. Sending a fixed reminder. Posting to Slack when a payment lands.",
              tone: "blue",
            },
          ]}
          caption="Both are valuable. Most businesses need a mix."
        />
        <p>
          The right question isn&rsquo;t &ldquo;deterministic or AI?&rdquo; —
          it&rsquo;s{" "}
          <em>&ldquo;which parts of this workflow need judgment?&rdquo;</em>{" "}
          Use AI only there. Use deterministic automation for everything
          else.
        </p>
      </ContentPage>

      {/* Page 3 — The basic shape of any workflow */}
      <ContentPage chapter="Deterministic vs. AI Automation" chapterNum="05" pageNumber={36}>
        <h3>The basic shape of any workflow</h3>
        <p>
          Whether a workflow uses AI or not, every automation has the same
          three-part structure.
        </p>
        <ProcessFlow
          nodes={[
            { label: "Trigger", sub: "Form · email · payment · clock" },
            { label: "Logic", sub: "Rules and judgment calls" },
            { label: "Outcome", sub: "Notify · save · reply · invoice" },
          ]}
          palette="blue"
        />
        <p>
          <strong>The trigger</strong>{" "}
          is what starts it. Something happens and the system kicks in. A
          form gets submitted. An email arrives. A payment lands. The clock
          hits 9am. A file appears in a folder. Without a trigger, nothing
          fires.
        </p>
        <p>
          <strong>The logic</strong>{" "}
          is the middle bit — what the system does once it&rsquo;s running.
          Deterministic logic is rules (<em>if the email is from a known
          customer, file it under their name</em>). AI logic is judgment
          (<em>read the email and decide whether it needs an urgent reply</em>).
          Most workflows chain several logic steps together.
        </p>
        <p>
          <strong>The outcome</strong>{" "}
          is the useful thing at the other end. A WhatsApp message to the
          owner. A calendar event created. An invoice drafted. A file saved
          to the right folder. That outcome is the whole point — everything
          before it is plumbing to make it happen without anyone having to
          do it by hand.
        </p>
        <p>
          Once you see the pattern, you start spotting opportunities for
          automation everywhere. Any time you have a repetitive{" "}
          <em>&ldquo;every time X happens, I have to do Y&rdquo;</em>{" "}
          situation, you&rsquo;ve got a candidate for a workflow.
        </p>
      </ContentPage>

      {/* Page 4 — A worked example */}
      <ContentPage chapter="Deterministic vs. AI Automation" chapterNum="05" pageNumber={37}>
        <h3>A worked example</h3>
        <p>
          A small business gets enquiries through a contact form. The owner
          currently checks submissions by hand, decides which are worth
          following up, and writes each reply — 30 to 45 minutes a day, and
          new leads sometimes wait 24 hours for a response. Here&rsquo;s
          what an automated version might look like.
        </p>
        <WorkflowSteps
          steps={[
            {
              kind: "trigger",
              title: "Customer fills in the contact form",
              detail: "The submission kicks the whole workflow off.",
            },
            {
              kind: "det",
              title: "Submission saved to a Google Sheet",
              detail: "Straight data copy. No interpretation needed.",
            },
            {
              kind: "ai",
              title: "AI reads the enquiry and decides if it’s qualified",
              detail:
                "Real job, spam, or wrong fit? The model makes the call the way a human skim-reader would.",
            },
            {
              kind: "ai",
              title: "AI drafts a personalised reply",
              detail:
                "Uses the enquiry details and your tone of voice to write a suggested response.",
            },
            {
              kind: "det",
              title: "Owner gets a WhatsApp with summary and draft",
              detail: "Plumbing — get the result in front of the human.",
            },
            {
              kind: "human",
              title: "Owner reviews, edits, and sends",
              detail:
                "Anything touching the customer still passes through a person.",
            },
          ]}
          caption="A real workflow that mixes deterministic, AI, and human steps. Each part does what it’s best at."
        />
        <p>
          Notice how AI is only used where judgment is required. The
          spreadsheet write, the notification, the trigger itself — all
          deterministic, all cheap and fast. The two AI steps are doing
          the work an LLM is actually good at: reading language and
          drafting a contextual reply. And anything that touches the
          customer still goes through the owner.
        </p>
        <p>
          30 to 45 minutes a day becomes around five minutes reviewing
          drafts, and new leads get a response in minutes rather than
          hours — which makes a real difference to conversion.
        </p>
      </ContentPage>

      {/* Page 5 — The tools that let you build this */}
      <ContentPage chapter="Deterministic vs. AI Automation" chapterNum="05" pageNumber={38}>
        <h3>The tools that let you build this</h3>
        <p>
          A year ago, this section would have been about no-code workflow
          builders — Zapier, Make, n8n. They still exist and are fine for
          simple jobs. For anything more ambitious, they&rsquo;ve been
          overtaken by <strong>Claude Code</strong>.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="lm-logo-row">
          <div className="lm-logo-chip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lead-magnet/ZapierLogo.svg.png" alt="Zapier" />
          </div>
          <div className="lm-logo-chip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lead-magnet/MakeLogo.png" alt="Make" />
          </div>
          <div className="lm-logo-chip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lead-magnet/N8n-logo.svg" alt="n8n" />
          </div>
        </div>
        <p>
          Claude Code is a different kind of tool. You describe what you
          want a workflow to do in plain English, and it writes and runs
          the custom code that makes it happen — no platform integrations
          to wait for, no rigid drag-and-drop canvas. If an API exists,
          Claude Code can use it. That makes it the most versatile option
          in this space, and what we build almost everything on at
          Kelvinstone now.
        </p>
        <p>
          The trade-off is that someone capable still needs to sit behind
          it, knowing what to ask for and how to maintain what gets built.
          That&rsquo;s most of what we do. The principles in this guide
          apply whether you build the systems yourself, hire us, or hire
          someone else.
        </p>
        <div className="lm-hero-tool">
          <span className="lm-hero-tool-label">What we build on today</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lead-magnet/ClaudeLogo.png" alt="Claude Code" />
        </div>
      </ContentPage>
    </>
  );
}
