import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [preact()],
  alias: {
    react: "preact/compat",
    "react-dom": "preact/compat",
  },
});
