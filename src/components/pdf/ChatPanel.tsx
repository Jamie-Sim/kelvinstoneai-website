import type { ReactNode } from "react";

export type ChatMessage = {
  from: "user" | "ai";
  body: ReactNode;
};

export function ChatPanel({
  header,
  subheader,
  messages,
  disclaimer,
  tone = "default",
}: {
  header?: string;
  subheader?: string;
  messages: ChatMessage[];
  disclaimer?: ReactNode;
  tone?: "default" | "warn";
}) {
  return (
    <div className={`lm-chat lm-chat-${tone}`}>
      {header && (
        <div className="lm-chat-head">
          <span className="lm-chat-dot" />
          <span className="lm-chat-dot" />
          <span className="lm-chat-dot" />
          <span className="lm-chat-title">{header}</span>
        </div>
      )}
      {subheader && <div className="lm-chat-sub">{subheader}</div>}
      <div className="lm-chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`lm-chat-msg lm-chat-msg-${m.from}`}>
            <span className="lm-chat-who">{m.from === "user" ? "You" : "Claude"}</span>
            <div className="lm-chat-bubble">{m.body}</div>
          </div>
        ))}
      </div>
      {disclaimer && <div className="lm-chat-disclaimer">{disclaimer}</div>}
    </div>
  );
}

export function PhoneAutocomplete({
  typed,
  suggestions,
  caption,
}: {
  typed: string;
  suggestions: string[];
  caption?: string;
}) {
  return (
    <div className="lm-phone">
      <div className="lm-phone-frame">
        <div className="lm-phone-notch" />
        <div className="lm-phone-msg-area">
          <div className="lm-phone-msg-bubble">{typed}</div>
        </div>
        <div className="lm-phone-suggestions">
          {suggestions.map((s, i) => (
            <span key={i} className="lm-phone-chip">
              {s}
            </span>
          ))}
        </div>
        <div className="lm-phone-input">
          <span className="lm-phone-typed">{typed}</span>
          <span className="lm-phone-caret" />
        </div>
        <div className="lm-phone-keyboard" aria-hidden="true">
          {Array.from({ length: 3 }).map((_, r) => (
            <div key={r} className="lm-phone-keyrow">
              {Array.from({ length: 10 - r }).map((__, k) => (
                <span key={k} className="lm-phone-key" />
              ))}
            </div>
          ))}
          <div className="lm-phone-keyrow lm-phone-keyrow-space">
            <span className="lm-phone-key lm-phone-key-wide" />
          </div>
        </div>
      </div>
      {caption && <p className="lm-phone-caption">{caption}</p>}
    </div>
  );
}
