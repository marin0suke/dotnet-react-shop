import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4fd1c5', // Aqua
    },
    secondary: {
      main: '#ffb74d', // Orange
    },
    info: {
      main: '#9575cd', // Purple
    },
    warning: {
      main: '#ffe082', // Yellow
    },
    background: {
      default: '#f9fafb', // Very light background
    },
  },
  shape: {
    borderRadius: 16, // More rounded
  },
  typography: {
    fontFamily: 'Nunito, Quicksand, Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: 1,
    },
    button: {
      borderRadius: 16,
      fontWeight: 600,
    },
  },
});

export default theme;