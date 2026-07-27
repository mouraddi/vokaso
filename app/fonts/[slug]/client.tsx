"use client";

import { useMemo, useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { textStyles } from "@/components/fancy-text-generator";

interface Props {
  slug: string;
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function FontPageClient({ slug }: Props) {
  const [text, setText] = useState("Type your text here");

  const style = useMemo(
    () => textStyles.find((s) => slugify(s.name) === slug),
    [slug],
  );

  const result = useMemo(
    () => (style && text ? style.transform(text) : ""),
    [style, text],
  );

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    toast.success("Copied!");
  };

  const related = useMemo(
    () => textStyles.filter((s) => slugify(s.name) !== slug).slice(0, 12),
    [slug],
  );

  if (!style) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/50">Style not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 md:py-20 px-3 sm:px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            {style.name}
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto">
            {style.description}
          </p>
          {style.useCase && (
            <p className="text-sm text-cyan-300/80 mt-2">{style.useCase}</p>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px] text-xl resize-none bg-white/95 dark:bg-black/60 border-2 border-cyan-400/60 text-foreground rounded-xl text-center font-medium"
          />

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Result:</span>
              <button
                onClick={copy}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium hover:scale-105 transition-transform"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy
              </button>
            </div>
            <div className="p-5 rounded-xl bg-black/40 border border-white/10 text-2xl text-white text-center break-words min-h-[70px] flex items-center justify-center">
              {text && result ? (
                <span className="max-w-full">{result}</span>
              ) : (
                <span className="text-white/30">Enter text above</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 p-5 rounded-xl bg-white/5 border border-white/10">
          <h2 className="text-sm font-semibold text-white/60 mb-3">Quick Paste</h2>
          <div className="flex flex-wrap gap-2">
            {["Instagram", "TikTok", "Discord", "Twitter", "WhatsApp"].map((p) => (
              <button
                key={p}
                onClick={() => { navigator.clipboard.writeText(result); toast.success(`Copied for ${p}!`); }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xs transition-all"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-bold text-white/80 mb-4">More Font Styles</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {related.map((s) => (
              <a
                key={s.name}
                href={`/fonts/${slugify(s.name)}`}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white text-xs text-center transition-all"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
