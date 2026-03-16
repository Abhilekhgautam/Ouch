export default function SlideViewer({ slides, activeIndex, onSelect }) {
  return (
    <>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
        Slides ({slides.length})
      </h3>
      {slides.map((slide, idx) => (
        <div
          key={idx}
          onClick={() => onSelect(idx)}
          className={`cursor-pointer rounded-lg border-2 p-3 bg-white aspect-video flex flex-col items-center justify-center transition-all ${
            idx === activeIndex
              ? "border-blue-500 shadow-md scale-105"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <span className="text-xs font-semibold text-gray-400 mb-1 w-full text-left">
            Slide {idx + 1}
          </span>
          <div className="text-sm font-bold text-gray-700 line-clamp-2 text-center break-words w-full">
            {slide.title || "Untitled Slide"}
          </div>
        </div>
      ))}
    </>
  );
}
