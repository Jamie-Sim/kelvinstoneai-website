import {
  CoverPage,
  TableOfContents,
  ChapterDivider,
  ContentPage,
  Page,
  type TocEntry,
} from "@/components/pdf";
import { Section02 } from "@/components/pdf/sections/Section02";
import { Section03 } from "@/components/pdf/sections/Section03";
import { Section04 } from "@/components/pdf/sections/Section04";
import { Section05 } from "@/components/pdf/sections/Section05";
import { Section06 } from "@/components/pdf/sections/Section06";
import { Section07 } from "@/components/pdf/sections/Section07";
import { Section08 } from "@/components/pdf/sections/Section08";
import { Section09 } from "@/components/pdf/sections/Section09";

const TOC: TocEntry[] = [
  { num: "01", title: "Introduction", page: "04" },
  { num: "02", title: "The Shift That's Happening", page: "07" },
  { num: "03", title: "What AI Actually Is", page: "15" },
  { num: "04", title: "The Current Tool Landscape", page: "24" },
  { num: "05", title: "Deterministic vs. AI Automation", page: "34" },
  { num: "06", title: "What's Actually Being Automated", page: "40" },
  { num: "07", title: "Honest Limitations and Risks", page: "46" },
  { num: "08", title: "What Happens Next", page: "53" },
  { num: "09", title: "Terms Worth Knowing", page: "57" },
];

export default function LeadMagnetPage() {
  return (
    <>
      <CoverPage />

      <TableOfContents entries={TOC} />

      <ChapterDivider
        num="01"
        title="Introduction"
        blurb="Why this guide exists, who it's for, and what you'll get out of reading it. Honest framing — no hype, no selling, no ten-hour YouTube rabbit holes."
      />

      {/* Section 1 · Page 1 — Opening + Who this is for */}
      <ContentPage chapter="Introduction" chapterNum="01" pageNumber={4}>
        <span className="lm-kicker">Why this guide exists</span>
        <h2>
          Most AI writing for business owners is <em>terrifying</em>,
          overhyped, or trying to sell you something.
        </h2>

        <p className="lm-lead">
          This one tries not to be any of those things. It&rsquo;s a free
          guide, written for people running a business who&rsquo;ve heard
          about AI for years without really knowing what to do about it.
        </p>

        <p>
          You don&rsquo;t need to be technical. You don&rsquo;t need to have
          used any of it. By the end, you&rsquo;ll understand what AI
          actually is, how it works under the hood — enough to make sensible
          decisions about it — what it&rsquo;s genuinely useful for, what it
          isn&rsquo;t, and where it&rsquo;s probably heading.
        </p>

        <p>
          <em>
            Just what you need to know about how to start understanding and
            taking advantage of this technology.
          </em>
        </p>

        <h3>Who this is for</h3>
        <ul>
          <li>
            Business owners who haven&rsquo;t really used AI yet, or have only
            dabbled with ChatGPT a few times.
          </li>
          <li>
            Anyone who feels like they&rsquo;re falling behind on this but
            doesn&rsquo;t know where to start.
          </li>
          <li>
            People who want a straight answer instead of ten hours of YouTube
            videos full of guys shouting at a camera.
          </li>
        </ul>

        <p>
          If you&rsquo;re already building AI systems or running a tech
          company, this probably isn&rsquo;t for you. It&rsquo;s written for
          the person who&rsquo;s got a business to run and twenty other things
          on their plate.
        </p>
      </ContentPage>

      {/* Section 1 · Page 2 — Who we are + what you'll get */}
      <ContentPage chapter="Introduction" chapterNum="01" pageNumber={5}>
        <h3>Who we are</h3>

        <p>
          Kelvinstone AI is a small agency that builds AI tools and
          automations for small businesses. That&rsquo;s the short version.
        </p>

        <p>
          The longer version: big companies are going to use AI to pull even
          further ahead of everyone else. That&rsquo;s already happening.
          Kelvinstone exists so small businesses don&rsquo;t get left behind
          in that shift. We build practical stuff for the kind of businesses
          that don&rsquo;t have an IT department or a tech budget, and we
          explain what we&rsquo;re doing in language that makes sense.
        </p>

        <p>
          That&rsquo;s why this guide exists too. Giving away good information
          for free is part of the point. If you read it and decide you want
          help implementing any of it, get in touch. If you read it and sort
          things out yourself, that&rsquo;s also a win.
        </p>

        <h3>What you&rsquo;ll get out of this</h3>

        <p>By the end of the guide you&rsquo;ll have:</p>

        <ul>
          <li>
            A clear mental model of what AI actually is — and what it
            isn&rsquo;t.
          </li>
          <li>
            Enough understanding of how the technology works to make sensible
            decisions about it.
          </li>
          <li>
            A sense of what&rsquo;s being automated in small businesses right
            now, and what isn&rsquo;t worth bothering with.
          </li>
          <li>
            Honest information about the limitations and risks — the stuff
            the hype merchants leave out.
          </li>
          <li>A view on where this is heading and what it means for you.</li>
        </ul>

        <p>
          The guide is designed to be read in one sitting, or in short chunks
          over a week. It&rsquo;s around fifty pages. There&rsquo;s a second
          guide that covers the practical side — how to actually use AI
          day-to-day, prompts that work, and how to spot automation
          opportunities in your own business. You can grab that one too once
          you&rsquo;ve finished this.
        </p>

        <p>
          <strong>Let&rsquo;s get into it.</strong>
        </p>
      </ContentPage>

      <Section02 />
      <Section03 />
      <Section04 />
      <Section05 />
      <Section06 />
      <Section07 />
      <Section08 />
      <Section09 />

      {/* Closing sign-off — final page after the glossary */}
      <Page variant="plain">
        <div className="lm-closing">
          <div className="lm-closing-rule" />
          <h2 className="lm-closing-message">
            Thanks for reading.
            <br />
            <em>
              If this was useful,
              <br />
              pass it on.
            </em>
          </h2>
          <div className="lm-closing-contact">
            <strong>Kelvinstone AI</strong>
            www.kelvinstone.ai
            <br />
            jamie@kelvinstone.ai
            <br />
            +44 7827 778357
            <em>Glasgow, UK</em>
          </div>
        </div>
      </Page>
    </>
  );
}
