module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        black:{
          nav:"#36393f"
        },
        gray:{
          inactive:"#72767D",
          active:"#2F3136",
          border:"#babec2"
        }
      },

      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
       '3': '3px',
        '4': '4px',
       '6': '6px',
       '8': '8px',
      }
    },
  
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
