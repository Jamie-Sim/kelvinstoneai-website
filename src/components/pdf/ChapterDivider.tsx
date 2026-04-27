import { Page } from "./Page";

export function ChapterDivider({
  num,
  title,
  blurb,
}: {
  num: string;
  title: string;
  blurb?: string;
}) {
  return (
    <Page variant="divider">
      <div className="lm-divider-top">
        <span>Section {num}</span>
        <span>Guide 01</span>
      </div>
      <div className="lm-divider-center">
        <div className="lm-divider-num">{num}</div>
        <h2 className="lm-divider-title">{title}</h2>
        {blurb && <p className="lm-divider-blurb">{blurb}</p>}
      </div>
      <div className="lm-divider-foot">
        <span>Kelvinstone AI</span>
      </div>
    </Page>
  );
}
