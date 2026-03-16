import { Sparkles, Download, FileText, Layout } from "lucide-react";
import { useState } from "react";

export default function Header({ onExport, isExporting }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="h-14 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-6 z-20 shrink-0 shadow-sm relative">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Sparkles size={16} />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-zinc-100 tracking-tight">
            PitchGen
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          disabled={isExporting}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-50"
        >
          {isExporting ? "Exporting..." : "Export"} <Download size={14} />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute top-10 right-0 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-2xl overflow-hidden flex flex-col z-50">
            <button
              onClick={() => {
                onExport("pdf");
                setShowDropdown(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-700 transition-colors text-left"
            >
              <FileText size={16} className="text-red-400" /> Export as PDF
            </button>
            <div className="h-[1px] bg-zinc-700/50 w-full" />
            <button
              onClick={() => {
                onExport("html");
                setShowDropdown(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-700 transition-colors text-left"
            >
              <Layout size={16} className="text-blue-400" /> Export as HTML
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
