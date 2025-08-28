import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../views/LandingPage';
import AboutPage from '../views/AboutPage';
import PortfolioPage from '../views/PortfolioPage';
import ServicesPage from '../views/ServicesPage';
import ContactPage from '../views/ContactPage';
import Navigation from '../components/Navigation';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes; 