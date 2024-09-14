/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ethnos-blue-300": "#041438",
        "ethnos-blue-600": "#172F51",
        "ethnos-orange-600": "#E07101",
        "ethnos-orange-700": "#FA8212",
        "ethnos-gray-200": "#E8EAEE",
        "ethnos-gray-400": "#A6ABC8",
        "ethnos-gray-500": "#A6ABC833",
        "ethnos-gray-600": "#959AB722",
        "ethnos-red-500": "#DB0000",
        // dark mode
        "ethnos-black-500": "#2A2B2D",
        "ethnos-black-400": "#2D2E30",
        "ethnos-black-300": "#2F3033",
        "ethnos-black-200": "#2F3033",
        "ethnos-black-150": "#343536",
        "ethnos-black-100": "#4F545B",
        "ethnos-black-50": " #A3A4A4",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        montserratAlternates: ["Montserrat Alternates", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        karla: ["Karla", "sans-serif"],
      },
    },
  },
  plugins: [],
};
