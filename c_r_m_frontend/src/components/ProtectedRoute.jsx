import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // --- THE CHECK: Universal Storage Extractor ---
  // Checks both localStorage AND sessionStorage across all standard key names
  const checkAuth = () => {
    const isLogged = localStorage.getItem('isLoggedIn') === 'true' || 
                     sessionStorage.getItem('isLoggedIn') === 'true';

    const hasToken = localStorage.getItem('accessToken') || 
                     sessionStorage.getItem('accessToken') ||
                     localStorage.getItem('token') || 
                     sessionStorage.getItem('token');

    return isLogged || !!hasToken;
  };

  const isAuthenticated = checkAuth();

  if (!isAuthenticated) {
    console.warn('🛡️ ProtectedRoute: Security clearance missing. Kicking back to /login.');
    
    // Redirect them safely to the login page while preserving the path they tried to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Security passed! Render the Dashboard.
  return children;
};

export default ProtectedRoute;