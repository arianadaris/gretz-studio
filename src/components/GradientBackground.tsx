import React from 'react';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';

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
  switch (gradientType) {
    case 'hero':
      return 'linear-gradient(135deg, #E8F5E8 0%, #E3F2FD 25%, #F0F8FF 75%, #E0F2F1 100%)';
    
    case 'card':
      return 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,248,248,0.8) 100%)';
    
    case 'cardHover':
      return 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)';
    
    case 'section':
      return 'linear-gradient(135deg, #FFFFFF 0%, #F0F8FF 100%)';
    
    case 'sectionAlt':
      return 'linear-gradient(135deg, #F0F8FF 0%, #E8F5E8 100%)';
    
    case 'button':
      return 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)';
    
    case 'custom':
      return 'linear-gradient(135deg, #E8F5E8 0%, #E3F2FD 25%, #F0F8FF 75%, #E0F2F1 100%)';
    
    default:
      return 'linear-gradient(135deg, #E8F5E8 0%, #E3F2FD 25%, #F0F8FF 75%, #E0F2F1 100%)';
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
  const defaultStyles = {
    background: getGradient(type),
    minHeight: minHeight || (type === 'hero' ? '40vh' : 'auto'),
    py: py || (type === 'hero' ? 12 : 0),
    px: px || 0,
    display: display || (type === 'hero' ? 'flex' : 'block'),
    alignItems: alignItems || (type === 'hero' ? 'center' : 'stretch'),
    justifyContent: justifyContent || 'flex-start',
    position: position || 'relative',
    overflow: overflow || 'hidden',
    color: color || (type === 'hero' ? '#2D3748' : 'inherit'),
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
