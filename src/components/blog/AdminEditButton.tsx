import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

/**
 * Floating "Edit" / "Studio" button shown on public blog pages only when
 * the current visitor is the allow-listed admin (i.e. signed in to /studio).
 * Public visitors render nothing.
 */
export async function AdminEditButton({
  href,
  label = "Edit",
}: {
  href: string;
  label?: string;
}) {
  const allowedEmail = process.env.STUDIO_ALLOWED_EMAIL?.toLowerCase();
  if (!allowedEmail) return null;

  let userEmail: string | undefined;
  try {
    const supabase = await supabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userEmail = user?.email?.toLowerCase();
  } catch {
    return null;
  }

  if (!userEmail || userEmail !== allowedEmail) return null;

  return (
    <Link href={href} className="admin-edit-button" prefetch={false}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
      <span>{label}</span>
    </Link>
  );
}
