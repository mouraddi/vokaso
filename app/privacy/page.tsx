import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";

export default function PrivacyPolicy() {
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
                href="/about"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-gray-500 hover:from-purple-400 hover:to-gray-400 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                About
              </Link>
              <Link
                href="/faq"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-gray-500 hover:from-pink-400 hover:to-gray-400 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                FAQ
              </Link>
              <Link
                href="/privacy"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-gray-500 hover:from-orange-400 hover:to-gray-400 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                Privacy
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
                  🔒 Privacy Policy
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Your privacy is important to us. Learn how we protect and
                  handle your information.
                </p>
                <p className="text-sm text-white/70 mt-4">
                  Last updated: January 18, 2026
                </p>
              </div>

              {/* Main Content */}
              <div className="space-y-12">
                {/* Introduction */}
                <div className="bg-white/10 .dark:bg-black/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    🛡️ Our Privacy Commitment
                  </h2>
                  <p className="text-white/90 text-lg leading-relaxed mb-4">
                    At Vokaso, we are committed to protecting your
                    privacy and being transparent about how we handle your
                    information. This Privacy Policy explains our practices
                    regarding data collection, usage, and protection.
                  </p>
                  <p className="text-white/90 text-lg leading-relaxed">
                    <strong>The good news:</strong> We don't collect, store, or
                    track any personal information from our users.
                  </p>
                </div>

                {/* What We Don't Collect */}
                <div className="bg-white/10 .dark:bg-black/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    ❌ What We DON'T Collect
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">🚫</div>
                      <div>
                        <h3 className="text-xl font-bold text-cyan-200 mb-2">
                          No Personal Information
                        </h3>
                        <p className="text-white/80">
                          We don't collect names, email addresses, phone
                          numbers, or any other personally identifiable
                          information.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">🚫</div>
                      <div>
                        <h3 className="text-xl font-bold text-cyan-200 mb-2">
                          No Text Data
                        </h3>
                        <p className="text-white/80">
                          Your text transformations happen entirely in your
                          browser. Nothing is sent to our servers or stored
                          anywhere.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">🚫</div>
                      <div>
                        <h3 className="text-xl font-bold text-cyan-200 mb-2">
                          No Tracking
                        </h3>
                        <p className="text-white/80">
                          We don't use cookies, analytics, or any other tracking
                          technologies to monitor your usage.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">🚫</div>
                      <div>
                        <h3 className="text-xl font-bold text-cyan-200 mb-2">
                          No IP Addresses
                        </h3>
                        <p className="text-white/80">
                          We don't collect or store IP addresses, location data,
                          or device information.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="bg-white/10 .dark:bg-black/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    🔧 Technical Implementation
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-cyan-200 mb-2">
                        Client-Side Processing
                      </h3>
                      <p className="text-white/80">
                        All text transformations are performed locally in your
                        browser using JavaScript. Your text never leaves your
                        device.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-200 mb-2">
                        No Server Communication
                      </h3>
                      <p className="text-white/80">
                        Our application doesn't make any API calls or server
                        requests for text processing. Everything happens
                        offline.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-200 mb-2">
                        Minimal Hosting Data
                      </h3>
                      <p className="text-white/80">
                        Our hosting provider may collect basic technical logs
                        (like any website), but this doesn't include any of your
                        personal data or text content.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Third-Party Services */}
                <div className="bg-white/10 .dark:bg-black/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    🤝 Third-Party Services
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-cyan-200 mb-2">
                        Vercel Hosting
                      </h3>
                      <p className="text-white/80">
                        We use Vercel for hosting and CDN services. They may
                        collect basic technical data like any web host, but we
                        don't share any user data with them.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-200 mb-2">
                        Google AdSense (Pending Approval)
                      </h3>
                      <p className="text-white/80">
                        We are currently applying to use Google AdSense for
                        displaying advertisements on our website. If approved,
                        Google AdSense may use cookies and similar technologies
                        to display ads based on your preferences. This includes
                        the use of DoubleClick DART cookies for non-personalized
                        ads. Google AdSense is subject to Google's Privacy
                        Policy. Users can opt out of personalized advertising by
                        visiting{" "}
                        <a
                          href="https://www.aboutads.info/choices"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-300 hover:text-cyan-200 underline"
                        >
                          About Ads
                        </a>{" "}
                        or through their browser settings.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-200 mb-2">
                        No Third-Party Analytics
                      </h3>
                      <p className="text-white/80">
                        We don't use Google Analytics, Facebook Pixel, or any
                        other third-party tracking or analytics services.
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Rights */}
                <div className="bg-white/10 .dark:bg-black/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    ⚖️ Your Rights
                  </h2>
                  <p className="text-white/90 text-lg leading-relaxed mb-6">
                    Since we don't collect any personal data, your rights are
                    essentially protected by default. However, you have the
                    right to:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="text-xl">✅</div>
                        <div>
                          <h3 className="font-bold text-cyan-200">
                            Use Without Registration
                          </h3>
                          <p className="text-white/80">
                            Use our tool completely anonymously without creating
                            an account.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="text-xl">✅</div>
                        <div>
                          <h3 className="font-bold text-cyan-200">
                            No Data Collection
                          </h3>
                          <p className="text-white/80">
                            Have confidence that your privacy is protected by
                            design.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="text-xl">✅</div>
                        <div>
                          <h3 className="font-bold text-cyan-200">
                            Offline Usage
                          </h3>
                          <p className="text-white/80">
                            Use the tool even without an internet connection
                            after initial load.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="text-xl">✅</div>
                        <div>
                          <h3 className="font-bold text-cyan-200">
                            Request Information
                          </h3>
                          <p className="text-white/80">
                            Contact us anytime for clarification about our
                            privacy practices.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Measures */}
                <div className="bg-white/10 .dark:bg-black/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    🔐 Security Measures
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-cyan-200 mb-2">
                        HTTPS Encryption
                      </h3>
                      <p className="text-white/80">
                        All communication between your browser and our servers
                        is encrypted using HTTPS.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-200 mb-2">
                        Secure Hosting
                      </h3>
                      <p className="text-white/80">
                        Our application is hosted on Vercel's secure,
                        enterprise-grade infrastructure.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-200 mb-2">
                        No Data to Secure
                      </h3>
                      <p className="text-white/80">
                        Since we don't collect any personal data, there's no
                        risk of data breaches affecting user information.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Updates */}
                <div className="bg-white/10 .dark:bg-black/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    📋 Policy Updates
                  </h2>
                  <p className="text-white/90 text-lg leading-relaxed mb-4">
                    We may update this Privacy Policy from time to time to
                    reflect changes in our practices or for other operational,
                    legal, or regulatory reasons.
                  </p>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Since we don't collect personal information, significant
                    changes are unlikely. Any updates will be posted on this
                    page with the updated date.
                  </p>
                </div>

                {/* Contact */}
                <div className="text-center bg-gradient-to-r from-cyan-500/20 to-pink-500/20 .dark:from-cyan-400/10 .dark:to-pink-400/10 rounded-3xl p-8 border border-white/20">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Questions About Privacy?
                  </h2>
                  <p className="text-white/90 text-lg mb-6">
                    If you have any questions about this Privacy Policy or our
                    privacy practices, please don't hesitate to contact us.
                  </p>
                  <div className="space-x-4">
                    <Link
                      href="/contact"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Contact Us
                    </Link>
                    <a
                      href="mailto:privacy@fancytextgenerator.com?subject=Privacy Policy Question"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Email Privacy Team
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
