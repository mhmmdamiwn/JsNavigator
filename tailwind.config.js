/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./client/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        "muted-primary": "",
        background: "",
        "muted-background": "",
        foreground: "",
        "muted-foreground": "",
        border: "",
        "muted-border": "",
        error: "rgb(var(--error) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
