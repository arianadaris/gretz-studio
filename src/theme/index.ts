import { createTheme } from '@mui/material/styles';

// Brand fonts based on style guide
const customFonts = {
  milyuna: '"Milyuna", "Georgia", "Times", "Times New Roman", serif', // For H1, headlines, titles, quotes
  montserrat: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif', // For H2, H3, sub-headlines, body text
};

// Brand colors from style guide
const brandColors = {
  darkBlueGrey: '#323C55',
  lightPeach: '#FFB385',
  darkGrey: '#545454',
  veryLightBlueGrey: '#F0F4F8',
  mediumBlueGrey: '#526680',
  // New blue accent colors
  primaryBlue: '#4A90E2',
  lightBlue: '#7BB3F0',
  softBlue: '#E3F2FD',
  warmBlue: '#5B9BD5',
  accentBlue: '#64B5F6',
};

export const theme = createTheme({
  typography: {
    fontFamily: customFonts.montserrat, // Default body font
    h1: {
      fontFamily: customFonts.milyuna,
      fontWeight: 400,
      color: brandColors.darkBlueGrey,
    },
    h2: {
      fontFamily: customFonts.montserrat,
      fontWeight: 600,
      color: brandColors.darkBlueGrey,
    },
    h3: {
      fontFamily: customFonts.montserrat,
      fontWeight: 600,
      color: brandColors.darkBlueGrey,
    },
    h4: {
      fontFamily: customFonts.montserrat,
      fontWeight: 500,
      color: brandColors.darkBlueGrey,
    },
    h5: {
      fontFamily: customFonts.montserrat,
      fontWeight: 500,
      color: brandColors.darkBlueGrey,
    },
    h6: {
      fontFamily: customFonts.montserrat,
      fontWeight: 500,
      color: brandColors.darkBlueGrey,
    },
    body1: {
      fontFamily: customFonts.montserrat,
      color: brandColors.darkGrey,
    },
    body2: {
      fontFamily: customFonts.montserrat,
      color: brandColors.darkGrey,
    },
    button: {
      fontFamily: customFonts.montserrat,
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: brandColors.darkBlueGrey,
      light: brandColors.mediumBlueGrey,
      dark: brandColors.darkBlueGrey,
      contrastText: '#ffffff',
    },
    secondary: {
      main: brandColors.primaryBlue,
      light: brandColors.lightBlue,
      dark: brandColors.warmBlue,
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: brandColors.veryLightBlueGrey,
    },
    text: {
      primary: brandColors.darkBlueGrey,
      secondary: brandColors.darkGrey,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(50, 60, 85, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(50, 60, 85, 0.08)',
        },
      },
    },
  },
});

export default theme; 