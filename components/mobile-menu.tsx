"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MobileMenuProps {
  themeToggle: React.ReactNode;
}

export function MobileMenu({ themeToggle }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={toggleMenu}
        className="lg:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 transition-all duration-300"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            className="fixed inset-0 bg-black backdrop-blur-sm z-[99999] lg:hidden"
            onClick={closeMenu}
            onKeyDown={(e) => e.key === "Escape" && closeMenu()}
            aria-label="Close menu"
          />

          {/* Menu panel */}
          <div
            className="fixed top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh] bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 backdrop-blur-xl shadow-2xl z-[100000] lg:hidden animate-in slide-in-from-right duration-300 overflow-hidden"
            style={{ transform: "translateX(0)" }}
          >
            <div className="flex flex-col h-full w-full max-w-none">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <span className="text-lg font-bold text-white">Menu</span>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex-1 overflow-y-auto p-4 relative z-10 min-h-0">
                <div className="space-y-2">
                  <Link
                    href="/about"
                    onClick={closeMenu}
                    className="flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500/80 to-gray-500/80 hover:from-purple-400 hover:to-gray-400 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20"
                  >
                    About
                  </Link>
                  <Link
                    href="/faq"
                    onClick={closeMenu}
                    className="flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500/80 to-gray-500/80 hover:from-pink-400 hover:to-gray-400 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20"
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/privacy"
                    onClick={closeMenu}
                    className="flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500/80 to-gray-500/80 hover:from-orange-400 hover:to-gray-400 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20"
                  >
                    Privacy
                  </Link>
                </div>
              </nav>

              {/* Footer with theme toggle */}
              <div className="p-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Theme</span>
                  {themeToggle}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
