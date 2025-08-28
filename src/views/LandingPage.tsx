import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';

import { useTheme } from '@mui/material/styles';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Star from '@mui/icons-material/Star';
import Brush from '@mui/icons-material/Brush';
import Palette from '@mui/icons-material/Palette';
import DesignServices from '@mui/icons-material/DesignServices';
import Mouse from '@mui/icons-material/Mouse';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import CheckCircle from '@mui/icons-material/CheckCircle';

import Assignment from '@mui/icons-material/Assignment';
import Celebration from '@mui/icons-material/Celebration';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Trigger animations on mount
    setTimeout(() => setIsVisible(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <Brush sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: 'Brand Identity Design',
      description: 'Create memorable brand identities that resonate with your audience and stand out in the market.'
    },
    {
      icon: <Palette sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: 'Visual Design',
      description: 'Stunning visual designs that capture attention and communicate your message effectively.'
    },
    {
      icon: <DesignServices sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: 'Creative Strategy',
      description: 'Strategic creative solutions that align with your business goals and drive results.'
    }
  ];



  const processSteps = [
    {
      icon: <Assignment sx={{ fontSize: 30, color: theme.palette.secondary.main }} />,
      title: 'Discovery',
      description: 'We start by understanding your vision, goals, and target audience to create a solid foundation.'
    },
    {
      icon: <Brush sx={{ fontSize: 30, color: theme.palette.secondary.main }} />,
      title: 'Design',
      description: 'Our creative team develops concepts and designs that align with your brand and objectives.'
    },
    {
      icon: <CheckCircle sx={{ fontSize: 30, color: theme.palette.secondary.main }} />,
      title: 'Refinement',
      description: 'We collaborate with you to refine and perfect every detail until it meets your vision.'
    },
    {
      icon: <Celebration sx={{ fontSize: 30, color: theme.palette.secondary.main }} />,
      title: 'Delivery',
      description: 'Final delivery with all assets and guidelines to ensure successful implementation.'
    }
  ];



  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FEFCF8' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #FFE5E5 0%, #FFF0F0 25%, #F0F8FF 75%, #E6F3FF 100%)',
          color: '#2D3748',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center'
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

         <Container maxWidth="lg">
           <Grid container spacing={6} alignItems="center">
             <Grid item xs={12} md={6}>
               <Fade in={isVisible} timeout={1000}>
                 <Box sx={{ mb: 4 }}>
                   <img 
                     src="/logos/PrimaryLogo.svg" 
                     alt="Ariana Daris Studio" 
                     style={{
                       width: '100%',
                       maxWidth: '400px',
                       height: 'auto',
                       filter: 'brightness(0) saturate(100%) invert(18%) sepia(8%) saturate(1234%) hue-rotate(202deg) brightness(95%) contrast(86%)',
                       transform: `translateY(${scrollY * 0.1}px)`,
                       transition: 'transform 0.1s ease-out'
                     }}
                   />
                 </Box>
               </Fade>
               <Slide direction="up" in={isVisible} timeout={1200}>
                 <Typography 
                   variant="body1" 
                   sx={{ 
                     mb: 6, 
                     fontSize: '1.3rem',
                     opacity: 0.85,
                     maxWidth: 500,
                     color: '#4A5568',
                     lineHeight: 1.6,
                     fontFamily: '"Georgia", serif'
                   }}
                 >
                   Where creativity meets excellence. We bring your creative dreams to life with passion and precision, crafting designs that feel like home.
                 </Typography>
               </Slide>
               <Slide direction="up" in={isVisible} timeout={1400}>
                 <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                   <Button 
                     variant="contained" 
                     size="large"
                     endIcon={<ArrowForward />}
                     onClick={() => navigate('/portfolio')}
                     sx={{ 
                       bgcolor: theme.palette.secondary.main, 
                       color: theme.palette.secondary.contrastText,
                       px: 4,
                       py: 1.5,
                       borderRadius: '25px',
                       boxShadow: `0 8px 25px ${theme.palette.secondary.main}4D`,
                       '&:hover': { 
                         bgcolor: theme.palette.secondary.dark,
                         transform: 'translateY(-3px)',
                         boxShadow: `0 12px 35px ${theme.palette.secondary.main}66`
                       },
                       transition: 'all 0.3s ease'
                     }}
                   >
                     Explore Our Work
                   </Button>
                   <Button 
                     variant="outlined" 
                     size="large"
                     onClick={() => navigate('/contact')}
                     sx={{ 
                       borderColor: theme.palette.secondary.main, 
                       color: theme.palette.secondary.main,
                       px: 4,
                       py: 1.5,
                       borderRadius: '25px',
                       borderWidth: '2px',
                       '&:hover': { 
                         borderColor: theme.palette.secondary.dark, 
                         bgcolor: `${theme.palette.secondary.main}0D`,
                         transform: 'translateY(-3px)',
                         boxShadow: `0 8px 25px ${theme.palette.secondary.main}33`
                       },
                       transition: 'all 0.3s ease'
                     }}
                   >
                     Get in Touch
                   </Button>
                 </Stack>
               </Slide>
             </Grid>
             <Grid item xs={12} md={6}>
                <Zoom in={isVisible} timeout={1600}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 400,
                      position: 'relative'
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 320, 
                        height: 320, 
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,248,248,0.8) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(15px)',
                        border: `3px solid ${theme.palette.secondary.main}33`,
                        position: 'relative',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        boxShadow: `0 25px 50px ${theme.palette.secondary.main}26`,
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: `0 35px 70px ${theme.palette.secondary.main}40`,
                          borderColor: `${theme.palette.secondary.main}66`
                        },
                        transition: 'all 0.4s ease',
                        animation: 'gentle-pulse 4s ease-in-out infinite',
                        '@keyframes gentle-pulse': {
                          '0%, 100%': { transform: 'scale(1)' },
                          '50%': { transform: 'scale(1.02)' }
                        }
                      }}
                    >
                      <img 
                        src="/logos/Headshot.jpg" 
                        alt="Ariana Daris Headshot" 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%'
                        }}
                      />
                    </Box>
                    {/* Floating decorative elements */}
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        animation: 'rotate 30s linear infinite',
                        '@keyframes rotate': {
                          '0%': { transform: 'rotate(0deg)' },
                          '100%': { transform: 'rotate(360deg)' }
                        }
                      }}
                    >
                      {[...Array(8)].map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            position: 'absolute',
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: i % 2 === 0 ? theme.palette.secondary.main : theme.palette.secondary.light,
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-200px)`,
                            opacity: 0.7,
                            animation: `float-${i} 4s ease-in-out infinite`,
                            [`@keyframes float-${i}`]: {
                              '0%, 100%': { 
                                opacity: 0.7, 
                                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-200px)` 
                              },
                              '50%': { 
                                opacity: 1, 
                                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-220px)` 
                              }
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Zoom>
              </Grid>
           </Grid>
         </Container>
         
         {/* Scroll Indicator */}
         <Box
           sx={{
             position: 'absolute',
             bottom: 40,
             left: '50%',
             transform: 'translateX(-50%)',
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             color: theme.palette.secondary.main,
             opacity: 0.8,
             animation: 'gentle-bounce 3s infinite',
             '@keyframes gentle-bounce': {
               '0%, 20%, 50%, 80%, 100%': { transform: 'translateX(-50%) translateY(0)' },
               '40%': { transform: 'translateX(-50%) translateY(-8px)' },
               '60%': { transform: 'translateX(-50%) translateY(-4px)' }
             }
           }}
         >
           <Mouse sx={{ fontSize: 24, mb: 1 }} />
           <Typography variant="caption" sx={{ fontSize: '0.8rem', fontFamily: '"Montserrat", serif' }}>
             Scroll to explore
           </Typography>
           <KeyboardArrowDown sx={{ fontSize: 20, mt: 0.5 }} />
         </Box>
       </Box>



      {/* Services Section */}
      <Box sx={{ py: 14, bgcolor: '#FEFCF8' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" sx={{ 
              fontWeight: 600, 
              color: '#2D3748', 
              mb: 3,
              fontFamily: '"Georgia", serif'
            }}>
              Our Services
            </Typography>
            <Typography variant="body1" sx={{ 
              fontSize: '1.3rem', 
              color: '#4A5568', 
              maxWidth: 600, 
              mx: 'auto',
              lineHeight: 1.6,
              fontFamily: '"Georgia", serif'
            }}>
              We offer comprehensive creative services to help your brand stand out and achieve its goals with warmth and authenticity.
            </Typography>
          </Box>
          
          <Grid container spacing={5}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Grow in={isVisible} timeout={600 + index * 200}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      p: 5,
                      textAlign: 'center',
                      border: '2px solid #F7FAFC',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F8 100%)',
                      boxShadow: `0 10px 30px ${theme.palette.secondary.main}1A`,
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: `0 25px 50px ${theme.palette.secondary.main}33`,
                        borderColor: theme.palette.secondary.main,
                        background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F8FF 100%)',
                      },
                      transition: 'all 0.4s ease'
                    }}
                  >
                    <Box sx={{ 
                      mb: 4,
                      p: 3,
                      borderRadius: '50%',
                      background: `${theme.palette.secondary.main}1A`,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {service.icon}
                    </Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 600, 
                      color: '#2D3748', 
                      mb: 3,
                      fontFamily: '"Georgia", serif'
                    }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#4A5568',
                      lineHeight: 1.6,
                      fontFamily: '"Montserrat", serif'
                    }}>
                      {service.description}
                    </Typography>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Process Section */}
      <Box sx={{ 
        py: 14, 
        background: 'linear-gradient(135deg, #F8F9FF 0%, #FFF8F8 100%)',
        position: 'relative'
      }}>
        {/* Decorative pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.2,
            background: `
              radial-gradient(circle at 20% 80%, ${theme.palette.secondary.main}1A 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${theme.palette.secondary.light}1A 0%, transparent 50%)
            `
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" sx={{ 
              fontWeight: 600, 
              color: '#2D3748', 
              mb: 3,
              fontFamily: '"Georgia", serif'
            }}>
              Our Process
            </Typography>
            <Typography variant="body1" sx={{ 
              fontSize: '1.3rem', 
              color: '#4A5568', 
              maxWidth: 600, 
              mx: 'auto',
              lineHeight: 1.6,
              fontFamily: '"Georgia", serif'
            }}>
              We follow a proven methodology to ensure every project is delivered on time and exceeds expectations with care and attention.
            </Typography>
          </Box>
          
          <Grid container spacing={5}>
            {processSteps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in={isVisible} timeout={800 + index * 200}>
                  <Box sx={{ textAlign: 'center', position: 'relative' }}>
                    <Box 
                      sx={{ 
                        width: 90, 
                        height: 90, 
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F8 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 4,
                        boxShadow: `0 15px 35px ${theme.palette.secondary.main}26`,
                        border: `3px solid ${theme.palette.secondary.main}`,
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: `0 20px 45px ${theme.palette.secondary.main}40`
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600, 
                      color: '#2D3748', 
                      mb: 3,
                      fontFamily: '"Georgia", serif'
                    }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#4A5568',
                      lineHeight: 1.6,
                      fontFamily: '"Montserrat", serif'
                    }}>
                      {step.description}
                    </Typography>
                    
                    {/* Connector line */}
                    {index < processSteps.length - 1 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 45,
                          right: -25,
                          width: 50,
                          height: 3,
                          background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
                          borderRadius: '2px',
                          display: { xs: 'none', md: 'block' },
                          opacity: 0.6
                        }}
                      />
                    )}
                  </Box>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>



      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 14, textAlign: 'center' }}>
        <Box sx={{ 
          p: 6, 
          borderRadius: '25px',
          background: 'linear-gradient(135deg, #FFF8F8 0%, #F8F9FF 100%)',
          border: `2px solid ${theme.palette.secondary.main}1A`,
          boxShadow: `0 20px 40px ${theme.palette.secondary.main}1A`
        }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              mb: 4, 
              fontWeight: 600, 
              color: '#2D3748',
              fontFamily: '"Georgia", serif'
            }}
          >
            Ready to Start Your Project?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 6, 
              fontSize: '1.3rem', 
              color: '#4A5568',
              lineHeight: 1.6,
              fontFamily: '"Georgia", serif'
            }}
          >
            Let's collaborate to bring your creative vision to life with warmth and authenticity. 
            Get in touch with us today to discuss your project.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/contact')}
              sx={{ 
                bgcolor: theme.palette.secondary.main, 
                color: theme.palette.secondary.contrastText,
                px: 5,
                py: 1.5,
                borderRadius: '25px',
                boxShadow: `0 10px 25px ${theme.palette.secondary.main}4D`,
                '&:hover': { 
                  bgcolor: theme.palette.secondary.dark,
                  transform: 'translateY(-3px)',
                  boxShadow: `0 15px 35px ${theme.palette.secondary.main}66`
                },
                transition: 'all 0.3s ease'
              }}
            >
              Start a Project
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/portfolio')}
              sx={{ 
                borderColor: theme.palette.secondary.main, 
                color: theme.palette.secondary.main,
                px: 5,
                py: 1.5,
                borderRadius: '25px',
                borderWidth: '2px',
                '&:hover': { 
                  borderColor: theme.palette.secondary.dark, 
                  bgcolor: `${theme.palette.secondary.main}0D`,
                  transform: 'translateY(-3px)',
                  boxShadow: `0 10px 25px ${theme.palette.secondary.main}33`
                },
                transition: 'all 0.3s ease'
              }}
            >
              View Portfolio
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage; 