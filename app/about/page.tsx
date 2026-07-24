import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";
import { SiteFooter } from "@/components/site-footer";
import { ThemeToggle } from "@/components/theme-toggle";

export default function About() {
  return (
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
              <Link
                href="/faq"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-gray-500 hover:from-pink-400 hover:to-gray-400 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                FAQ
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
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <h1 className="text-6xl font-black mb-6 text-white drop-shadow-2xl uppercase tracking-tight">
                  📖 About Us
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Learn about our mission to make text transformation simple and
                  accessible for everyone
                </p>
              </div>

              {/* Main Content */}
              <div className="space-y-12">
                {/* Mission Section */}
                <div className="bg-white/10 .dark:bg-black/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    🎯 Our Mission
                  </h2>
                  <p className="text-white/90 text-lg leading-relaxed mb-4">
                    Vokaso is a free online tool that helps you transform ordinary text
                    into stylish Unicode fonts. Express yourself creatively
                    on Instagram, TikTok, Twitter, and more.
                  </p>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Whether you're creating social media content, designing
                    websites, or just want to add some flair to your messages,
                    our tool makes it effortless to transform ordinary text into
                    something extraordinary.
                  </p>
                </div>

                {/* Features Section */}
                <div className="bg-white/10 .dark:bg-black/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    ✨ What We Offer
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-cyan-200 mb-3">
                        12+ Text Styles
                      </h3>
                      <p className="text-white/80">
                        From bold and italic to script, monospace, circled,
                        boxed, and many more unique Unicode transformations.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-cyan-200 mb-3">
                        Universal Compatibility
                      </h3>
                      <p className="text-white/80">
                        All our text transformations work across all modern
                        platforms, devices, and applications.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-cyan-200 mb-3">
                        Multi-Language Support
                      </h3>
                      <p className="text-white/80">
                        Support for both English and Chinese characters,
                        preserving readability while adding style.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-cyan-200 mb-3">
                        Instant Copy & Paste
                      </h3>
                      <p className="text-white/80">
                        One-click copying to clipboard with visual confirmation,
                        making it easy to use anywhere.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual Showcase */}
                <div className="bg-white/10 .dark:bg-black/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                  <h2 className="text-4xl font-bold text-white mb-6 text-center">
                    ✨ See It In Action
                  </h2>
                  <p className="text-white/90 text-lg leading-relaxed mb-8 text-center">
                    Check out the amazing text transformations our tool can
                    create
                  </p>

                  {/* Image Gallery */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative rounded-2xl overflow-hidden group">
                      <Image
                        src="/images/unicode-text-showcase.jpg"
                        alt="Unicode text styles showcase"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg">
                          Unicode Text Styles
                        </h3>
                        <p className="text-white/80 text-sm">
                          Various text transformations
                        </p>
                      </div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden group">
                      <Image
                        src="/images/multilingual-support.jpg"
                        alt="Multilingual text support"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg">
                          Multi-Language Support
                        </h3>
                        <p className="text-white/80 text-sm">
                          English and Chinese characters
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technology Section */}
                <div className="bg-white/10 .dark:bg-black/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    🔧 Our Technology
                  </h2>
                  <p className="text-white/90 text-lg leading-relaxed mb-4">
                    Our generator uses advanced Unicode character mapping to
                    transform regular text into beautiful stylized versions. We
                    carefully curate our character mappings to ensure
                    compatibility and visual appeal across all platforms.
                  </p>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Built with modern web technologies including Next.js,
                    TypeScript, and Tailwind CSS, our application is fast,
                    responsive, and accessible to users worldwide.
                  </p>
                </div>

                {/* Values Section */}
                <div className="bg-white/10 .dark:bg-black/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    💎 Our Values
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">🎨</div>
                      <div>
                        <h3 className="text-xl font-bold text-cyan-200 mb-2">
                          Creativity First
                        </h3>
                        <p className="text-white/80">
                          We believe in empowering users to express their
                          creativity through beautiful text transformations.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">🌍</div>
                      <div>
                        <h3 className="text-xl font-bold text-cyan-200 mb-2">
                          Universal Access
                        </h3>
                        <p className="text-white/80">
                          Our tools should be available to everyone, regardless
                          of technical skill or background.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">🔒</div>
                      <div>
                        <h3 className="text-xl font-bold text-cyan-200 mb-2">
                          Privacy & Security
                        </h3>
                        <p className="text-white/80 mb-3">
                          All text processing happens in your browser - we don't
                          store or track any of your text transformations.
                        </p>
                        <Link
                          href="/privacy"
                          className="inline-block text-sm text-cyan-300 hover:text-cyan-200 underline transition-colors"
                        >
                          Read our full Privacy Policy →
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">🚀</div>
                      <div>
                        <h3 className="text-xl font-bold text-cyan-200 mb-2">
                          Continuous Improvement
                        </h3>
                        <p className="text-white/80">
                          We're constantly working to improve our tool and add
                          new text styles based on user feedback.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center bg-gradient-to-r from-cyan-500/20 to-pink-500/20 .dark:from-cyan-400/10 .dark:to-pink-400/10 rounded-3xl p-8 border border-white/20">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Ready to Create Amazing Text?
                  </h2>
                  <p className="text-white/90 text-lg mb-6">
                    Start transforming your text today and discover the endless
                    possibilities!
                  </p>
                  <Link
                    href="/"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20"
                  >
                    Try Our Text Generator
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
