import { useState, useEffect } from 'react';
import type { User, AuthState, LoginCredentials } from '../types/auth';

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const SESSION_CHECK_INTERVAL = 60 * 1000; // 1 minute

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    token: null,
    otpRequired: false,
    sessionExpiry: null
  });

  const [lastActivity, setLastActivity] = useState(Date.now());

  // Demo users with proper role-based permissions
  const demoUsers = {
    'agent_demo@example.com': {
      id: 'ag1',
      email: 'agent_demo@example.com',
      name: 'John Smith',
      role: 'Travel Agent' as const,
      region: 'Delhi',
      permissions: ['book_cruise', 'book_hotel', 'view_bookings', 'manage_passengers'],
      isActive: true
    },
    'admin_demo@example.com': {
      id: 'ba1',
      email: 'admin_demo@example.com',
      name: 'Sarah Johnson',
      role: 'Basic Admin' as const,
      team: 'North India Operations',
      region: 'Delhi, Punjab, Haryana',
      permissions: ['manage_agents', 'view_bookings', 'manage_inventory', 'resolve_complaints', 'create_offers'],
      isActive: true
    },
    'superadmin_demo@example.com': {
      id: 'sa1',
      email: 'superadmin_demo@example.com',
      name: 'Michael Chen',
      role: 'Super Admin' as const,
      permissions: ['full_access', 'manage_permissions', 'system_analytics', 'cms_management'],
      isActive: true
    }
  };

  // Track user activity
  useEffect(() => {
    const updateActivity = () => setLastActivity(Date.now());
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, []);

  // Auto-logout on inactivity
  useEffect(() => {
    if (!authState.isAuthenticated) return;

    const checkInactivity = () => {
      if (Date.now() - lastActivity > INACTIVITY_TIMEOUT) {
        logout();
      }
    };

    const interval = setInterval(checkInactivity, SESSION_CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, [authState.isAuthenticated, lastActivity]);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; requiresOTP?: boolean; error?: string }> => {
    try {
      const user = demoUsers[credentials.email as keyof typeof demoUsers];
      
      if (!user) {
        return { success: false, error: 'Invalid credentials' };
      }

      // For agents, require OTP
      if (user.role === 'Travel Agent') {
        if (!credentials.otp) {
          setAuthState(prev => ({ ...prev, otpRequired: true }));
          return { success: false, requiresOTP: true };
        }
        
        // Validate OTP (demo: accept any 6-digit number)
        if (!/^\d{6}$/.test(credentials.otp)) {
          return { success: false, error: 'Invalid OTP format' };
        }
      }

      // Generate session token
      const token = `token_${user.id}_${Date.now()}`;
      const sessionExpiry = Date.now() + (8 * 60 * 60 * 1000); // 8 hours

      setAuthState({
        user,
        isAuthenticated: true,
        token,
        otpRequired: false,
        sessionExpiry
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      token: null,
      otpRequired: false,
      sessionExpiry: null
    });
  };

  const hasPermission = (permission: string): boolean => {
    if (!authState.user) return false;
    return authState.user.permissions.includes(permission) || 
           authState.user.permissions.includes('full_access');
  };

  const sendOTP = async (email: string): Promise<boolean> => {
    // Simulate OTP sending
    console.log(`Sending OTP to ${email}`);
    return true;
  };

  return {
    ...authState,
    login,
    logout,
    hasPermission,
    sendOTP,
    lastActivity
  };
};