import type { ReactNode } from "react";

export function Figure({
  src,
  alt,
  caption,
  children,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  children?: ReactNode;
}) {
  return (
    <figure className="lm-figure">
      {children ??
        (src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? ""} />
        ) : null)}
      {caption && <figcaption className="lm-figure-caption">{caption}</figcaption>}
    </figure>
  );
}
