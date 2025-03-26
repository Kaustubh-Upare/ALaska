import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <ThemeProvider theme={theme}  >
    <CssBaseline />
    <App />
    </ThemeProvider>
  </Provider>
)
