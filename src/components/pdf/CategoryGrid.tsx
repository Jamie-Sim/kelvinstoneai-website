import type { CSSProperties, ReactNode } from "react";

export type Category = {
  num?: string;
  title: string;
  body: ReactNode;
  foot?: string;
};

export function CategoryGrid({
  categories,
  cols = 3,
  tone = "default",
}: {
  categories: Category[];
  cols?: 2 | 3;
  tone?: "default" | "numbered";
}) {
  return (
    <div
      className={`lm-cats lm-cats-${tone}`}
      style={{ "--cols": cols } as CSSProperties & Record<string, number>}
    >
      {categories.map((c, i) => (
        <div key={i} className="lm-cat">
          {c.num && <span className="lm-cat-num">{c.num}</span>}
          <h4 className="lm-cat-title">{c.title}</h4>
          <div className="lm-cat-body">{c.body}</div>
          {c.foot && <div className="lm-cat-foot">{c.foot}</div>}
        </div>
      ))}
    </div>
  );
}
