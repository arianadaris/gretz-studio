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
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Visibility from '@mui/icons-material/Visibility';
import Launch from '@mui/icons-material/Launch';
import Star from '@mui/icons-material/Star';
import AutoAwesome from '@mui/icons-material/AutoAwesome';

import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import ContactCTA from '../components/ContactCTA';
import { portfolioService } from '../services/portfolioService';
import type { Project } from '../lib/supabase';
import GradientBackground, { getGradient } from '../components/GradientBackground';

const PortfolioPage: React.FC = () => {
  const theme = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: string]: boolean }>({});
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    setTimeout(() => setIsVisible(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [categories, setCategories] = useState([
    { value: 'all', label: 'All Projects' }
  ]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tagColors, setTagColors] = useState<{ [key: string]: string }>({});
  const [categoryColors, setCategoryColors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      // Initialize default projects if none exist
      portfolioService.initializeDefaultProjects()
        .then(() => portfolioService.getProjects())
        .then(projectsData => {
          setProjects(projectsData);
          
          // Get categories and filter them based on projects
          return portfolioService.getCategoriesWithInfo().then(categoriesData => {
            // Filter out categories that have no projects
            const categoriesWithProjects = categoriesData.filter(cat => 
              projectsData.some((project: any) => project.category === cat.name)
            );
            
            setCategories([
              { value: 'all', label: 'All Projects' },
              ...categoriesWithProjects.map(cat => ({
                value: cat.name,
                label: cat.label
              }))
            ]);
            
            // Set category colors immediately
            const categoryColorsMap: { [key: string]: string } = {};
            categoriesWithProjects.forEach(cat => {
              categoryColorsMap[cat.name] = cat.color;
            });
            setCategoryColors(categoryColorsMap);
            
            return categoriesData; // Return for the next .then()
          });
        })
        .then(() => {
          return portfolioService.getTagsWithInfo();
        })
        .then(tagsData => {
          const colorsMap: { [key: string]: string } = {};
          tagsData.forEach(tag => {
            colorsMap[tag.name] = tag.color;
          });
          setTagColors(colorsMap);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error loading portfolio data:', error);
          setIsLoading(false);
        });
    };
    
    loadData();
  }, []); // Empty dependency array ensures this runs only once

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
  };

  const handleDescriptionToggle = (projectId: number) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [projectId.toString()]: !prev[projectId.toString()]
    }));
  };

  const truncateDescription = (description: string, maxLength: number = 120) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <Box sx={{ minHeight: '40vh', bgcolor: 'background.default', pt: isMobile ? 2 : 8 }}>
      {/* Hero Section */}
      <GradientBackground 
        type="hero"
        sx={{ 
          color: theme.palette.customText.dark,
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
                 color: theme.palette.customText.dark,
                 fontSize: isSmallMobile ? '1.8rem' : undefined,
                 fontFamily: '"BearNose", serif'
               }}
             >
               Our Portfolio
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
              Explore our creative journey through carefully crafted projects that showcase our passion for design and innovation.
            </Typography>
          </Fade>
        </Container>
      </GradientBackground>

      {/* Filter Section */}
      <Container maxWidth="lg" sx={{ py: isMobile ? 6 : 12 }}>
        <Fade in={isVisible} timeout={1500}>
          <Box sx={{ textAlign: 'center', mb: isMobile ? 4 : 8 }}>
            <Typography 
              variant={isMobile ? "h4" : "h3"}
              component="h2" 
              sx={{ 
                mb: isMobile ? 2 : 4, 
                fontWeight: 600, 
                color: 'text.primary',
                fontSize: isSmallMobile ? '1.5rem' : undefined,
                fontFamily: '"BearNose", serif'
              }}
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
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  minWidth: isMobile ? 100 : 120,
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
        {isLoading ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              Loading projects...
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={isMobile ? 2 : 4}>
            {filteredProjects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Grow in={isVisible} timeout={2000 + (index * 500)}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                    overflow: 'hidden',
                    background: theme.palette.gradients.card,
                    backdropFilter: 'blur(10px)',
                    '&:hover': { 
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 40px ${theme.palette.primary.main}26`,
                      background: theme.palette.gradients.card,
                      ...(project.view_url && {
                        '& .project-overlay': {
                          opacity: 1
                        },
                        '& .project-image': {
                          transform: 'scale(0.9)',
                        }
                      })
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', height: 250, pt: 2 }}>
                    <Box 
                      className="project-image"
                      sx={{
                        width: '100%',
                        height: '100%',
                        background: `url('/logos/Mockup.svg') no-repeat center center`,
                        backgroundSize: 'contain',
                        transition: 'transform 0.3s ease',
                        overflow: 'hidden',
                        position: 'relative'
                      }}
                    >
                      {/* Project image positioned within the black screen area */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '2.25%',
                          left: '16%',
                          width: '68%',
                          height: '60%',
                          overflow: 'hidden',
                          borderRadius: '2px'
                        }}
                      >
                        <img 
                          src={project.image} 
                          alt={project.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))'
                          }}
                        />
                      </Box>
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
                      {project.view_url && (
                        <Button
                          variant="contained"
                          size={isMobile ? "small" : "medium"}
                          startIcon={<Visibility />}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.view_url, '_blank');
                          }}
                          sx={{
                            bgcolor: 'white',
                            color: 'primary.main',
                            fontSize: isMobile ? '0.8rem' : undefined,
                            '&:hover': { bgcolor: theme.palette.backgrounds.card }
                          }}
                        >
                          View
                        </Button>
                      )}
                    </Box>
                  </Box>
                  <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                    <Typography 
                      variant={isMobile ? "body1" : "h6"}
                      component="h3" 
                      sx={{ 
                        fontWeight: 600, 
                        color: 'text.primary',
                        lineHeight: 1.3,
                        mb: isMobile ? 1.5 : 2,
                        fontSize: isSmallMobile ? '1rem' : undefined
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: isMobile ? 1.5 : 2 }}>
                      <Chip 
                        label={project.year} 
                        size="small" 
                        sx={{ 
                          bgcolor: `${theme.palette.secondary.main}1A`, 
                          color: 'secondary.main',
                          fontWeight: 500,
                          fontSize: isMobile ? '0.7rem' : undefined
                        }} 
                      />
                      <Chip 
                        label={portfolioService.getCategoryLabel(project.category)} 
                        size="small" 
                        sx={{ 
                          bgcolor: categoryColors[project.category] || theme.palette.tagColors.default, 
                          color: 'white',
                          fontWeight: 500,
                          fontSize: isMobile ? '0.65rem' : '0.7rem'
                        }} 
                      />
                    </Box>
                    <Box sx={{ mb: isMobile ? 1.5 : 2 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary', 
                          lineHeight: 1.5,
                          fontSize: isMobile ? '0.8rem' : undefined,
                          mb: project.description.length > 120 ? 1 : 0
                        }}
                      >
                        {expandedDescriptions[project.id.toString()]
                          ? project.description 
                          : truncateDescription(project.description)
                        }
                      </Typography>
                      {project.description.length > 120 && (
                        <Button
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDescriptionToggle(project.id);
                          }}
                          sx={{
                            textTransform: 'none',
                            color: 'secondary.main',
                            fontSize: isMobile ? '0.75rem' : '0.8rem',
                            p: 0,
                            minWidth: 'auto',
                            '&:hover': {
                              backgroundColor: 'transparent',
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          {expandedDescriptions[project.id.toString()] ? 'Show Less' : 'Read More'}
                        </Button>
                      )}
                    </Box>
                    <Grid container spacing={1} sx={{ mb: 2 }}>
                      {project.tags.map((tag: string, tagIndex: number) => (
                        <Grid item key={tagIndex}>
                          <Chip 
                            label={tag} 
                            size="small" 
                            sx={{ 
                                                             bgcolor: tagColors[tag] || theme.palette.tagColors.blue, 
                              color: 'white',
                              fontSize: '0.75rem',
                              fontWeight: 500
                            }} 
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
        )}

        {!isLoading && filteredProjects.length === 0 && (
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
      <ContactCTA 
        title="Ready to Start Your Project?"
        description="Inspired by our work? Let's collaborate to bring your creative vision to life. Get in touch with us to discuss your project and see how we can help."
        primaryButtonText="Start a Project"
        secondaryButtonText="Get in Touch"
        scrollY={scrollY}
      />
    </Box>
  );
};

export default PortfolioPage; 