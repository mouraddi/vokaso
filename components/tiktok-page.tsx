"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const videoIdeas = [
  {
    title: "تحويل النص العادي لـ Bold",
    script: `الشاشة: تظهر vokaso.com
تكتب: "Hello World"
تختار: Bold Text
تنسخ: 𝗛𝗲𝗹𝗹𝗼 𝗪𝗼𝗿𝗹𝗱
تلصق في bio Instagram

نص الفيديو: "تبغى تخلي بايو انستغرامك شكله حلو؟ استخدم vokaso.com يحول نصك لأكثر من 20 خط. جربه مجاناً!"`,
    hashtags: "#fancytext #instagramtips #vokaso #fontgenerator #textstyle",
    sound: "trending upbeat music",
  },
  {
    title: "اسم قيمر بالخط المربع",
    script: `الشاشة: vokaso.com
تكتب: "ProGamer"
تختار: Squared
تنسخ: 🅟🅡🅞🅖🅐🅜🅔🅡
تلصق في اسم اللعبة

نص الفيديو: "خل اسمك في اللعبة شكله احترافي 🎮 اكتب اسمك و حوله لخطوط Unicode حلوة في vokaso"`,
    hashtags: "#gaming #gamingname #fancytext #vokaso #gamertag",
    sound: "gaming bgm",
  },
  {
    title: "نصوص للـ Bio",
    script: `الشاشة: vokaso.com
تكتب: "Dream Big ✨"
تختار: Script Text
تنسخ: 𝒟𝓇𝑒𝒶𝓂 𝐵𝒾𝑔
نص الفيديو: "بايو انستغرام او تيك توك يحتاج لمسة جمالية. حول جملتك لخط Script الأنيق في vokaso.com"`,
    hashtags: "#bio #instagrambio #aesthetic #vokaso #fancytext",
    sound: "aesthetic lofi",
  },
  {
    title: "رسالة حب بالخط المزخرف",
    script: `الشاشة: vokaso.com
تكتب: "I Love You"
تختار: Hearts & Stars
تنسخ: ♥ ★ ☆ ♥

نص الفيديو: "ارسالة لشخص عزيز بخط مزخرف ♥ vokaso.com يخلي كلماتك احلى"`,
    hashtags: "#love #romantic #fancytext #vokaso #text",
    sound: "romantic piano",
  },
  {
    title: "نص مقلوب (Upside Down)",
    script: `الشاشة: vokaso.com
تكتب: "Hello"
تختار: Upside Down
تنسخ: ɐllǝɥ

نص الفيديو: "شكلك ما شفت نص مقلوب من قبل 😄 vokaso.com يعكس ويقلب النصوص. جرب تكتب اسمك!"`,
    hashtags: "#funny #fancytext #vokaso #text #upsidedown",
    sound: "funny sound effect",
  },
];

export function TiktokPage() {
  const [copied, setCopied] = useState<number | null>(null);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">TikTok Strategy</h1>
          <p className="text-white/60">5 video ideas ready to record. Post 1 video/day for 5 days.</p>
        </div>

        <div className="space-y-6">
          {videoIdeas.map((idea, i) => (
            <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-bold text-white">
                  <span className="text-cyan-400">#{i + 1}</span> {idea.title}
                </h2>
                <button
                  onClick={() => {
                    const t = `${idea.title}\n\nScript:\n${idea.script}\n\n${idea.hashtags}`;
                    navigator.clipboard.writeText(t);
                    setCopied(i);
                    toast.success("Copied!");
                    setTimeout(() => setCopied(null), 1500);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 text-white/70 text-xs hover:bg-white/20"
                >
                  <Copy className="w-3 h-3" />
                  {copied === i ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className="bg-black/40 rounded-lg p-4 mb-3 text-sm text-white/80 whitespace-pre-line leading-relaxed">
                {idea.script}
              </div>

              <div className="flex flex-wrap gap-2 items-center text-xs">
                <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300">{idea.sound}</span>
                <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300">{idea.hashtags}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-3">🎬 How to record</h2>
          <ol className="space-y-2 text-white/70 text-sm list-decimal list-inside">
            <li>Open <strong className="text-white">vokaso.com</strong> on your phone browser</li>
            <li>Start screen recording (iOS Control Center / Android Quick Settings)</li>
            <li>Type text and apply the style shown in the script</li>
            <li>Record 10-15 seconds</li>
            <li>Upload to TikTok with the script as caption + hashtags</li>
          </ol>
        </div>

        <div className="mt-6 p-6 rounded-xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-3">📅 Schedule</h2>
          <div className="text-white/70 text-sm">
            <p>Day 1: Video 1 (Bold Text)</p>
            <p>Day 2: Video 2 (Squared)</p>
            <p>Day 3: Video 3 (Script)</p>
            <p>Day 4: Video 4 (Hearts & Stars)</p>
            <p>Day 5: Video 5 (Upside Down)</p>
            <p className="mt-2 text-cyan-300">Repeat with different texts for 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
