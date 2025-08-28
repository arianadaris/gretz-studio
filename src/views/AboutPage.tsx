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
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    setTimeout(() => setIsVisible(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const personalInfo = {
    name: 'Ariana Daris',
    role: 'Creative Director & Founder',
    bio: 'I am passionate about creating meaningful brand experiences that connect with audiences and drive results. With a fresh perspective and dedication to excellence, I bring creativity and vision to every project.',
    avatar: '/logos/Headshot.jpg',
    skills: ['Brand Strategy', 'Creative Direction', 'Visual Design', 'Brand Identity', 'Digital Design', 'Creative Strategy']
  };

  const values = [
    {
      icon: <LightbulbIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: 'Innovation',
      description: 'We constantly push creative boundaries to deliver cutting-edge solutions.'
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: 'Empathy',
      description: 'We understand our clients\' needs and create solutions that truly resonate.'
    },
    {
      icon: <StarIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: 'Excellence',
      description: 'Every project receives our full attention to detail and commitment to quality.'
    }
  ];

  return (
    <Box sx={{ minHeight: '40vh', bgcolor: 'background.default', pt: 8 }}>
                    {/* Hero Section */}
       <Box 
         sx={{ 
           background: 'linear-gradient(135deg, #FFE5E5 0%, #FFF0F0 25%, #F0F8FF 75%, #E6F3FF 100%)',
           color: '#2D3748',
           py: 12,
           position: 'relative',
           overflow: 'hidden',
           minHeight: '40vh',
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
          <Fade in={isVisible} timeout={1000}>
            <Typography 
               variant="h2" 
               component="h1" 
               align="center" 
               sx={{ mb: 4, fontWeight: 700, color: '#2D3748' }}
             >
               About Our Studio
             </Typography>
          </Fade>
          <Fade in={isVisible} timeout={1200}>
            <Typography 
               variant="h6" 
               align="center" 
               sx={{ 
                 maxWidth: 800, 
                 mx: 'auto', 
                 opacity: 0.9,
                 lineHeight: 1.6,
                 color: '#2D3748'
               }}
             >
               I am a passionate creative professional dedicated to transforming ideas into 
               compelling visual experiences that inspire and connect.
             </Typography>
          </Fade>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in={isVisible} timeout={2000}>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ mb: 4, fontWeight: 600, color: 'text.primary' }}
              >
                Our Mission
              </Typography>
            </Fade>
            <Fade in={isVisible} timeout={3000}>
              <Typography 
                variant="body1" 
                sx={{ mb: 4, fontSize: '1.1rem', color: 'text.secondary', lineHeight: 1.8 }}
              >
                At Ariana Daris Studio, I believe that great design has the power to transform 
                businesses and inspire people. My mission is to create meaningful, beautiful, 
                and effective design solutions that help my clients achieve their goals.
              </Typography>
            </Fade>
            <Fade in={isVisible} timeout={3500}>
              <Typography 
                variant="body1" 
                sx={{ fontSize: '1.1rem', color: 'text.secondary', lineHeight: 1.8 }}
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
                    height: 400,
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
                      maxWidth: '400px',
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
       <Box sx={{ bgcolor: 'background.paper', py: 12 }}>
         <Container maxWidth="lg">
          <Fade in={scrollY > 400} timeout={800}>
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              sx={{ mb: 8, fontWeight: 600, color: 'text.primary' }}
            >
              Our Values
            </Typography>
          </Fade>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Grow in={scrollY > 500} timeout={1000 + (index * 200)}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      textAlign: 'center',
                      p: 4,
                      transition: 'all 0.3s ease-in-out',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,248,248,0.8) 100%)',
                      backdropFilter: 'blur(10px)',
                      '&:hover': { 
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${theme.palette.primary.main}26`,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)'
                      }
                    }}
                  >
                    <Box sx={{ mb: 3 }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
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
                      objectFit: 'cover'
                    }}
                  />
                </Avatar>
              </Box>
            </Grow>
          </Grid>
          <Grid item xs={12} md={8}>
            <Fade in={scrollY > 750} timeout={1200}>
              <Box>
                <Typography variant="h4" component="h3" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  {personalInfo.name}
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, color: 'secondary.main', fontWeight: 500 }}>
                  {personalInfo.role}
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.8, fontSize: '1.1rem' }}>
                  {personalInfo.bio}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
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

       {/* Get in Touch CTA Section */}
       <Box sx={{ 
         py: 14, 
         background: 'linear-gradient(135deg, #FFF8F8 0%, #F8F9FF 100%)',
         position: 'relative'
       }}>
         {/* Subtle pattern overlay */}
         <Box
           sx={{
             position: 'absolute',
             top: 0,
             left: 0,
             right: 0,
             bottom: 0,
             opacity: 0.3,
             background: `
               radial-gradient(circle at 25% 25%, ${theme.palette.secondary.main}1A 0%, transparent 50%),
               radial-gradient(circle at 75% 75%, ${theme.palette.secondary.light}1A 0%, transparent 50%)
             `
           }}
         />
         <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
           <Fade in={scrollY > 900} timeout={800}>
             <Box sx={{ 
               p: 6, 
               borderRadius: '25px',
               background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F8 100%)',
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
                 Let's collaborate to bring your creative vision to life. 
                 I'm excited to hear about your project and discuss how we can work together.
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
                   Get in Touch
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
           </Fade>
         </Container>
       </Box>
     </Box>
   );
 };

export default AboutPage; 