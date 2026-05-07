"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";

export function StudioHeader({ email }: { email: string | null }) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    await supabaseBrowser().auth.signOut();
    router.push("/studio/login");
    router.refresh();
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <Link href="/studio" className="text-sm font-semibold tracking-tight">
            Kelvinstone Studio
          </Link>
          <nav className="flex items-center gap-4 text-sm text-slate-600">
            <Link href="/studio" className="hover:text-slate-900">
              Ideas
            </Link>
            <Link href="/studio/blog" className="hover:text-slate-900">
              Blog
            </Link>
            <Link href="/studio/settings" className="hover:text-slate-900">
              Settings
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          {email && <span className="hidden sm:inline">{email}</span>}
          <button
            type="button"
            onClick={signOut}
            disabled={signingOut}
            className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </div>
    </header>
  );
}
