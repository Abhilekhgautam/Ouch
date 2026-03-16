import SlideRenderer from "./SlideRenderer";

export default function LeftPanel({ slides, activeIndex, onSelect }) {
  return (
    <aside className="w-64 bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-800 flex flex-col z-10 shrink-0">
      <div className="px-5 py-4 border-b border-zinc-800/50 sticky top-0 bg-zinc-900/95 backdrop-blur-md z-20">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          Slides ({slides.length})
        </h3>
      </div>

      <div className="p-4 flex flex-col gap-4 overflow-y-auto">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(idx)}
            className={`group cursor-pointer rounded-xl p-1.5 transition-all duration-300 relative ${
              idx === activeIndex
                ? "bg-blue-500/20 ring-2 ring-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                : "bg-zinc-800/50 hover:bg-zinc-700/50 ring-1 ring-zinc-700/50 hover:ring-zinc-600"
            }`}
          >
            {/* Slide Number Badge */}
            <div
              className={`absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 shadow-lg ${
                idx === activeIndex
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-800 text-zinc-400 border border-zinc-700"
              }`}
            >
              {idx + 1}
            </div>

            {/* Miniature Iframe Thumbnail */}
            <div className="w-full aspect-video rounded-lg overflow-hidden relative pointer-events-none">
              <SlideRenderer slide={slide} />
              {/* Invisible overlay to catch clicks (since iframes consume clicks) */}
              <div className="absolute inset-0 z-10" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
