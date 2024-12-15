/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: "#ECFBEA", // Lightest green
          100: "#D1F5CB", // Lighter green
          200: "#A7EAA2", // Light green
          300: "#54C654", // Bright green
          400: "#23B523", // Vibrant green
          500: "#0AAD0A", // Default green
          600: "#088A08", // Slightly darker green
          700: "#066806", // Dark green
          800: "#055705", // Darker green
          900: "#044504", // Darkest green
        },
      },
      screens: {
        sm: "620px",
        md: "748px",
        lg: "1004px",
        xl: "1220px",
        "2xl": "1250px",
      },
    },
  },
  plugins: [],
};
