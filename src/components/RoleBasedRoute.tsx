import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  requiredRole?: string;
  fallback?: React.ReactNode;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ 
  children, 
  requiredPermissions = [], 
  requiredRole,
  fallback 
}) => {
  const { user, hasPermission } = useAuth();

  // Check if user is authenticated
  if (!user) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  // Check role requirement
  if (requiredRole && user.role !== requiredRole) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Insufficient Permissions</h2>
          <p className="text-gray-600">You don't have access to this section.</p>
        </div>
      </div>
    );
  }

  // Check permissions
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(permission => hasPermission(permission));
    
    if (!hasAllPermissions) {
      return fallback || (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Insufficient Permissions</h2>
            <p className="text-gray-600">You don't have the required permissions to access this feature.</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default RoleBasedRoute;