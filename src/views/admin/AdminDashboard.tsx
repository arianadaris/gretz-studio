import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import Dashboard from '@mui/icons-material/Dashboard';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import Settings from '@mui/icons-material/Settings';
import Launch from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import AdminProjectModal from '../../components/AdminProjectModal';
import { portfolioService } from '../../services/portfolioService';
import type { Project } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useThemeContext } from '../../contexts/ThemeContext';

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [tagColors, setTagColors] = useState<{ [key: string]: string }>({});
  const [categoryColors, setCategoryColors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const theme = useTheme();
  const { signOut } = useAuth();
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Initialize default projects if none exist and load projects
        await portfolioService.initializeDefaultProjects();
        const projectsData = await portfolioService.getProjects();
        setProjects(projectsData);
        
        // Load tag colors
        const tagsData = await portfolioService.getTagsWithInfo();
        const colorsMap: { [key: string]: string } = {};
        tagsData.forEach(tag => {
          colorsMap[tag.name] = tag.color;
        });
        setTagColors(colorsMap);
        
        // Load category colors
        const categoriesData = await portfolioService.getCategoriesWithInfo();
        const categoryColorsMap: { [key: string]: string } = {};
        categoriesData.forEach(cat => {
          categoryColorsMap[cat.name] = cat.color;
        });
        setCategoryColors(categoryColorsMap);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };

    loadData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin');
    } catch (error) {
      console.error('Error signing out:', error);
      // Still navigate to login even if signout fails
      navigate('/admin');
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (projectId: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await portfolioService.deleteProject(projectId);
        const projectsData = await portfolioService.getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleSaveProject = async (project: Project) => {
    try {
      if (editingProject) {
        // Update existing project
        await portfolioService.updateProject(project);
      } else {
        // Add new project
        await portfolioService.addProject(project);
      }
      
      const projectsData = await portfolioService.getProjects();
      setProjects(projectsData);
      setIsModalOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const toggleFeatured = async (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      try {
        const updatedProject = { ...project, featured: !project.featured };
        await portfolioService.updateProject(updatedProject);
        const projectsData = await portfolioService.getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error updating project:', error);
      }
    }
  };



  console.log(projects);

  return (
          <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.backgrounds.admin }}>
      {/* Admin App Bar */}
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: isDarkMode ? theme.palette.gradients.card : 'white', 
          color: 'text.primary', 
          boxShadow: 1 
        }}
      >
        <Toolbar>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3, cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img 
              src="/logos/PrimaryLogo.svg" 
              alt="Gretz Studio" 
              style={{ 
                height: '40px', 
                width: 'auto',
                maxWidth: '150px',
                filter: isDarkMode ? 'brightness(0) invert(1)' : 'none'
              }} 
            />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600, fontFamily: 'BearNose, Georgia, serif', color: 'admin.main' }}>
            Portfolio CMS
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<Add />}
            onClick={handleAddProject}
            sx={{ mr: 2 }}
          >
            Add Project
          </Button>
          <IconButton 
            onClick={() => navigate('/admin/settings')} 
            color="inherit"
            sx={{ mr: 1 }}
          >
            <Settings />
          </IconButton>
          <IconButton onClick={handleLogout} color="inherit">
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              bgcolor: isDarkMode ? theme.palette.backgrounds.card : 'white', 
              borderRadius: 2,
              border: `1px solid ${theme.palette.borders.light}`,
              background: isDarkMode ? theme.palette.gradients.card : 'white',
              boxShadow: isDarkMode ? `0 10px 30px ${theme.palette.secondary.main}1A` : '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <CardContent>
                <Typography color="admin.main" gutterBottom>
                  Total Projects
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: 'admin.main' }}>
                  {projects.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              bgcolor: isDarkMode ? theme.palette.backgrounds.card : 'white', 
              borderRadius: 2,
              border: `1px solid ${theme.palette.borders.light}`,
              background: isDarkMode ? theme.palette.gradients.card : 'white',
              boxShadow: isDarkMode ? `0 10px 30px ${theme.palette.secondary.main}1A` : '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <CardContent>
                <Typography color="admin.main" gutterBottom>
                  Featured Projects
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: 'admin.main' }}>
                  {projects.filter(p => p.featured).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              bgcolor: isDarkMode ? theme.palette.backgrounds.card : 'white', 
              borderRadius: 2,
              border: `1px solid ${theme.palette.borders.light}`,
              background: isDarkMode ? theme.palette.gradients.card : 'white',
              boxShadow: isDarkMode ? `0 10px 30px ${theme.palette.secondary.main}1A` : '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <CardContent>
                <Typography color="admin.main" gutterBottom>
                  Categories
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: 'admin.main' }}>
                  {new Set(projects.map(p => p.category)).size}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              bgcolor: isDarkMode ? theme.palette.backgrounds.card : 'white', 
              borderRadius: 2,
              border: `1px solid ${theme.palette.borders.light}`,
              background: isDarkMode ? theme.palette.gradients.card : 'white',
              boxShadow: isDarkMode ? `0 10px 30px ${theme.palette.secondary.main}1A` : '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <CardContent>
                <Typography color="admin.main" gutterBottom>
                  This Year
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: 'admin.main' }}>
                  {projects.filter(p => p.year === '2025').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Projects List */}
        <Card sx={{ 
          bgcolor: isDarkMode ? theme.palette.backgrounds.card : 'white', 
          borderRadius: 2,
          border: `1px solid ${theme.palette.borders.light}`,
          background: isDarkMode ? theme.palette.gradients.card : 'white',
          boxShadow: isDarkMode ? `0 10px 30px ${theme.palette.secondary.main}1A` : '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <CardContent>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600, fontFamily: 'BearNose, Georgia, serif', color: 'admin.main' }}>
              Portfolio Projects
            </Typography>
            
            {projects.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" sx={{ color: 'admin.main', mb: 2 }}>
                  No projects yet
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<Add />}
                  onClick={handleAddProject}
                >
                  Add Your First Project
                </Button>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {projects.map((project) => (
                  <Grid item xs={12} key={project.id}>
                    <Card 
                      sx={{ 
                        border: `1px solid ${theme.palette.borders.light}`,
                        bgcolor: isDarkMode ? theme.palette.backgrounds.veryLight : 'white',
                        background: isDarkMode ? theme.palette.gradients.card : 'white',
                        boxShadow: isDarkMode ? `0 5px 20px ${theme.palette.secondary.main}1A` : '0 2px 8px rgba(0,0,0,0.1)',
                        '&:hover': { 
                          boxShadow: isDarkMode ? `0 8px 25px ${theme.palette.secondary.main}33` : 2,
                          transform: isDarkMode ? 'translateY(-2px)' : 'none'
                        },
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => handleEditProject(project)}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box 
                            sx={{ 
                              width: 60, 
                              height: 60, 
                              bgcolor: theme.palette.backgrounds.card,
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2
                            }}
                          >
                            <img 
                              src={project.image} 
                              alt={project.title}
                              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                            />
                          </Box>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {project.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                             <Box 
                                 sx={{ 
                                   px: 1, 
                                   py: 0.5, 
                                   borderRadius: 1, 
                                   bgcolor: categoryColors[project.category] || theme.palette.tagColors.default,
                                   color: 'white',
                                   fontSize: '0.75rem',
                                   fontWeight: 600
                                 }}
                               >
                                 {portfolioService.getCategoryLabel(project.category)}
                               </Box>
                              {project.featured && (
                                <Box 
                                  sx={{ 
                                    px: 1, 
                                    py: 0.5, 
                                    borderRadius: 1, 
                                    bgcolor: 'secondary.main',
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    fontWeight: 600
                                  }}
                                >
                                  Featured
                                </Box>
                              )}
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {project.year}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            {project.view_url && (
                              <Box 
                                sx={{ 
                                  px: 1, 
                                  py: 0.5, 
                                  borderRadius: 1, 
                                  bgcolor: 'success.main',
                                  color: 'white',
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.5
                                }}
                              >
                                <Launch sx={{ fontSize: 16 }} />
                                Link
                              </Box>
                            )}
                            <IconButton 
                              size="small" 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFeatured(project.id);
                              }}
                              sx={{ 
                                bgcolor: project.featured ? 'secondary.main' : 'grey.100',
                                color: project.featured ? 'white' : 'grey.600',
                                '&:hover': { 
                                  bgcolor: project.featured ? 'secondary.dark' : 'grey.200' 
                                }
                              }}
                            >
                              <Visibility />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteProject(project.id);
                              }}
                              sx={{ bgcolor: 'error.light', color: 'white' }}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                          {project.description}
                        </Typography>
                        {project.view_url && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                              View URL: {project.view_url}
                            </Typography>
                          </Box>
                        )}
                                                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                           {project.tags.map((tag, index) => (
                             <Box 
                               key={index}
                               sx={{ 
                                 px: 1, 
                                 py: 0.5, 
                                 borderRadius: 1, 
                                 bgcolor: tagColors[tag] || theme.palette.tagColors.blue,
                                 fontSize: '0.75rem',
                                 color: 'white',
                                 fontWeight: 500
                               }}
                             >
                               {tag}
                             </Box>
                           ))}
                         </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Container>

      {/* Project Modal */}
      <AdminProjectModal
        open={isModalOpen}
        project={editingProject}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
      />
    </Box>
  );
};

export default AdminDashboard; 