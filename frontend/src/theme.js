import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary:   { main: '#2A3E59' },  // Navy from logo
    secondary: { main: '#7B8D9F' },  // Slate-blue for header actions
    success:   { main: '#A7C957' },  // Green from packaging icons
    error:     { main: '#E85A4F' },  // Red for warning/destructive
    background:{ default: '#FFF8F1' },
  },
  shape: {
    borderRadius: 16, // More rounded 
  },
  typography: {
    fontFamily: 'Quicksand, Nunito, Roboto, sans-serif',
    h1: { fontFamily: 'Libre Baskerville, Baskerville, Times New Roman, Times, serif', fontWeight: 400 },
    h2: { fontFamily: 'Libre Baskerville, Baskerville, Times New Roman, Times, serif', fontWeight: 400 },
    h3: { fontFamily: 'Libre Baskerville, Baskerville, Times New Roman, Times, serif', fontWeight: 400 },
    h4: { fontFamily: 'Libre Baskerville, Baskerville, Times New Roman, Times, serif', fontWeight: 400 },
    h5: { fontFamily: 'Libre Baskerville, Baskerville, Times New Roman, Times, serif', fontWeight: 400 },
    h6: { fontFamily: 'Libre Baskerville, Baskerville, Times New Roman, Times, serif', fontWeight: 400 },
    button: {
      fontFamily: 'Quicksand, Nunito, Roboto, sans-serif',
      borderRadius: 16,
      fontWeight: 600,
    },
    body1: { fontFamily: 'Quicksand, Nunito, Roboto, sans-serif' },
    body2: { fontFamily: 'Quicksand, Nunito, Roboto, sans-serif' },
    subtitle1: { fontFamily: 'Quicksand, Nunito, Roboto, sans-serif' },
    subtitle2: { fontFamily: 'Quicksand, Nunito, Roboto, sans-serif' },
    overline: { fontFamily: 'Quicksand, Nunito, Roboto, sans-serif' },
    caption: { fontFamily: 'Quicksand, Nunito, Roboto, sans-serif' },
  },
});

export default theme;