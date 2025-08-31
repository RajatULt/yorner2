import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { BarChart3 } from 'lucide-react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import SearchSection from './SearchSection';
import CruiseCard from './CruiseCard';
import CruiseModal from './CruiseModal';
import ComparisonModal from './ComparisonModal';
import FeaturedCarousel from './FeaturedCarousel';
import SkeletonCard from './SkeletonCard';
import AgentPortal from './AgentPortal';
import HotelDashboard from './HotelDashboard';
import BasicAdminDashboard from './BasicAdminDashboard';
import SuperAdminDashboard from './SuperAdminDashboard';
import RoleBasedRoute from './RoleBasedRoute';
import NotificationSystem from './NotificationSystem';
import ChatbotWidget from './ChatbotWidget';
import { useToast } from './ToastNotification';
import { useAuth } from '../hooks/useAuth';
import { cruises, destinations, cruiseLines, shipTypes, months } from '../data/cruises';
import { additionalCruises } from '../data/extendedMockData';
import type { Cruise } from '../data/cruises';

interface DashboardProps {
  userRole: string;
  onLogout: () => void;
}

interface SearchFilters {
  searchText: string;
  destination: string;
  cruiseLine: string;
  shipType: string;
  month: string;
  priceRange: [number, number];
  minRating: number;
  passengerCount: number;
  departureDate: string;
  sortBy: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole, onLogout }) => {
  // Auto-redirect to appropriate dashboard based on role
  useEffect(() => {
    if (userRole === 'Basic Admin') {
      setShowBasicAdminDashboard(true);
    } else if (userRole === 'Super Admin') {
      setShowSuperAdminDashboard(true);
    }
  }, [userRole]);

  // Toast notifications
  const { showSuccess, showError, showWarning, ToastContainer } = useToast();
  
  // Auth hook for role verification
  const { user, hasPermission } = useAuth();
  
  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Active section state
  const [activeSection, setActiveSection] = useState('Cruises');
  
  // Loading states
  const [loading, setLoading] = useState(false);
  
  // Bookings state (mock data for demonstration)
  const [userBookings, setUserBookings] = useState<string[]>([]);
  
  // Search filters state
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchText: '',
    destination: destinations[0],
    cruiseLine: cruiseLines[0],
    shipType: shipTypes[0],
    month: months[0],
    priceRange: [15000, 200000],
    minRating: 0,
    passengerCount: 2,
    departureDate: '',
    sortBy: 'price_low'
  });

  // Modal state
  const [selectedCruise, setSelectedCruise] = useState<Cruise | null>(null);

  // Comparison state
  const [comparisonItems, setComparisonItems] = useState<Cruise[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Loading state for better UX
  const [isLoading, setIsLoading] = useState(false);

  // Profile view state
  const [showProfile, setShowProfile] = useState(false);

  // Hotel dashboard state
  const [showHotelDashboard, setShowHotelDashboard] = useState(false);

  // Admin dashboard states
  const [showBasicAdminDashboard, setShowBasicAdminDashboard] = useState(false);
  const [showSuperAdminDashboard, setShowSuperAdminDashboard] = useState(false);

  // Combine original and additional cruises
  const allCruises = [...cruises, ...additionalCruises];

  // Filter cruises based on search criteria
  const filteredCruises = allCruises.filter(cruise => {
    const matchesSearch = cruise.name.toLowerCase().includes(searchFilters.searchText.toLowerCase()) ||
                         cruise.description.toLowerCase().includes(searchFilters.searchText.toLowerCase());
    
    const matchesDestination = searchFilters.destination === 'All Destinations' || 
                              cruise.to === searchFilters.destination || 
                              cruise.from === searchFilters.destination;
    
    const matchesCruiseLine = searchFilters.cruiseLine === 'All Cruise Lines' || 
                             cruise.cruiseLine === searchFilters.cruiseLine;
    
    const matchesShipType = searchFilters.shipType === 'All Ship Types' || 
                           cruise.shipType === searchFilters.shipType;

    return matchesSearch && matchesDestination && matchesCruiseLine && matchesShipType;
  });

  // Handle cruise card actions
  const handleViewDetails = (cruise: Cruise) => {
    setSelectedCruise(cruise);
  };

  // Handle add to comparison
  const handleAddToComparison = (cruise: Cruise) => {
    if (comparisonItems.length >= 4) {
      showWarning('Comparison Limit', 'You can compare up to 4 cruises at a time');
      return;
    }
    
    if (comparisonItems.some(item => item.id === cruise.id)) {
      showWarning('Already Added', 'This cruise is already in your comparison list');
      return;
    }
    
    setComparisonItems(prev => [...prev, cruise]);
    showSuccess('Added to Comparison', `${cruise.name} added to comparison list`);
  };

  // Handle remove from comparison
  const handleRemoveFromComparison = (cruiseId: string) => {
    setComparisonItems(prev => prev.filter(item => item.id !== cruiseId));
  };

  const handleCancelBooking = async (cruiseId: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove from user bookings
      setUserBookings(prev => prev.filter(id => id !== cruiseId));
      
      showSuccess(
        'Booking Cancelled',
        'Your cruise booking has been successfully cancelled.'
      );
    } catch (error) {
      showError(
        'Cancellation Failed',
        'Unable to cancel booking. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle successful booking
  const handleBookingSuccess = (cruiseId: string) => {
    setUserBookings(prev => [...prev, cruiseId]);
    showSuccess(
      'Booking Confirmed',
      'Your cruise booking has been confirmed successfully!',
      {
        label: 'View Booking',
        onClick: () => console.log('Navigate to booking details')
      }
    );
  };

  const handleCloseModal = () => {
    setSelectedCruise(null);
  };

  // Handle profile view
  const handleViewProfile = () => {
    setShowProfile(true);
  };

  const handleBackFromProfile = () => {
    setShowProfile(false);
  };

  // Handle hotel dashboard navigation
  const handleShowHotelDashboard = () => {
    setShowHotelDashboard(true);
  };

  const handleBackFromHotelDashboard = () => {
    setShowHotelDashboard(false);
  };

  // Handle admin dashboard navigation
  const handleShowBasicAdminDashboard = () => {
    if (userRole === 'Basic Admin' || (user && user.role === 'Basic Admin')) {
      setShowBasicAdminDashboard(true);
    } else {
      showError(
        'Access Denied',
        'Basic Admin role required to access this dashboard.'
      );
    }
  };

  const handleBackFromBasicAdminDashboard = () => {
    setShowBasicAdminDashboard(false);
  };

  const handleShowSuperAdminDashboard = () => {
    if (userRole === 'Super Admin' || (user && user.role === 'Super Admin')) {
      setShowSuperAdminDashboard(true);
    } else {
      showError(
        'Access Denied', 
        'Super Admin role required to access this dashboard.'
      );
    }
  };

  const handleBackFromSuperAdminDashboard = () => {
    setShowSuperAdminDashboard(false);
  };

  // Handle section navigation
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (section === 'Hotels') {
      setShowHotelDashboard(true);
    } else {
      setShowHotelDashboard(false);
    }
  };

  // If showing profile, render AgentPortal
  if (showProfile) {
    return (
      <AgentPortal 
        userRole={userRole}
        onLogout={onLogout}
        onBack={handleBackFromProfile}
      />
    );
  }

  // If showing hotel dashboard, render HotelDashboard
  if (showHotelDashboard) {
    return (
      <HotelDashboard 
        userRole={userRole}
        onLogout={onLogout}
        onBackToCruise={handleBackFromHotelDashboard}
      />
    );
  }

  // If showing basic admin dashboard, render BasicAdminDashboard
  if (showBasicAdminDashboard) {
    return (
      <BasicAdminDashboard 
        userRole={userRole}
        onLogout={onLogout}
        onBack={handleBackFromBasicAdminDashboard}
      />
    );
  }

  // If showing super admin dashboard, render SuperAdminDashboard
  if (showSuperAdminDashboard) {
    return (
      <SuperAdminDashboard 
        userRole={userRole}
        onLogout={onLogout}
        onBack={handleBackFromSuperAdminDashboard}
      />
    );
  }

  // For Travel Agents, show the regular dashboard
  if (userRole !== 'Travel Agent') {
    // This shouldn't happen due to the useEffect above, but just in case
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg p-8 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Loading Dashboard...</h2>
          <p className="text-gray-600">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Toast Notifications */}
      <ToastContainer />
      
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole={userRole}
        onLogout={onLogout}
        onViewProfile={handleViewProfile}
        onShowBasicAdmin={userRole === 'Basic Admin' ? handleShowBasicAdminDashboard : undefined}
        onShowSuperAdmin={userRole === 'Super Admin' ? handleShowSuperAdminDashboard : undefined}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-80'}`}>
        {/* Top Navigation */}
        <div className="bg-white/20 backdrop-blur-md border-b border-white/30 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <TopNavbar 
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />
            
            {/* Notification System */}
            <div className="flex items-center gap-4">
              <NotificationSystem userId="ag1" />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Header */}
          <div className="mb-8">
            {/* Featured Carousel for Travel Agents */}
            <FeaturedCarousel 
              items={allCruises.slice(0, 6)}
              onViewDetails={handleViewDetails}
            />
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back, {userRole === 'Travel Agent' ? 'Agent' : userRole}!
            </h1>
            <p className="text-gray-600">
              {userRole === 'Travel Agent' 
                ? 'Manage your bookings and discover new destinations'
                : userRole === 'Basic Admin'
                ? 'Oversee your team and manage regional operations'
                : 'Control the entire CRM system and monitor performance'
              }
            </p>
            
            {/* Role-specific quick actions */}
            {userRole === 'Basic Admin' && (
              <div className="mt-4">
                <Button 
                  type="primary" 
                  onClick={handleShowBasicAdminDashboard}
                  className="mr-4"
                >
                  Open Admin Dashboard
                </Button>
              </div>
            )}
            
            {userRole === 'Super Admin' && (
              <div className="mt-4">
                <Button 
                  type="primary" 
                  onClick={handleShowSuperAdminDashboard}
                  className="mr-4"
                >
                  Open Super Admin Dashboard
                </Button>
              </div>
            )}
          </div>

          {/* Search Section */}
          <SearchSection 
            filters={searchFilters}
            onFiltersChange={setSearchFilters}
          />

          {/* Results Summary */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Showing {filteredCruises.length} of {allCruises.length} cruises
                {userBookings.length > 0 && (
                  <span className="ml-4 text-blue-600">
                    • {userBookings.length} active booking{userBookings.length !== 1 ? 's' : ''}
                  </span>
                )}
              </p>
              
              {/* Comparison Button */}
              {comparisonItems.length > 0 && (
                <button
                  onClick={() => setShowComparison(true)}
                  className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <BarChart3 size={18} />
                  Compare ({comparisonItems.length})
                </button>
              )}
            </div>
          </div>

          {/* Cruise Cards Grid */}
          <div className="space-y-6">
            {isLoading ? (
              // Show skeleton cards while loading
              [...Array(3)].map((_, index) => (
                <SkeletonCard key={index} type="cruise" />
              ))
            ) : (
              filteredCruises.map((cruise) => (
                <CruiseCard
                  key={cruise.id}
                  cruise={cruise}
                  onViewDetails={handleViewDetails}
                  onCancel={handleCancelBooking}
                  onAddToComparison={handleAddToComparison}
                  isBooked={userBookings.includes(cruise.id)}
                  loading={loading}
                />
              ))
            )}
          </div>

          {/* No Results Message */}
          {filteredCruises.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No cruises found</h3>
                <p className="text-gray-600">
                  Try adjusting your search filters to find more results.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Chatbot Widget */}
      <ChatbotWidget />
      
      {/* Comparison Modal */}
      {showComparison && (
        <ComparisonModal
          items={comparisonItems}
          type="cruise"
          onClose={() => setShowComparison(false)}
          onRemoveItem={handleRemoveFromComparison}
        />
      )}
      
      {/* Cruise Details Modal */}
      {selectedCruise && (
        <CruiseModal
          cruise={selectedCruise}
          onClose={handleCloseModal}
          onBookingSuccess={handleBookingSuccess}
          isBooked={userBookings.includes(selectedCruise.id)}
        />
      )}
    </div>
  );
};

export default Dashboard;