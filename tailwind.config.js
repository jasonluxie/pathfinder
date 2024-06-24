/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'dark-grey': '#303030',
        'light-grey': '#e0e0e0',
        'muted-teal': '#27bde2',
        'soft-orange': '#ffc107'
      }
    },
  },
  plugins: [],
};
