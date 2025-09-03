import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

/**
 * Custom hook to easily check if dark mode is active and toggle it
 * @returns {Object} Object containing isDarkMode boolean and toggleTheme function
 * @example
 * const { isDarkMode, toggleTheme } = useDarkMode();
 * 
 * // Check if dark mode is active
 * if (isDarkMode) {
 *   // Apply dark mode styles
 * }
 * 
 * // Toggle theme
 * <Button onClick={toggleTheme}>Toggle Theme</Button>
 */
export const useDarkMode = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useDarkMode must be used within a ThemeProvider');
  }
  
  return {
    isDarkMode: context.isDarkMode,
    toggleTheme: context.toggleTheme
  };
};

export default useDarkMode;
