/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{html,tsx,jsx,js}',
    './src/components/**/*.{html,tsx,jsx,js}',
    './src/common/**/*.{html,tsx,jsx,js}',
    './src/assets/**/*.{html,tsx,jsx,js}',
  ],
  theme: {
    extend: {
      colors: {
        PurpleTaupe: '#4C3A51',
        DeepRuby: '#774360',
        ChinaRose: '#B25068',
        YellowRed: '#E7AB79',

        GunMetal: '#1F1D36',

        PalePink: '#F2D7D9',
        LanguidLavender: '#D3CEDF',
        WildBlue: '#9CB4CC',
        ShadowBlue: '#748DA6',

        LightSilver: '#CEE5D0',
        EggShell: '#F3F0D7',
        Champagne: '#FED2AA',
        MacroniCheese: '#FFBF86',
        PastelPink: '#E9A6A6',

        DarkBlue: '#041C32',
        DeepBlue: '#04293A',
        AteneoBlue: '#0b5476',
        Fawn: '#ECB365',

        EerieBlack: '#101820',
        PineTree: '#2F2519',

        LightRose: '#da6784',

        DarkBlack: '#0e151c',
      },
      screens: {
        betterhover: { raw: '(hover: hover)' },
      },
    },
  },
  plugins: [
    plugin(function ({ matchComponents, theme }) {
      matchComponents(
        {
          'text-stroke': (value) => ({
            '-webkit-text-stroke-color': value,
            '-webkit-text-stroke-width': '1px',
          }),
        },
        { values: theme('colors') },
      );
    }),
  ],
};
