"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { asraya } from "@/content/asraya";

const clean = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path);

/** The Asraya masthead: wordmark and the four Asraya pages, on the paper under the site header. */
export function AsrayaNav() {
  const pathname = clean(usePathname());

  return (
    <div className="pt-[var(--nav-h)]">
      <nav aria-label={asraya.navLabel} className="a-wrap a-subnav">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3 border-b border-[color:var(--a-ink)] py-4">
          <Link href="/asraya" className="a-serif text-[2rem] leading-none">
            {asraya.wordmark}
          </Link>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {asraya.nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="a-wide block text-[color:var(--a-faint)] hover:text-[color:var(--a-ink)]"
                >
                  <span className="a-red mr-2">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
