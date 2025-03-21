/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/styles'

// Composables
import { ThemeDefinition, createVuetify } from 'vuetify'

const myTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#33627f',
    secondary: '#34997e',
    black: '#0f172a',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'myTheme',
    themes: {
      myTheme,
    },
  },
})
