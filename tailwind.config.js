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
        AteneoBlue: '#064663',
        Fawn: '#ECB365',

        EerieBlack: '#101820',
      },
    },
  },
  plugins: [],
};
