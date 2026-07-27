import Link from "next/link";
import { textStyles } from "@/components/fancy-text-generator";

export const metadata = {
  title: "All Font Styles - Fancy Unicode Text Generator",
  description:
    "Browse 20+ Unicode text styles. Bold, italic, script, monospace, circled, fraktur, and more. Copy and paste anywhere!",
  keywords:
    "fancy text, unicode text generator, font styles, bold text, italic text, script text, monospace text",
  alternates: {
    canonical: "https://www.vokaso.com/fonts",
  },
};

const styleEmojis: Record<string, string> = {
  bold: "𝗕", italic: "𝘐", "bold italic": "𝙎", script: "𝓢",
  monospace: "𝙼", circled: "ⓒ", squared: "🅂", fullwidth: "Ｆ",
  "upside down": "ʇxǝʇ", reversed: "txet", "wide spaced": "t e x t",
  strikethrough: "t̶e̶x̶t̶", "double struck": "𝕋", fraktur: "𝔗",
  "greek letters": "𝛂", "small caps": "ᴛᴇxᴛ", "super script": "ᵗᵉˣᵗ",
  "sub script": "ₜₑₓₜ", "musical notes": "♫", "hearts & stars": "♥★",
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function FontsIndex() {
  return (
    <div className="min-h-screen py-10 md:py-20 px-3 sm:px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            All Font Styles
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Browse all 20+ Unicode text styles. Each style has its own dedicated page with examples and quick copy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {textStyles.map((s) => {
            const slug = slugify(s.name);
            const emoji = styleEmojis[s.name.toLowerCase()] || "✨";
            return (
              <Link
                key={s.name}
                href={`/fonts/${slug}`}
                className="group p-5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-cyan-400/50 transition-all"
              >
                <div className="text-3xl mb-3">{emoji}</div>
                <h2 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {s.name}
                </h2>
                <p className="text-sm text-white/50 mt-1 line-clamp-2">
                  {s.description}
                </p>
                <p className="text-xs text-cyan-300/60 mt-2">{s.useCase}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
