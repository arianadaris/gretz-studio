import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Lock from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import GradientBackground, { getGradient } from '../../components/GradientBackground';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useThemeContext } from '../../contexts/ThemeContext';

const AdminLoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useAuth();
  const { isDarkMode } = useThemeContext();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

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

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        // Successfully authenticated - navigation will happen automatically via AuthContext
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GradientBackground 
      type="hero"
      sx={{ 
        minHeight: '100vh',
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
                    background: theme.palette.backgrounds.card,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.borders.light}`
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            {/* Logo */}
            <Box sx={{ mb: 3 }}>
              <img 
                src="/logos/PrimaryLogo.svg" 
                alt="Gretz Studio" 
                style={{ 
                  height: '60px', 
                  width: 'auto',
                  maxWidth: '200px',
                  filter: isDarkMode ? 'brightness(0) invert(1)' : 'none'
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
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1, fontFamily: 'BearNose, Georgia, serif', color: 'admin.main' }}>
              Admin Access
            </Typography>
            <Typography variant="body1" sx={{ color: 'admin.main' }}>
              Content Management System
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={credentials.email}
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
          </Box>
        </Paper>
      </Container>
    </GradientBackground>
  );
};

export default AdminLoginPage; 