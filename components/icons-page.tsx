"use client";

import { Download, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function toPascalCase(name: string): string {
  return name.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
}

const LUCIDE_CDN = "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons";

interface IconData {
  name: string;
  pascal: string;
  svg: string;
}

export function IconsPage() {
  const [search, setSearch] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null);
  const [icons, setIcons] = useState<IconData[]>([]);
  const [loading, setLoading] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("https://cdn.jsdelivr.net/npm/lucide-static@latest/tags.json")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const names = Object.keys(data as Record<string, unknown>).sort();
        const batchSize = 100;
        const promises: Promise<void>[] = [];

        for (let start = 0; start < names.length; start += batchSize) {
          const batch = names.slice(start, start + batchSize);
          const p = Promise.allSettled(
            batch.map(async (kebab) => {
              const res = await fetch(`${LUCIDE_CDN}/${kebab}.svg`);
              if (!res.ok) throw new Error(kebab);
              const svg = await res.text();
              return { name: kebab, pascal: toPascalCase(kebab), svg } as IconData;
            })
          ).then((results) => {
            if (cancelled) return;
            const loaded: IconData[] = [];
            for (const r of results) {
              if (r.status === "fulfilled" && r.value) loaded.push(r.value);
            }
            setIcons((prev) => [...prev, ...loaded]);
          });
          promises.push(p);
        }

        Promise.allSettled(promises).then(() => { if (!cancelled) setLoading(false); });
      })
      .catch(() => {
        if (!cancelled) loadFallback();
      });

    return () => { cancelled = true; };
  }, []);

  const loadFallback = () => {
    const popular = ["alert-circle","alert-triangle","arrow-down","arrow-left","arrow-right","arrow-up","at-sign","award","bell","bold","book-open","bookmark","calendar","camera","check","check-circle","chevron-down","chevron-left","chevron-right","chevron-up","circle","clipboard","clock","cloud","code-2","columns","command","compass","copy","cpu","credit-card","database","download","edit","3d-cube-perspective","eye","eye-off","external-link","feather","file-text","filter","fire","flag","folder","gift","globe","grid-3x3","hash","heart","help-circle","home","image","inbox","info","italic","link","list","lock","log-in","log-out","mail","map-pin","medal","menu","message-circle","message-square","mic","minus","monitor","moon","more-horizontal","more-vertical","music","palette","paperclip","pause","pen-tool","phone","pie-chart","play","plus","printer","refresh-cw","repeat","rocket","rows","search","send","server","settings","share-2","shopping-cart","shuffle","smartphone","square","star","sun","tablet","tag","target","terminal","thumbs-up","trash-2","trending-up","trophy","type","underline","unlock","upload","user","user-check","user-plus","users","volume-2","wifi","x","x-circle","zap","wallet","video","umbrella","truck","tree-pine","train","ticket","thermometer","sunrise","sunset","swords","swatch-book","swap","squirrel","spray-can","sparkle","space","snowflake","smile","skull","shrimp","ship","shield","shadow","screen-share","scissors","scaling","satellite","ruler","rotate-ccw","rotate-cw","rocket","radio","quote","qr-code","puzzle","pocket","plug","plane","pizza","pin","pill","piggy-bank","pickaxe","phone-call","paw-print","party-popper","palette","package","notebook","newspaper","monitor-smartphone","milk","microwave","message-square-reply","message-square-text","megaphone","magnet","laptop","lamp","keyboard","key","italic","instagram","infinity","indent","ice-cream-bowl","ice-cream-2","hourglass","hospital","hotel","hot-air-balloon","hammer","guitar","grape","globe-2","glass-water","git-pull-request","git-merge","git-commit","git-branch","gift","gavel","gamepad-2","frame","forward","footprints","folder-open","folder-git-2","folder-git","folder-cog","folder-clock","folder-check","folder-code","folder-down","folder-heart","folder-input","folder-key","folder-lock","folder-minus","folder-output","folder-plus","folder-root","folder-search","folder-search-2","folder-symlink","folder-tree","folder-up","folder-x","fold-vertical","fold-horizontal","focus","flip-vertical-2","flip-vertical","flip-horizontal-2","flip-horizontal","flag-triangle-right","flag-triangle-left","flag-off","flag","fishing","fish-symbol","fish","fingerprint","figma","ferris-wheel","fence","feather","facebook","factory","eye-off","eye","extension","external-link","expand","eraser","equal-not","equal","epsilon","enter","eraser","euro","ellipsis","eclipse","earth","ear-off","ear","dumbbell","drill","dribbble","download-cloud","download","door-open","door-closed","donut","dog","dna","dices","dice-6","dice-5","dice-4","dice-3","dice-2","dice-1","diamond-plus","diamond-minus","diamond","diameter","delete","database-zap","database-backup","database","dash","dark-mode","curly-braces","crown","cross","credit-card","creative-commons","cpu","crop","copy-slash","copy-plus","copy-minus","copy-check","copy-x","copy","copyleft","copyright","corner-up-right","corner-up-left","corner-right-down","corner-right-up","corner-left-down","corner-left-up","copilot","cooking-pot","cookies","contact-round","contact","container","construction","cone","component","compass","columns-4","columns-3","columns-2","columns-1","columns","collapse-all","club","cloudy","cloud-sun","cloud-snow","cloud-rain-wind","cloud-rain","cloud-moon","cloud-lightning","cloud-hail","cloud-fog","cloud-drizzle","cloud-cog","cloud-off","cloud-download","cloud-upload","clock-8","clock-9","clock-10","clock-11","clock-12","clock-7","clock-6","clock-5","clock-4","clock-3","clock-2","clock-1","clock-alert","clock-arrow-down","clock-arrow-up","clock","clipboard-x","clipboard-pen","clipboard-paste","clipboard-minus","clipboard-list","clipboard-copy","clipboard-check","clipboard-type","clipboard-signature","clipboard","circle-power","circle-minus","circle-slash-2","circle-slash","circle-help","circle-gauge","circle-fading-arrow-up","circle-fading-plus","circle-ellipsis","circle-dollar-sign","circle-divide","circle-check-big","circle-check","circle-arrow-out-up-right","circle-arrow-out-up-left","circle-arrow-out-down-right","circle-arrow-out-down-left","circle-arrow-up","circle-arrow-up","circle-arrow-right","circle-arrow-left","circle-arrow-down","circle-alert","circle","church","chrome","chevrons-up-down","chevrons-up","chevrons-right","chevrons-left","chevrons-down","chevron-up","chevron-last","chevron-first","chevron-right","chevron-left","chevron-down","cherry","chef-hat","check-check","check","chart-no-axes-combined","chart-line","chart-column-increasing","chart-column-big","chart-column","chart-bar-big","chart-bar","chart-area","chart-candlestick","chart-network","chart-pie","chart-scatter","chart-spline","check","cctv","cat","case-sensitive","case-lower","case-upper","cassette-tape","caravan","carrot","car","candy-cane","candy-off","candy","camera-off","camera","cable-car","cable","cabinet","bus-front","bus","building","bug-play","bug-off","bug","brush","brick-wall","brain-circuit","brain","braces","bookmark-x","bookmark-plus","bookmark-minus","bookmark-check","bookmark","book-minus","book-plus","book-up","book-down","book-image","book-key","book-lock","book-marked","book-open-text","book-open-check","book-open","book-text","book-type","book-audio","book","bold","bomb","bone","bolt","bluetooth-searching","bluetooth-connected","bluetooth-off","bluetooth","blocks","blanket","bitcoin","bird","binoculars","binary","bike","big-text","beer-off","beer","bed-single","bed-double","bed","badge-x","badge-pound-sterling","badge-plus","badge-minus","badge-info","badge-help","badge-euro","badge-dollar-sign","badge-cent","badge-check","badge-alert","badge-russian-ruble","badge-indian-rupee","badge-japanese-yen","badge-swiss-franc","badge-percent","badge","baby","battery-medium","battery-low","battery-full","battery-charging","battery-warning","battery","baseline","bar-chart-4","bar-chart-3","bar-chart-horizontal-big","bar-chart-horizontal","ban","ballpen","barcode","battery"];
    setIcons(popular.map((kebab) => ({ name: kebab, pascal: toPascalCase(kebab), svg: "" })));
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

  const fetchSvgContent = (kebab: string): Promise<string> => {
    return fetch(`${LUCIDE_CDN}/${kebab}.svg`).then((r) => r.text());
  };

  const copyReact = (pascal: string) => {
    const code = `import { ${pascal} } from "lucide-react";\n\n<${pascal} className="w-6 h-6" />`;
    navigator.clipboard.writeText(code);
    toast.success("JSX code copied!");
  };

  const copySvgCode = async (kebab: string) => {
    const svg = await fetchSvgContent(kebab);
    navigator.clipboard.writeText(svg);
    toast.success("SVG code copied!");
  };

  const downloadSvg = async (ico: IconData) => {
    const svg = ico.svg || await fetchSvgContent(ico.name);
    const blob = new Blob([svg], { type: "image/svg+xml" });
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
    return icons.filter((ico) => ico.pascal.toLowerCase().includes(q) || ico.name.includes(q));
  }, [search, icons]);

  const selected = icons.find((i) => i.name === selectedIcon);

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

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white/40 text-sm">Loading {icons.length || "..."} icons...</p>
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
                  <span className="w-5 h-5 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-white" dangerouslySetInnerHTML={{ __html: ico.svg }} />
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
              <span className="w-8 h-8 text-cyan-400 [&>svg]:w-8 [&>svg]:h-8" dangerouslySetInnerHTML={{ __html: selected.svg }} />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{selected.pascal}</p>
                <p className="text-[10px] text-gray-400 truncate">{selectedIcon}.svg</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <button onClick={() => copySvgCode(selectedIcon)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors w-full text-left">
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
