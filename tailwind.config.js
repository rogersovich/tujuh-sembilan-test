/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  prefix: 'tw-',
  important: true,
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

