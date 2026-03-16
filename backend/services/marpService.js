const { Marp } = require("@marp-team/marp-core");

// Initialize Marp to allow HTML
const marp = new Marp({ html: true });

module.exports = {
  parsePresentation: (fullMarkdown) => {
    // Split by Markdown horizontal rules
    const rawSlides = fullMarkdown
      .split(/\n---\n/)
      .map((s) => s.trim())
      .filter(Boolean);

    return rawSlides.map((md) => {
      // Strip existing frontmatter if any, and force our own for the isolated render
      const cleanMd = md.replace(/^---[\s\S]*?---\n/, "");
      const slideMd = `---\nmarp: true\ntheme: default\n---\n\n${cleanMd}`;

      const { html, css } = marp.render(slideMd);

      return {
        markdown: cleanMd,
        html,
        css,
      };
    });
  },

  renderSingleSlide: (md) => {
    const cleanMd = md.replace(/^---[\s\S]*?---\n/, "");
    const slideMd = `---\nmarp: true\ntheme: default\n---\n\n${cleanMd}`;
    const { html, css } = marp.render(slideMd);
    return { markdown: cleanMd, html, css };
  },
  exportPresentation: async (markdown, format) => {
    const id = uuidv4();
    const mdPath = path.join(TEMP_DIR, `${id}.md`);
    const outPath = path.join(TEMP_DIR, `${id}.${format}`);

    // Add global Marp frontmatter for the final export
    const finalMd = `---\nmarp: true\ntheme: default\npaginate: true\n---\n\n${markdown}`;

    await fs.writeFile(mdPath, finalMd);

    const flag = format === "pdf" ? "--pdf" : "--html";

    // Run Marp CLI securely to generate the file
    await execPromise(
      `npx @marp-team/marp-cli "${mdPath}" ${flag} -o "${outPath}"`,
    );

    // Note: We don't delete the file immediately so res.download() has time to send it
    setTimeout(() => {
      fs.unlink(mdPath).catch(() => {});
      fs.unlink(outPath).catch(() => {});
    }, 10000);

    return outPath;
  },
};
