"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

type Category = "aesthetic" | "love" | "funny" | "gaming" | "business" | "sad" | "baddie" | "friendship";

interface Bio {
  text: string;
  emoji: string;
}

const categories: { key: Category; label: string }[] = [
  { key: "aesthetic", label: "Aesthetic" },
  { key: "love", label: "Love" },
  { key: "funny", label: "Funny" },
  { key: "gaming", label: "Gaming" },
  { key: "business", label: "Business" },
  { key: "sad", label: "Sad" },
  { key: "baddie", label: "Baddie" },
  { key: "friendship", label: "Friendship" },
];

const bios: Record<Category, Bio[]> = {
  aesthetic: [
    { text: "✨ chasing sunsets and good vibes", emoji: "🌅" },
    { text: "🌙 aesthetic soul. simple life.", emoji: "🕊️" },
    { text: "🎧 lost in music, found in dreams", emoji: "🎶" },
    { text: "🌸 be a voice, not an echo", emoji: "💫" },
    { text: "☕ coffee, books, and slow mornings", emoji: "📖" },
    { text: "🌿 living my soft girl era", emoji: "🫧" },
    { text: "📸 capturing little moments", emoji: "🎞️" },
    { text: "🕯️ calm mind. kind heart.", emoji: "🤍" },
  ],
  love: [
    { text: "💖 taken by the best", emoji: "🥰" },
    { text: "🌹 head over heels in love", emoji: "💕" },
    { text: "💑 my favorite notification is your name", emoji: "💌" },
    { text: "💗 you. always you.", emoji: "💝" },
    { text: "💘 crazy in love with my best friend", emoji: "💞" },
    { text: "💍 future mrs. someone 🥹", emoji: "💎" },
  ],
  funny: [
    { text: "🤡 professional overthinker", emoji: "🧠" },
    { text: "🫠 running on coffee and chaos", emoji: "☕" },
    { text: "😭 my bank account: 🥬", emoji: "💸" },
    { text: "🤣 I speak fluent sarcasm", emoji: "🗣️" },
    { text: "🫡 I put the 'fun' in dysfunctional", emoji: "🎭" },
    { text: "🥴 99% problem, 1% solution", emoji: "💀" },
    { text: "😅 too lazy to write a bio", emoji: "🛌" },
    { text: "💅 main character? no. background character with main character energy?", emoji: "✨" },
  ],
  gaming: [
    { text: "🎮 gamer since day one", emoji: "🕹️" },
    { text: "🖥️ keyboard warrior irl", emoji: "⌨️" },
    { text: "🎯 headshot or nothing", emoji: "🔫" },
    { text: "🏆 trying to be the protagonist of my life", emoji: "🎲" },
    { text: "👾 noob by choice, pro by heart", emoji: "💻" },
    { text: "⚔️ respawn. repeat.", emoji: "♾️" },
  ],
  business: [
    { text: "💼 entrepreneur in progress", emoji: "📈" },
    { text: "🚀 building the dream, one step at a time", emoji: "💡" },
    { text: "📊 CEO of my own life", emoji: "👔" },
    { text: "💰 mindset over everything", emoji: "🧠" },
    { text: "🤝 let's connect and grow together", emoji: "🌐" },
    { text: "🎯 focus. hustle. repeat.", emoji: "🔥" },
  ],
  sad: [
    { text: "💔 healing in silence", emoji: "🕊️" },
    { text: "🥀 tired of pretending I'm okay", emoji: "🌧️" },
    { text: "🌑 nights are harder than they look", emoji: "💭" },
    { text: "💧 it is what it is", emoji: "🫂" },
    { text: "🖤 broken but still breathing", emoji: "💨" },
  ],
  baddie: [
    { text: "💅 too glam to give a damn", emoji: "💋" },
    { text: "👑 royalty with a rebel soul", emoji: "🔥" },
    { text: "💄 boss. baddie. legend.", emoji: "💎" },
    { text: "😌 i don't chase. i attract.", emoji: "✨" },
    { text: "🫦 unbothered. moisturized. happy.", emoji: "🌴" },
  ],
  friendship: [
    { text: "👯 squad goals since day 1", emoji: "💕" },
    { text: "🤝 friends who slay together, stay together", emoji: "💅" },
    { text: "🫶 my ride or die crew", emoji: "👭" },
    { text: "🥂 to the friends who feel like family", emoji: "✨" },
  ],
};

export function InstagramBioPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("aesthetic");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const currentBios = bios[category];

  const buildBio = (bio: Bio) => {
    let result = bio.text;
    if (name.trim()) {
      result = `${name.trim()} | ${result}`;
    }
    return result;
  };

  const copy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Bio copied!");
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="min-h-screen py-10 md:py-20 px-3 sm:px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Instagram Bio Generator
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto">
            100+ pre-written Instagram bio templates. Aesthetic, cute, funny, gaming, and more. Copy and paste in seconds.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8">
          <div className="mb-6">
            <label className="text-xs text-white/50 mb-1 block">Your name (optional):</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sarah"
              className="w-full px-4 py-3 rounded-xl bg-white/95 dark:bg-black/60 border-2 border-cyan-400/60 text-foreground text-lg font-medium outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  category === c.key
                    ? "bg-cyan-500 text-white shadow-lg"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {currentBios.map((bio, i) => {
              const full = buildBio(bio);
              return (
                <div
                  key={i}
                  onClick={() => copy(full, i)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-black/30 border border-white/10 text-white hover:border-cyan-400/50 cursor-pointer transition-all gap-3"
                >
                  <span className="text-sm sm:text-base leading-relaxed">
                    <span className="mr-2">{bio.emoji}</span>
                    {full}
                  </span>
                  <Copy className={`w-4 h-4 shrink-0 ${copiedIndex === i ? "text-cyan-400" : "text-white/30"}`} />
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          Click any bio to copy. Paste directly into your Instagram profile.
        </p>
      </div>
    </div>
  );
}
