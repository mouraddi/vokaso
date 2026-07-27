"use client";

import { Check, Copy, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SymbolLibrary {
  name: string;
  category: "arrows" | "separators" | "decorations" | "emojis" | "borders";
  symbols: string[];
  description: string;
}

const symbolLibraries: SymbolLibrary[] = [
  {
    name: "Elegant Arrows",
    category: "arrows",
    symbols: ["→","⇒","⟶","⟹","➜","➤","➡","⇢","↗","↘","↙","↖","↑","↓","←","↕","↔","⇅","⇆"],
    description: "Beautiful arrow symbols for decoration and direction",
  },
  {
    name: "Decorative Separators",
    category: "separators",
    symbols: ["❦","❧","✦","✧","★","☆","✪","✫","✬","✭","✮","✯","✰","❀","❁","❂","❃","❄","❅","❆","❇","❈","❉","❊","❋"],
    description: "Ornate divider symbols perfect for text separation",
  },
  {
    name: "Script Dividers",
    category: "separators",
    symbols: ["∼","∿","≈","≋","≃","≅","≈","≡","≠","≤","≥","≪","≫","∝","∼","∽","≅","≈","≡"],
    description: "Curved and script-style line separators",
  },
  {
    name: "Border Frames",
    category: "borders",
    symbols: ["┌─┐","│ │","└─┘","╔═╗","║ ║","╚═╝","┌─┬─┐","├─┼─┤","└─┴─┘","╔═╦═╗","╠═╬═╣","╚═╩═╝","╔╗","╠╣","╚╝"],
    description: "Frame and border elements for text boxes",
  },
  {
    name: "Heart Collection",
    category: "emojis",
    symbols: ["♥","♡","❤","❥","💖","💗","💓","💕","💘","💙","💚","💛","💜","💝","💞","💟","🧡","🤍","🖤","❤️"],
    description: "Various heart symbols for romantic and friendly decoration",
  },
  {
    name: "Star Collection",
    category: "emojis",
    symbols: ["★","☆","✦","✧","✩","✪","✫","✬","✭","✮","✯","✰","⭐","🌟","✨","💫","🌠","✴"],
    description: "Starry symbols for magical and decorative effects",
  },
  {
    name: "Floral Ornaments",
    category: "decorations",
    symbols: ["❀","❁","❂","❃","❄","❅","❆","❇","❈","❉","❊","❋","❦","❧","❢","❣"],
    description: "Floral and botanical decorative elements",
  },
  {
    name: "Geometric Shapes",
    category: "decorations",
    symbols: ["◆","◇","◈","◉","●","○","▲","△","▼","▽","■","□","▬","▭","▪","▫","◊","◌","◍","◐","◑","◒","◓"],
    description: "Geometric shapes for modern decorative effects",
  },
];

export function SymbolsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);

  const allSymbols = useMemo(() => {
    const flat: { symbol: string; library: string; category: string }[] = [];
    for (const lib of symbolLibraries) {
      for (const sym of lib.symbols) {
        flat.push({ symbol: sym, library: lib.name, category: lib.category });
      }
    }
    return flat;
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return allSymbols;
    return allSymbols.filter(
      (s) => s.library.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    );
  }, [search, allSymbols]);

  const toggleSymbol = (sym: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(sym)) next.delete(sym);
      else next.add(sym);
      return next;
    });
  };

  const copySymbol = async (sym: string) => {
    await navigator.clipboard.writeText(sym);
    setCopied(sym);
    toast.success(`Copied!`);
    setTimeout(() => setCopied(null), 1000);
  };

  const copySelected = async () => {
    const text = Array.from(selected).join(" ");
    if (!text) return;
    await navigator.clipboard.writeText(text);
    toast.success(`Copied ${selected.size} symbols!`);
  };

  return (
    <div className="py-8 md:py-16 px-3 sm:px-4 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2">✨ Symbols & Emojis</h1>
        <p className="text-base text-white/70">Unicode symbols, emojis, and decorations — click to copy</p>
      </div>

      <div className="max-w-6xl mx-auto mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${allSymbols.length} symbols...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-white/40 focus:outline-none focus:border-cyan-400/50"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-white/40 hover:text-white" />
            </button>
          )}
        </div>
      </div>

      {selected.size > 0 && (
        <div className="max-w-6xl mx-auto mb-6">
          <Card className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 backdrop-blur-xl text-center">
            <p className="text-2xl mb-3">{Array.from(selected).join(" ")}</p>
            <div className="flex justify-center gap-2">
              <Button onClick={copySelected} size="sm" className="bg-purple-500 hover:bg-purple-400 text-white text-xs">
                <Copy className="w-3 h-3 mr-1" /> Copy Selected ({selected.size})
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelected(new Set())} className="border-white/30 text-white hover:bg-white/10 text-xs">
                Clear
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        {search ? (
          <div>
            <p className="text-white/50 text-sm mb-3">{filtered.length} symbols found</p>
            <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-16 gap-1.5">
              {filtered.map((item, i) => (
                <button
                  key={`${item.symbol}-${i}`}
                  onClick={() => { copySymbol(item.symbol); toggleSymbol(item.symbol); }}
                  className={cn(
                    "h-10 w-10 text-lg rounded-lg transition-all flex items-center justify-center",
                    selected.has(item.symbol)
                      ? "bg-purple-500/50 ring-1 ring-purple-300"
                      : "bg-white/10 hover:bg-white/20 ring-0 hover:ring-1 ring-white/20",
                  )}
                  title={`${item.symbol} - ${item.library}`}
                >
                  {copied === item.symbol ? <Check className="w-4 h-4 text-green-400" /> : item.symbol}
                </button>
              ))}
            </div>
          </div>
        ) : (
          symbolLibraries.map((library) => (
            <div key={library.name}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">
                  {library.category === "arrows" && "➡️"}
                  {library.category === "separators" && "❦"}
                  {library.category === "decorations" && "🎨"}
                  {library.category === "emojis" && "😊"}
                  {library.category === "borders" && "▣"}
                </span>
                <h2 className="text-lg font-bold text-white">{library.name}</h2>
                <span className="text-[10px] text-white/40">({library.symbols.length})</span>
              </div>
              <p className="text-white/50 text-xs mb-2">{library.description}</p>
              <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-16 gap-1.5">
                {library.symbols.map((symbol, i) => (
                  <button
                    key={`${library.name}-${i}`}
                    onClick={() => { copySymbol(symbol); toggleSymbol(symbol); }}
                    className={cn(
                      "h-10 w-10 text-lg rounded-lg transition-all flex items-center justify-center",
                      selected.has(symbol)
                        ? "bg-purple-500/50 ring-1 ring-purple-300"
                        : "bg-white/10 hover:bg-white/20 ring-0 hover:ring-1 ring-white/20",
                    )}
                    title={`${symbol} - ${library.name}`}
                  >
                    {copied === symbol ? <Check className="w-4 h-4 text-green-400" /> : symbol}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
