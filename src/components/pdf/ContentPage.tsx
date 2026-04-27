import type { ReactNode } from "react";
import { Page } from "./Page";

export function ContentPage({
  chapter,
  chapterNum,
  pageNumber,
  children,
}: {
  chapter: string;
  chapterNum: string;
  pageNumber: number;
  children: ReactNode;
}) {
  return (
    <Page variant="content">
      <header className="lm-content-header">
        <span className="lm-content-header-brand">Kelvinstone&nbsp;AI</span>
        <span>
          §&nbsp;{chapterNum} · {chapter}
        </span>
      </header>
      <div className="lm-content-body">{children}</div>
      <footer className="lm-content-footer">
        <span>The Business Owner&rsquo;s Introduction to AI</span>
        <span className="lm-content-footer-num">{pageNumber}</span>
      </footer>
    </Page>
  );
}
