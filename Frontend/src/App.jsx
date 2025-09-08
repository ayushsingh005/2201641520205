import React from 'react'
import AppRouter from './routes/AppRouter'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#ff9800'
    },
  },
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  )
}
