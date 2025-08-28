import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../views/LandingPage';
import AboutPage from '../views/AboutPage';
import PortfolioPage from '../views/PortfolioPage';
import ServicesPage from '../views/ServicesPage';
import ContactPage from '../views/ContactPage';
import AdminLoginPage from '../views/admin/AdminLoginPage';
import AdminDashboard from '../views/admin/AdminDashboard';
import AdminSettings from '../views/admin/AdminSettings';
import Navigation from '../components/Navigation';
import ProtectedRoute from '../components/ProtectedRoute';
import usePageTitle from '../hooks/usePageTitle';

const PageTitleWrapper: React.FC = () => {
  usePageTitle();
  return null;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <PageTitleWrapper />
      <Routes>
        {/* Admin routes - no navigation */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute>
              <AdminSettings />
            </ProtectedRoute>
          } 
        />
        
        {/* Public routes - with navigation */}
        <Route path="/*" element={
          <>
            <Navigation />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </>
        } />
      </Routes>
    </Router>
  );
};

export default AppRoutes; 