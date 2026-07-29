"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const emojiMap: Record<string, string> = {
  heart: "❤️",
  love: "💖",
  like: "👍",
  smile: "😊",
  happy: "😄",
  sad: "😢",
  cry: "😭",
  angry: "😡",
  fire: "🔥",
  cool: "😎",
  wow: "😱",
  ok: "👌",
  yes: "✅",
  no: "❌",
  star: "⭐",
  moon: "🌙",
  sun: "☀️",
  rain: "🌧️",
  snow: "❄️",
  music: "🎵",
  party: "🎉",
  gift: "🎁",
  food: "🍕",
  pizza: "🍕",
  coffee: "☕",
  tea: "🫖",
  cake: "🎂",
  fruit: "🍎",
  apple: "🍎",
  cat: "🐱",
  dog: "🐶",
  bird: "🐦",
  fish: "🐟",
  flower: "🌸",
  tree: "🌳",
  book: "📖",
  phone: "📱",
  computer: "💻",
  game: "🎮",
  run: "🏃",
  sleep: "😴",
  eat: "🍽️",
  drink: "🥤",
  car: "🚗",
  plane: "✈️",
  rocket: "🚀",
  crown: "👑",
  diamond: "💎",
  king: "🤴",
  queen: "👸",
  angel: "😇",
  devil: "😈",
  ghost: "👻",
  unicorn: "🦄",
  rainbow: "🌈",
  butterfly: "🦋",
  money: "💰",
  time: "⏰",
  world: "🌍",
  eye: "👁️",
  hand: "✋",
  finger: "☝️",
  baby: "👶",
  family: "👨‍👩‍👧‍👦",
  friend: "🤝",
  best: "🏆",
  win: "🥇",
  lose: "💔",
  hope: "🙏",
  pray: "🙏",
  thanks: "🙏",
  please: "🥺",
  sorry: "😔",
  hello: "👋",
  bye: "✌️",
  yes: "✅",
  no: "❌",
  up: "⬆️",
  down: "⬇️",
  left: "⬅️",
  right: "➡️",
};

function textToEmoji(text: string): string {
  let result = text;
  const sorted = Object.entries(emojiMap).sort((a, b) => b[0].length - a[0].length);
  sorted.forEach(([word, emoji]) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    result = result.replace(regex, `${emoji}`);
  });
  return result;
}

export function EmojiTextPage() {
  const [text, setText] = useState("I love my best friend. Happy birthday! You are the best.");
  const [copied, setCopied] = useState(false);

  const result = textToEmoji(text);

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
            Emoji Text Generator
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto">
            Convert your text into emoji-rich messages. Replace words with emojis automatically. Perfect for Instagram captions and social media.
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
              <span className="text-sm text-white/60">Emoji text:</span>
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

        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-3">Common words that get emoji:</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(emojiMap).slice(0, 30).map(([word, emoji]) => (
              <span key={word} className="px-2 py-1 rounded-md bg-white/10 text-white/70 text-xs">
                {word} {emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
