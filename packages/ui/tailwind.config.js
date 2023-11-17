module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    fontSize: {
      sm: ["12px", "23px"],
      base: ["14px", "27px"],
      lg: ["16px", "32px"],
    },
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        vapor: ["Vapor", "sans-serif"],
        capian: ["Capian", "sans-serif"],
      },
      colors: {
        "gray-1": "#333333",
        "gray-2": "#4F4F4F",
        "gray-3": "#828282",
        "gray-4": "#DFDFDF",
        "gray-6": "#F2F2F2",
        "gray-9": "#272727",
      },
      backgroundImage: {
        head: "url('/img/problem_head.png')",
        edge: "url('/img/hero_edge.png')",
        "problem-edge": "url('/img/problem_edge.png')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
}
