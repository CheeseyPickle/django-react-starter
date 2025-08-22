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
