import type { ReactNode } from "react";

export function PromptBox({
  label,
  title,
  prompt,
  footer,
}: {
  label?: string;
  title: string;
  prompt: string;
  footer?: ReactNode;
}) {
  return (
    <div className="lm-prompt">
      <div className="lm-prompt-head">
        {label && <span className="lm-prompt-label">{label}</span>}
        <h4 className="lm-prompt-title">{title}</h4>
      </div>
      <pre className="lm-prompt-code">
        <code>{prompt}</code>
      </pre>
      {footer && <div className="lm-prompt-foot">{footer}</div>}
    </div>
  );
}
