import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Lock from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const AdminLoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Dummy authentication - in real app, this would be an API call
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      localStorage.setItem('adminAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFE5E5 0%, #FFF0F0 25%, #F0F8FF 75%, #E6F3FF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={8}
          sx={{ 
            p: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            {/* Logo */}
            <Box sx={{ mb: 3 }}>
              <img 
                src="/logos/PrimaryLogo.svg" 
                alt="Ariana Daris Studio" 
                style={{ 
                  height: '60px', 
                  width: 'auto',
                  maxWidth: '200px'
                }} 
              />
            </Box>
            
            <Box 
              sx={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: 'secondary.main',
                mb: 2
              }}
            >
              <Lock sx={{ fontSize: 30, color: 'white' }} />
            </Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1, fontFamily: 'Milyuna, Georgia, serif' }}>
              Admin Access
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Content Management System
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={credentials.username}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleInputChange}
              sx={{ mb: 3 }}
            />
            
            {error && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'error.main', 
                  mb: 2, 
                  textAlign: 'center',
                  bgcolor: 'error.light',
                  p: 1,
                  borderRadius: 1
                }}
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ 
                mt: 2, 
                mb: 2,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>

            <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
              Demo credentials: admin / admin123
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLoginPage; 