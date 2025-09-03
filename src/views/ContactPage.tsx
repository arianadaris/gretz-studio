import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  TextField,
  Button,
  Stack,
  Chip,
  Fade,
  Grow,
  Slide,
  Zoom,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Email,
  Phone,
  Schedule,
  Send,
  CheckCircle,
  Business,
  Person,
  AutoAwesome
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import GradientBackground, { getGradient } from '../components/GradientBackground';

const ContactPage: React.FC = () => {
  const theme = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    setTimeout(() => setIsVisible(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    setSnackbar({
      open: true,
      message: 'Thank you for your message! We\'ll get back to you soon.',
      severity: 'success'
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: isMobile ? 24 : 30, color: theme.palette.secondary.main }} />,
      title: 'Email',
      details: 'hello@arianadarisstudio.com',
      description: 'Send us an email anytime'
    },
    {
      icon: <Phone sx={{ fontSize: isMobile ? 24 : 30, color: theme.palette.secondary.main }} />,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: <Schedule sx={{ fontSize: isMobile ? 24 : 30, color: theme.palette.secondary.main }} />,
      title: 'Business Hours',
      details: 'Monday - Friday',
      description: '9:00 AM - 6:00 PM EST'
    }
  ];

  const services = [
    'Brand Identity Design',
    'Website Design',
    'UI/UX Design',
    'Print Design',
    'Marketing Design',
    'Consultation'
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: isMobile ? 2 : 8 }}>
      {/* Hero Section */}
      <GradientBackground 
        type="hero"
        sx={{ 
          color: theme.palette.customText.dark,
          py: isMobile ? 6 : 12,
          minHeight: isMobile ? '15vh' : '20vh'
        }}
      >
        {/* Cozy Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.4,
            background: `
              radial-gradient(circle at 20% 80%, ${theme.palette.secondary.main}26 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${theme.palette.secondary.light}26 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, ${theme.palette.secondary.main}1A 0%, transparent 50%)
            `,
            animation: 'float 25s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '33%': { transform: 'translateY(-15px) rotate(120deg)' },
              '66%': { transform: 'translateY(-10px) rotate(240deg)' }
            }
          }}
        />
        
        {/* Decorative Elements */}
        {!isMobile && (
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              right: '10%',
              opacity: 0.6,
              animation: 'sparkle 3s ease-in-out infinite',
              '@keyframes sparkle': {
                '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
                '50%': { opacity: 1, transform: 'scale(1.1)' }
              }
            }}
          >
            <AutoAwesome sx={{ fontSize: 40, color: theme.palette.secondary.main }} />
          </Box>
        )}
        
        {!isMobile && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '20%',
              left: '5%',
              opacity: 0.4,
              animation: 'float 4s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-10px)' }
              }
            }}
          >
            <AutoAwesome sx={{ fontSize: 30, color: theme.palette.secondary.light }} />
          </Box>
        )}
        
        {!isMobile && (
          <Box
            sx={{
              position: 'absolute',
              top: '30%',
              left: '15%',
              opacity: 0.3,
              animation: 'sparkle 4.5s ease-in-out infinite',
              '@keyframes sparkle': {
                '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
                '50%': { opacity: 0.8, transform: 'scale(1.2)' }
              }
            }}
          >
            <AutoAwesome sx={{ fontSize: 25, color: theme.palette.secondary.main }} />
          </Box>
        )}
        
        {!isMobile && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '40%',
              right: '20%',
              opacity: 0.5,
              animation: 'float 6s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-15px)' }
              }
            }}
          >
            <AutoAwesome sx={{ fontSize: 20, color: theme.palette.secondary.light }} />
          </Box>
        )}
        
        <Container maxWidth="lg">
          <Fade in={isVisible} timeout={1000}>
                         <Typography 
               variant={isMobile ? "h3" : "h2"}
               component="h1" 
               align="center" 
               sx={{ 
                 mb: isMobile ? 2 : 4,  
                 mt: isMobile ? 4 : 0,
                 fontWeight: 700, 
                 color: theme.palette.customText.dark,
                 fontSize: isSmallMobile ? '1.8rem' : undefined,
                 fontFamily: '"BearNose", serif'
               }}
             >
               Get in Touch
             </Typography>
          </Fade>
          <Fade in={isVisible} timeout={1200}>
            <Typography 
              variant={isMobile ? "body2" : "h6"}
              align="center" 
              sx={{ 
                maxWidth: 800, 
                mx: 'auto', 
                opacity: 0.9,
                lineHeight: 1.6,
                color: theme.palette.customText.dark,
                px: isMobile ? 2 : 0,
                fontSize: isSmallMobile ? '0.9rem' : undefined
              }}
            >
              Ready to start your project? Let's discuss how we can help bring your 
              creative vision to life. We'd love to hear from you.
            </Typography>
          </Fade>
        </Container>
      </GradientBackground>

      {/* Contact Information */}
      <Container maxWidth="lg" sx={{ py: isMobile ? 6 : 12 }}>
        <Grid container spacing={isMobile ? 3 : 6}>
          {/* Contact Form */}
          <Grid item xs={12} lg={8}>
            <Fade in={isVisible} timeout={1500}>
              <Card sx={{ 
                p: isMobile ? 2.5 : 4, 
                height: 'fit-content',
                background: theme.palette.gradients.card,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': { 
                  boxShadow: `0 20px 40px ${theme.palette.primary.main}26`,
                  background: theme.palette.gradients.card
                }
              }}>
                <Typography 
                  variant={isMobile ? "h5" : "h4"}
                  component="h2" 
                  sx={{ 
                    mb: isMobile ? 2 : 4, 
                    fontWeight: 600, 
                    color: theme.palette.customText.dark,
                    fontSize: isSmallMobile ? '1.3rem' : undefined,
                    fontFamily: '"BearNose", serif'
                  }}
                >
                  Send us a Message
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: theme.palette.borders.medium },
                            '&:hover fieldset': { borderColor: theme.palette.secondary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: theme.palette.borders.medium },
                            '&:hover fieldset': { borderColor: theme.palette.secondary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Company (Optional)"
                        value={formData.company}
                        onChange={handleInputChange('company')}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: theme.palette.borders.medium },
                            '&:hover fieldset': { borderColor: theme.palette.secondary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number (Optional)"
                        value={formData.phone}
                        onChange={handleInputChange('phone')}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: theme.palette.borders.medium },
                            '&:hover fieldset': { borderColor: theme.palette.secondary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Service Interest"
                        value={formData.service}
                        onChange={handleInputChange('service')}
                        variant="outlined"
                        select
                        SelectProps={{
                          native: true,
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: theme.palette.borders.medium },
                            '&:hover fieldset': { borderColor: theme.palette.secondary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main }
                          }
                        }}
                      >
                        <option value=""></option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Project Details"
                        value={formData.message}
                        onChange={handleInputChange('message')}
                        required
                        multiline
                        rows={6}
                        variant="outlined"
                        placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: theme.palette.borders.medium },
                            '&:hover fieldset': { borderColor: theme.palette.secondary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        endIcon={<Send />}
                        sx={{
                          bgcolor: theme.palette.secondary.main,
                          color: 'white',
                          px: 4,
                          py: 1.5,
                          fontWeight: 600,
                          '&:hover': {
                            bgcolor: theme.palette.secondary.dark,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 25px ${theme.palette.secondary.main}30`
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Card>
            </Fade>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} lg={4}>
            <Fade in={isVisible} timeout={2000}>
              <Box>
                <Typography 
                  variant="h4" 
                  component="h2" 
                  sx={{ mb: 4, fontWeight: 600, color: theme.palette.customText.dark, fontFamily: '"BearNose", serif' }}
                >
                  Contact Information
                </Typography>
                <Stack spacing={3}>
                  {contactInfo.map((info, index) => (
                    <Grow in={isVisible} timeout={1200 + (index * 100)} key={index}>
                      <Card sx={{ 
                        p: 3,
                        background: theme.palette.gradients.card,
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': { 
                          transform: 'translateY(-4px)',
                          boxShadow: `0 12px 24px ${theme.palette.primary.main}26`,
                          background: theme.palette.gradients.card
                        }
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <Box sx={{ mt: 0.5 }}>
                            {info.icon}
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.customText.dark, mb: 1 }}>
                              {info.title}
                            </Typography>
                            <Typography variant="body1" sx={{ color: theme.palette.customText.medium, mb: 0.5 }}>
                              {info.details}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.customText.light }}>
                              {info.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Grow>
                  ))}
                </Stack>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>



      

      {/* Snackbar for form submission */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage; 