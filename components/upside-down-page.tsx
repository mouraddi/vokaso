"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const flipMap: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ɓ",
  h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "ʃ", m: "ɯ", n: "u",
  o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n",
  v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  A: "∀", B: "𐐒", C: "Ɔ", D: "◖", E: "Ǝ", F: "Ⅎ", G: "⅁",
  H: "H", I: "I", J: "ſ", K: "⋊", L: "⅂", M: "W", N: "N",
  O: "O", P: "Ԁ", Q: "Q", R: "R", S: "S", T: "⊥", U: "∩",
  V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
  "0": "0", "1": "⇂", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ",
  "5": "ϛ", "6": "9", "7": "ㄥ", "8": "8", "9": "6",
  "!": "¡", "?": "¿", ".": "˙", ",": "'", "'": ",",
  "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{",
  "<": ">", ">": "<", "&": "⅋", "_": "‾",
};

function flipText(text: string): string {
  return text
    .split("")
    .reverse()
    .map((c) => flipMap[c] || c)
    .join("");
}

export function UpsideDownPage() {
  const [text, setText] = useState("Hello, how are you?");
  const [copied, setCopied] = useState(false);

  const result = flipText(text);

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
            ˙uʍop ǝpᴉsdn xǝ⅂
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto">
            Flip text upside down. Type normally and get it flipped instantly. Perfect for funny social media posts and aesthetic usernames.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px] text-xl resize-none bg-white/95 dark:bg-black/60 border-2 border-cyan-400/60 text-foreground rounded-xl text-center font-medium"
          />

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Flipped result:</span>
              <button
                onClick={copy}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium hover:scale-105 transition-transform"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="p-5 rounded-xl bg-black/40 border border-white/10 text-2xl text-white text-center break-words min-h-[70px] flex items-center justify-center select-all">
              {text ? (
                <span className="max-w-full">{result}</span>
              ) : (
                <span className="text-white/30">Enter text above</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
