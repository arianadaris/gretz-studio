import React from 'react';
import Box from '@mui/material/Box';
import { Theme, useTheme } from '@mui/material/styles';

export type GradientType = 
  | 'hero' 
  | 'card' 
  | 'cardHover' 
  | 'section' 
  | 'sectionAlt' 
  | 'button' 
  | 'custom';

interface GradientBackgroundProps {
  type?: GradientType;
  children: React.ReactNode;
  customGradient?: string;
  sx?: any;
  minHeight?: string | number;
  py?: number;
  px?: number;
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  position?: string;
  overflow?: string;
  color?: string;
}

// Utility function to get gradient strings for use in sx props
export const getGradient = (gradientType: GradientType, theme?: Theme): string => {
  if (theme) {
    switch (gradientType) {
      case 'hero':
        return theme.palette.gradients.primary;
      
      case 'card':
        return theme.palette.gradients.card;
      
      case 'cardHover':
        return theme.palette.gradients.secondary;
      
      case 'section':
        return theme.palette.gradients.secondary;
      
      case 'sectionAlt':
        return theme.palette.gradients.hero;
      
      case 'button':
        return `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`;
      
      case 'custom':
        return theme.palette.gradients.primary;
      
      default:
        return theme.palette.gradients.primary;
    }
  }
  
  // Fallback gradients if theme is not available - using CSS custom properties for theme awareness
  switch (gradientType) {
    case 'hero':
      return 'linear-gradient(135deg, var(--soft-green, #E8F5E8) 0%, var(--soft-blue, #E3F2FD) 25%, var(--very-light-bg, #F0F8FF) 75%, var(--soft-teal, #E0F2F1) 100%)';
    
    case 'card':
      return 'linear-gradient(135deg, var(--white, rgba(255,255,255,0.9)) 0%, var(--very-light-bg, rgba(255,248,248,0.8)) 100%)';
    
    case 'cardHover':
      return 'linear-gradient(135deg, var(--white, rgba(255,255,255,0.95)) 0%, var(--very-light-bg, rgba(248,250,252,0.9)) 100%)';
    
    case 'section':
      return 'linear-gradient(135deg, var(--white, #FFFFFF) 0%, var(--very-light-bg, #F0F8FF) 100%)';
    
    case 'sectionAlt':
      return 'linear-gradient(135deg, var(--very-light-bg, #F0F8FF) 0%, var(--soft-green, #E8F5E8) 100%)';
    
    case 'button':
      return 'linear-gradient(90deg, var(--primary-blue, #1976d2) 0%, var(--secondary-blue, #42a5f5) 100%)';
    
    case 'custom':
      return 'linear-gradient(135deg, var(--soft-green, #E8F5E8) 0%, var(--soft-blue, #E3F2FD) 25%, var(--very-light-bg, #F0F8FF) 75%, var(--soft-teal, #E0F2F1) 100%)';
    
    default:
      return 'linear-gradient(135deg, var(--soft-green, #E8F5E8) 0%, var(--soft-blue, #E3F2FD) 25%, var(--very-light-bg, #F0F8FF) 75%, var(--soft-teal, #E0F2F1) 100%)';
  }
};

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  type = 'hero',
  children,
  customGradient,
  sx = {},
  minHeight,
  py,
  px,
  display,
  alignItems,
  justifyContent,
  position,
  overflow,
  color,
  ...props
}) => {
  const theme = useTheme();
  
  const defaultStyles = {
    background: getGradient(type, theme),
    minHeight: minHeight || (type === 'hero' ? '40vh' : 'auto'),
    py: py || (type === 'hero' ? 12 : 0),
    px: px || 0,
    display: display || (type === 'hero' ? 'flex' : 'block'),
    alignItems: alignItems || (type === 'hero' ? 'center' : 'stretch'),
    justifyContent: justifyContent || 'flex-start',
    position: position || 'relative',
    overflow: overflow || 'hidden',
    color: color || (type === 'hero' ? theme.palette.customText.dark : 'inherit'),
    ...sx
  };

  return (
    <Box
      sx={defaultStyles}
      {...props}
    >
      {children}
    </Box>
  );
};

export default GradientBackground;
