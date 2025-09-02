import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const getPageTitle = (pathname: string): string => {
      const baseTitle = 'Gretz Tech';
      
      switch (pathname) {
        case '/':
          return `${baseTitle} - Home`;
        case '/about':
          return `${baseTitle} - About`;
        case '/portfolio':
          return `${baseTitle} - Portfolio`;
        case '/services':
          return `${baseTitle} - Services`;
        case '/contact':
          return `${baseTitle} - Contact`;
        case '/admin':
          return `${baseTitle} - Admin Login`;
        case '/admin/dashboard':
          return `${baseTitle} - Admin Dashboard`;
        case '/admin/settings':
          return `${baseTitle} - Admin Settings`;
        default:
          return baseTitle;
      }
    };

    const title = getPageTitle(location.pathname);
    document.title = title;
  }, [location.pathname]);
};

export default usePageTitle; 