"use client";

import { Check, Copy, Download, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const EXCLUDE_ICONS = new Set([
  "createLucideIcon", "default", "icons", "Icon", "LucideIcon", "LucideProps",
]);

function toKebabCase(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

const LUCIDE_CDN = "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons";

export function IconsPage() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null);
  const [allIcons, setAllIcons] = useState<string[]>([]);
  const [iconComponents, setIconComponents] = useState<Record<string, React.ComponentType<{ className?: string }>>>({});
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("lucide-react").then((mod: unknown) => {
      const iconsMap = mod as Record<string, unknown>;
      const names = Object.keys(iconsMap).filter(
        (name) => /^[A-Z]/.test(name) && !EXCLUDE_ICONS.has(name) && typeof iconsMap[name] === "function"
      ).sort();
      setAllIcons(names);

      const comps: Record<string, React.ComponentType<{ className?: string }>> = {};
      for (const name of names) {
        comps[name] = iconsMap[name] as React.ComponentType<{ className?: string }>;
      }
      setIconComponents(comps);
    });
  }, []);

  useEffect(() => {
    if (!popupPos) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setSelectedIcon(null);
        setPopupPos(null);
      }
    };
    const handleScroll = () => { setSelectedIcon(null); setPopupPos(null); };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [popupPos]);

  const fetchSvg = async (name: string): Promise<string> => {
    try {
      const res = await fetch(`${LUCIDE_CDN}/${toKebabCase(name)}.svg`);
      if (!res.ok) throw new Error("Not found");
      return await res.text();
    } catch {
      return "";
    }
  };

  const copyReact = async (name: string) => {
    const code = `import { ${name} } from "lucide-react";\n\n<${name} className="w-6 h-6" />`;
    await navigator.clipboard.writeText(code);
    setCopied(name);
    toast.success(`${name} React code copied!`);
    setTimeout(() => setCopied(null), 1500);
  };

  const copySvgCode = async (name: string) => {
    const svg = await fetchSvg(name);
    if (!svg) { toast.error("Could not fetch SVG from CDN"); return; }
    await navigator.clipboard.writeText(svg);
    setCopied(name);
    toast.success(`${name} SVG copied!`);
    setTimeout(() => setCopied(null), 1500);
  };

  const downloadSvg = async (name: string) => {
    const svg = await fetchSvg(name);
    if (!svg) { toast.error("Could not fetch SVG from CDN"); return; }
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${name}.svg downloaded!`);
  };

  const handleIconClick = useCallback((name: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSelectedIcon(name);
    setPopupPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return allIcons;
    return allIcons.filter((name) => {
      const kebab = toKebabCase(name);
      return name.toLowerCase().includes(q) || kebab.includes(q);
    });
  }, [search, allIcons]);

  const SelectedIcon = selectedIcon && iconComponents[selectedIcon] ? iconComponents[selectedIcon] : null;

  return (
    <div className="py-8 md:py-16 px-3 sm:px-4 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2">🎨 Lucide Icons</h1>
        <p className="text-base text-white/70">Click any icon to copy SVG, React code, or download</p>
      </div>

      <div className="max-w-6xl mx-auto mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${filtered.length} icons...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-white/40 focus:outline-none focus:border-cyan-400/50"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-white/40 hover:text-white" />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {allIcons.length === 0 ? (
          <p className="text-white/40 text-center">Loading icons...</p>
        ) : (
          <>
            {search && (
              <p className="text-white/50 text-sm mb-3">{filtered.length} of {allIcons.length} icons</p>
            )}
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14 gap-1.5">
              {filtered.map((name) => {
                const Icon = iconComponents[name];
                if (!Icon) return null;
                return (
                  <button
                    key={name}
                    onClick={(e) => handleIconClick(name, e)}
                    className={cn(
                      "flex flex-col items-center gap-0.5 p-2 rounded-lg transition-all",
                      selectedIcon === name
                        ? "bg-cyan-500/20 ring-1 ring-cyan-400"
                        : "bg-white/5 hover:bg-white/15 ring-0 hover:ring-1 ring-white/20",
                    )}
                    title={name}
                  >
                    <Icon className="w-5 h-5 text-white" />
                    <span className="text-[9px] text-white/50 truncate w-full text-center leading-tight">{name}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {selectedIcon && SelectedIcon && popupPos && (
        <div
          ref={popupRef}
          style={{ top: popupPos.top, left: popupPos.left }}
          className="fixed z-50 -translate-x-1/2"
        >
          <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-5 shadow-2xl border border-gray-700 min-w-[200px]">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-700">
              <SelectedIcon className="w-8 h-8 text-cyan-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">{selectedIcon}</p>
                <p className="text-[10px] text-gray-400">{toKebabCase(selectedIcon)}.svg</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => copySvgCode(selectedIcon)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors w-full text-left"
              >
                {copied === selectedIcon ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>Copy SVG</span>
              </button>
              <button
                onClick={() => copyReact(selectedIcon)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors w-full text-left"
              >
                <Code2Icon className="w-4 h-4" />
                <span>Copy JSX</span>
              </button>
              <button
                onClick={() => downloadSvg(selectedIcon)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors w-full text-left"
              >
                <Download className="w-4 h-4" />
                <span>Download SVG</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Code2Icon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
