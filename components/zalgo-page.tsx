"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const zalgoUp = [
  "\u030d", "\u030e", "\u0304", "\u0305", "\u033f", "\u0311", "\u0306", "\u0310",
  "\u0352", "\u0357", "\u0351", "\u0307", "\u0308", "\u030a", "\u0342", "\u0343",
  "\u0344", "\u034a", "\u034b", "\u034c", "\u0303", "\u0302", "\u030c", "\u0350",
  "\u0300", "\u0301", "\u030b", "\u030f", "\u0312", "\u0313", "\u0314", "\u0333",
  "\u032e", "\u032f", "\u0330", "\u0332", "\u0331", "\u0348",
];

const zalgoDown = [
  "\u0316", "\u0317", "\u0318", "\u0319", "\u031c", "\u031d", "\u031e", "\u031f",
  "\u0320", "\u0324", "\u0325", "\u0326", "\u0327", "\u0328", "\u0329", "\u032a",
  "\u032b", "\u032c", "\u032d", "\u0334", "\u0335", "\u0336", "\u0339", "\u033a",
  "\u033b", "\u033c", "\u0346", "\u0347", "\u0348", "\u0349", "\u034d", "\u034e",
  "\u0353", "\u0354", "\u0355", "\u0356", "\u0359", "\u035a", "\u0323",
];

function randomChar(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function toZalgo(text: string, intensity: number): string {
  return text
    .split("")
    .map((char) => {
      if (char === " " || char === "\n") return char;
      let result = char;
      for (let i = 0; i < intensity; i++) {
        if (Math.random() > 0.5) result += randomChar(zalgoUp);
        if (Math.random() > 0.6) result += randomChar(zalgoDown);
      }
      return result;
    })
    .join("");
}

export function ZalgoPage() {
  const [text, setText] = useState("Type your text here");
  const [intensity, setIntensity] = useState(3);
  const [copied, setCopied] = useState(false);

  const result = toZalgo(text, intensity);

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen py-10 md:py-20 px-3 sm:px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Z̴a̴l̴g̴o̴ T̴e̴x̴t̴ G̴e̴n̴e̴r̴a̴t̴o̴r̴
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto">
            Create creepy glitch text with Zalgo characters. Perfect for horror usernames, creepy bios, and spooky content.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px] text-xl resize-none bg-white/95 dark:bg-black/60 border-2 border-cyan-400/60 text-foreground rounded-xl text-center font-medium"
          />

          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="text-white/70 text-sm">Intensity:</span>
            <input
              type="range"
              min={1}
              max={8}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-40"
            />
            <span className="text-white font-bold text-sm">{intensity}</span>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Result:</span>
              <button
                onClick={copy}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium hover:scale-105 transition-transform"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="p-5 rounded-xl bg-black/40 border border-white/10 text-2xl text-white text-center break-words min-h-[70px] flex items-center justify-center">
              {text ? (
                <span className="max-w-full">{result}</span>
              ) : (
                <span className="text-white/30">Enter text above</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {["Instagram", "TikTok", "Discord", "Twitter", "WhatsApp", "Reddit"].map((p) => (
            <button
              key={p}
              onClick={() => { navigator.clipboard.writeText(result); toast.success(`Copied for ${p}!`); }}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/20 text-white/70 hover:text-white text-sm transition-all"
            >
              Use on {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
