import { useState } from "react";
import { Sparkles, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export default function AICommandBar({ onEdit, isEditing }) {
  const [instruction, setInstruction] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (instruction.trim() && !isEditing) {
      onEdit(instruction);
      setInstruction("");
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute bottom-8 w-full max-w-2xl z-20 flex justify-center px-4"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl p-2 flex items-center shadow-2xl shadow-black/50"
      >
        <div className="pl-4 pr-2 text-blue-400">
          {isEditing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Sparkles size={18} />
            </motion.div>
          ) : (
            <Sparkles size={18} />
          )}
        </div>

        <input
          type="text"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          disabled={isEditing}
          placeholder="Ask AI to change this slide (e.g., 'Make it 3 short bullets')"
          className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 border-none focus:outline-none focus:ring-0 px-2"
        />

        <button
          type="submit"
          disabled={isEditing || !instruction.trim()}
          className="bg-zinc-100 text-zinc-950 p-2 rounded-xl hover:bg-white disabled:opacity-50 transition-colors"
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </button>
      </form>
    </motion.div>
  );
}
