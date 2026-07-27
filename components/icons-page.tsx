"use client";

import { Check, Copy, Download, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconList = [
  "Heart", "Star", "Home", "User", "Settings", "Bell", "Mail", "Search",
  "Camera", "Image", "Music", "Play", "Globe", "Lock", "Unlock", "Sun",
  "Moon", "Cloud", "Download", "Upload", "Trash2", "Edit", "Share2",
  "MessageCircle", "Phone", "MapPin", "Calendar", "Clock", "Eye", "EyeOff",
  "ThumbsUp", "MessageSquare", "ShoppingCart", "Bookmark", "Flag", "Award",
  "Zap", "Fire", "AlertCircle", "CheckCircle", "XCircle", "Info", "HelpCircle",
  "Link", "Paperclip", "AtSign", "Hash", "Bold", "Italic", "Underline", "Type",
  "List", "CheckSquare", "Square", "Circle", "ArrowRight", "ArrowLeft",
  "ArrowUp", "ArrowDown", "ChevronRight", "ChevronLeft", "ChevronUp",
  "ChevronDown", "Menu", "MoreHorizontal", "MoreVertical", "Plus", "Minus",
  "X", "ExternalLink", "Copy", "Clipboard", "FileText", "Folder", "Tag",
  "CreditCard", "DollarSign", "TrendingUp", "BarChart3", "PieChart", "Activity",
  "RefreshCw", "Repeat", "Shuffle", "Volume2", "Send", "Inbox", "LogIn",
  "LogOut", "UserPlus", "UserCheck", "Users", "Filter", "Grid3x3", "Columns",
  "Rows", "Palette", "Brush", "PenTool", "Code2", "Terminal", "Database",
  "Server", "Cpu", "Wifi", "Smartphone", "Tablet", "Monitor", "Printer",
  "Compass", "BookOpen", "Feather", "Gift", "Gem", "Rocket", "Trophy",
  "Medal", "Target",
];

const categories = [
  { name: "Actions", icons: ["Search","Download","Upload","Trash2","Edit","Share2","Copy","Send","LogIn","LogOut","RefreshCw","Repeat","Shuffle","Filter","Plus","Minus","X","CheckCircle","XCircle"] },
  { name: "Communication", icons: ["Mail","MessageCircle","MessageSquare","Phone","AtSign","Bell","Inbox"] },
  { name: "Media", icons: ["Camera","Image","Music","Play","Volume2","Eye","EyeOff"] },
  { name: "Navigation", icons: ["ArrowRight","ArrowLeft","ArrowUp","ArrowDown","ChevronRight","ChevronLeft","ChevronUp","ChevronDown","Menu","MoreHorizontal","MoreVertical","ExternalLink","Home"] },
  { name: "Interface", icons: ["Heart","Star","Bookmark","Flag","Award","Zap","Fire","ThumbsUp","Settings","Lock","Unlock","User","Users","UserPlus","UserCheck"] },
  { name: "Design", icons: ["Palette","Brush","PenTool","Bold","Italic","Underline","Type","List","Grid3x3","Columns","Rows","Feather"] },
  { name: "Development", icons: ["Code2","Terminal","Database","Server","Cpu","Wifi","Globe","Hash","Link","Paperclip","Tag"] },
  { name: "Commerce", icons: ["ShoppingCart","CreditCard","DollarSign","TrendingUp","BarChart3","PieChart","Activity","Tag","Gift","Gem"] },
  { name: "Status", icons: ["AlertCircle","Info","HelpCircle","CheckCircle","XCircle","Sun","Moon","Cloud","Calendar","Clock","MapPin","Compass"] },
];

function toKebabCase(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

const LUCIDE_CDN = "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons";

export function IconsPage() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null);
  const [icons, setIcons] = useState<Record<string, React.ComponentType<{ className?: string }>>>({});
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("lucide-react").then((mod: unknown) => {
      const iconsMap = mod as Record<string, React.ComponentType<{ className?: string }>>;
      const allIcons = iconList.reduce((acc, name) => {
        const Icon = iconsMap[name];
        if (Icon) acc[name] = Icon;
        return acc;
      }, {} as Record<string, React.ComponentType<{ className?: string }>>);
      setIcons(allIcons);
    });
  }, []);

  useEffect(() => {
    if (!popupPos) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setSelectedIcon(null);
        setPopupPos(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popupPos]);

  const fetchSvg = async (name: string): Promise<string> => {
    try {
      const res = await fetch(`${LUCIDE_CDN}/${toKebabCase(name)}.svg`);
      if (!res.ok) throw new Error("Not found");
      return await res.text();
    } catch {
      return "";
    }
  };

  const copyReact = async (name: string) => {
    const code = `import { ${name} } from "lucide-react";\n\n<${name} className="w-6 h-6" />`;
    await navigator.clipboard.writeText(code);
    setCopied(name);
    toast.success(`${name} React code copied!`);
    setTimeout(() => setCopied(null), 1500);
  };

  const copySvgCode = async (name: string) => {
    const svg = await fetchSvg(name);
    if (!svg) { toast.error("Could not fetch SVG from CDN"); return; }
    await navigator.clipboard.writeText(svg);
    setCopied(name);
    toast.success(`${name} SVG copied!`);
    setTimeout(() => setCopied(null), 1500);
  };

  const downloadSvg = async (name: string) => {
    const svg = await fetchSvg(name);
    if (!svg) { toast.error("Could not fetch SVG from CDN"); return; }
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${name}.svg downloaded!`);
  };

  const handleIconClick = useCallback((name: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSelectedIcon(name);
    setPopupPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return iconList;
    return iconList.filter((name) => name.toLowerCase().includes(q));
  }, [search]);

  const renderGrid = (names: string[]) =>
    names.map((name) => {
      const Icon = icons[name];
      if (!Icon) return null;
      return (
        <button
          key={name}
          onClick={(e) => handleIconClick(name, e)}
          className={cn(
            "flex flex-col items-center gap-1 p-3 rounded-xl transition-all relative",
            selectedIcon === name
              ? "bg-cyan-500/20 border border-cyan-400"
              : "bg-white/10 hover:bg-white/20 border border-white/20 hover:border-cyan-400/50",
          )}
          title={name}
        >
          <Icon className="w-6 h-6 text-white" />
          <span className="text-[10px] text-white/60 truncate w-full text-center">{name}</span>
        </button>
      );
    });

  const SelectedIcon = selectedIcon && icons[selectedIcon] ? icons[selectedIcon] : null;

  return (
    <div className="py-8 md:py-16 px-3 sm:px-4 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          🎨 Lucide Icons
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Click any icon to copy or download
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search icons..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 backdrop-blur-sm"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-white/40 hover:text-white" />
            </button>
          )}
        </div>
      </div>

      {search && (
        <div className="max-w-6xl mx-auto">
          <p className="text-white/60 mb-4">{filtered.length} icons found</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {renderGrid(filtered)}
          </div>
        </div>
      )}

      {!search && (
        <div className="max-w-6xl mx-auto space-y-10">
          {categories.map((cat) => (
            <div key={cat.name}>
              <h2 className="text-xl font-bold text-white mb-4">{cat.name}</h2>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {renderGrid(cat.icons)}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedIcon && SelectedIcon && popupPos && (
        <div
          ref={popupRef}
          style={{ top: popupPos.top, left: popupPos.left }}
          className="fixed z-50 -translate-x-1/2"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-2xl border border-gray-200 dark:border-gray-700 min-w-[180px]">
            <div className="flex items-center gap-3 mb-3">
              <SelectedIcon className="w-8 h-8 text-cyan-400 shrink-0" />
              <span className="font-semibold text-sm text-gray-900 dark:text-white truncate">{selectedIcon}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <button onClick={() => copySvgCode(selectedIcon)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full text-left">
                {copied === selectedIcon ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                Copy SVG
              </button>
              <button onClick={() => copyReact(selectedIcon)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full text-left">
                <Copy className="w-4 h-4" />
                Copy React
              </button>
              <button onClick={() => downloadSvg(selectedIcon)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full text-left">
                <Download className="w-4 h-4" />
                Download SVG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
