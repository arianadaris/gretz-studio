import React from 'react';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import GradientBackground, { getGradient } from './GradientBackground';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Loading state
    return (
      <GradientBackground
        type="hero"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          Checking authentication...
        </Typography>
      </GradientBackground>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin" replace />;
  }

  // Render the protected content
  return <>{children}</>;
};

export default ProtectedRoute; 