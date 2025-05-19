// export const content = [
//   "./src/**/*.{html,js,jsx,ts,tsx}",
// ];
// export const theme = {
//   extend: {},
// };
// export const plugins = [];
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary':"#5F6FFF"
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill,minmax(200px,1fr))'
      }
    },
  },
  plugins: [  

    ],
};
