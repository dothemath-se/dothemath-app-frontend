module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.tsx', './src/**/*.css'],
  darkMode: false,
  theme: {
    // screens: {
    //   sm: { max: '470px' },
    //   md: { min: '471px', max: '700px' },
    //   lg: { min: '701px', max: '1250px' },
    //   xl: { min: '1250px' },
    // },
    extend: {
      transitionProperty: {
        'shadow-transform': 'shadow, transform',
      },
      borderWidth: {
        12: '12px',
      },
      boxShadow: {
        'dtm-10px': '0 0 10px 0 rgba(0, 0, 0, 0.3)',
        'dtm-15px': '0 0 15px 0 rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'paper-plane-solid': "url('/icons/paper-plane-solid.png')",
      },
      backgroundSize: {
        '60%': '60%',
      },
      spacing: {
        '5px': '5px',
        '10px': '10px',
        '20px': '20px',
        '40px': '40px',
        '800px': '800px',
        '18vh': '18vh',
        '50vh': '50vh',
        '90vh': '90vh',
        '15vw': '15vw',
        '20vw': '20vw',
        '80vw': '80vw',
        '90vw': '90vw',
        '95vw': '95vw',
        '2%': '2%',
        '48%': '48%',
      },
      maxWidth: {
        '90%': '90%',
      },
      colors: {
        primary: '#4882ff',
        aaa: '#aaa',
        666: '#666',
        '069': '#069',
      },
      fontFamily: {
        nunito: ['Nunito\\ Sans', 'sans-serif'],
      },
      fontSize: {
        '80%': '80%',
      },
      transitionDuration: {
        50: '50ms',
      },
      transitionTimingFunction: {
        ease: 'ease',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['active'],
      scale: ['active'],
      transitionDuration: ['active', 'hover'],
    },
  },
  plugins: [],
};
