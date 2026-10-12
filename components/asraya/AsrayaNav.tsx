"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { asraya } from "@/content/asraya";

const clean = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path);

/** The Asraya masthead: wordmark and the four Asraya pages, under the site header. */
export function AsrayaNav() {
  const pathname = clean(usePathname());

  return (
    <div className="bg-[#151413] px-[var(--gutter)] pt-[var(--nav-h)] text-[#f3eee4]">
      <nav aria-label={asraya.navLabel} className="a-wrap flex flex-wrap items-end justify-between gap-x-10 gap-y-3 border-t border-white/15 py-4">
        <Link href="/asraya" className="a-serif text-[2rem] leading-none">
          {asraya.wordmark}
        </Link>
        <ul className="flex flex-wrap gap-x-7 gap-y-2">
          {asraya.nav.map((item) => {
            const current = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className="a-display block border-b-2 border-transparent pb-1 text-[1.02rem] tracking-[0.05em] text-[#f3eee4]/70 transition-colors hover:text-[#f3eee4] aria-[current=page]:border-[#d2301f] aria-[current=page]:text-[#f3eee4]"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
