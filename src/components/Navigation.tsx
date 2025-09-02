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
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
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
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ p: 3, borderBottom: '1px solid #E2E8F0' }}>
        <img 
          src="/logos/PrimaryLogo.svg" 
          alt="Gretz Tech" 
          style={{
            width: '100%',
            maxWidth: '200px',
            height: 'auto'
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
              backgroundColor: isActive(item.path) ? 'rgba(74, 144, 226, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(74, 144, 226, 0.05)'
              }
            }}
          >
            <ListItemText 
              primary={item.label} 
              sx={{
                '& .MuiTypography-root': {
                  color: isActive(item.path) ? theme.palette.secondary.main : '#323C55',
                  fontWeight: isActive(item.path) ? 600 : 400
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          backgroundColor: isOnLandingPage 
            ? (scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent')
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: (isOnLandingPage && !scrolled) ? 'none' : 'blur(10px)',
          borderBottom: isOnLandingPage 
            ? (scrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none')
            : '1px solid rgba(255, 255, 255, 0.2)',
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
                  alt="Gretz Tech" 
                  style={{
                    height: '60px',
                    width: 'auto',
                    padding: '8px 0',
                    filter: isOnLandingPage 
                      ? (scrolled ? 'none' : 'brightness(0) invert(0.2)')
                      : 'none'
                  }}
                />
              </Box>
            </Fade>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ 
                  color: isOnLandingPage 
                    ? (scrolled ? '#323C55' : '#323C5590')
                    : '#323C55',
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
              <Box sx={{ display: 'flex', gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      color: isOnLandingPage 
                        ? (scrolled ? '#323C55' : '#777')
                        : '#323C55',
                      fontWeight: isActive(item.path) ? 600 : 400,
                      textTransform: 'none',
                      fontSize: '1rem',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                                              backgroundColor: isActive(item.path) 
                          ? isOnLandingPage
                            ? (scrolled ? 'rgba(74, 144, 226, 0.2)' : 'rgba(255, 255, 255, 0.2)')
                            : 'rgba(74, 144, 226, 0.2)'
                          : 'transparent',
                      '&:hover': {
                        backgroundColor: isOnLandingPage
                          ? (scrolled ? 'rgba(74, 144, 226, 0.1)' : 'rgba(255, 255, 255, 0.1)')
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
            )}
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
            backgroundColor: 'white'
          }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navigation; 