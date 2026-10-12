import { PreFooterGlow } from "@/components/footer/PreFooterGlow";
import { Footer } from "@/components/sections/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { SITE_ROOT_ID } from "@/components/ui/Dialog";
import { Nav } from "@/components/ui/Nav";
import { QuoteBar } from "@/components/quote/QuoteBar";

/** Header, main landmark, pre-footer glow, footer, and the quote bar: the frame every page shares. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div id={SITE_ROOT_ID} className="relative z-10">
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <PreFooterGlow />
      <Footer />
      <BackToTop />
      <QuoteBar />
    </div>
  );
}
