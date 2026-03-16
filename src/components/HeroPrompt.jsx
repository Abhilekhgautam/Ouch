import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HeroPrompt({ onGenerate, isLoading }) {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[#09090b] w-full h-full">
      {/* Premium Ambient Lighting (Blurred Glowing Orbs) */}
      <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Subtle Dot Grid Overlay to match the workspace */}
      <div className="absolute inset-0 bg-dot-grid bg-dot-size opacity-40 pointer-events-none" />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full text-center z-10 flex flex-col items-center"
      >
        {/* Pro Engine Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-medium text-zinc-300 mb-8 backdrop-blur-md shadow-2xl"
        >
          <Sparkles size={14} className="text-blue-400" />
          PitchGen AI ✨ Pro Engine
        </motion.div>

        {/* Massive, High-Contrast Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          What do you want to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">
            present today?
          </span>
        </h1>

        {/* Elegant Subtext */}
        <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
          Type a topic and our AI will generate a beautiful, production-ready
          presentation in seconds. No markdown. Just pure design.
        </p>

        {/* Glassmorphic Input Form */}
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onSubmit={(e) => {
            e.preventDefault();
            if (prompt) onGenerate(prompt);
          }}
          className={`relative flex items-center p-2 w-full max-w-3xl bg-zinc-900/40 backdrop-blur-2xl rounded-2xl shadow-2xl border transition-all duration-300 ${
            isLoading
              ? "border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.2)]"
              : "border-zinc-700/50 hover:border-zinc-500/80 focus-within:border-zinc-400 focus-within:bg-zinc-900/80"
          }`}
        >
          <input
            type="text"
            autoFocus
            disabled={isLoading}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Q3 Marketing Strategy for a Web3 Startup..."
            className="flex-1 px-6 py-4 text-lg md:text-xl bg-transparent border-none focus:outline-none focus:ring-0 text-zinc-100 placeholder:text-zinc-600 disabled:opacity-50 font-light"
          />

          {/* High-Contrast "Vercel Style" Generate Button */}
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="bg-white hover:bg-zinc-200 text-zinc-950 px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Sparkles size={20} />
                </motion.div>
                Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Generate <ArrowRight size={18} />
              </span>
            )}
          </button>
        </motion.form>

        {/* Suggestion Microcopy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex gap-4 text-sm text-zinc-500"
        >
          <span
            className="cursor-pointer hover:text-zinc-300 transition-colors"
            onClick={() => setPrompt("The History of Space Exploration")}
          >
            Try: "The History of Space Exploration"
          </span>
          <span className="hidden md:inline text-zinc-700">•</span>
          <span
            className="hidden md:inline cursor-pointer hover:text-zinc-300 transition-colors"
            onClick={() => setPrompt("Pitch deck for an AI SaaS app")}
          >
            "Pitch deck for an AI SaaS app"
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
