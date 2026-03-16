import { PlusCircle, Trash2, List, FileDown } from "lucide-react";

export default function SlideToolbar({
  onAddSlide,
  onDeleteSlide,
  onExport,
  activeSlide,
  updateSlide,
}) {
  const addBullet = () => {
    const newBullets = [...(activeSlide.bullets || []), "New point"];
    updateSlide({ ...activeSlide, bullets: newBullets });
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
        Edit Slide
      </h3>

      <div className="space-y-3 mb-10">
        <button
          onClick={addBullet}
          className="w-full flex items-center gap-3 p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 border border-gray-200 transition-colors"
        >
          <List size={18} /> Add Bullet Point
        </button>
      </div>

      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
        Manage Slides
      </h3>

      <div className="space-y-3 mb-auto">
        <button
          onClick={onAddSlide}
          className="w-full flex items-center gap-3 p-3 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 border border-blue-200 transition-colors"
        >
          <PlusCircle size={18} /> Add New Slide
        </button>
        <button
          onClick={onDeleteSlide}
          className="w-full flex items-center gap-3 p-3 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 border border-red-200 transition-colors"
        >
          <Trash2 size={18} /> Delete Slide
        </button>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          Export Presentation
        </h3>
        <div className="space-y-3">
          <button
            onClick={() => onExport("html")}
            className="w-full flex items-center gap-3 p-3 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 transition-colors"
          >
            <FileDown size={18} /> Download HTML
          </button>
          <button
            onClick={() => onExport("pdf")}
            className="w-full flex items-center gap-3 p-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            <FileDown size={18} /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
