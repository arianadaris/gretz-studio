import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Visibility from '@mui/icons-material/Visibility';
import Launch from '@mui/icons-material/Launch';
import Star from '@mui/icons-material/Star';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import { useTheme } from '@mui/material/styles';

const PortfolioPage: React.FC = () => {
  const theme = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    setTimeout(() => setIsVisible(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'branding', label: 'Branding' },
    { value: 'digital', label: 'Digital' },
    { value: 'print', label: 'Print' },
    { value: 'ui-ux', label: 'UI/UX' }
  ];

  const projects = [
    {
      id: 1,
      title: 'TechCorp Brand Identity',
      category: 'branding',
      description: 'Complete brand identity redesign for a technology startup, including logo, color palette, and brand guidelines.',
      image: '/logos/PrimaryLogo.svg',
      tags: ['Logo Design', 'Brand Guidelines', 'Color Palette'],
      featured: true,
      year: '2024'
    },
    {
      id: 2,
      title: 'E-commerce Website Design',
      category: 'digital',
      description: 'Modern e-commerce website with intuitive user experience and mobile-first design approach.',
      image: '/logos/SecondaryLogo.svg',
      tags: ['Web Design', 'E-commerce', 'Responsive'],
      featured: true,
      year: '2024'
    },
    {
      id: 3,
      title: 'Marketing Campaign Materials',
      category: 'print',
      description: 'Comprehensive marketing campaign including brochures, business cards, and promotional materials.',
      image: '/logos/Submark.svg',
      tags: ['Print Design', 'Marketing', 'Brochures'],
      featured: false,
      year: '2023'
    },
    {
      id: 4,
      title: 'Mobile App Interface',
      category: 'ui-ux',
      description: 'User interface design for a mobile application focusing on accessibility and user experience.',
      image: '/logos/PrimaryLogo.svg',
      tags: ['Mobile Design', 'UI/UX', 'Prototyping'],
      featured: true,
      year: '2023'
    },
    {
      id: 5,
      title: 'Restaurant Branding',
      category: 'branding',
      description: 'Complete branding package for a local restaurant including logo, menu design, and signage.',
      image: '/logos/SecondaryLogo.svg',
      tags: ['Logo Design', 'Menu Design', 'Signage'],
      featured: false,
      year: '2023'
    },
    {
      id: 6,
      title: 'Social Media Graphics',
      category: 'digital',
      description: 'Engaging social media content and graphics for various platforms and campaigns.',
      image: '/logos/Submark.svg',
      tags: ['Social Media', 'Graphics', 'Content'],
      featured: false,
      year: '2023'
    },
    {
      id: 7,
      title: 'Corporate Presentation',
      category: 'print',
      description: 'Professional presentation design and corporate materials for client meetings.',
      image: '/logos/PrimaryLogo.svg',
      tags: ['Presentations', 'Corporate', 'Print'],
      featured: false,
      year: '2022'
    },
    {
      id: 8,
      title: 'Dashboard Interface',
      category: 'ui-ux',
      description: 'Analytics dashboard design with focus on data visualization and user experience.',
      image: '/logos/SecondaryLogo.svg',
      tags: ['Dashboard', 'Analytics', 'Data Viz'],
      featured: true,
      year: '2022'
    },
    {
      id: 9,
      title: 'Event Branding',
      category: 'branding',
      description: 'Complete event branding including invitations, signage, and promotional materials.',
      image: '/logos/Submark.svg',
      tags: ['Event Design', 'Invitations', 'Signage'],
      featured: false,
      year: '2022'
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
  };

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
              Our Portfolio
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
              Explore our collection of creative projects that showcase our passion for design 
              and commitment to delivering exceptional results.
            </Typography>
          </Fade>
        </Container>
      </Box>

      {/* Filter Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Fade in={isVisible} timeout={1500}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ mb: 4, fontWeight: 600, color: 'text.primary' }}
            >
              Browse by Category
            </Typography>
            <Tabs 
              value={selectedCategory} 
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  color: 'text.secondary',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: '1rem',
                  minWidth: 120,
                  '&.Mui-selected': {
                    color: 'secondary.main',
                    fontWeight: 600
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'secondary.main'
                }
              }}
            >
              {categories.map((category) => (
                <Tab 
                  key={category.value} 
                  value={category.value} 
                  label={category.label} 
                />
              ))}
            </Tabs>
          </Box>
        </Fade>

        {/* Projects Grid */}
        <Grid container spacing={4}>
          {filteredProjects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Grow in={isVisible} timeout={2000 + (index * 1000)}>
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
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
                      '& .project-overlay': {
                        opacity: 1
                      },
                      '& .project-image': {
                        transform: 'scale(1.1)'
                      }
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', height: 250 }}>
                    <Box 
                      className="project-image"
                      sx={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <img 
                        src={project.image} 
                        alt={project.title}
                        style={{
                          width: '60%',
                          height: '60%',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 5px 15px rgba(50, 60, 85, 0.1))'
                        }}
                      />
                    </Box>
                    {project.featured && (
                      <Chip 
                        icon={<Star />}
                        label="Featured" 
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          bgcolor: 'secondary.main',
                          color: 'white',
                          fontWeight: 600
                        }}
                      />
                    )}
                    <Box 
                      className="project-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(135deg, ${theme.palette.secondary.main}95 0%, ${theme.palette.primary.main}95 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        color: 'white'
                      }}
                    >
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="contained"
                          startIcon={<Visibility />}
                          sx={{
                            bgcolor: 'white',
                            color: 'primary.main',
                            '&:hover': { bgcolor: '#f5f5f5' }
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Launch />}
                          sx={{
                            borderColor: 'white',
                            color: 'white',
                            '&:hover': { 
                              borderColor: 'white', 
                              bgcolor: 'rgba(255,255,255,0.1)' 
                            }
                          }}
                        >
                          Details
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 600, 
                          color: 'text.primary',
                          lineHeight: 1.3
                        }}
                      >
                        {project.title}
                      </Typography>
                      <Chip 
                        label={project.year} 
                        size="small" 
                        sx={{ 
                          bgcolor: `${theme.palette.secondary.main}1A`, 
                          color: 'secondary.main',
                          fontWeight: 500
                        }} 
                      />
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary', 
                        mb: 2,
                        lineHeight: 1.5
                      }}
                    >
                      {project.description}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {project.tags.map((tag, tagIndex) => (
                        <Chip 
                          key={tagIndex}
                          label={tag} 
                          size="small" 
                          sx={{ 
                            bgcolor: 'background.paper', 
                            color: 'text.secondary',
                            fontSize: '0.75rem'
                          }} 
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {filteredProjects.length === 0 && (
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" sx={{ color: 'text.secondary', mb: 2 }}>
                No projects found in this category
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Try selecting a different category to view more projects.
              </Typography>
            </Box>
          </Fade>
        )}
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 12 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Fade in={scrollY > 600} timeout={800}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ mb: 4, fontWeight: 600, color: 'text.primary' }}
            >
              Ready to Start Your Project?
            </Typography>
          </Fade>
          <Fade in={scrollY > 650} timeout={1000}>
            <Typography 
              variant="body1" 
              sx={{ mb: 6, fontSize: '1.1rem', color: 'text.secondary', lineHeight: 1.6 }}
            >
              Inspired by our work? Let's collaborate to bring your creative vision to life. 
              Get in touch with us to discuss your project and see how we can help.
            </Typography>
          </Fade>
          <Fade in={scrollY > 700} timeout={1200}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: 'secondary.main', 
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  '&:hover': { 
                    bgcolor: 'secondary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 25px ${theme.palette.secondary.main}30`
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Start a Project
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
                Get in Touch
              </Button>
            </Stack>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default PortfolioPage; 