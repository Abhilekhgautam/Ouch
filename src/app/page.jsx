"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Download, FileText, Layout } from "lucide-react";
import HeroPrompt from "@/components/HeroPrompt";
import SlideRenderer from "@/components/SlideRenderer";
import LeftPanel from "@/components/LeftPanel";
import Header from "@/components/Header";
import AICommandBar from "@/components/AICommandBar";
import axios from "axios";

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingSlide, setIsEditingSlide] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // 1. Initial Full Generation
  const handleGenerate = async (prompt) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/generate-slides",
        { prompt },
      );
      setSlides(res.data.slides);
      setActiveSlideIndex(0);
      setHasGenerated(true);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  // 2. Edit a single slide using AI
  const handleEditSlide = async (instruction) => {
    setIsEditingSlide(true);
    try {
      const currentSlide = slides[activeSlideIndex];
      const res = await axios.post("http://localhost:5000/api/edit-slide", {
        markdown: currentSlide.markdown,
        instruction,
      });

      const newSlides = [...slides];
      newSlides[activeSlideIndex] = res.data.slide;
      setSlides(newSlides);
    } catch (error) {
      console.error(error);
    }
    setIsEditingSlide(false);
  };

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/export",
        { slides, format },
        {
          responseType: "blob",
        },
      );

      // Create an invisible link to trigger the browser download
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `PitchGen-Presentation.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export failed", error);
      alert("Export failed. Make sure Marp CLI is installed on the backend.");
    }
    setIsExporting(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#09090b] font-sans text-zinc-100 overflow-hidden selection:bg-blue-500/30">
      {!hasGenerated ? (
        <HeroPrompt onGenerate={handleGenerate} isLoading={isLoading} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col h-full"
        >
          <Header onExport={handleExport} isExporting={isExporting} />
          <div className="flex flex-1 overflow-hidden h-full relative">
            {/* Left Thumbnails */}
            <LeftPanel
              slides={slides}
              activeIndex={activeSlideIndex}
              onSelect={setActiveSlideIndex}
            />

            {/* DESIGN CANVAS */}
            <main className="flex-1 bg-zinc-950 bg-dot-grid bg-dot-size overflow-hidden flex justify-center items-center p-8 relative shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">
              {/* Marp HTML Rendered securely inside an Iframe */}
              <div className="relative w-full max-w-5xl aspect-video">
                <SlideRenderer slide={slides[activeSlideIndex]} />
              </div>

              {/* Floating AI Editor specifically for the active slide */}
              <AICommandBar
                onEdit={handleEditSlide}
                isEditing={isEditingSlide}
              />
            </main>
          </div>
        </motion.div>
      )}
    </div>
  );
}
