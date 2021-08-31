module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        yellow: '2px solid #F59E0B',
      },
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
      },
      maxWidth: {
        '1/4': '25%',
        '4/12':"33%",
        '1/2': '50%',
        '3/4': '75%',
              },
              flex: {
                '1': '1 1 0%',
                auto: '1 1 auto',
               initial: '0 1 auto',
               inherit: 'inherit',
                none: 'none',
               '2': '2 2 0%',
               '1/2':'0.5 0.5 0%'
               
              }     
    },
  
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
}
