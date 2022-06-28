/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{html,tsx,jsx,js}',
    './Components/**/*.{html,tsx,jsx,js}',
  ],
  theme: {
    extend: {
      colors: {
        darkMainPurple: '#4C3A51',
        darkMainRuby: '#774360',
        darkMainRose: '#B25068',
        darkMainYellow: '#E7AB79',
        // lightMainPink: '#F2D7D9',
        // lightMainLavender: '#D3CEDF',
        // lightMainBlue: '#9CB4CC',
        // lightMainShadowBlue: '#748DA6',
        lightMainGreen: '#CEE5D0',
        lightMainEggShell: '#F3F0D7',
        lightMainChampagne: '#FED2AA',
        lightMainOrange: '#FFBF86',
      },
    },
  },
  plugins: [],
};
