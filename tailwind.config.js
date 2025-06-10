/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    extend: {
      scrollBehavior: ['smooth'],
    },
  },
  variants: {
    extend: {
      scrollBehavior: ['responsive'],
    },
  },
  plugins: [
    require('daisyui'),
  ],
}