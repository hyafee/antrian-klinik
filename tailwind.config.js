/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ], theme: {
    colors: {
      'green-dark': '#337F89',
      'green-light': '#009688',
      'white': '#fff',
      'black': '#000',
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Poppins', 'serif'],
    },
    extend: {},
  },
  plugins: [require('autoprefixer'),

  ],
}

