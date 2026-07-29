"use client";

import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const prefixes = ["xX", "Mr", "Mrs", "Lil", "Big", "Pro", "Ultra", "Mega", "Super", "Dark", "Lord", "King", "Queen", "Xx_", "xx", "just", "i_am", "its"];
const suffixes = ["Xx", "_YT", "_OP", "_pro", "_gaming", "_plays", "_MC", "_ff", "_br", "_live", "YT", "OP", "2000", "69", "420", "XD", "_xX", "xX", "ツ", "☠", "_"];
const adjectives = ["Shadow", "Crimson", "Ghost", "Night", "Frost", "Storm", "Blaze", "Dark", "Ice", "Fire", "Thunder", "Neon", "Cyber", "Venom", "Crystal", "Lunar", "Solar", "Chaos", "Omega", "Alpha", "Phantom", "Viper", "Pixel", "Arcade", "Cosmic", "Raven", "Wolf", "Savage", "Elite", "Ninja"];
const nouns = ["Warrior", "Knight", "Dragon", "Hunter", "Wizard", "Tiger", "Falcon", "Assassin", "Legend", "Ranger", "Wolf", "Phoenix", "Demon", "Angel", "Ninja", "Samurai", "Viking", "Ghost", "Storm", "Wraith", "Reaper", "Slayer", "Beast", "Sentinel", "Guardian", "Monarch"];

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generate(base: string, count: number): string[] {
  const results: string[] = [];
  for (let i = 0; i < count; i++) {
    const pattern = Math.floor(Math.random() * 6);
    let name = base;
    switch (pattern) {
      case 0: name = `${random(prefixes)}_${base}_${random(suffixes)}`; break;
      case 1: name = `${random(adjectives)}${base}`; break;
      case 2: name = `${base}${random(nouns)}`; break;
      case 3: name = `${random(prefixes)}${base}${Math.floor(Math.random() * 9999)}`; break;
      case 4: name = `_${random(adjectives)}_${base}_`; break;
      case 5: name = `${base}_${Math.floor(Math.random() * 9999)}`; break;
    }
    results.push(name);
  }
  return results;
}

export function NicknamePage() {
  const [text, setText] = useState("player");
  const [count, setCount] = useState(10);

  const names = generate(text.trim() || "player", count);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const copyOne = (name: string, index: number) => {
    navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    toast.success("Copied!");
    setTimeout(() => setCopiedIndex(null), 1000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(names.join("\n"));
    setCopiedAll(true);
    toast.success("All copied!");
    setTimeout(() => setCopiedAll(false), 1500);
  };

  return (
    <div className="min-h-screen py-10 md:py-20 px-3 sm:px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Nickname Generator
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto">
            Create unique gaming usernames, Instagram handles, and cool nicknames. Generate hundreds of ideas instantly.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-xs text-white/50 mb-1 block">Base word:</label>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/95 dark:bg-black/60 border-2 border-cyan-400/60 text-foreground text-lg font-medium outline-none"
              />
            </div>
            <div className="w-full sm:w-28">
              <label className="text-xs text-white/50 mb-1 block">Count:</label>
              <input
                type="number"
                min={5}
                max={50}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white/95 dark:bg-black/60 border-2 border-cyan-400/60 text-foreground text-lg font-medium outline-none"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {
                setCopiedIndex(null);
                setCopiedAll(false);
                const el = document.getElementById("nickname-list");
                if (el) el.style.opacity = "0.5";
                setTimeout(() => { if (el) el.style.opacity = "1"; }, 300);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:scale-105 transition-transform"
            >
              <RefreshCw className="w-4 h-4" /> Regenerate
            </button>
          </div>

          <div id="nickname-list" className="mt-6 transition-opacity duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Generated names:</span>
              <button
                onClick={copyAll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-xs hover:bg-white/20 transition-all"
              >
                <Copy className="w-3 h-3" />
                {copiedAll ? "All copied!" : "Copy all"}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {names.map((name, i) => (
                <div
                  key={i}
                  onClick={() => copyOne(name, i)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white hover:border-cyan-400/50 cursor-pointer transition-all gap-2"
                >
                  <span className="font-mono text-sm truncate">{name}</span>
                  <Copy className={`w-3 h-3 shrink-0 ${copiedIndex === i ? "text-cyan-400" : "text-white/30"}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
