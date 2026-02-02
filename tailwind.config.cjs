module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dominant: "#0b1220",
        secondary: "#0f172a",
        surface: "#071029",
        accent: {
          DEFAULT: "#f59e0b",
          600: "#d97706",
        },
        muted: "#94a3b8",
        text: "#e6eef8",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
        ],
      },
    },
  },
  plugins: [],
};
