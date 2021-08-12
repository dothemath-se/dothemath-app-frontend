module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.tsx', './src/**/*.css'],
  darkMode: false,
  theme: {
    extend: {
      transitionProperty: {
        'shadow-transform': 'shadow, transform',
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
      colors: {
        primary: '#4882ff',
        'primary-disabled': '#7fa8ff;',
      },
      fontFamily: {
        'arial-helvetica': ['Arial', 'Helvetica', 'sans-serif'],
        nunito: ['Nunito\\ Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
