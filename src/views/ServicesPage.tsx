import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { 
  Brush,
  Palette,
  DesignServices,
  Web,
  Smartphone,
  Print,
  Business,
  Check,
  ExpandMore,
  Star,
  ArrowForward,
  AutoAwesome
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import ContactCTA from '../components/ContactCTA';

const ServicesPage: React.FC = () => {
  const theme = useTheme();
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

  const services = [
    {
      icon: <Web sx={{ fontSize: isMobile ? 32 : 50, color: theme.palette.secondary.main }} />,
      title: 'Starter Site',
      subtitle: 'Polished 1–3 page brochure site',
      description: 'Perfect for small businesses and startups looking for a professional online presence.',
      scope: [
        'Strategy mini',
        'Design',
        'Build',
        'Basic CMS',
        'Forms',
        'Analytics'
      ],
      timeline: '~2–3 weeks',
      investment: '$1.2k–$2.5k',
    },
    {
      icon: <DesignServices sx={{ fontSize: isMobile ? 32 : 50, color: theme.palette.secondary.main }} />,
      title: 'Brand Website',
      subtitle: 'Custom site for a boutique brand (5–8 pages)',
      description: 'Comprehensive website solution for established brands looking to elevate their digital presence.',
      scope: [
        'Full discovery',
        'Design system',
        'CMS',
        'Tasteful animations'
      ],
      timeline: '~4–8 weeks',
      investment: '$3k–$6k',
    },
    {
      icon: <Business sx={{ fontSize: isMobile ? 32 : 50, color: theme.palette.secondary.main }} />,
      title: 'E‑commerce Lite',
      subtitle: 'Services or small catalog with checkout',
      description: 'Complete e-commerce solution for businesses ready to sell online.',
      scope: [
        '5–10 products/services',
        'Payments',
        'Tax/shipping config'
      ],
      timeline: '~5–8 weeks',
      investment: '$4k–$8k',
    },
    
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We start by understanding your business, goals, and target audience to create a strategic foundation.'
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'We develop a comprehensive design strategy that aligns with your business objectives.'
    },
    {
      number: '03',
      title: 'Design',
      description: 'Our creative team brings your vision to life with innovative and effective design solutions.'
    },
    {
      number: '04',
      title: 'Review',
      description: 'We collaborate with you through multiple review cycles to ensure the design meets your expectations.'
    },
    {
      number: '05',
      title: 'Delivery',
      description: 'We deliver final files and provide guidance on implementation and usage.'
    }
  ];

  return (
    <Box sx={{ minHeight: '40vh', bgcolor: 'background.default', pt: isMobile ? 2 : 8 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #FFE5E5 0%, #FFF0F0 25%, #F0F8FF 75%, #E6F3FF 100%)',
          color: '#2D3748',
          py: isMobile ? 3 : 12,
          position: 'relative',
          overflow: 'hidden',
          minHeight: isMobile ? '25vh' : '40vh',
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
              variant={isMobile ? "h4" : "h2"}
              component="h1" 
              align="center" 
              sx={{ 
                mb: isMobile ? 1 : 4,  
                mt: isMobile ? 4 : 0,
                fontWeight: 700, 
                color: '#2D3748',
                fontSize: isSmallMobile ? '1.5rem' : undefined
              }}
            >
              Our Services
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
                color: '#2D3748',
                px: isMobile ? 2 : 0,
                fontSize: isSmallMobile ? '0.9rem' : undefined
              }}
            >
              Comprehensive design solutions tailored to your unique needs. 
              From brand identity to digital experiences, we help you stand out.
            </Typography>
          </Fade>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" sx={{ py: isMobile ? 3 : 12 }}>
        <Fade in={isVisible} timeout={1500}>
          <Typography 
            variant={isMobile ? "h5" : "h3"}
            component="h2" 
            align="center" 
            sx={{ 
              mb: isMobile ? 2 : 8, 
              fontWeight: 600, 
              color: 'text.primary',
              fontSize: isSmallMobile ? '1.4rem' : undefined
            }}
          >
            What We Offer
          </Typography>
        </Fade>
        <Grid container spacing={isMobile ? 1.5 : 4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Grow in={isVisible} timeout={2000 + (index * 250)}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,248,248,0.8) 100%)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': { 
                      transform: isMobile ? 'none' : 'translateY(-8px)',
                      boxShadow: `0 20px 40px ${theme.palette.primary.main}26`,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)'
                    }
                  }}
                >
                  <CardContent sx={{ 
                    p: isMobile ? 1.5 : 4, 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column' 
                  }}>
                    {/* Fixed height header section */}
                    <Box sx={{ 
                      textAlign: 'center', 
                      mb: isMobile ? 1 : 3, 
                      minHeight: isMobile ? 40 : 80 
                    }}>
                      {service.icon}
                    </Box>
                    <Typography 
                      variant={isMobile ? "h6" : "h6"}
                      component="h3" 
                      sx={{ 
                        mb: 0.5, 
                        fontWeight: 600, 
                        color: 'text.primary', 
                        textAlign: 'center',
                        lineHeight: 1.3,
                        fontSize: isSmallMobile ? '1rem' : undefined
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: isMobile ? 1 : 2, 
                        color: theme.palette.secondary.main, 
                        fontWeight: 500, 
                        textAlign: 'center',
                        fontSize: isMobile ? '0.75rem' : '0.9rem'
                      }}
                    >
                      {service.subtitle}
                    </Typography>
                    
                    {/* Fixed height description section */}
                    <Box sx={{ 
                      mb: isMobile ? 1.5 : 3, 
                      minHeight: isMobile ? 40 : 60, 
                      display: 'flex', 
                      alignItems: 'center' 
                    }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary', 
                          lineHeight: 1.5,
                          fontSize: isMobile ? '0.75rem' : undefined
                        }}
                      >
                        {service.description}
                      </Typography>
                    </Box>
                    
                    {/* Fixed height scope section */}
                    <Box sx={{ 
                      mb: isMobile ? 1.5 : 3, 
                      minHeight: isMobile ? 120 : 200,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isMobile ? 'center' : 'flex-start'
                    }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mb: isMobile ? 1 : 2, 
                          fontWeight: 600, 
                          color: 'text.primary',
                          fontSize: isMobile ? '0.75rem' : '0.9rem'
                        }}
                      >
                        Scope:
                      </Typography>
                      <List dense sx={{ py: 0 }}>
                        {service.scope.map((item, itemIndex) => (
                          <ListItem key={itemIndex} sx={{ px: 0, py: isMobile ? 0.25 : 1 }}>
                            <ListItemIcon sx={{ minWidth: isMobile ? 20 : 30 }}>
                              <Check sx={{ 
                                color: theme.palette.secondary.main, 
                                fontSize: isMobile ? 14 : 20 
                              }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={item} 
                              sx={{ 
                                '& .MuiTypography-root': { 
                                  fontSize: isMobile ? '0.7rem' : '0.9rem',
                                  color: 'text.secondary'
                                } 
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    
                    {/* Bottom section with pricing, timeline, and button */}
                    <Box sx={{ mt: 'auto' }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: theme.palette.secondary.main, 
                          fontWeight: 600, 
                          textAlign: 'center',
                          mb: 0.5,
                          fontSize: isMobile ? '1rem' : undefined
                        }}
                      >
                        {service.investment}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mb: isMobile ? 1 : 2, 
                          fontWeight: 600, 
                          color: 'text.primary',
                          fontSize: isMobile ? '0.7rem' : '0.9rem',
                          textAlign: 'center'
                        }}
                      >
                        Timeline: {service.timeline}
                      </Typography>
                      <Button 
                        variant="outlined" 
                        fullWidth
                        endIcon={<ArrowForward />}
                        size={isMobile ? "small" : "medium"}
                        sx={{ 
                          borderColor: theme.palette.secondary.main, 
                          color: theme.palette.secondary.main,
                          fontSize: isMobile ? '0.75rem' : undefined,
                          py: isMobile ? 0.5 : undefined,
                          '&:hover': { 
                            borderColor: theme.palette.secondary.dark, 
                            bgcolor: `${theme.palette.secondary.main}0A`
                          }
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Process Section */}
      <Box sx={{ bgcolor: 'background.paper', py: isMobile ? 3 : 12 }}>
        <Container maxWidth="lg">
          <Fade in={scrollY > 400} timeout={800}>
            <Typography 
              variant={isMobile ? "h5" : "h3"}
              component="h2" 
              align="center" 
              sx={{ 
                mb: isMobile ? 2 : 8, 
                fontWeight: 600, 
                color: 'text.primary',
                fontSize: isSmallMobile ? '1.4rem' : undefined
              }}
            >
              Our Process
            </Typography>
          </Fade>
          <Grid container spacing={isMobile ? 2 : 4}>
            {processSteps.map((step, index) => (
              <Grid item xs={12} md={6} lg={2.4} key={index}>
                <Fade in={scrollY > 1200 + (index * 10)} timeout={1000 + (index * 100)}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box 
                      sx={{ 
                        width: isMobile ? 45 : 80, 
                        height: isMobile ? 45 : 80, 
                        borderRadius: '50%',
                        bgcolor: theme.palette.secondary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: isMobile ? 1 : 3,
                        color: 'white',
                        fontWeight: 700,
                        fontSize: isMobile ? '0.9rem' : '1.5rem'
                      }}
                    >
                      {step.number}
                    </Box>
                    <Typography 
                      variant={isMobile ? "h6" : "h6"}
                      component="h3" 
                      sx={{ 
                        mb: isMobile ? 0.5 : 2, 
                        fontWeight: 600, 
                        color: 'text.primary',
                        fontSize: isSmallMobile ? '1rem' : undefined
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary', 
                        lineHeight: 1.6,
                        fontSize: isMobile ? '0.75rem' : undefined
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: isMobile ? 3 : 12 }}>
        <Fade in={scrollY > 600} timeout={800}>
          <Typography 
            variant={isMobile ? "h5" : "h3"}
            component="h2" 
            align="center" 
            sx={{ 
              mb: isMobile ? 2 : 8, 
              fontWeight: 600, 
              color: 'text.primary',
              fontSize: isSmallMobile ? '1.4rem' : undefined
            }}
          >
            Frequently Asked Questions
          </Typography>
        </Fade>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {[
            {
              question: 'How long does a typical project take?',
              answer: 'Project timelines vary depending on scope and complexity. A simple logo design might take 2-3 weeks, while a complete brand identity could take 6-8 weeks. We\'ll provide a detailed timeline during our initial consultation.'
            },
            {
              question: 'Do you work with clients remotely?',
              answer: 'Yes! We work with clients worldwide and have streamlined our process to be fully remote. We use video calls, project management tools, and cloud-based file sharing to ensure smooth collaboration.'
            },
            {
              question: 'What\'s included in your pricing?',
              answer: 'Our pricing includes all design work, revisions (within agreed scope), final files in multiple formats, and basic usage guidelines. Additional services like printing coordination or extended support are quoted separately.'
            },
            {
              question: 'How many revisions are included?',
              answer: 'We typically include 2-3 rounds of revisions in our standard packages. This ensures we get your design exactly right while maintaining project efficiency. Additional revisions can be added if needed.'
            },
            {
              question: 'Do you provide ongoing support?',
              answer: 'Yes, we offer ongoing support packages for clients who need regular design work or assistance with their brand. We can also provide training on how to use your brand assets effectively.'
            }
          ].map((faq, index) => (
            <Fade in={scrollY > 700 + (index * 50)} timeout={1000 + (index * 100)} key={index}>
              <Accordion 
                sx={{ 
                  mb: isMobile ? 0.5 : 2,
                  '&:before': { display: 'none' },
                  boxShadow: `0 2px 8px ${theme.palette.primary.main}1A`,
                  borderRadius: 2
                }}
              >
                <AccordionSummary 
                  expandIcon={<ExpandMore />}
                  sx={{ 
                    '& .MuiAccordionSummary-content': { 
                      my: isMobile ? 0.5 : 2 
                    }
                  }}
                >
                  <Typography 
                    variant={isMobile ? "body2" : "h6"} 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'text.primary',
                      fontSize: isSmallMobile ? '0.9rem' : undefined
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: isMobile ? 0 : undefined }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary', 
                      lineHeight: 1.6,
                      fontSize: isMobile ? '0.8rem' : undefined
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Fade>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <ContactCTA 
        title="Ready to Get Started?"
        description="Let's discuss your project and see how we can help bring your vision to life. Schedule a free consultation to get started."
        primaryButtonText="Schedule Consultation"
        secondaryButtonText="View Portfolio"
        scrollY={scrollY}
      />
    </Box>
  );
};

export default ServicesPage; 