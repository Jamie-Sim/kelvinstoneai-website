import type { ReactNode } from "react";

export type DecisionBranch = {
  answer: string;
  result: string;
  detail?: ReactNode;
  tone?: "blue" | "terra" | "mid";
};

export function DecisionTree({
  question,
  branches,
  caption,
}: {
  question: string;
  branches: DecisionBranch[];
  caption?: string;
}) {
  return (
    <div className="lm-decision">
      <div className="lm-decision-question">
        <span className="lm-decision-qlabel">Start here</span>
        <p>{question}</p>
      </div>
      <div
        className="lm-decision-branches"
        style={{ gridTemplateColumns: `repeat(${branches.length}, 1fr)` }}
      >
        {branches.map((b, i) => (
          <div
            key={i}
            className={`lm-decision-branch lm-decision-branch-${b.tone ?? "blue"}`}
          >
            <span className="lm-decision-answer">{b.answer}</span>
            <div className="lm-decision-arrow" aria-hidden="true" />
            <p className="lm-decision-result">{b.result}</p>
            {b.detail && <div className="lm-decision-detail">{b.detail}</div>}
          </div>
        ))}
      </div>
      {caption && <p className="lm-decision-caption">{caption}</p>}
    </div>
  );
}
