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

const ServicesPage: React.FC = () => {
  const theme = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    setTimeout(() => setIsVisible(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <Brush sx={{ fontSize: 50, color: theme.palette.secondary.main }} />,
      title: 'Brand Identity Design',
      description: 'Complete brand identity development including logo design, color palettes, typography, and brand guidelines.',
      features: [
        'Logo design and variations',
        'Color palette development',
        'Typography selection',
        'Brand guidelines document',
        'Business card design',
        'Letterhead and stationery'
      ],
      price: 'Starting at $2,500'
    },
    {
      icon: <Web sx={{ fontSize: 50, color: theme.palette.secondary.main }} />,
      title: 'Website Design',
      description: 'Modern, responsive website design that engages visitors and drives conversions.',
      features: [
        'Custom website design',
        'Mobile-responsive layout',
        'User experience optimization',
        'Content management system',
        'SEO optimization',
        'Performance optimization'
      ],
      price: 'Starting at $3,500'
    },
    {
      icon: <Smartphone sx={{ fontSize: 50, color: theme.palette.secondary.main }} />,
      title: 'UI/UX Design',
      description: 'User-centered design solutions for web and mobile applications.',
      features: [
        'User research and analysis',
        'Wireframing and prototyping',
        'User interface design',
        'User experience optimization',
        'Interactive prototypes',
        'Usability testing'
      ],
      price: 'Starting at $4,000'
    },
    {
      icon: <Print sx={{ fontSize: 50, color: theme.palette.secondary.main }} />,
      title: 'Print Design',
      description: 'Professional print materials that make a lasting impression.',
      features: [
        'Brochures and catalogs',
        'Business cards and stationery',
        'Posters and banners',
        'Packaging design',
        'Marketing materials',
        'Print-ready files'
      ],
      price: 'Starting at $1,500'
    },
    {
      icon: <Business sx={{ fontSize: 50, color: theme.palette.secondary.main }} />,
      title: 'Marketing Design',
      description: 'Strategic marketing materials that help you reach and engage your target audience.',
      features: [
        'Social media graphics',
        'Email marketing templates',
        'Digital advertisements',
        'Presentation design',
        'Infographics',
        'Campaign materials'
      ],
      price: 'Starting at $1,200'
    },
    {
      icon: <DesignServices sx={{ fontSize: 50, color: theme.palette.secondary.main }} />,
      title: 'Consultation & Strategy',
      description: 'Strategic guidance to help you make informed design decisions.',
      features: [
        'Brand strategy consultation',
        'Design audit and analysis',
        'Competitive research',
        'Design system development',
        'Project planning',
        'Ongoing support'
      ],
      price: 'Starting at $150/hour'
    }
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
              Our Services
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
              Comprehensive design solutions tailored to your unique needs. 
              From brand identity to digital experiences, we help you stand out.
            </Typography>
          </Fade>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Fade in={isVisible} timeout={1500}>
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            sx={{ mb: 8, fontWeight: 600, color: 'text.primary' }}
          >
            What We Offer
          </Typography>
        </Fade>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Grow in={isVisible} timeout={2000 + (index * 500)}>
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
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 40px ${theme.palette.primary.main}26`,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      {service.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ 
                        mb: 2, 
                        fontWeight: 600, 
                        color: 'text.primary', 
                        textAlign: 'center',
                        lineHeight: 1.3
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 3, 
                        color: 'text.secondary', 
                        lineHeight: 1.5, 
                        flexGrow: 1 
                      }}
                    >
                      {service.description}
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <List dense>
                        {service.features.map((feature, featureIndex) => (
                          <ListItem key={featureIndex} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <Check sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={feature} 
                              sx={{ 
                                '& .MuiTypography-root': { 
                                  fontSize: '0.9rem',
                                  color: 'text.secondary'
                                } 
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    <Box sx={{ mt: 'auto' }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: theme.palette.secondary.main, 
                          fontWeight: 600, 
                          textAlign: 'center',
                          mb: 2
                        }}
                      >
                        {service.price}
                      </Typography>
                      <Button 
                        variant="outlined" 
                        fullWidth
                        endIcon={<ArrowForward />}
                        sx={{ 
                          borderColor: theme.palette.secondary.main, 
                          color: theme.palette.secondary.main,
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
      <Box sx={{ bgcolor: 'background.paper', py: 12 }}>
        <Container maxWidth="lg">
          <Fade in={scrollY > 400} timeout={800}>
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              sx={{ mb: 8, fontWeight: 600, color: 'text.primary' }}
            >
              Our Process
            </Typography>
          </Fade>
          <Grid container spacing={4}>
            {processSteps.map((step, index) => (
              <Grid item xs={12} md={6} lg={2.4} key={index}>
                <Fade in={scrollY > 1200 + (index * 10)} timeout={1000 + (index * 100)}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        borderRadius: '50%',
                        bgcolor: theme.palette.secondary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1.5rem'
                      }}
                    >
                      {step.number}
                    </Box>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}
                    >
                      {step.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ color: 'text.secondary', lineHeight: 1.6 }}
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
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Fade in={scrollY > 600} timeout={800}>
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            sx={{ mb: 8, fontWeight: 600, color: 'text.primary' }}
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
                  mb: 2,
                  '&:before': { display: 'none' },
                  boxShadow: `0 2px 8px ${theme.palette.primary.main}1A`,
                  borderRadius: 2
                }}
              >
                <AccordionSummary 
                  expandIcon={<ExpandMore />}
                  sx={{ 
                    '& .MuiAccordionSummary-content': { 
                      my: 2 
                    }
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Fade>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 12 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Fade in={scrollY > 800} timeout={800}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ mb: 4, fontWeight: 600, color: 'text.primary' }}
            >
              Ready to Get Started?
            </Typography>
          </Fade>
          <Fade in={scrollY > 850} timeout={1000}>
            <Typography 
              variant="body1" 
              sx={{ mb: 6, fontSize: '1.1rem', color: 'text.secondary', lineHeight: 1.6 }}
            >
              Let's discuss your project and see how we can help bring your vision to life. 
              Schedule a free consultation to get started.
            </Typography>
          </Fade>
          <Fade in={scrollY > 900} timeout={1200}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                size="large"
                endIcon={<ArrowForward />}
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
                Schedule Consultation
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  borderColor: 'primary.main', 
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  '&:hover': { 
                    borderColor: 'primary.main', 
                    bgcolor: 'rgba(45, 55, 72, 0.05)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                View Portfolio
              </Button>
            </Stack>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default ServicesPage; 