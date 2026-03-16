// const { GoogleGenAI } = require("@google/genai");

// // Initialize the new Gemini SDK (it automatically picks up GEMINI_API_KEY from .env)
// const ai = new GoogleGenAI({});

// // Use the current 2026 active model
// const MODEL_NAME = "gemini-2.5-flash";

// // A helper to clean up LLM output (LLMs love wrapping responses in ```markdown ... ```)
// const cleanMarkdown = (text) => {
//   if (!text) return "";
//   return text
//     .replace(/^```markdown\s*/i, "") // Remove opening ```markdown
//     .replace(/^```\s*/i, "") // Remove opening ```
//     .replace(/```\s*$/i, "") // Remove closing ```
//     .trim();
// };

// const SYSTEM_INSTRUCTION = `
// You are an elite, world-class presentation designer building decks for Top Tier SaaS companies.
// Your job is to generate presentation slides using STRICT Marp-compatible Markdown.

// ### SYNTAX RULES:
// 1. Use "# " for the slide title.
// 2. Use "- " for bullet points.
// 3. Separate every slide with exactly three dashes on a new line: "---"
// 4. Keep bullets concise, professional, and impactful (Rule of 6x6: max 6 bullets, max 6 words per bullet).

// ### STRICT NEGATIVE CONSTRAINTS (DO NOT DO THESE):
// - DO NOT wrap your response in markdown code blocks (\`\`\`markdown). Just output the raw text.
// - DO NOT output any conversational filler (e.g., "Here is your deck", "Sure!", "Enjoy!").
// - DO NOT add Marp frontmatter (e.g., marp: true). The system handles this.

// ### EXAMPLE OUTPUT FORMAT:
// ---
// theme: gaia
// _class: lead
// paginate: true
// backgroundColor: #fff
// backgroundImage: url('https://marp.app/assets/hero-background.svg')
// ---

// ![bg left:40% 80%](https://marp.app/assets/marp.svg)

// # **Marp**

// Markdown Presentation Ecosystem

// https://marp.app/

// ---

// # How to write slides

// Split pages by horizontal ruler (`---`). It's very simple! :satisfied:

// ```markdown
// # Slide 1

// foobar

// ---

// # Slide 2

// foobar
// ```
// `;

// module.exports = {
//   // 1. Generate the Full Presentation
//   generateMarkdownFromPrompt: async (prompt) => {
//     try {
//       const fullPrompt = `
//         ${SYSTEM_INSTRUCTION}

//         USER PROMPT: Create a highly professional, 5-to-7 slide presentation about: "${prompt}"
//       `;

//       const response = await ai.models.generateContent({
//         model: MODEL_NAME,
//         contents: fullPrompt,
//         config: {
//           temperature: 0.7,
//           maxOutputTokens: 2048,
//         },
//       });

//       return cleanMarkdown(response.text);
//     } catch (error) {
//       console.error("Gemini Generation Error:", error);
//       throw new Error("Failed to generate presentation from LLM");
//     }
//   },

//   // 2. Edit a Single Slide (The Magic AI Command Bar)
//   editSlideMarkdown: async (currentMarkdown, instruction) => {
//     try {
//       const editPrompt = `
//         You are an elite presentation editor.
//         I will give you the Markdown for a SINGLE presentation slide, and an INSTRUCTION on how to change it.

//         ### RULES:
//         - Return ONLY the updated Markdown for this single slide.
//         - DO NOT include the "---" separator.
//         - DO NOT wrap in \`\`\`markdown tags.
//         - DO NOT include conversational text.

//         ### CURRENT SLIDE:
//         ${currentMarkdown}

//         ### INSTRUCTION:
//         ${instruction}
//       `;

//       const response = await ai.models.generateContent({
//         model: MODEL_NAME,
//         contents: editPrompt,
//         config: {
//           temperature: 0.7,
//           maxOutputTokens: 2048,
//         },
//       });

//       return cleanMarkdown(response.text);
//     } catch (error) {
//       console.error("Gemini Edit Error:", error);
//       throw new Error("Failed to edit slide via LLM");
//     }
//   },
// };

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});
const MODEL_NAME = "gemini-2.5-flash";

