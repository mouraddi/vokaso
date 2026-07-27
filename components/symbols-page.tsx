"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
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
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copySymbol = async (symbol: string, index: number) => {
    try {
      await navigator.clipboard.writeText(symbol);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const copyAll = async () => {
    const text = selectedSymbols.join("");
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied all selected symbols!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="py-8 md:py-16 px-3 sm:px-4 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          ✨ Symbol & Decoration Library
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Browse and copy beautiful symbols, emojis, and decorations
        </p>
      </div>

      {selectedSymbols.length > 0 && (
        <Card className="p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 backdrop-blur-xl mb-8">
          <div className="text-center">
            <h3 className="text-white font-medium mb-3">Selected Symbols:</h3>
            <p className="text-3xl mb-4">{selectedSymbols.join(" ")}</p>
            <div className="flex justify-center gap-3">
              <Button onClick={copyAll} className="bg-purple-500 hover:bg-purple-400 text-white">
                <Copy className="w-4 h-4 mr-2" /> Copy All
              </Button>
              <Button variant="outline" onClick={() => setSelectedSymbols([])} className="border-white/30 text-white hover:bg-white/10">
                Clear
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="max-w-6xl mx-auto space-y-10">
        {symbolLibraries.map((library) => (
          <div key={library.name}>
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              {library.category === "arrows" && "➡️"}
              {library.category === "separators" && "❦"}
              {library.category === "decorations" && "🎨"}
              {library.category === "emojis" && "😊"}
              {library.category === "borders" && "▣"}
              {library.name}
            </h2>
            <p className="text-white/60 text-sm mb-3">{library.description}</p>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-14 gap-2">
              {library.symbols.map((symbol, i) => {
                const globalIndex = symbolLibraries.indexOf(library) * 100 + i;
                const isSelected = selectedSymbols.includes(symbol);
                const isCopied = copiedIndex === globalIndex;

                return (
                  <div key={`${library.name}-${i}`} className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => {
                        if (isSelected) {
                          setSelectedSymbols(selectedSymbols.filter((s) => s !== symbol));
                        } else {
                          setSelectedSymbols([...selectedSymbols, symbol]);
                        }
                      }}
                      className={cn(
                        "h-12 w-12 text-lg rounded-lg transition-all duration-200",
                        isSelected
                          ? "bg-purple-500/50 border-2 border-purple-300"
                          : "bg-white/10 hover:bg-white/20 border border-white/20 hover:border-purple-400/50",
                      )}
                    >
                      {symbol}
                    </button>
                    <button
                      onClick={() => copySymbol(symbol, globalIndex)}
                      className="text-xs text-white/40 hover:text-cyan-300 transition-colors"
                    >
                      {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
