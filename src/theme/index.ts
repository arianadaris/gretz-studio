import { createTheme } from '@mui/material/styles';

// Brand fonts based on style guide
const customFonts = {
  bearNose: '"BearNose", "Georgia", "Times", "Times New Roman", serif', // For H1, headlines, titles, quotes
  figtree: '"Figtree", "Roboto", "Helvetica", "Arial", sans-serif', // For H2, H3, sub-headlines, body text
};

// Brand colors from style guide
const brandColors = {
  darkBlueGrey: '#323C55',
  lightGreen: '#7FB069', // Replaced lightPeach with lightGreen
  darkGrey: '#545454',
  veryLightBlueGrey: '#F0F4F8',
  mediumBlueGrey: '#526680',
  // Blue accent colors
  primaryBlue: '#4A90E2',
  lightBlue: '#7BB3F0',
  softBlue: '#E3F2FD',
  warmBlue: '#5B9BD5',
  accentBlue: '#64B5F6',
  // New green accent colors
  primaryGreen: '#4CAF50',
  mediumGreen: '#81C784',
  softGreen: '#E8F5E8',
  warmGreen: '#66BB6A',
  accentGreen: '#66BB6A',
  // Additional blue-green colors
  teal: '#26A69A',
  lightTeal: '#4DB6AC',
  softTeal: '#E0F2F1',
};

export const theme = createTheme({
  typography: {
    fontFamily: customFonts.figtree, // Default body font
    h1: {
      fontFamily: customFonts.bearNose,
      fontWeight: 400,
      color: brandColors.darkBlueGrey,
    },
    h2: {
      fontFamily: customFonts.figtree,
      fontWeight: 600,
      color: brandColors.darkBlueGrey,
    },
    h3: {
      fontFamily: customFonts.figtree,
      fontWeight: 600,
      color: brandColors.darkBlueGrey,
    },
    h4: {
      fontFamily: customFonts.figtree,
      fontWeight: 500,
      color: brandColors.darkBlueGrey,
    },
    h5: {
      fontFamily: customFonts.figtree,
      fontWeight: 500,
      color: brandColors.darkBlueGrey,
    },
    h6: {
      fontFamily: customFonts.figtree,
      fontWeight: 500,
      color: brandColors.darkBlueGrey,
    },
    body1: {
      fontFamily: customFonts.figtree,
      color: brandColors.darkGrey,
    },
    body2: {
      fontFamily: customFonts.figtree,
      color: brandColors.darkGrey,
    },
    button: {
      fontFamily: customFonts.figtree,
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