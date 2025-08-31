import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CarouselSection from './components/CarouselSection';
import PerformanceSection from './components/PerformanceSection';
import CTABanner from './components/CTABanner';
import FloatingHelp from './components/FloatingHelp';
import ChatbotWidget from './components/ChatbotWidget';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const { user, isAuthenticated, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'signup' | 'dashboard'>(
    isAuthenticated ? 'dashboard' : 'home'
  );
  const [isLoading, setIsLoading] = useState(false);

  // Handle navigation with loading state
  const handleNavigation = (page: 'home' | 'login' | 'signup' | 'dashboard') => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 300); // Brief loading for smooth transitions
  };

  // Handle successful login
  const handleLoginSuccess = (userData: any) => {
    setIsLoading(true);
    setTimeout(() => {
      // Navigate based on user role
      if (userData.role === 'Basic Admin') {
        setCurrentPage('dashboard'); // Will show BasicAdminDashboard directly
      } else if (userData.role === 'Super Admin') {
        setCurrentPage('dashboard'); // Will show SuperAdminDashboard directly
      } else {
        setCurrentPage('dashboard'); // Regular dashboard for Travel Agents
      }
      setIsLoading(false);
    }, 500);
  };

  // Handle logout with confirmation
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsLoading(true);
      logout();
      setTimeout(() => {
        setCurrentPage('home');
        setIsLoading(false);
      }, 300);
    }
  };

  // Show loading spinner during transitions
  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading..." />;
  }

  // Render current page with error boundary
  return (
    <ErrorBoundary>
      {currentPage === 'login' && (
        <LoginPage onNavigate={handleNavigation} onLoginSuccess={handleLoginSuccess} />
      )}

      {currentPage === 'signup' && (
        <SignUpPage onNavigate={handleNavigation} />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard userRole={user?.role || 'Travel Agent'} onLogout={handleLogout} />
      )}

      {currentPage === 'home' && (
        <div className="min-h-screen">
          {/* Fixed Header */}
          <Header onNavigate={handleNavigation} />

          {/* Main Content */}
          <main>
            {/* Hero Section with Background Video */}
            <HeroSection onNavigate={handleNavigation} />

            {/* Services Carousel */}
            <CarouselSection />

            {/* Performance & Awards Section */}
            <PerformanceSection />

            {/* CTA Banner */}
            <CTABanner />
          </main>

          {/* Floating Help Widget */}
          <FloatingHelp />
          
          {/* Chatbot Widget */}
          <ChatbotWidget />

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold">Yorke Holidays</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Your gateway to unforgettable luxury travel experiences across the globe. 
                    Discover the world in comfort and style.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">About Us</button></li>
                    <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Destinations</button></li>
                    <li><button onClick={() => handleNavigation('login')} className="hover:text-white transition-colors">Cruise Lines</button></li>
                    <li><button onClick={() => handleNavigation('login')} className="hover:text-white transition-colors">Special Offers</button></li>
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h3 className="font-semibold mb-4">Services</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><button onClick={() => handleNavigation('login')} className="hover:text-white transition-colors">Luxury Cruises</button></li>
                    <li><button onClick={() => handleNavigation('login')} className="hover:text-white transition-colors">Premium Flights</button></li>
                    <li><button onClick={() => handleNavigation('login')} className="hover:text-white transition-colors">5-Star Hotels</button></li>
                    <li><button onClick={() => handleNavigation('login')} className="hover:text-white transition-colors">Holiday Packages</button></li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="font-semibold mb-4">Contact</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="mailto:support@yorkeholidays.com" className="hover:text-white transition-colors">📧 support@yorkeholidays.com</a></li>
                    <li><a href="tel:+919876543210" className="hover:text-white transition-colors">📞 +91 98765 43210</a></li>
                    <li>📍 123 Holiday Street, Mumbai, India</li>
                    <li>🕒 24/7 Customer Support</li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">© 2024 Yorke Holidays. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                  <button onClick={() => alert('Privacy Policy would be displayed here')} className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</button>
                  <button onClick={() => alert('Terms of Service would be displayed here')} className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</button>
                  <button onClick={() => alert('Cookie Policy would be displayed here')} className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </ErrorBoundary>
  );
}

export default App;