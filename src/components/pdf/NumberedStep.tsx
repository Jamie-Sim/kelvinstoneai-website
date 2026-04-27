import type { ReactNode } from "react";

export type Step = { num: string; title: string; body: ReactNode };

export function NumberedSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="lm-steps">
      {steps.map((s) => (
        <div key={s.num} className="lm-step">
          <div className="lm-step-num">{s.num}</div>
          <div className="lm-step-body">
            <h4>{s.title}</h4>
            <p>{s.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
