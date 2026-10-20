import { AureliusBackground } from "@/components/aurelius-site/AureliusBackground";
import { CartRoot } from "@/components/cart/CartRoot";
import { LiveArtifactLayer } from "@/components/design/LiveArtifactLayer";
import { FooterSky } from "@/components/footer/FooterSky";
import { Footer } from "@/components/sections/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { SITE_ROOT_ID } from "@/components/ui/siteRoot";
import { Nav } from "@/components/ui/Nav";
import { QuoteBarSlot } from "@/components/quote/QuoteBarSlot";

/**
 * Header, main landmark, footer sky, footer, and the quote bar (the cart on Aurelius pages): the frame every page shares.
 * `theme="aurelius"` puts the page in the maroon-and-gold Aurelius system (styles/design/aurelius-theme.css)
 * with the floating pill navigation; Kreatif Atelier pages leave it off and keep their look.
 */
export function PageShell({ children, theme }: { children: React.ReactNode; theme?: "aurelius" }) {
  return (
    <div id={SITE_ROOT_ID} className={`relative z-10 ${theme === "aurelius" ? "theme-aurelius" : ""}`}>
      {theme === "aurelius" && <AureliusBackground />}
      {theme === "aurelius" && <LiveArtifactLayer />}
      <Nav variant={theme === "aurelius" ? "pill" : "bar"} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <FooterSky />
      <Footer />
      <BackToTop themed={theme === "aurelius"} />
      {/* Aurelius pages carry the service cart (header button + drawer); KA pages keep the quote bar. */}
      {theme === "aurelius" ? <CartRoot /> : <QuoteBarSlot />}
    </div>
  );
}
