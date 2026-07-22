import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is logged in (default to 'true' for demo purposes)
    const loggedIn = localStorage.getItem('admin-logged-in');
    if (loggedIn === 'false') {
      setIsAuthenticated(false);
    } else {
      // If not set, set it to true so the dashboard loads initially
      if (!loggedIn) {
        localStorage.setItem('admin-logged-in', 'true');
      }
      setIsAuthenticated(true);
    }
  }, []);

  // Show a blank screen/loading during the initial auth check
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
