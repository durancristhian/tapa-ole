const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      },
      fontFamily: {
        body: ['Inter', ...defaultTheme.fontFamily.sans],
        oswald: ['Oswald', ...defaultTheme.fontFamily.sans],
        'roboto-condensed': [
          'Roboto Condensed',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
}
