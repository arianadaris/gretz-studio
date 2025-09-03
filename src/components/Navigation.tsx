import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme as useMuiTheme,
  useMediaQuery,
  Fade,
  Tooltip
} from '@mui/material';
import { Menu as MenuIcon, LightMode, DarkMode } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDarkMode } from '../hooks';

const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useMuiTheme();
  const { isDarkMode, toggleTheme } = useDarkMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    scrollToTop();
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Check if we're on the landing page (home)
  const isOnLandingPage = location.pathname === '/';

  const drawer = (
    <Box sx={{ 
      width: 250,
      backgroundColor: 'transparent',
      color: isDarkMode ? theme.palette.text.primary : theme.palette.text.primary
    }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ 
        p: 3, 
        borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : theme.palette.borders.medium}`,
        backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)'
      }}>
        <img 
          src="/logos/PrimaryLogo.svg" 
          alt="Gretz Studio" 
          style={{
            width: '100%',
            maxWidth: '200px',
            height: 'auto',
            filter: isDarkMode ? 'brightness(0) invert(1)' : 'none'
          }}
        />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.label} 
            button 
            onClick={() => handleNavigation(item.path)}
            sx={{
              backgroundColor: isActive(item.path) 
                ? (isDarkMode ? 'rgba(96, 165, 250, 0.15)' : 'rgba(74, 144, 226, 0.1)')
                : 'transparent',
              '&:hover': {
                backgroundColor: isDarkMode 
                  ? 'rgba(96, 165, 250, 0.1)' 
                  : 'rgba(74, 144, 226, 0.05)'
              }
            }}
          >
            <ListItemText 
              primary={item.label} 
              sx={{
                '& .MuiTypography-root': {
                  color: isActive(item.path) 
                    ? theme.palette.secondary.main 
                    : (isDarkMode ? theme.palette.text.primary : theme.palette.primary.main),
                  fontWeight: isActive(item.path) ? 600 : 400
                }
              }}
            />
          </ListItem>
        ))}
        <ListItem button onClick={toggleTheme}>
          <ListItemText 
            primary={isDarkMode ? 'Light Mode' : 'Dark Mode'} 
            sx={{
              '& .MuiTypography-root': {
                color: isDarkMode ? theme.palette.secondary.main : theme.palette.primary.main,
                fontWeight: 400
              }
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          backgroundColor: isDarkMode 
            ? 'rgba(15, 23, 42, 0.95)'
            : (isOnLandingPage 
                ? (scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent')
                : 'rgba(255, 255, 255, 0.95)'),
          backdropFilter: (isOnLandingPage && !scrolled) ? 'none' : 'blur(10px)',
          borderBottom: isOnLandingPage 
            ? (scrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none')
            : (isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)'),
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Fade in={true} timeout={1000}>
              <Box 
                sx={{ 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onClick={() => handleNavigation('/')}
              >
                <img 
                  src="/logos/PrimaryLogo.svg" 
                  alt="Gretz Studio" 
                  style={{
                    height: '60px',
                    width: 'auto',
                    padding: '8px 0',
                    filter: isDarkMode 
                      ? 'brightness(0) invert(1)'
                      : (isOnLandingPage && !scrolled ? 'brightness(0) invert(0.2)' : 'none')
                  }}
                />
              </Box>
            </Fade>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isMobile ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ 
                    color: isDarkMode
                      ? theme.palette.secondary.main
                      : (isOnLandingPage 
                          ? (scrolled ? theme.palette.primary.main : `${theme.palette.primary.main}90`)
                          : theme.palette.primary.main),
                    '&:hover': {
                      backgroundColor: isOnLandingPage 
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(50, 60, 85, 0.1)'
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {navItems.map((item) => (
                      <Button
                        key={item.label}
                        onClick={() => handleNavigation(item.path)}
                        sx={{
                          color: isDarkMode 
                            ? theme.palette.secondary.main
                            : (isOnLandingPage 
                                ? (scrolled ? theme.palette.primary.main : theme.palette.customText.light)
                                : theme.palette.primary.main),
                          fontWeight: isActive(item.path) ? 600 : 400,
                          textTransform: 'none',
                          fontSize: '1rem',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          backgroundColor: isActive(item.path)
                            ? isDarkMode
                              ? 'rgba(96, 165, 250, 0.05)'
                              : (isOnLandingPage
                                ? (scrolled ? 'rgba(74, 144, 226, 0.2)' : 'rgba(255, 255, 255, 0.2)')
                                : 'rgba(74, 144, 226, 0.2)')
                            : 'transparent',
                          '&:hover': {
                            backgroundColor: isDarkMode 
                              ? 'rgba(96, 165, 250, 0.05)' : isOnLandingPage
                              ? (scrolled ? 'rgba(74, 144, 226, 0.1)' : 'rgba(255, 255, 255, 0.3)')
                              : 'rgba(74, 144, 226, 0.1)',
                            transform: 'translateY(-1px)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </Box>
                  
                  {/* Dark mode toggle button - positioned to the right */}
                  <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                    <IconButton
                      onClick={toggleTheme}
                      sx={{
                        color: isDarkMode
                          ? theme.palette.secondary.main
                          : (isOnLandingPage 
                              ? (scrolled ? theme.palette.primary.main : theme.palette.customText.light)
                              : theme.palette.primary.main),
                        '&:hover': {
                          backgroundColor: isOnLandingPage
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(50, 60, 85, 0.1)',
                          transform: 'scale(1.1)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {isDarkMode ? <LightMode /> : <DarkMode />}
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            backgroundColor: isDarkMode ? 'rgba(15, 23, 42)' : theme.palette.background.paper,
            borderLeft: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navigation; 