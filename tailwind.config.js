// tailwind.config.js
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        lightGrey: "#A0ABC0",
        darkGrey: "#717D96",
        bgLight: "#F7F7F7",
        bgDark: "#1A202C",
        primary: "#1A202C",
        secondary: "#EDF0F7",
        darkGreen: "#00AC1D",
        lightGreen: "#4CAF5029",
        lightBlue: "#34AFF721",
        darkBlue: "#34AFF7",
        darkYellow: "#FE9D35",
        lightYellow: "#FFC10729",
        darkOrange: "#FF3D00",
        lightOrange: "#FF3D0029",
        red: "#FF5252",
        modal: "rgba(0,0,0,0.5)",
        base800: "#2D3648",
        test: "#F7F7F7",
        base300: "#E2E7F0",
      },
      backgroundImage: {
        "hero-pattern": "url('https://tailwindcss.com/img/card-top.jpg')",
      },
    },
  },
};
