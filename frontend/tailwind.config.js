/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // دي أهم حتة يا وحش
  theme: {
    extend: {
      colors: {
        primary: "#1e293b", // الكحلي بتاعنا
        accent: "#fbbf24",  // الأصفر/الذهبي
      },
    },
  },
  plugins: [],
};