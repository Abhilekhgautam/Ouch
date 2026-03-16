const express = require("express");
const router = express.Router();
const marpService = require("../services/marpService");
const llmService = require("../services/llmService");

// Initial Generation
router.post("/generate-slides", async (req, res) => {
  try {
    const { prompt } = req.body;
    const fullMarkdown = await llmService.generateMarkdownFromPrompt(prompt);
    const slides = marpService.parsePresentation(fullMarkdown);
    res.json({ slides });
  } catch (error) {
    res.status(500).json({ error: "Generation failed" });
  }
});

// AI Edit Per Slide
router.post("/edit-slide", async (req, res) => {
  try {
    const { markdown, instruction } = req.body;
    // Ask LLM to modify this specific markdown based on the instruction
    const updatedMarkdown = await llmService.editSlideMarkdown(
      markdown,
      instruction,
    );
    const updatedSlide = marpService.renderSingleSlide(updatedMarkdown);
    res.json({ slide: updatedSlide });
  } catch (error) {
    res.status(500).json({ error: "Edit failed" });
  }
});

router.post("/export", async (req, res) => {
  try {
    const { slides, format } = req.body;

    // Combine the individual slide markdowns into one full file
    const fullMarkdown = slides.map((s) => s.markdown).join("\n---\n");

    // Call the export service
    const fileUrl = await marpService.exportPresentation(fullMarkdown, format);

    res.download(fileUrl);
  } catch (error) {
    console.error("Export Error:", error);
    res.status(500).json({ error: "Export failed" });
  }
});

module.exports = router;
