/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  // hover só em dispositivos com mouse: evita "hover preso" no toque
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#121212", // fundo principal
          raised: "#1e1e1e", // cartões e elementos elevados
          overlay: "#2a2a2a"
        }
      },
      fontFamily: {
        sans: [
          "var(--font-geist)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif"
        ]
      },
      boxShadow: {
        // sombra suave + brilho especular no topo: dá a sensação de vidro sobre a câmera
        glass: "0 8px 32px rgb(0 0 0 / 0.35), inset 0 1px 0 rgb(255 255 255 / 0.18)"
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "sheet-up": {
          from: { opacity: "0", transform: "translateY(24px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out both",
        "sheet-up": "sheet-up 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both"
      }
    }
  },
  plugins: []
};
