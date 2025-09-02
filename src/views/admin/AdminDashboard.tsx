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
import { portfolioService, Project } from '../../services/portfolioService';

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }

    // Initialize default projects if none exist and load projects
    portfolioService.initializeDefaultProjects();
    setProjects(portfolioService.getProjects());
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin');
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = (projectId: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      portfolioService.deleteProject(projectId);
      setProjects(portfolioService.getProjects());
    }
  };

  const handleSaveProject = (project: Project) => {
    if (editingProject) {
      // Update existing project
      portfolioService.updateProject(project);
    } else {
      // Add new project
      portfolioService.addProject(project);
    }
    
    setProjects(portfolioService.getProjects());
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const toggleFeatured = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const updatedProject = { ...project, featured: !project.featured };
      portfolioService.updateProject(updatedProject);
      setProjects(portfolioService.getProjects());
    }
  };

  const getCategoryColor = (category: string) => {
    return portfolioService.getCategoryColor(category);
  };

  console.log(projects);

  return (
          <Box sx={{ minHeight: '100vh', bgcolor: '#F0F8FF' }}>
      {/* Admin App Bar */}
      <AppBar position="static" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: 1 }}>
        <Toolbar>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <img 
              src="/logos/PrimaryLogo.svg" 
              alt="Gretz Tech" 
              style={{ 
                height: '40px', 
                width: 'auto',
                maxWidth: '150px'
              }} 
            />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600, fontFamily: 'BearNose, Georgia, serif' }}>
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
            <Card sx={{ bgcolor: 'white', borderRadius: 2 }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Projects
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {projects.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'white', borderRadius: 2 }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Featured Projects
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {projects.filter(p => p.featured).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'white', borderRadius: 2 }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Categories
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {new Set(projects.map(p => p.category)).size}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'white', borderRadius: 2 }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  This Year
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {projects.filter(p => p.year === '2024').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Projects List */}
        <Card sx={{ bgcolor: 'white', borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600, fontFamily: 'BearNose, Georgia, serif' }}>
              Portfolio Projects
            </Typography>
            
            {projects.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
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
                        border: '1px solid #e0e0e0',
                        '&:hover': { boxShadow: 2 },
                        cursor: 'pointer'
                      }}
                      onClick={() => handleEditProject(project)}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box 
                            sx={{ 
                              width: 60, 
                              height: 60, 
                              bgcolor: '#E3F2FD',
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
                                   bgcolor: getCategoryColor(project.category),
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
                            {project.viewUrl && (
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
                        {project.viewUrl && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                              View URL: {project.viewUrl}
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
                                 bgcolor: portfolioService.getTagColor(tag),
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