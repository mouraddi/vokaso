"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { textStyles } from "@/lib/font-styles";

const templates = [
  "from-cyan-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-purple-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-red-500",
  "from-gray-700 to-gray-900",
  "from-violet-500 to-fuchsia-500",
  "from-amber-500 to-orange-500",
  "from-sky-500 to-indigo-500",
  "from-lime-500 to-green-500",
];

const sampleTexts = [
  "Dream Big",
  "Hello World",
  "Love You",
  "Pro Gamer",
  "Be Unique",
  "Stay Strong",
  "Good Vibes",
  "You Can",
  "Create",
  "Vokaso",
];

export function BatchPage() {
  const [count, setCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const generate = async () => {
    setGenerating(true);
    setPreviews([]);
    const zip = new JSZip();
    const canvasArr: HTMLCanvasElement[] = [];

    for (let i = 0; i < count; i++) {
      const style = textStyles[i % textStyles.length];
      const el = refs.current[i];
      if (!el) continue;
      el.style.display = "flex";
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: null, useCORS: true });
      el.style.display = "none";
      canvasArr.push(canvas);
      const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/png"));
      if (blob) zip.file(`vokaso-${style.slug}-${i}.png`, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "vokaso-pins.zip");
    setPreviews(canvasArr.map((c) => c.toDataURL()));
    setGenerating(false);
    toast.success(`${count} pins downloaded!`);
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">📦 Batch Pin Generator</h1>
          <p className="text-white/60 text-sm">Generate multiple Pinterest pins at once and download as ZIP</p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <label className="text-white/70 text-sm">Number of pins:</label>
          <input
            type="range"
            min={2}
            max={10}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-white font-bold">{count}</span>
          <button
            onClick={generate}
            disabled={generating}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold disabled:opacity-50 hover:scale-105 transition-transform"
          >
            {generating ? "Generating..." : `Download ZIP (${count})`}
          </button>
        </div>

        {previews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
            {previews.map((src, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-white/10">
                <img src={src} alt={`Pin ${i}`} className="w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Hidden render targets */}
        <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
          {Array.from({ length: count }).map((_, i) => {
            const style = textStyles[i % textStyles.length];
            const grad = templates[i % templates.length];
            const text = sampleTexts[i % sampleTexts.length];
            return (
              <div
                key={i}
                ref={(el) => { refs.current[i] = el; }}
                className={`w-[600px] h-[900px] bg-gradient-to-br ${grad} p-12 flex-col items-center justify-center text-center`}
                style={{ display: "none" }}
              >
                <div className="text-7xl font-bold text-white mb-8 leading-tight" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>
                  {style.transform(text)}
                </div>
                <div className="w-24 h-1 bg-white/40 rounded-full mb-6" />
                <p className="text-white/80 text-xl font-light">Create at</p>
                <p className="text-white font-bold text-2xl tracking-wider">VOKASO.COM</p>
                <p className="text-white/40 text-sm mt-4">{style.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
