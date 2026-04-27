import { Page } from "./Page";

export type TocEntry = { num: string; title: string; page: number | string };

export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  return (
    <Page variant="toc">
      <div className="lm-toc-head">
        <span className="lm-toc-kicker">Contents</span>
        <span className="lm-toc-kicker">Guide 01</span>
      </div>
      <h2 className="lm-toc-title">
        What&rsquo;s <em>inside</em>.
      </h2>
      <p className="lm-toc-sub">
        Eight short sections plus a glossary, designed to be read in one
        sitting or in small chunks over a week. No jargon, no hype, no
        selling at you.
      </p>

      <ul className="lm-toc-list">
        {entries.map((e) => (
          <li className="lm-toc-item" key={e.num}>
            <span className="lm-toc-num">{e.num}</span>
            <span className="lm-toc-label-wrap">
              <span className="lm-toc-label">{e.title}</span>
              <span className="lm-toc-dots" />
            </span>
            <span className="lm-toc-page">p.&nbsp;{e.page}</span>
          </li>
        ))}
      </ul>

      <div className="lm-toc-foot">
        <span>Kelvinstone AI</span>
      </div>
    </Page>
  );
}
