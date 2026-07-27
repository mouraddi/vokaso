import Link from "next/link";
import { Toaster } from "sonner";
import { IconsPage } from "@/components/icons-page";
import { MobileMenu } from "@/components/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Icons() {
  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-600 via-slate-600 to-gray-700 .dark:from-gray-950 .dark:via-slate-950 .dark:to-gray-950">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/10 to-pink-500/10 .dark:from-transparent .dark:via-cyan-400/5 .dark:to-pink-400/5" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-400/15 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10">
        <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/10 .dark:bg-black/20 backdrop-blur-xl shadow-lg">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-lg hover:text-cyan-200 transition-colors duration-300"
            >
              ✨ Vokaso
            </Link>

            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                Font Generator
              </Link>
              <Link
                href="/icons"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                Icons
              </Link>
              <Link
                href="/symbols"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                Symbols
              </Link>
              <ThemeToggle />
            </div>

            <div className="flex lg:hidden items-center gap-3">
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              <MobileMenu themeToggle={<ThemeToggle />} />
            </div>
          </div>
        </nav>

        <div className="bg-white/10 .dark:bg-black/20 backdrop-blur-xl min-h-screen">
          <IconsPage />
        </div>
      </div>

      <Toaster position="bottom-right" expand richColors closeButton theme="dark" />
    </main>
  );
}
