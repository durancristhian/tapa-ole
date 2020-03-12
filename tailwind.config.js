const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    fontFamily: {
      body: ['Inter', ...defaultTheme.fontFamily.sans],
      oswald: ['Oswald', ...defaultTheme.fontFamily.sans],
      'roboto-condensed': ['Roboto Condensed', ...defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    opacity: ['disabled'],
  },
}
