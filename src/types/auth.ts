export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Travel Agent' | 'Basic Admin' | 'Super Admin';
  region?: string;
  team?: string;
  permissions: string[];
  isActive: boolean;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  otpRequired: boolean;
  sessionExpiry: number | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  otp?: string;
}

export interface OTPVerification {
  email: string;
  otp: string;
}