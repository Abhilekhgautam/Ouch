/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: [
          '"SF Pro Display"',
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, #3f3f46 1px, transparent 1px)",
        // Beautiful premium slide meshes
        "slide-mesh": `
          radial-gradient(at 100% 0%, hsla(285, 100%, 93%, 0.4) 0px, transparent 50%),
          radial-gradient(at 0% 100%, hsla(225, 100%, 95%, 0.6) 0px, transparent 50%),
          radial-gradient(at 80% 100%, hsla(242, 100%, 90%, 0.4) 0px, transparent 50%),
          radial-gradient(at 0% 0%, hsla(210, 100%, 98%, 1) 0px, transparent 50%)
        `,
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)",
      },
      backgroundSize: {
        "dot-size": "24px 24px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        slide:
          "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1) inset",
      },
    },
  },
  plugins: [],
};
