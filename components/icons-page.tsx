"use client";

import { Download, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function toPascalCase(name: string): string {
  return name.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
}

const LUCIDE_BASE = "https://cdn.jsdelivr.net/npm/lucide-static@latest";
const SPRITE_URL = `${LUCIDE_BASE}/sprite.svg`;
const TAGS_URL = `${LUCIDE_BASE}/tags.json`;

interface IconData {
  name: string;
  pascal: string;
  svg: string;
  category: string;
}

export function IconsPage() {
  const [search, setSearch] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null);
  const [icons, setIcons] = useState<IconData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [tagsRes, spriteRes] = await Promise.all([
          fetch(TAGS_URL),
          fetch(SPRITE_URL),
        ]);

        if (!tagsRes.ok || !spriteRes.ok) throw new Error("fetch failed");

        const [tagsData, spriteText] = await Promise.all([
          tagsRes.json() as Promise<Record<string, string[]>>,
          spriteRes.text(),
        ]);

        if (cancelled) return;

        const names = Object.keys(tagsData).sort();

        const parser = new DOMParser();
        const doc = parser.parseFromString(spriteText, "image/svg+xml");

        const allIcons: IconData[] = [];

        for (const kebab of names) {
          const symbol = doc.getElementById(kebab);
          if (!symbol) continue;
          const viewBox = symbol.getAttribute("viewBox") || "0 0 24 24";
          const inner = symbol.innerHTML;
          const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
          const tags = tagsData[kebab] || [];
          allIcons.push({
            name: kebab,
            pascal: toPascalCase(kebab),
            svg,
            category: tags[0] || "other",
          });
        }

        setIcons(allIcons);
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError(true);
          loadFallback();
        }
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  const loadFallback = () => {
    const popular = ["alert-circle","alert-triangle","arrow-down","arrow-left","arrow-right","arrow-up","at-sign","award","bell","bold","book-open","bookmark","calendar","camera","check","check-circle","chevron-down","chevron-left","chevron-right","chevron-up","circle","clipboard","clock","cloud","code-2","columns","command","compass","copy","cpu","credit-card","database","download","edit","eye","eye-off","external-link","feather","file-text","filter","fire","flag","folder","gift","globe","grid-3x3","hash","heart","help-circle","home","image","inbox","info","italic","link","list","lock","log-in","log-out","mail","map-pin","medal","menu","message-circle","message-square","mic","minus","monitor","moon","more-horizontal","more-vertical","music","palette","paperclip","pause","pen-tool","phone","pie-chart","play","plus","printer","refresh-cw","repeat","rocket","rows","search","send","server","settings","share-2","shopping-cart","shuffle","smartphone","square","star","sun","tablet","tag","target","terminal","thumbs-up","trash-2","trending-up","trophy","type","underline","unlock","upload","user","user-check","user-plus","users","volume-2","wifi","x","x-circle","zap"];
    setIcons(popular.map((kebab) => ({ name: kebab, pascal: toPascalCase(kebab), svg: "", category: "popular" })));
    setLoading(false);
  };

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

  const copySvgCode = (svg: string) => {
    navigator.clipboard.writeText(svg);
    toast.success("SVG code copied!");
  };

  const downloadSvg = (ico: IconData) => {
    const blob = new Blob([ico.svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${ico.name}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${ico.name}.svg downloaded!`);
  };

  const copyName = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  const handleIconClick = useCallback((name: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSelectedIcon(name);
    setPopupPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return icons;
    return icons.filter((ico) => ico.pascal.toLowerCase().includes(q) || ico.name.includes(q) || ico.category.includes(q));
  }, [search, icons]);

  const grouped = useMemo(() => {
    const map = new Map<string, IconData[]>();
    for (const ico of filtered) {
      const list = map.get(ico.category);
      if (list) list.push(ico);
      else map.set(ico.category, [ico]);
    }
    return Array.from(map.entries()).sort(([a], [b]) => {
      const order = ["arrows", "accessibility", "animals", "brands", "buildings", "charts", "communication", "connectivity", "content", "currency", "date-time", "design", "development", "devices", "editing", "education", "files", "finance", "food-beverage", "gaming", "gender", "geography", "health", "household", "layout", "logout", "mail", "maps", "media", "medical", "money", "multimedia", "music", "nature", "navigation", "notifications", "numbers", "photos", "religion", "science", "security", "shapes", "shopping", "social", "sports", "text", "toggle", "transportation", "travel", "users", "weather", "other"];
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [filtered]);

  const selected = icons.find((i) => i.name === selectedIcon);

  const categoryLabel = (key: string) => {
    const labels: Record<string, string> = {
      accessibility: "Accessibility", animals: "Animals", arrows: "Arrows",
      brands: "Brands", buildings: "Buildings", charts: "Charts",
      communication: "Communication", connectivity: "Connectivity",
      content: "Content", "date-time": "Date & Time", design: "Design",
      development: "Development", devices: "Devices", editing: "Editing",
      education: "Education", files: "Files", finance: "Finance",
      "food-beverage": "Food & Drink", gaming: "Gaming", gender: "Gender",
      geography: "Geography", health: "Health", household: "Household",
      layout: "Layout", mail: "Mail", maps: "Maps", media: "Media",
      medical: "Medical", money: "Money", multimedia: "Multimedia",
      music: "Music", nature: "Nature", navigation: "Navigation",
      notifications: "Notifications", numbers: "Numbers",
      photos: "Photos", religion: "Religion", science: "Science",
      security: "Security", shapes: "Shapes", shopping: "Shopping",
      social: "Social Media", sports: "Sports", text: "Text",
      toggle: "Toggle", transportation: "Transportation",
      travel: "Travel", users: "Users", weather: "Weather",
      other: "Other",
    };
    return labels[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, " ");
  };

  if (error && !loading) {
    return (
      <div className="py-16 px-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">🎨 Lucide Icons</h1>
        <p className="text-white/50">Could not load icons. Using fallback list.</p>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-16 px-3 sm:px-4 lg:px-8">
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
            placeholder={loading ? "Loading..." : `Search ${icons.length} icons...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-white/40 focus:outline-none focus:border-cyan-400/50"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-white/40 hover:text-white" />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="max-w-6xl mx-auto text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white/40 text-sm">Loading {">"} 1,700 icons...</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-10">
          {grouped.map(([category, categoryIcons]) => (
            <section key={category}>
              <h2 className="text-lg font-bold text-white/80 mb-3 sticky top-0 bg-[#0a0a1a]/90 backdrop-blur z-30 py-2 border-b border-white/10">
                {categoryLabel(category)}
                <span className="text-white/30 font-normal text-sm ml-2">({categoryIcons.length})</span>
              </h2>
              <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 xl:grid-cols-16 gap-1.5">
                {categoryIcons.map((ico) => (
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
                    <span className="w-5 h-5 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-white" dangerouslySetInnerHTML={{ __html: ico.svg }} />
                    <span className="text-[9px] text-white/50 truncate w-full text-center leading-tight">{ico.pascal}</span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {selectedIcon && selected && popupPos && (
        <div
          ref={popupRef}
          style={{ top: popupPos.top, left: popupPos.left }}
          className="fixed z-50 -translate-x-1/2"
        >
          <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-5 shadow-2xl border border-gray-700 min-w-[220px]">
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-700">
              <span className="w-8 h-8 text-cyan-400 [&>svg]:w-8 [&>svg]:h-8" dangerouslySetInnerHTML={{ __html: selected.svg }} />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{selected.pascal}</p>
                <p className="text-[10px] text-gray-400 truncate">{selectedIcon}.svg</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <button onClick={() => copySvgCode(selected.svg)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors w-full text-left">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span>Copy SVG</span>
              </button>
              <button onClick={() => copyReact(selected.pascal)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors w-full text-left">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                <span>Copy JSX</span>
              </button>
              <button onClick={() => downloadSvg(selected)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors w-full text-left">
                <Download className="w-4 h-4" />
                <span>Download SVG</span>
              </button>
              <div className="border-t border-gray-700 my-1" />
              <button onClick={() => copyName(selected.pascal)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors w-full text-left">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span>Copy &quot;{selected.pascal}&quot;</span>
              </button>
              <button onClick={() => copyName(selectedIcon)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors w-full text-left">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span>Copy &quot;{selectedIcon}&quot;</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
