import baseConfig from "@acme/tailwind-config";
import type { Config } from "tailwindcss";

export default {
  content: [
    // app content
    `./src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  // prefix ui lib classes to avoid conflicting with the app
  prefix: "ui-",
  presets: [baseConfig],
} satisfies Config;
