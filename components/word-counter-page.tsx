"use client";

import { useState, useMemo } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim()
      ? text.trim().split(/\s+/).filter(Boolean).length
      : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const lines = text ? text.split("\n").length : 0;
    const sentences = text
      ? text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
      : 0;
    const paragraphs = text
      ? text.split("\n\n").filter((p) => p.trim().length > 0).length
      : 0;
    return { words, chars, charsNoSpace, lines, sentences, paragraphs };
  }, [text]);

  const readingTime = Math.max(1, Math.round(stats.words / 200));
  const speakingTime = Math.max(1, Math.round(stats.words / 150));

  const copyStats = () => {
    const statText = `Words: ${stats.words}\nCharacters: ${stats.chars}\nCharacters (no space): ${stats.charsNoSpace}\nLines: ${stats.lines}\nSentences: ${stats.sentences}\nParagraphs: ${stats.paragraphs}\nReading Time: ${readingTime} min\nSpeaking Time: ${speakingTime} min`;
    navigator.clipboard.writeText(statText);
    toast.success("Stats copied!");
  };

  return (
    <div className="min-h-screen py-10 md:py-20 px-3 sm:px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Word Counter
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto">
            Count words, characters, sentences, paragraphs, and reading time. Free online word counter for writers and students.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="min-h-[200px] text-base resize-none bg-white/95 dark:bg-black/60 border-2 border-cyan-400/60 text-foreground rounded-xl font-medium"
          />

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-center">
              <div className="text-2xl font-bold text-white">{stats.words}</div>
              <div className="text-xs text-white/50">Words</div>
            </div>
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-center">
              <div className="text-2xl font-bold text-white">{stats.chars}</div>
              <div className="text-xs text-white/50">Characters</div>
            </div>
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-center">
              <div className="text-2xl font-bold text-white">{stats.charsNoSpace}</div>
              <div className="text-xs text-white/50">No spaces</div>
            </div>
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-center">
              <div className="text-2xl font-bold text-white">{stats.lines}</div>
              <div className="text-xs text-white/50">Lines</div>
            </div>
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-center">
              <div className="text-2xl font-bold text-white">{stats.sentences}</div>
              <div className="text-xs text-white/50">Sentences</div>
            </div>
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-center">
              <div className="text-2xl font-bold text-white">{stats.paragraphs}</div>
              <div className="text-xs text-white/50">Paragraphs</div>
            </div>
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-center">
              <div className="text-2xl font-bold text-white">{readingTime} min</div>
              <div className="text-xs text-white/50">Reading time</div>
            </div>
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-center">
              <div className="text-2xl font-bold text-white">{speakingTime} min</div>
              <div className="text-xs text-white/50">Speaking time</div>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={() => { setText(""); }}
              className="px-5 py-2.5 rounded-lg bg-white/10 text-white/70 text-sm hover:bg-white/20 transition-all"
            >
              Clear
            </button>
            <button
              onClick={copyStats}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-white/10 text-white/70 text-sm hover:bg-white/20 transition-all"
            >
              <Copy className="w-3.5 h-3.5" /> Copy stats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
