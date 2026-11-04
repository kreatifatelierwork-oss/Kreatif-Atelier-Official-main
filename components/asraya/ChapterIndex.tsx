"use client";

import { useEffect, useRef, useState } from "react";
import { documentTop, getLenis } from "@/lib/scroll/lenis";

type Props = { items: readonly { id: string; name: string }[]; label: string };

/** A long page's chapters as a bar under the site header; the one being read is marked in red. */
export function ChapterIndex({ items, label }: Props) {
  const [current, setCurrent] = useState(items[0]?.id);
  const bar = useRef<HTMLElement>(null);

  // The site's anchor handler scrolls a target to the very top, under the header and this bar;
  // chapters here stop just below the bar instead.
  const go = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target || event.metaKey || event.ctrlKey) return;
    event.preventDefault();
    const header = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
    const top = documentTop(target) - header - (bar.current?.offsetHeight ?? 0) - 8;
    const focus = () => {
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(top, { onComplete: focus });
    else {
      window.scrollTo({ top });
      focus();
    }
    history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
    let frame = 0;
    // A chapter counts as current once its top passes a line a third of the way down the screen.
    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      let active = sections[0]?.id;
      for (const section of sections) if (section.getBoundingClientRect().top <= line) active = section.id;
      setCurrent(active);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  // On narrow screens the bar scrolls sideways: keep the current chapter in view.
  useEffect(() => {
    const link = bar.current?.querySelector<HTMLElement>('[aria-current="true"]');
    const nav = bar.current;
    if (!link || !nav || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: link.offsetLeft - nav.clientWidth / 2 + link.offsetWidth / 2, behavior: "smooth" });
  }, [current]);

  return (
    <nav ref={bar} aria-label={label} className="a-index">
      <ol>
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={(event) => go(event, item.id)} aria-current={current === item.id ? "true" : undefined}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
