import Link from "next/link";
import { Toaster } from "sonner";
import { AffiliatePopup } from "@/components/affiliate-popup";
import { FancyTextGenerator } from "@/components/fancy-text-generator";
import { MobileMenu } from "@/components/mobile-menu";
import { SiteFooter } from "@/components/site-footer";
import { ThemeToggle } from "@/components/theme-toggle";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a fancy text generator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A fancy text generator, also known as a font generator with copy and paste functionality, transforms regular text into special Unicode characters that create different visual styles. These characters can be copied and used anywhere that supports Unicode text, including social media, messaging apps, and websites.",
      },
    },
    {
      "@type": "Question",
      name: "Will these fancy text styles work everywhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! All transformations use standard Unicode characters that are supported across all modern platforms, devices, and applications. However, the visual appearance may vary slightly depending on the font used by each platform.",
      },
    },
    {
      "@type": "Question",
      name: "How do I copy the generated text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply click the 'Copy' button next to any styled text result. The text will be copied to your clipboard and you can paste it anywhere you like.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use fancy text for commercial purposes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unicode characters are universal standards and can be used without restrictions for any purpose.",
      },
    },
    {
      "@type": "Question",
      name: "Does the generator support multiple languages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! The generator supports both English and Chinese characters. For languages without Unicode variants, the original characters are preserved while maintaining readability.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen relative">
        {/* Modern gradient background with animated elements */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-600 via-slate-600 to-gray-700 .dark:from-gray-950 .dark:via-slate-950 .dark:to-gray-950">
          {/* Animated background overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/10 to-pink-500/10 .dark:from-transparent .dark:via-cyan-400/5 .dark:to-pink-400/5" />

          {/* Floating orbs effect */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-400/15 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* Main content with glass morphism */}
        <div className="relative z-10">
          <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/10 .dark:bg-black/20 backdrop-blur-xl shadow-lg">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              {/* Logo */}
              <Link
                href="/"
                className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-lg hover:text-cyan-200 transition-colors duration-300"
              >
                ✨ Vokaso
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  Font Generator
                </Link>
                <ThemeToggle />
              </div>

              {/* Mobile Navigation */}
              <div className="flex lg:hidden items-center gap-3">
                <div className="hidden sm:block">
                  <ThemeToggle />
                </div>
                <MobileMenu themeToggle={<ThemeToggle />} />
              </div>
            </div>
          </nav>

          {/* Content container with glass morphism */}
          <div className="bg-white/10 .dark:bg-black/20 backdrop-blur-xl min-h-screen">
            <FancyTextGenerator />

            {/* How to Use Tutorial Section */}
            <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 md:mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                    📖 How to Use
                  </h2>
                  <p className="text-lg sm:text-xl text-white/80">
                    Generate fancy text in 3 simple steps
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {/* Step 1 */}
                  <div className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:border-cyan-400/50 transition-all duration-300">
                    <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                      1
                    </div>
                    <h3 className="text-xl font-bold text-white mt-2 mb-3">
                      Enter Your Text
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      Type or paste your text into the input box above. The
                      generator supports both English and Chinese characters.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:border-pink-400/50 transition-all duration-300">
                    <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                      2
                    </div>
                    <h3 className="text-xl font-bold text-white mt-2 mb-3">
                      Browse Styles
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      Scroll through 12+ unique Unicode text styles. Preview how
                      your text looks in bold, italic, script, monospace, and
                      more.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:border-green-400/50 transition-all duration-300">
                    <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg">
                      3
                    </div>
                    <h3 className="text-xl font-bold text-white mt-2 mb-3">
                      Copy & Paste
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      Click the copy button next to your favorite style. Paste
                      it anywhere - Instagram, Twitter, Discord, WhatsApp, or
                      any app!
                    </p>
                  </div>
                </div>

                {/* Tips Section */}
                <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    💡 Pro Tips
                  </h3>
                  <ul className="space-y-3 text-white/80 text-sm md:text-base">
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>
                        <strong className="text-white">Mix styles:</strong> Copy
                        different parts of your text in different styles to
                        create unique combinations.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>
                        <strong className="text-white">
                          Social media bios:
                        </strong>{" "}
                        Use fancy text to make your Instagram or Twitter bio
                        stand out from the crowd.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      <span>
                        <strong className="text-white">
                          Universal support:
                        </strong>{" "}
                        All styles use standard Unicode characters that work on
                        any device or platform.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SEO Content Section */}
            <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white/5 .dark:bg-black/10">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Why Use Our Fancy Text Generator?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-cyan-200">
                      🎨 Multiple Text Styles
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      Choose from over 12 unique Unicode text styles including
                      bold, italic, script, monospace, circled, boxed,
                      mathematical symbols, and more. Each style works across
                      all platforms and devices.
                    </p>

                    <h3 className="text-lg md:text-xl font-semibold text-cyan-200">
                      📱 Social Media Ready
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      Perfect for Instagram, Twitter, Facebook, Discord,
                      WhatsApp, and any messaging platform. Make your posts
                      stand out with eye-catching text styles that work
                      everywhere.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-cyan-200">
                      🌍 Multi-Language Support
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      Works with English and Chinese characters, preserving
                      international text while applying Unicode transformations.
                      No need to worry about character encoding issues.
                    </p>

                    <h3 className="text-lg md:text-xl font-semibold text-cyan-200">
                      ⚡ Instant Copy & Paste
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      Generate stylish text instantly with one-click copying.
                      Paste directly into social media posts, messages,
                      documents, or anywhere you need creative text.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            
          </div>
        </div>

        <SiteFooter />
        <AffiliatePopup />
        <Toaster
          position="bottom-right"
          expand={true}
          richColors
          closeButton
          theme="dark"
        />
      </main>
    </>
  );
}
