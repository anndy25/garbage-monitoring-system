const plugins=[require("tailwindcss"),require("autoprefixer")]
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins:plugins
};