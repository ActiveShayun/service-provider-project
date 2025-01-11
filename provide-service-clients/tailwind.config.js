/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        'slide-1': "url('./assets/digital.jpg')",
        'slide-2': "url('./assets/paint.jpg')",
        'slide-3': "url('./assets/wev2.jpg')",
        'service': "url('./assets/service.jpg')"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

