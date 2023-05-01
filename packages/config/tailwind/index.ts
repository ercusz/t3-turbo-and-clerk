import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        brandblue: colors.blue[500],
        brandred: colors.red[500],
      },
    },
  },
  plugins: [],
} satisfies Config;
