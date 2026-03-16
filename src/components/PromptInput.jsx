import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function PromptInput({ onGenerate, isLoading }) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) onGenerate(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-8 flex gap-2">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="E.g., Explain Neural Networks to beginners..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 flex items-center gap-2 transition-all shadow-md"
      >
        <Sparkles size={16} />
        {isLoading ? "Generating..." : "Generate Slides"}
      </button>
    </form>
  );
}
