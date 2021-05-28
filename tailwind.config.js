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
    // fontSize: {
    //   xs: '0.75rem',
    //   sm: '0.875rem',
    //   base: '1rem',
    //   lg: '1.125rem',
    //   xl: '1.25rem',
    //   '2xl': '1.5rem',
    //   '3xl': '1.875rem',
    //   '4xl': '2.25rem',
    //   '5xl': '3rem',
    //   '6xl': '4rem',
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
        'red-blue-gradient': "url('/img/red-blue-gradient.jpg')",
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
        '90%': '90%',
      },
      maxWidth: {
        '90%': '90%',
      },
      colors: {
        primary: '#4882ff',
        'primary-disabled': '#7fa8ff;',
        aaa: '#aaa',
        666: '#666',
        '069': '#069',
      },
      fontFamily: {
        'arial-helvetica': ['Arial', 'Helvetica', 'sans-serif'],
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
