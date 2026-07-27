// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static output -> zero server cost, deploys to Vercel out of the box.
export default defineConfig({
  output: "static",
  site: "https://vinit-sontakke.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
});
