/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FED830',
        secondary: '#48463E',
        background: '#F2F4F7',
        'secondary-2': '#1F1E1A',
        'secondary-active': '#2E2E2E',
        'color-black': '#4F4F4F',
        'color-black-2': '#696969',
        'color-gray': '#F4F4F4',
        'color-gray-2': '#979797',
        'color-gray-3': '#828282',
        'color-gray-4': '#d9d9d9',
        'color-gray-5': '#F5F5F5',
        'color-gray-6': '#607D8B',
        'color-error': '#d34829',
        'color-red': '#E64028',
      },
      fontFamily: {
        feather: ['Feather', 'sans'], // Use the font-family name defined in @font-face
      },
    },
  },
  plugins: [],
};
