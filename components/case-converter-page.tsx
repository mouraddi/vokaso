"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

type Case = "upper" | "lower" | "title" | "sentence" | "toggle" | "alternating" | "inverse" | "camel" | "snake" | "kebab";

const cases: { key: Case; label: string; suffix: string }[] = [
  { key: "upper", label: "UPPERCASE", suffix: "ALL CAPS" },
  { key: "lower", label: "lowercase", suffix: "all lower" },
  { key: "title", label: "Title Case", suffix: "Capitalize Each Word" },
  { key: "sentence", label: "Sentence case", suffix: "First letter only" },
  { key: "toggle", label: "tOGGLE cASE", suffix: "Flip case" },
  { key: "alternating", label: "AlTeRnAtInG", suffix: "SpongeBob meme" },
  { key: "inverse", label: "Inverse Case", suffix: "Reverse each char" },
  { key: "camel", label: "camelCase", suffix: "removeSpaces" },
  { key: "snake", label: "snake_case", suffix: "underscore_separated" },
  { key: "kebab", label: "kebab-case", suffix: "hyphen-separated" },
];

function convert(text: string, type: Case): string {
  switch (type) {
    case "upper": return text.toUpperCase();
    case "lower": return text.toLowerCase();
    case "title": return text.replace(/\b\w/g, (c) => c.toUpperCase());
    case "sentence": return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case "toggle": return text.split("").map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
    case "alternating": return text.split("").map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join("");
    case "inverse": return text.split("").reverse().map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
    case "camel": return text.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+(.)/g, (_, c) => c.toUpperCase()).replace(/^./, (c) => c.toLowerCase());
    case "snake": return text.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_").toLowerCase();
    case "kebab": return text.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "-").toLowerCase();
  }
}

export function CaseConverterPage() {
  const [text, setText] = useState("Type or paste your text here");
  const [active, setActive] = useState<Case>("upper");
  const [copied, setCopied] = useState(false);

  const result = convert(text, active);

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
            Case Converter
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto">
            Convert text between uppercase, lowercase, title case, camelCase, snake_case, and more. Free online case converter.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px] text-xl resize-none bg-white/95 dark:bg-black/60 border-2 border-cyan-400/60 text-foreground rounded-xl text-center font-medium"
          />

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {cases.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                  active === c.key
                    ? "bg-cyan-500 text-white border-cyan-400"
                    : "bg-white/5 text-white/70 border-white/10 hover:bg-white/15"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Result ({cases.find((c) => c.key === active)?.suffix}):</span>
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
      </div>
    </div>
  );
}
