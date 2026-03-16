export default function SlideRenderer({ slide }) {
  if (!slide) return null;

  // We strictly enforce Marp's 1280x720 resolution on the parent wrapper,
  // then scale that entire wrapper to fit our UI container flawlessly.
  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body, html {
            margin: 0; padding: 0;
            width: 100vw; height: 100vh;
            overflow: hidden;
            background-color: transparent;
          }

          /* Inject Marp's compiled CSS */
          ${slide.css}

          /* Force the Marp engine container to be exactly 1280x720 */
          .marpit {
            width: 1280px !important;
            height: 720px !important;
            transform-origin: top left !important;
            position: absolute !important;
            top: 0; left: 0;
          }

          /* Remove default drop shadows from Marp's sections so it looks clean in our UI */
          section {
            box-shadow: none !important;
          }
        </style>
        <script>
          function scaleSlide() {
            const marpWrapper = document.querySelector('.marpit');
            if (!marpWrapper) return;

            const slideWidth = 1280;
            const slideHeight = 720;

            // Calculate scale based on the iframe's current window size
            const scaleX = window.innerWidth / slideWidth;
            const scaleY = window.innerHeight / slideHeight;
            const scale = Math.min(scaleX, scaleY);

            // Apply scale
            marpWrapper.style.transform = 'scale(' + scale + ')';

            // Center the scaled slide inside the iframe
            const scaledWidth = slideWidth * scale;
            const scaledHeight = slideHeight * scale;
            marpWrapper.style.left = (window.innerWidth - scaledWidth) / 2 + 'px';
            marpWrapper.style.top = (window.innerHeight - scaledHeight) / 2 + 'px';
          }

          window.addEventListener('resize', scaleSlide);
          window.addEventListener('load', scaleSlide);
        </script>
      </head>
      <body>
        ${slide.html}
      </body>
    </html>
  `;

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 bg-zinc-900">
      <iframe
        title="Slide Preview"
        srcDoc={srcDoc}
        className="w-full h-full border-none absolute inset-0 bg-transparent pointer-events-none"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
}
