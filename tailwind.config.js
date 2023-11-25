/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'sans-serif']
      },
      colors: {
        primary: '#224957',
        white: '#fff'
      }
    }
  },
  plugins: [import('flowbite/plugin')]
}
