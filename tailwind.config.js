/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: { 
    themes: [
      {
        lightTheme: {
          primary: "#4a76a8",
          secondary: "#f4f4a1",
          accent: "#1be885",
          neutral: "#272136",
          "base-100": "#f8f9fa", // Changed to a softer off-white
          info: "#4a76a8", // Changed blue to a deeper shade
          success: "#23b893",
          warning: "#f79926",
          error: "#ea535a",
          body: {
            "background-color": "#edeff1", // Changed to a darker white
          },
        },
      },
    ],
  },
};
