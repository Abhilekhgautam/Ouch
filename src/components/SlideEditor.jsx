import { motion } from "framer-motion";

export default function SlideEditor({ slide, onChange }) {
  if (!slide) return null;

  const handleTitleChange = (e) =>
    onChange({ ...slide, title: e.currentTarget.innerText });
  const handleBulletChange = (index, newText) => {
    const newBullets = [...slide.bullets];
    newBullets[index] = newText;
    onChange({ ...slide, bullets: newBullets });
  };

  return (
    <motion.div
      key={slide.title}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="w-full max-w-5xl shadow-slide rounded-2xl flex flex-col items-start justify-center p-16 md:p-24 relative overflow-hidden bg-[#fdfdfd]"
      style={{ aspectRatio: "16/9" }}
    >
      {/* Premium Mesh Gradient Background */}
      <div className="absolute inset-0 bg-slide-mesh opacity-80 pointer-events-none" />

      {/* Subtle Noise Texture overlay (CSS trick for ultra-premium feel) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      {/* Glassmorphic content wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-12 shadow-sm">
        {/* Decorative Badge */}
        <div className="w-12 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-8" />

        {/* Title */}
        <h1
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTitleChange}
          className="font-display text-5xl md:text-6xl font-black text-slate-800 tracking-tight mb-12 w-full outline-none focus:bg-white/50 focus:ring-2 focus:ring-blue-500/30 rounded-xl py-2 px-4 -ml-4 transition-all duration-300 empty:before:content-['Enter_Slide_Title...'] empty:before:text-slate-300"
        >
          {slide.title}
        </h1>

        {/* Bullets */}
        <ul className="w-full text-2xl md:text-3xl text-slate-700 font-medium list-none space-y-6">
          {slide.bullets?.map((bullet, idx) => (
            <li key={idx} className="flex items-start group">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm font-bold mr-6 mt-0.5 select-none shadow-sm">
                {idx + 1}
              </span>
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleBulletChange(idx, e.currentTarget.innerText)
                }
                className="flex-1 outline-none focus:bg-white/50 focus:ring-2 focus:ring-blue-500/30 rounded-xl py-1 px-4 -ml-4 transition-all duration-300 empty:before:content-['Enter_point...'] empty:before:text-slate-300 leading-snug"
              >
                {bullet}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
