import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/styles'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './main.scss'
import './yup.js'

const theme = createTheme({
  breakpoints: {
    values: {},
  },
})

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)
