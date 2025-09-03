import { createTheme } from '@mui/material/styles';

// Extend the Material-UI theme to include our custom admin color
declare module '@mui/material/styles' {
  interface Palette {
    admin: {
      main: string;
    };
    gradients: {
      primary: string;
      secondary: string;
      hero: string;
      card: string;
      overlay: string;
    };
    backgrounds: {
      light: string;
      veryLight: string;
      card: string;
      admin: string;
    };
    borders: {
      light: string;
      medium: string;
      field: string;
    };
    customText: {
      dark: string;
      medium: string;
      light: string;
      muted: string;
    };
    tagColors: {
      blue: string;
      green: string;
      teal: string;
      skyBlue: string;
      lilac: string;
      default: string;
    };
  }
  interface PaletteOptions {
    admin?: {
      main: string;
    };
    gradients?: {
      primary: string;
      secondary: string;
      hero: string;
      card: string;
      overlay: string;
    };
    backgrounds?: {
      light: string;
      veryLight: string;
      card: string;
      admin: string;
    };
    borders?: {
      light: string;
      medium: string;
      field: string;
    };
    customText?: {
      dark: string;
      medium: string;
      light: string;
      muted: string;
    };
    tagColors?: {
      blue: string;
      green: string;
      teal: string;
      skyBlue: string;
      lilac: string;
      default: string;
    };
  }
}

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
  // Admin main text color
  adminText: '#323C55',
  // Additional colors found throughout the codebase
  darkText: '#2D3748',
  mediumText: '#4A5568',
  lightText: '#7A7A7A',
  veryLightText: '#95A5A6',
  // Background colors
  lightBackground: '#F8FBFF',
  veryLightBackground: '#F0F8FF',
  cardBackground: '#E3F2FD',
  adminBackground: '#F0F8FF',
  // Border colors
  lightBorder: '#e0e0e0',
  mediumBorder: '#E2E8F0',
  // Tag colors
  tagBlue: '#4A90E2',
  tagGreen: '#4CAF50',
  tagTeal: '#4ECDC4',
  tagSkyBlue: '#45B7D1',
  tagLilac: '#C8A2C8',
  tagDefault: '#95A5A6',
  // Additional colors
  white: '#FFFFFF',
  black: '#000000',
  // Material-UI colors that are used
  materialPrimary: '#1976d2',
  materialSecondary: '#42a5f5',
};

// Dark mode color variants
const darkModeColors = {
  darkBlueGrey: '#1A1F2E',
  lightGreen: '#7FB069',
  darkGrey: '#B0B0B0',
  veryLightBlueGrey: '#1E293B',
  mediumBlueGrey: '#64748B',
  // Blue accent colors
  primaryBlue: '#60A5FA',
  lightBlue: '#93C5FD',
  softBlue: '#1E3A8A',
  warmBlue: '#3B82F6',
  accentBlue: '#2563EB',
  // Green accent colors
  primaryGreen: '#10B981',
  mediumGreen: '#34D399',
  softGreen: '#064E3B',
  warmGreen: '#059669',
  accentGreen: '#047857',
  // Teal colors
  teal: '#14B8A6',
  lightTeal: '#5EEAD4',
  softTeal: '#134E4A',
  // Text colors
  darkText: '#F1F5F9',
  mediumText: '#CBD5E1',
  lightText: '#94A3B8',
  veryLightText: '#64748B',
  // Background colors
  lightBackground: '#0F172A',
  veryLightBackground: '#1E293B',
  cardBackground: '#334155',
  adminBackground: '#1E293B',
  // Border colors
  lightBorder: '#334155',
  mediumBorder: '#475569',
  // Tag colors
  tagBlue: '#60A5FA',
  tagGreen: '#10B981',
  tagTeal: '#14B8A6',
  tagSkyBlue: '#06B6D4',
  tagLilac: '#C084FC',
  tagDefault: '#94A3B8',
  // Additional colors
  white: '#0F172A',
  black: '#FFFFFF',
  // Material-UI colors
  materialPrimary: '#60A5FA',
  materialSecondary: '#93C5FD',
};

