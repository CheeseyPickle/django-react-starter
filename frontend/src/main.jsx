import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BoundsProvider } from './util/context/BoundsContext.jsx'
import App from './App.jsx'
import './index.css'

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Georgia, serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: "16px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: "monospace",
        },
      },
    },
  },
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BoundsProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BoundsProvider>
  </StrictMode>,
)
