"use client";

import { Download, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function toPascalCase(name: string): string {
  return name.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
}

const SPRITE_URL = "https://cdn.jsdelivr.net/npm/lucide-static@latest/sprite.svg";
const CDN = "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons";

interface IconData {
  name: string;
  pascal: string;
}

export function IconsPage() {
  const [search, setSearch] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null);
  const [icons, setIcons] = useState<IconData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchingSvg, setFetchingSvg] = useState(false);
  const [selectedSvg, setSelectedSvg] = useState("");
  const [spriteReady, setSpriteReady] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetch("https://cdn.jsdelivr.net/npm/lucide-static@latest/tags.json").then((r) => r.json()),
      fetch(SPRITE_URL).then((r) => r.text()),
    ])
      .then(([tagsData, spriteText]) => {
        if (cancelled) return;
        const names = Object.keys(tagsData as Record<string, unknown>).sort();
        setIcons(names.map((n) => ({ name: n, pascal: toPascalCase(n) })));
        setLoading(false);

        if (spriteRef.current) {
          spriteRef.current.innerHTML = spriteText
            .replace('<?xml version="1.0" encoding="utf-8"?>', "")
            .replace('xmlns="http://www.w3.org/2000/svg"', 'xmlns="http://www.w3.org/2000/svg" style="display:none"');
          setSpriteReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
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

  const copyReact = (pascal: string) => {
    const code = `import { ${pascal} } from "lucide-react";\n\n<${pascal} className="w-6 h-6" />`;
    navigator.clipboard.writeText(code);
    toast.success("JSX code copied!");
  };

  const copySvgCode = async (kebab: string) => {
    const svg = await fetch(`${CDN}/${kebab}.svg`).then((r) => r.text());
    navigator.clipboard.writeText(svg);
    toast.success("SVG code copied!");
  };

  const downloadSvg = async (kebab: string) => {
    const svg = await fetch(`${CDN}/${kebab}.svg`).then((r) => r.text());
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${kebab}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${kebab}.svg downloaded!`);
  };

  const copyName = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  const handleIconClick = useCallback(async (name: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSelectedIcon(name);
    setPopupPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
    setFetchingSvg(true);
    setSelectedSvg("");
    try {
      const svg = await fetch(`${CDN}/${name}.svg`).then((r) => r.text());
      setSelectedSvg(svg);
    } catch { /* ignore */ }
    setFetchingSvg(false);
  }, []);

  const closePopup = () => {
    setSelectedIcon(null);
    setPopupPos(null);
    setSelectedSvg("");
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return icons;
    return icons.filter((ico) => ico.pascal.toLowerCase().includes(q) || ico.name.includes(q));
  }, [search, icons]);

  const selected = icons.find((i) => i.name === selectedIcon);

  return (
    <div className="py-8 md:py-16 px-3 sm:px-4 lg:px-8">
      <div ref={spriteRef} />

      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2">🎨 Lucide Icons</h1>
        <p className="text-base text-white/70">Beautiful open-source icons. Click any icon to copy SVG, JSX, or download.</p>
      </div>

      <div className="max-w-6xl mx-auto mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${icons.length || ""} icons...`}
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
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white/40 text-sm">Loading icons...</p>
          </div>
        ) : (
          <>
            {search && <p className="text-white/50 text-sm mb-3">{filtered.length} of {icons.length} icons</p>}
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14 gap-1.5">
              {filtered.map((ico) => (
                <button
                  key={ico.name}
                  onClick={(e) => handleIconClick(ico.name, e)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 p-2 rounded-lg transition-all",
                    selectedIcon === ico.name
                      ? "bg-cyan-500/20 ring-1 ring-cyan-400"
                      : "bg-white/5 hover:bg-white/15 ring-0 hover:ring-1 ring-white/20",
                  )}
                  title={ico.pascal}
                >
                  <svg className="w-5 h-5 text-white pointer-events-none">
                    <use href={`#${ico.name}`} />
                  </svg>
                  <span className="text-[9px] text-white/50 truncate w-full text-center leading-tight">{ico.pascal}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedIcon && selected && popupPos && (
        <div
          ref={popupRef}
          style={{ top: popupPos.top, left: popupPos.left }}
          className="fixed z-50 -translate-x-1/2"
        >
          <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-5 shadow-2xl border border-gray-700 min-w-[220px]">
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-700">
              {fetchingSvg ? (
                <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              ) : selectedSvg ? (
                <span className="w-8 h-8 text-cyan-400 [&>svg]:w-8 [&>svg]:h-8" dangerouslySetInnerHTML={{ __html: selectedSvg }} />
              ) : (
                <svg className="w-8 h-8 text-cyan-400">
                  <use href={`#${selectedIcon}`} />
                </svg>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{selected.pascal}</p>
                <p className="text-[10px] text-gray-400 truncate">{selectedIcon}.svg</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <button onClick={() => copySvgCode(selectedIcon)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors w-full text-left">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span>Copy SVG</span>
              </button>
              <button onClick={() => copyReact(selected.pascal)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors w-full text-left">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                <span>Copy JSX</span>
              </button>
              <button onClick={() => downloadSvg(selectedIcon)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors w-full text-left">
                <Download className="w-4 h-4" />
                <span>Download SVG</span>
              </button>
              <div className="border-t border-gray-700 my-1" />
              <button onClick={() => copyName(selected.pascal)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors w-full text-left">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span>Copy &quot;{selected.pascal}&quot;</span>
              </button>
              <button onClick={() => copyName(selectedIcon)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors w-full text-left">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span>Copy &quot;{selectedIcon}&quot;</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {popupPos && <div className="fixed inset-0 z-40" onClick={closePopup} />}
    </div>
  );
}
