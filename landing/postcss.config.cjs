/* eslint-disable @typescript-eslint/no-var-requires */
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const nesting = require("tailwindcss/nesting");
const postcssImport = require("postcss-import");

const config = {
  plugins: [
    //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    postcssImport,
    nesting,
    tailwindcss(),
    //But others, like autoprefixer, need to run after,
    cssnano({ preset: "default" }),
    autoprefixer,
  ],
};

module.exports = config;
