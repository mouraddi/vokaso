import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-black/30 .dark:bg-black/50 backdrop-blur-xl border-t border-white/20">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <Link
              href="/"
              className="text-xl font-black tracking-tight text-white hover:text-cyan-200 transition-colors duration-300 flex items-center gap-2"
            >
              ✨ Vokaso
            </Link>
            <p className="text-white/70 text-sm">
              Free online Unicode text generator. Transform your text into
              stylish fonts for Instagram, TikTok, Twitter, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <nav className="space-y-2">
              <Link
                href="/"
                className="block text-white/70 hover:text-cyan-200 text-sm transition-colors duration-300"
              >
                Font Generator
              </Link>
              <Link
                href="/about"
                className="block text-white/70 hover:text-cyan-200 text-sm transition-colors duration-300"
              >
                About
              </Link>
              <Link
                href="/faq"
                className="block text-white/70 hover:text-cyan-200 text-sm transition-colors duration-300"
              >
                FAQ
              </Link>
              <Link
                href="/privacy"
                className="block text-white/70 hover:text-cyan-200 text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              Features
            </h3>
            <div className="space-y-2 text-white/70 text-sm">
              <div>12+ Text Styles</div>
              <div>Social Media Ready</div>
              <div>Instant Copy & Paste</div>
              <div>Free to Use</div>
            </div>
          </div>

          {/* Text Styles */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              Text Styles
            </h3>
            <div className="space-y-2 text-white/70 text-sm">
              <div>Bold Text</div>
              <div>Italic Text</div>
              <div>Script Text</div>
              <div>Monospace Text</div>
              <div>Circled Text</div>
              <div>Boxed Text</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Vokaso. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <Link
                href="/"
                className="hover:text-cyan-200 transition-colors duration-300"
              >
                Home
              </Link>
              <span>•</span>
              <Link
                href="/privacy"
                className="hover:text-cyan-200 transition-colors duration-300"
              >
                Privacy
              </Link>
              <span>•</span>
              <Link
                href="/sitemap.xml"
                className="hover:text-cyan-200 transition-colors duration-300"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
