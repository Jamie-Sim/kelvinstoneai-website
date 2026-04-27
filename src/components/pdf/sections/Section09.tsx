import { ChapterDivider, ContentPage } from "..";

type Term = {
  name: string;
  expand?: string;
  def: React.ReactNode;
};

const PAGE_ONE: Term[] = [
  {
    name: "Agent",
    def: (
      <>
        An AI that takes actions on your behalf — booking, emailing,
        navigating websites, working through multi-step tasks — instead of
        just replying. The early versions are clunky; the good ones, when
        they arrive, will reshape a lot of admin work.
      </>
    ),
  },
  {
    name: "AI",
    expand: "Artificial Intelligence",
    def: (
      <>
        Software that performs tasks normally requiring human intelligence:
        writing, reasoning, recognising images, having a conversation. The
        term covers everything from a basic spam filter to ChatGPT.
      </>
    ),
  },
  {
    name: "Alignment",
    def: (
      <>
        The field concerned with making AI do what humans actually want it
        to do, safely and reliably. As models get more capable, alignment
        gets more important — and harder.
      </>
    ),
  },
  {
    name: "API",
    expand: "Application Programming Interface",
    def: (
      <>
        The back-door way one piece of software talks to another. The
        ChatGPT website is the friendly front door; developers use the API
        to build their own AI-powered tools on top of the same models.
      </>
    ),
  },
  {
    name: "Black box",
    def: (
      <>
        An honest description of any modern AI model: we can build them and
        use them, but nobody fully understands what&rsquo;s happening
        inside — even the people who built them. It&rsquo;s part of why
        questions about AI safety, ethics, and even consciousness are taken
        seriously rather than dismissed.
      </>
    ),
  },
  {
    name: "Context rot",
    def: (
      <>
        The slow quality drop in long AI conversations. The longer the
        thread, the more the AI forgets, contradicts itself, or drifts
        off-topic. Fix: start a fresh chat.
      </>
    ),
  },
  {
    name: "Context window",
    def: (
      <>
        How much information an AI can hold in its working memory during
        one conversation. Bigger windows mean the AI can read and reason
        over longer documents in one go.
      </>
    ),
  },
  {
    name: "Hallucination",
    def: (
      <>
        When an AI confidently states something that isn&rsquo;t true. The
        model isn&rsquo;t lying — it&rsquo;s predicting plausible-sounding
        text, and sometimes the most plausible answer happens to be wrong.
      </>
    ),
  },
];

const PAGE_TWO: Term[] = [
  {
    name: "LLM",
    expand: "Large Language Model",
    def: (
      <>
        The kind of AI behind Claude, ChatGPT, and Gemini. Trained on vast
        amounts of text; predicts what to say next based on what came
        before. Modern ones handle images, audio, and code too.
      </>
    ),
  },
  {
    name: "Model",
    def: (
      <>
        A specific AI system, like &ldquo;Claude Opus 4.6&rdquo; or
        &ldquo;GPT-5&rdquo;. Companies release new models the way Apple
        releases new iPhones — same brand, different versions, each
        usually better than the last.
      </>
    ),
  },
  {
    name: "Open source",
    def: (
      <>
        AI models that anyone can download, run on their own hardware, or
        modify. The opposite of closed models like ChatGPT, where the
        underlying system stays private. &ldquo;Open weights&rdquo; is a
        related term you&rsquo;ll see — same general idea.
      </>
    ),
  },
  {
    name: "Prompt",
    def: (
      <>
        What you type into the AI: the instruction, question, or context
        you give it. Writing better prompts is a real skill — but for
        most uses, just being clear about what you want is enough.
      </>
    ),
  },
  {
    name: "RAG",
    expand: "Retrieval-Augmented Generation",
    def: (
      <>
        A way of giving an AI access to your own documents so it can answer
        questions based on them. Useful when you want AI that knows your
        business specifically — your contracts, your policies, your past
        projects.
      </>
    ),
  },
  {
    name: "Sandbox",
    def: (
      <>
        A walled-off testing environment where AI can be experimented with
        safely, without it touching real systems or the open internet.
        Used in safety research — see the Mythos test on page 50.
      </>
    ),
  },
  {
    name: "Token",
    def: (
      <>
        How AI usage gets measured. Roughly speaking, one token is about
        three-quarters of a word. Providers bill by tokens used; long
        conversations use more tokens than short ones.
      </>
    ),
  },
  {
    name: "Vibe coding",
    def: (
      <>
        Building software by describing what you want in plain English and
        letting AI write the code. The term was coined in 2025;
        it&rsquo;s how small agencies (Kelvinstone included) now build
        custom tools that would have cost six figures a few years back.
      </>
    ),
  },
];

function GlossaryList({ items }: { items: Term[] }) {
  return (
    <ul className="lm-glossary">
      {items.map((t) => (
        <li key={t.name}>
          <div className="lm-glossary-term">
            <span className="lm-glossary-name">{t.name}</span>
            {t.expand && (
              <span className="lm-glossary-expand">{t.expand}</span>
            )}
          </div>
          <p className="lm-glossary-def">{t.def}</p>
        </li>
      ))}
    </ul>
  );
}

export function Section09() {
  return (
    <>
      <ChapterDivider
        num="09"
        title="Terms Worth Knowing"
        blurb="A short reference for the jargon. Flip back here whenever you hit a word in this guide — or anywhere else — that you don&rsquo;t recognise."
      />

      {/* Page 1 — A through H */}
      <ContentPage chapter="Terms Worth Knowing" chapterNum="09" pageNumber={58}>
        <GlossaryList items={PAGE_ONE} />
      </ContentPage>

      {/* Page 2 — L through V */}
      <ContentPage chapter="Terms Worth Knowing" chapterNum="09" pageNumber={59}>
        <GlossaryList items={PAGE_TWO} />
      </ContentPage>
    </>
  );
}
