"use client";

import { useRef, useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { textStyles } from "@/lib/font-styles";

export function PinterestPage() {
  const [text, setText] = useState("Vokaso");
  const [selectedStyle, setSelectedStyle] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const style = textStyles[selectedStyle];

  const gradients = [
    "from-cyan-500 to-blue-500",
    "from-pink-500 to-rose-500",
    "from-purple-500 to-indigo-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-gray-700 to-gray-900",
  ];

  const download = async () => {
    if (!ref.current) return;
    try {
      const canvas = await html2canvas(ref.current, { scale: 2, backgroundColor: null, useCORS: true });
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `vokaso-${style.slug}.png`;
      a.click();
      toast.success("Pin downloaded!");
    } catch {
      toast.error("Failed to generate image");
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Pinterest Pin Creator</h1>
        <p className="text-white/60 text-sm">
          Create and save pins to promote Vokaso fonts on Pinterest
        </p>
      </div>

      <div className="max-w-lg mx-auto mb-6 space-y-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text for pin..."
          className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-center focus:outline-none focus:border-cyan-400"
        />
        <div className="grid grid-cols-4 gap-2">
          {textStyles.slice(0, 8).map((s, i) => (
            <button
              key={s.name}
              onClick={() => setSelectedStyle(i)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedStyle === i
                  ? "bg-cyan-500 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
        <button
          onClick={download}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
        >
          <Download className="w-4 h-4" />
          Download Pin (1200×1800)
        </button>
      </div>

      <div className="flex justify-center" style={{ minHeight: 930 }}>
        <div
          ref={ref}
          className={`w-[600px] h-[900px] bg-gradient-to-br ${gradients[selectedStyle % gradients.length]} p-12 flex flex-col items-center justify-center text-center shadow-2xl rounded-2xl`}
        >
          <div className="text-8xl font-bold text-white mb-8 leading-tight break-all" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>
            {style.transform(text)}
          </div>
          <div className="w-24 h-1 bg-white/40 rounded-full mb-6" />
          <p className="text-white/80 text-xl font-light">Create at</p>
          <p className="text-white font-bold text-2xl tracking-wider">VOKASO.COM</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-8 p-6 rounded-xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-bold text-white mb-3">📌 Pinterest Strategy</h2>
        <ol className="text-white/70 text-sm space-y-2 list-decimal list-inside">
          <li>Create a <strong className="text-white">Pinterest Business Account</strong> (free)</li>
          <li>Download pins with different texts and styles using the button above</li>
          <li>Upload to Pinterest with title: <span className="text-cyan-300">&quot;{style.name} - Fancy Unicode Text Generator&quot;</span></li>
          <li>Link to: <strong className="text-white">https://www.vokaso.com/fonts/{style.slug}</strong></li>
          <li>Post <strong className="text-white">3 pins/day</strong>, use 5 hashtags (#fancytext #unicode #fontgenerator #vokaso #{style.slug.replace(/-/g, "")})</li>
          <li>Join group boards in &quot;fonts, typography, design&quot;</li>
        </ol>
      </div>
    </div>
  );
}
