import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import StarIcon from '@mui/icons-material/Star';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ContactCTA from '../components/ContactCTA';
import GradientBackground, { getGradient } from '../components/GradientBackground';
import { aboutService } from '../services/aboutService';
const AboutPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    setTimeout(() => setIsVisible(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [personalInfo, setPersonalInfo] = useState(aboutService.getPersonalInfo());
  const [husbandInfo, setHusbandInfo] = useState(aboutService.getHusbandInfo());

  useEffect(() => {
    setPersonalInfo(aboutService.getPersonalInfo());
    setHusbandInfo(aboutService.getHusbandInfo());
  }, []);

  const values = [
    {
      icon: <LightbulbIcon sx={{ fontSize: isMobile ? 32 : 40, color: theme.palette.secondary.main }} />,
      title: 'Innovation',
      description: 'We constantly push creative boundaries to deliver cutting-edge solutions.'
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: isMobile ? 32 : 40, color: theme.palette.secondary.main }} />,
      title: 'Empathy',
      description: 'We understand our clients\' needs and create solutions that truly resonate.'
    },
    {
      icon: <StarIcon sx={{ fontSize: isMobile ? 32 : 40, color: theme.palette.secondary.main }} />,
      title: 'Excellence',
      description: 'Every project receives our full attention to detail and commitment to quality.'
    }
  ];

  return (
    <Box sx={{ minHeight: '40vh', bgcolor: 'background.default', pt: isMobile ? 2 : 8 }}>
                    {/* Hero Section */}
       <GradientBackground 
         type="hero"
         sx={{ 
           py: isMobile ? 6 : 12,
           minHeight: isMobile ? '30vh' : '40vh'
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
                 color: theme.palette.admin.main,
                 fontSize: isSmallMobile ? '1.8rem' : undefined,
                 fontFamily: '"BearNose", serif'
               }}
             >
               About Our Studio
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
                 color: theme.palette.admin.main,
                 px: isMobile ? 2 : 0,
                 fontSize: isSmallMobile ? '0.9rem' : undefined
               }}
             >
               I am a passionate creative professional dedicated to transforming ideas into 
               compelling visual experiences that inspire and connect.
             </Typography>
          </Fade>
        </Container>
      </GradientBackground>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: isMobile ? 6 : 12 }}>
        <Grid container spacing={isMobile ? 4 : 8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in={isVisible} timeout={2000}>
              <Typography 
                variant={isMobile ? "h4" : "h3"}
                component="h2" 
                sx={{ 
                  mb: isMobile ? 2 : 4, 
                  fontWeight: 600, 
                  color: theme.palette.admin.main,
                  fontSize: isSmallMobile ? '1.5rem' : undefined,
                  fontFamily: '"BearNose", serif'
                }}
              >
                Our Mission
              </Typography>
            </Fade>
            <Fade in={isVisible} timeout={3000}>
              <Typography 
                variant={isMobile ? "body2" : "body1"}
                sx={{ 
                  mb: isMobile ? 2 : 4, 
                  fontSize: isMobile ? '1rem' : '1.1rem', 
                  color: 'text.secondary', 
                  lineHeight: 1.8 
                }}
              >
                At Gretz Tech, I believe that great design has the power to transform 
                businesses and inspire people. My mission is to create meaningful, beautiful, 
                and effective design solutions that help my clients achieve their goals.
              </Typography>
            </Fade>
            <Fade in={isVisible} timeout={3500}>
              <Typography 
                variant={isMobile ? "body2" : "body1"}
                sx={{ 
                  fontSize: isMobile ? '1rem' : '1.1rem', 
                  color: 'text.secondary', 
                  lineHeight: 1.8 
                }}
              >
                I combine strategic thinking with creative excellence to deliver designs that 
                not only look stunning but also drive results. Every project is an opportunity 
                to tell a story, solve a problem, and create something extraordinary.
              </Typography>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <Zoom in={isVisible} timeout={3500}>
                             <Box 
                                   sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: isMobile ? 300 : 400,
                    '@keyframes logoPulse': {
                      '0%, 100%': { 
                        transform: 'scale(1)',
                        filter: `drop-shadow(0 10px 20px ${theme.palette.primary.main}20)`
                      },
                      '50%': { 
                        transform: 'scale(1.05)',
                        filter: `drop-shadow(0 15px 30px ${theme.palette.primary.main}30)`
                      }
                    }
                  }}
               >
                 <img 
                   src="/logos/PrimaryLogo.svg" 
                   alt="Studio Mission" 
                                       style={{
                      width: '100%',
                      maxWidth: isMobile ? '300px' : '400px',
                      height: 'auto',
                      animation: 'logoPulse 4s ease-in-out infinite'
                    }}
                 />
               </Box>
            </Zoom>
          </Grid>
        </Grid>
      </Container>

             {/* Values Section */}
       <Box sx={{ bgcolor: 'background.paper', py: isMobile ? 6 : 12 }}>
         <Container maxWidth="lg">
          <Fade in={scrollY > 400} timeout={800}>
            <Typography 
              variant={isMobile ? "h4" : "h3"}
              component="h2" 
              align="center" 
              sx={{ 
                mb: isMobile ? 4 : 8, 
                fontWeight: 600, 
                color: theme.palette.admin.main,
                fontSize: isSmallMobile ? '1.5rem' : undefined,
                fontFamily: '"BearNose", serif'
              }}
            >
              Our Values
            </Typography>
          </Fade>
          <Grid container spacing={isMobile ? 2 : 4}>
            {values.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Grow in={scrollY > 500} timeout={1000 + (index * 200)}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      textAlign: 'center',
                      p: 4,
                      transition: 'all 0.3s ease-in-out',
                      background: getGradient('card'),
                      backdropFilter: 'blur(10px)',
                      '&:hover': { 
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${theme.palette.primary.main}26`,
                        background: getGradient('cardHover')
                      }
                    }}
                  >
                    <Box sx={{ mb: 3 }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600, color: theme.palette.admin.main }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                      {value.description}
                    </Typography>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Personal Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={4}>
            <Grow in={scrollY > 700} timeout={1000}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 200, 
                    height: 200, 
                    mx: 'auto', 
                    mb: 3,
                    bgcolor: 'background.paper'
                  }}
                >
                  <img 
                    src={personalInfo.avatar} 
                    alt={personalInfo.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: 'scale(3.5) translateY(50px) translateX(-2px)'
                    }}
                  />
                </Avatar>
              </Box>
            </Grow>
          </Grid>
          <Grid item xs={12} md={8}>
            <Fade in={scrollY > 750} timeout={1200}>
              <Box>
                <Typography variant="h4" component="h3" sx={{ mb: 2, fontWeight: 600, color: theme.palette.admin.main }}>
                  {personalInfo.name}
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, color: 'secondary.main', fontWeight: 500 }}>
                  {personalInfo.role}
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.8, fontSize: '1.1rem' }}>
                  {personalInfo.bio}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.admin.main, fontFamily: '"Figtree", serif' }}>
                  Specializations
                </Typography>
                <Grid container spacing={1} sx={{ mb: 3 }}>
                  {personalInfo.skills.map((skill, skillIndex) => (
                    <Grid item key={skillIndex}>
                      <Chip 
                        label={skill} 
                        size="medium" 
                        sx={{ 
                          bgcolor: `${theme.palette.secondary.main}1A`, 
                          color: 'secondary.main',
                          fontWeight: 500,
                        }} 
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          </Grid>
        </Grid>
             </Container>

      {/* Husband Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={8}>
            <Fade in={scrollY > 900} timeout={1400}>
              <Box>
                <Typography variant="h4" component="h3" sx={{ mb: 2, fontWeight: 600, color: theme.palette.admin.main }}>
                  {husbandInfo.name}
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, color: 'secondary.main', fontWeight: 500 }}>
                  {husbandInfo.role}
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.8, fontSize: '1.1rem' }}>
                  {husbandInfo.bio}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.admin.main, fontFamily: '"Figtree", serif' }}>
                  What He Brings
                </Typography>
                <Grid container spacing={1} sx={{ mb: 3 }}>
                  {husbandInfo.skills.map((skill, skillIndex) => (
                    <Grid item key={skillIndex}>
                      <Chip 
                        label={skill} 
                        size="medium" 
                        sx={{ 
                          bgcolor: `${theme.palette.secondary.main}1A`, 
                          color: 'secondary.main',
                          fontWeight: 500,
                        }} 
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grow in={scrollY > 950} timeout={1600}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 200, 
                    height: 200, 
                    mx: 'auto', 
                    mb: 3,
                    bgcolor: 'background.paper',
                    border: `3px solid ${theme.palette.primary.main}20`
                  }}
                >
                  <img 
                    src={husbandInfo.avatar} 
                    alt={husbandInfo.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: 'scale(2) translateY(45px)'
                    }}
                  />
                </Avatar>
              </Box>
            </Grow>
          </Grid>
        </Grid>
      </Container>

       {/* Get in Touch CTA Section */}
       <ContactCTA 
         title="Ready to Start Your Project?"
         description="Let's collaborate to bring your creative vision to life. I'm excited to hear about your project and discuss how we can work together."
         primaryButtonText="Get in Touch"
         secondaryButtonText="View Portfolio"
         scrollY={scrollY}
       />
     </Box>
   );
 };

export default AboutPage; 