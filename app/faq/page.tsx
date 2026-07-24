import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is a fancy text generator?",
    answer:
      "A fancy text generator transforms regular text into special Unicode characters that create different visual styles. These characters can be copied and used anywhere that supports Unicode text, including social media, messaging apps, and websites.",
  },
  {
    question: "Will these fancy text styles work everywhere?",
    answer:
      "Yes! All transformations use standard Unicode characters that are supported across all modern platforms, devices, and applications. However, the visual appearance may vary slightly depending on the font used by each platform.",
  },
  {
    question: "Can I use fancy text for commercial purposes?",
    answer:
      "The text transformations are free to use for any purpose, including commercial projects. Unicode characters are universal standards and can be used without restrictions.",
  },
  {
    question: "Does fancy text affect SEO or accessibility?",
    answer:
      "For SEO: Search engines may not recognize fancy Unicode text the same way as regular text, so it's best to use standard text for important keywords. For accessibility: Screen readers may struggle with certain Unicode characters, so use regular text for critical content.",
  },
  {
    question: "How do I copy the generated text?",
    answer:
      "Simply click the 'Copy' button next to any styled text result. The text will be copied to your clipboard and you can paste it anywhere you like. The button will show a checkmark to confirm the text has been copied.",
  },
  {
    question: "Does the generator support multiple languages?",
    answer:
      "Yes! The generator supports both English and Chinese characters. For languages with Unicode character variants (like English), they will be transformed. For languages without variants (like Chinese), the original characters are preserved while maintaining readability.",
  },
  {
    question: "What text styles are available?",
    answer:
      "We offer over 12 different text styles including: Bold, Italic, Script, Monospace, Circled, Squared, Fullwidth, Mathematical Bold, Mathematical Double-Struck, Mathematical Fraktur, Mathematical Sans-Serif, and more. Each style creates a unique visual appearance while maintaining text readability.",
  },
  {
    question: "Is there a limit to how much text I can transform?",
    answer:
      "There's no strict limit, but very long text (over 1000 characters) may take longer to process. For optimal performance, we recommend transforming text in smaller chunks if you need to convert large amounts of content.",
  },
  {
    question: "Do you store or track the text I generate?",
    answer:
      "No, we don't store or track any of your text transformations. All processing happens in your browser, and no data is sent to our servers. Your privacy is completely protected.",
  },
  {
    question: "Can I suggest new text styles?",
    answer:
      "Absolutely! We're always looking to add new Unicode character mappings and text styles. Contact us through our feedback email or contact form with your suggestions, and we'll consider them for future updates.",
  },
];

export default function FAQ() {
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
                  ❓ Frequently Asked Questions
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                  Everything you need to know about fancy text generation and
                  our tool
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Still have questions? Contact us!
                </Link>
              </div>

              {/* FAQ Content */}
              <section className="relative">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-400/10 to-transparent rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-pink-400/10 to-transparent rounded-full blur-3xl" />
                </div>

                <div className="relative">
                  <Accordion type="single" collapsible className="space-y-4">
                    {faqData.map((faq, index) => (
                      <AccordionItem
                        key={faq.question}
                        value={`item-${index}`}
                        className="border-2 border-white/30 rounded-2xl px-8 hover:border-cyan-400/70 transition-all duration-500 bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-cyan-400/20"
                      >
                        <AccordionTrigger className="text-lg font-bold text-white hover:text-cyan-200 py-6 hover:no-underline transition-colors duration-300">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-white/80 leading-relaxed pb-6 text-base">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </section>

              {/* Text Transformation Demo */}
              <div className="mt-16 bg-white/10 .dark:bg-black/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                <h2 className="text-4xl font-bold text-white mb-6 text-center">
                  🔄 See The Transformation
                </h2>
                <p className="text-white/90 text-lg leading-relaxed mb-8 text-center">
                  Watch how plain text transforms into beautiful Unicode styles
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative rounded-2xl overflow-hidden group">
                    <Image
                      src="/images/text-transformation-demo.jpg"
                      alt="Text transformation before and after"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg">
                        Before & After
                      </h3>
                      <p className="text-white/80 text-sm">
                        See the transformation process
                      </p>
                    </div>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden group">
                    <Image
                      src="/images/creative-workspace.jpg"
                      alt="Creative workspace using text styles"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg">
                        Creative Applications
                      </h3>
                      <p className="text-white/80 text-sm">
                        Professional usage examples
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="text-center mt-16 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 .dark:from-cyan-400/10 .dark:to-pink-400/10 rounded-3xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Didn't find what you're looking for?
                </h2>
                <p className="text-white/90 text-lg mb-6">
                  Our team is here to help! Send us an email and we'll get back
                  to you as soon as possible.
                </p>
                <div className="space-x-4">
                  <Link
                    href="/contact"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                  <a
                    href="mailto:support@fancytextgenerator.com?subject=FAQ Question"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Email Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
