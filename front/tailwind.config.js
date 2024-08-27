/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      scale: ['hover', 'transform', 'group-hover']
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