const cleanMarkdown = (text) => {
  if (!text) return "";
  return text
    .replace(/^```markdown\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
};

const SYSTEM_INSTRUCTION = `
You are an elite Presentation Designer and Art Director working for a top-tier creative agency.
Your job is to generate stunning, visually rich presentation decks using advanced Marp Markdown.

You have MAXIMUM CREATIVE FREEDOM. Do not just output plain bullet lists. Design a beautiful, varied, and engaging deck.

### ADVANCED MARP CAPABILITIES YOU CAN USE:
1. **Background Images & Split Layouts:**
   Use Marp's image syntax to create stunning backgrounds.
   - Split screen (Image left, text right): \`![bg left:50%](https://image.pollinations.ai/prompt/cyberpunk%20city?width=800&height=1000&nologo=true)\`
   - Full background with dark overlay: \`![bg opacity:.3](https://image.pollinations.ai/prompt/deep%20space?width=1920&height=1080&nologo=true)\`
   *Note: ALWAYS use "https://image.pollinations.ai/prompt/{descriptive_keywords_separated_by_%20}?width=1920&height=1080&nologo=true" for your images. Be creative with the keywords!*

2. **Slide Classes:**
   Use \`<!-- _class: lead -->\` for the title/hero slide to vertically and horizontally center the text.

3. **Custom Theming & Colors:**
   Change the vibe of individual slides using directives:
   - Dark mode slide: \`<!-- _backgroundColor: #09090b -->\` and \`<!-- _color: #ffffff -->\`
   - Brand color slide: \`<!-- _backgroundColor: #2563eb -->\` and \`<!-- _color: #ffffff -->\`

4. **Scoped CSS (HTML is allowed):**
   You can inject custom CSS to make things pop!
   Example: \`<style scoped> h1 { color: transparent; background: linear-gradient(90deg, #ff8a00, #e52e71); -webkit-background-clip: text; } </style>\`

5. **Layout Variety:**
   Mix it up!
   - Slide 1: A massive, centered Hero Title with a dark background.
   - Slide 2: A split layout (Image on left, 3 crisp points on right).
   - Slide 3: A massive, inspiring Quote using \`> "Quote text"\`.
   - Slide 4: A colored transition/statistic slide (no bullets, just a massive number and subtext).

### STRICT FORMATTING RULES:
1. Separate every slide with exactly three dashes on a new line: "---"
2. DO NOT wrap your response in markdown code blocks (\`\`\`markdown). Just output the raw text!
3. DO NOT output conversational filler like "Here is your presentation".
4. DO NOT add global frontmatter (like \`marp: true\`). Start immediately with the first slide's content or local directives (like \`<!-- _class: lead -->\`).

### IMPORTANT:
1. Try to make it as normal and simple as possible.
2. No unnecessary styling or formatting.
3. Be consistent in your use of colors, fonts, and layout.
`;

module.exports = {
  generateMarkdownFromPrompt: async (prompt) => {
    try {
      const fullPrompt = `
        ${SYSTEM_INSTRUCTION}

        USER PROMPT: Create an incredibly aesthetic, visually striking 5-7 slide presentation about: "${prompt}"
      `;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: fullPrompt,
        config: {
          temperature: 0.9, // Higher temperature for more creative designs
          maxOutputTokens: 3000,
        },
      });

      return cleanMarkdown(response.text);
    } catch (error) {
      console.error("Gemini Generation Error:", error);
      throw new Error("Failed to generate presentation from LLM");
    }
  },

  editSlideMarkdown: async (currentMarkdown, instruction) => {
    try {
      const editPrompt = `
        You are an elite presentation editor.
        I will give you the Markdown for a SINGLE presentation slide, and an INSTRUCTION on how to change it.

        Feel free to add background images (using pollinations.ai), change background colors, or add scoped CSS if the user asks to "make it look better".

        ### RULES:
        - Return ONLY the updated Markdown for this single slide.
        - DO NOT include the "---" separator.
        - DO NOT wrap in \`\`\`markdown tags.
        - DO NOT include conversational text.

        ### CURRENT SLIDE:
        ${currentMarkdown}

        ### INSTRUCTION:
        ${instruction}
      `;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: editPrompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      });

      return cleanMarkdown(response.text);
    } catch (error) {
      console.error("Gemini Edit Error:", error);
      throw new Error("Failed to edit slide via LLM");
    }
  },
};
