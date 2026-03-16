import { Plus, Trash2, ListPlus, Download, LayoutTemplate } from "lucide-react";

export default function RightToolbar({ onAddSlide, onDeleteSlide, onExport }) {
  const ToolButton = ({ icon: Icon, label, onClick, danger, primary }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 border ${
        primary
          ? "bg-blue-600 border-blue-500 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20"
          : danger
            ? "text-red-400 border-transparent hover:bg-red-950/30 hover:border-red-900/50"
            : "text-zinc-300 bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-700 hover:border-zinc-600 shadow-sm"
      }`}
    >
      <Icon
        size={16}
        strokeWidth={danger ? 2 : 2}
        className={primary ? "text-blue-100" : ""}
      />
      {label}
    </button>
  );

  return (
    <aside className="w-72 bg-zinc-900/90 backdrop-blur-xl border-l border-zinc-800 p-6 flex flex-col z-10">
      <div className="mb-8">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <LayoutTemplate size={14} className="text-zinc-400" /> Slide Data
        </h3>
        <div className="space-y-2">
          <ToolButton
            icon={ListPlus}
            label="Add Bullet Point"
            onClick={() => {}}
          />
        </div>
      </div>

      <div className="mb-auto">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">
          Structure
        </h3>
        <div className="space-y-2">
          <ToolButton icon={Plus} label="New Slide" onClick={onAddSlide} />
          <ToolButton
            icon={Trash2}
            label="Delete Slide"
            onClick={onDeleteSlide}
            danger
          />
        </div>
      </div>

      <div className="pt-6 border-t border-zinc-800/80">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">
          Export
        </h3>
        <div className="space-y-2">
          <ToolButton
            icon={Download}
            label="Export Presentation"
            onClick={() => onExport("pdf")}
            primary
          />
        </div>
      </div>
    </aside>
  );
}
