import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, History, MessageCircle, LogOut, Settings, Shield, Users as UsersIcon } from 'lucide-react';
import { Slider, Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { outdoorAmenities, indoorAmenities } from '../data/cruises';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  userRole: string;
  onLogout: () => void;
  onViewProfile: () => void;
  onShowBasicAdmin?: () => void;
  onShowSuperAdmin?: () => void;
}

interface FilterState {
  roomType: string;
  numberOfPeople: number;
  priceRange: [number, number];
  selectedOutdoorAmenities: string[];
  selectedIndoorAmenities: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  onToggle, 
  userRole, 
  onLogout, 
  onViewProfile,
  onShowBasicAdmin,
  onShowSuperAdmin 
}) => {
  // State for expandable filters section
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  
  // State for filter values
  const [filters, setFilters] = useState<FilterState>({
    roomType: '',
    numberOfPeople: 2,
    priceRange: [20000, 60000],
    selectedOutdoorAmenities: [],
    selectedIndoorAmenities: []
  });

  // Handle amenity selection
  const handleOutdoorAmenityChange = (checkedValues: string[]) => {
    setFilters(prev => ({ ...prev, selectedOutdoorAmenities: checkedValues }));
  };

  const handleIndoorAmenityChange = (checkedValues: string[]) => {
    setFilters(prev => ({ ...prev, selectedIndoorAmenities: checkedValues }));
  };

  // Handle support contact
  const handleContactSupport = () => {
    alert('Contact Support feature would open a chat modal here!');
  };

  return (
    <div
      className={`
        fixed left-0 top-0 h-full bg-white/20 backdrop-blur-md border-r border-white/30 
        shadow-lg transition-all duration-300 z-50
        ${isCollapsed ? 'w-16' : 'w-80'}
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 bg-blue-500 text-white rounded-full p-1 shadow-md hover:bg-blue-600 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="p-4 h-full flex flex-col">
        {/* Top Section - User Profile */}
        <div className={`mb-6 ${isCollapsed ? 'text-center' : ''}`}>
          <div className={`flex ${isCollapsed ? 'justify-center' : 'items-center gap-3'} mb-4`}>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={24} />
            </div>
            {!isCollapsed && (
              <div>
                <h3 className="font-semibold text-gray-800">{userRole}</h3>
                <p className="text-sm text-gray-600">Yorker Holidays</p>
              </div>
            )}
          </div>
          
          {!isCollapsed && (
            <button className="w-full flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <History size={18} />
              <span>
                {userRole === 'Travel Agent' 
                  ? 'View Previous Bookings'
                  : userRole === 'Basic Admin'
                  ? 'View Team Reports'
                  : 'View System Logs'
                }
              </span>
            </button>
          )}
        </div>

        {/* Middle Section - Expandable Filters */}
        <div className="flex-1 overflow-y-auto">
          {!isCollapsed && (
            <div className="mb-6">
              <button
                onClick={() => setFiltersExpanded(!filtersExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 text-gray-800 hover:bg-white/30 rounded-lg transition-colors mb-3"
              >
                <span className="font-medium flex items-center gap-2">
                  <Settings size={18} />
                  Filters
                </span>
                <ChevronRight className={`transition-transform ${filtersExpanded ? 'rotate-90' : ''}`} size={16} />
              </button>

              {filtersExpanded && (
                <div className="space-y-4 pl-2">
                  {/* Room Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                    <input
                      type="text"
                      placeholder="e.g., Balcony, Suite"
                      value={filters.roomType}
                      onChange={(e) => setFilters(prev => ({ ...prev, roomType: e.target.value }))}
                      className="w-full px-3 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Number of People */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of People</label>
                    <select
                      value={filters.numberOfPeople}
                      onChange={(e) => setFilters(prev => ({ ...prev, numberOfPeople: Number(e.target.value) }))}
                      className="w-full px-3 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range: ₹{filters.priceRange[0].toLocaleString('en-IN')} - ₹{filters.priceRange[1].toLocaleString('en-IN')}
                    </label>
                    <Slider
                      range
                      min={10000}
                      max={100000}
                      step={5000}
                      value={filters.priceRange}
                      onChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                      trackStyle={[{ backgroundColor: '#3B82F6' }]}
                      handleStyle={[{ borderColor: '#3B82F6' }, { borderColor: '#3B82F6' }]}
                    />
                  </div>

                  {/* Outdoor Amenities */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Outdoor Amenities</label>
                    <Checkbox.Group
                      options={outdoorAmenities}
                      value={filters.selectedOutdoorAmenities}
                      onChange={handleOutdoorAmenityChange}
                      className="grid grid-cols-1 gap-1"
                    />
                  </div>

                  {/* Indoor Amenities */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Indoor Amenities</label>
                    <Checkbox.Group
                      options={indoorAmenities}
                      value={filters.selectedIndoorAmenities}
                      onChange={handleIndoorAmenityChange}
                      className="grid grid-cols-1 gap-1"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Section - Actions */}
        <div className="mt-auto space-y-2">
          {/* Role-specific admin access */}
          {userRole === 'Basic Admin' && onShowBasicAdmin && (
            <button 
              onClick={onShowBasicAdmin}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors`}
            >
              <UsersIcon size={18} />
              {!isCollapsed && <span>Admin Dashboard</span>}
            </button>
          )}
          
          {userRole === 'Super Admin' && onShowSuperAdmin && (
            <button 
              onClick={onShowSuperAdmin}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors`}
            >
              <Shield size={18} />
              {!isCollapsed && <span>Super Admin</span>}
            </button>
          )}
          
          <button 
            onClick={onViewProfile}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors`}
          >
            <User size={18} />
            {!isCollapsed && <span>View Profile</span>}
          </button>
          
          <button
            onClick={handleContactSupport}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors`}
          >
            <MessageCircle size={18} />
            {!isCollapsed && <span>Contact Support</span>}
          </button>
          
          <button
            onClick={onLogout}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'} px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors`}
          >
            <LogOut size={18} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;