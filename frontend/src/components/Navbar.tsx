"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-black/5 bg-[rgba(246,244,239,0.92)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white shadow-[0_8px_30px_rgba(17,17,17,0.06)]">
            <ShieldCheck className="h-5 w-5 text-black" />
          </span>
          <div>
            <span className="block text-sm font-semibold uppercase tracking-[0.24em] text-black">
              TrueArt
            </span>
            <span className="block text-xs text-neutral-500">
              AI image checker
            </span>
          </div>
        </Link>

        <Link
          href="#checker"
          className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-neutral-700 transition hover:border-black hover:text-black"
        >
          Check image
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
