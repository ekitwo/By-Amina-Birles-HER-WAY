"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// A plain server-side redirect() has no server to run in a static export,
// so this navigates on the client instead — with a visible link as a
// fallback for the moment before JS takes over.
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/today");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Link href="/today" className="text-sm text-muted-foreground underline">
        Continue to Today
      </Link>
    </div>
  );
}
