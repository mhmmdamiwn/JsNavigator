/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./client/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
      },
    },
    borderRadius: {
      DEFAULT: "8px",
    },
  },
  plugins: [],
};
