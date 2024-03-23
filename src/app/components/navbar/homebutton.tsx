"use client";

import Link from "next/link";

export default function HomeButton() {
  return (
    <div className="text-3xl font-bold text-white hover:text-gold">
      <Link href="/">SQUASH WA</Link>
    </div>
  );
}