const createLightTheme = () => createTheme({
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
    mode: 'light',
    primary: {
      main: brandColors.darkBlueGrey,
      light: brandColors.mediumBlueGrey,
      dark: brandColors.darkBlueGrey,
      contrastText: brandColors.white,
    },
    secondary: {
      main: brandColors.primaryBlue,
      light: brandColors.lightBlue,
      dark: brandColors.warmBlue,
      contrastText: brandColors.white,
    },
    background: {
      default: brandColors.white,
      paper: brandColors.veryLightBlueGrey,
    },
    text: {
      primary: brandColors.darkBlueGrey,
      secondary: brandColors.darkGrey,
    },
    admin: {
      main: brandColors.adminText,
    },
    // Custom color palette extensions
    gradients: {
      primary: `linear-gradient(135deg, ${brandColors.softGreen} 0%, ${brandColors.softBlue} 25%, ${brandColors.veryLightBackground} 75%, ${brandColors.softTeal} 100%)`,
      secondary: `linear-gradient(135deg, ${brandColors.white} 0%, ${brandColors.veryLightBackground} 100%)`,
      hero: `linear-gradient(135deg, ${brandColors.veryLightBackground} 0%, ${brandColors.softGreen} 100%)`,
      card: `linear-gradient(135deg, ${brandColors.white} 0%, ${brandColors.veryLightBackground} 100%)`,
      overlay: `linear-gradient(135deg, ${brandColors.veryLightBackground} 0%, ${brandColors.cardBackground} 20%)`,
    },
    backgrounds: {
      light: brandColors.lightBackground,
      veryLight: brandColors.veryLightBackground,
      card: brandColors.cardBackground,
      admin: brandColors.adminBackground,
    },
    borders: {
      light: brandColors.lightBorder,
      medium: brandColors.mediumBorder,
      field: brandColors.mediumBorder,
    },
    customText: {
      dark: brandColors.darkText,
      medium: brandColors.mediumText,
      light: brandColors.lightText,
      muted: brandColors.veryLightText,
    },
    tagColors: {
      blue: brandColors.tagBlue,
      green: brandColors.tagGreen,
      teal: brandColors.tagTeal,
      skyBlue: brandColors.tagSkyBlue,
      lilac: brandColors.tagLilac,
      default: brandColors.tagDefault,
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

const createDarkTheme = () => createTheme({
  typography: {
    fontFamily: customFonts.figtree,
    h1: {
      fontFamily: customFonts.bearNose,
      fontWeight: 400,
      color: darkModeColors.darkText,
    },
    h2: {
      fontFamily: customFonts.figtree,
      fontWeight: 600,
      color: darkModeColors.darkText,
    },
    h3: {
      fontFamily: customFonts.figtree,
      fontWeight: 600,
      color: darkModeColors.darkText,
    },
    h4: {
      fontFamily: customFonts.figtree,
      fontWeight: 500,
      color: darkModeColors.darkText,
    },
    h5: {
      fontFamily: customFonts.figtree,
      fontWeight: 500,
      color: darkModeColors.darkText,
    },
    h6: {
      fontFamily: customFonts.figtree,
      fontWeight: 500,
      color: darkModeColors.darkText,
    },
    body1: {
      fontFamily: customFonts.figtree,
      color: darkModeColors.mediumText,
    },
    body2: {
      fontFamily: customFonts.figtree,
      color: darkModeColors.mediumText,
    },
    button: {
      fontFamily: customFonts.figtree,
      fontWeight: 600,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: darkModeColors.primaryBlue,
      light: darkModeColors.lightBlue,
      dark: darkModeColors.warmBlue,
      contrastText: darkModeColors.white,
    },
    secondary: {
      main: darkModeColors.lightGreen,
      light: darkModeColors.mediumGreen,
      dark: darkModeColors.warmGreen,
      contrastText: darkModeColors.white,
    },
    background: {
      default: darkModeColors.lightBackground,
      paper: darkModeColors.veryLightBackground,
    },
    text: {
      primary: darkModeColors.darkText,
      secondary: darkModeColors.mediumText,
    },
    admin: {
      main: darkModeColors.darkText,
    },
    // Custom color palette extensions
    gradients: {
      primary: `linear-gradient(135deg, ${darkModeColors.softGreen} 0%, ${darkModeColors.softBlue} 25%, ${darkModeColors.veryLightBackground} 75%, ${darkModeColors.softTeal} 100%)`,
      secondary: `linear-gradient(135deg, ${darkModeColors.lightBackground} 0%, ${darkModeColors.veryLightBackground} 100%)`,
      hero: `linear-gradient(135deg, ${darkModeColors.veryLightBackground} 0%, ${darkModeColors.softGreen} 100%)`,
      card: `linear-gradient(135deg, ${darkModeColors.lightBackground} 0%, ${darkModeColors.veryLightBackground} 100%)`,
      overlay: `linear-gradient(135deg, ${darkModeColors.veryLightBackground} 0%, ${darkModeColors.cardBackground} 20%)`,
    },
    backgrounds: {
      light: darkModeColors.lightBackground,
      veryLight: darkModeColors.veryLightBackground,
      card: darkModeColors.cardBackground,
      admin: darkModeColors.adminBackground,
    },
    borders: {
      light: darkModeColors.lightBorder,
      medium: darkModeColors.mediumBorder,
      field: darkModeColors.mediumBorder,
    },
    customText: {
      dark: darkModeColors.darkText,
      medium: darkModeColors.mediumText,
      light: darkModeColors.lightText,
      muted: darkModeColors.veryLightText,
    },
    tagColors: {
      blue: darkModeColors.tagBlue,
      green: darkModeColors.tagGreen,
      teal: darkModeColors.tagTeal,
      skyBlue: darkModeColors.tagSkyBlue,
      lilac: darkModeColors.tagLilac,
      default: darkModeColors.tagDefault,
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
            boxShadow: '0 2px 8px rgba(96, 165, 250, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },
});

export const lightTheme = createLightTheme();
export const darkTheme = createDarkTheme();

// Legacy export for backward compatibility
export const theme = lightTheme;
export default lightTheme; 