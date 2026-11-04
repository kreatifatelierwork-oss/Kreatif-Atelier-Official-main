"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { valora } from "@/content/valora";

const clean = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path);

/** The Valora masthead under the site header: the swan and wordmark, and Valora's four pages. */
export function ValoraNav() {
  const pathname = clean(usePathname());

  return (
    <div className="pt-[var(--nav-h)]">
      <nav aria-label={valora.navLabel} className="a-wrap v-subnav">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-3 border-b border-[color:var(--a-rule)] py-4">
          <Link href="/valora" className="flex items-center gap-3">
            <Image src={valora.logo.src} alt="" width={28} height={34} className="h-[34px] w-auto" />
            <span className="v-wordmark text-[1.45rem]">{valora.wordmark}</span>
          </Link>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {valora.nav.map((item, i) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className="a-wide block">
                  <span className="a-red mr-2">{pad(i + 1)}</span>
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

const pad = (n: number) => String(n).padStart(2, "0");
