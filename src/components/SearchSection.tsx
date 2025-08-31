import React from 'react';
import React, { useState } from 'react';
import { Search, Filter, Star, Users, Calendar, MapPin, Sliders } from 'lucide-react';
import { Slider, Rate, DatePicker, AutoComplete } from 'antd';
import { destinations, cruiseLines, shipTypes, months } from '../data/cruises';
import dayjs from 'dayjs';

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

interface SearchSectionProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ filters, onFiltersChange }) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  // Search suggestions based on available data
  const allSuggestions = [
    ...destinations.filter(d => d !== 'All Destinations'),
    ...cruiseLines.filter(c => c !== 'All Cruise Lines'),
    'Luxury cruise', 'Family cruise', 'Romantic getaway', 'Adventure cruise',
    'Mediterranean', 'Caribbean', 'Alaska', 'Baltic', 'Norwegian Fjords'
  ];

  // Handle search input with suggestions
  const handleSearchChange = (value: string) => {
    handleInputChange('searchText', value);
    
    if (value.length > 1) {
      const filtered = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(filtered.slice(0, 5));
    } else {
      setSearchSuggestions([]);
    }
  };

  // Quick filter presets
  const quickFilters = [
    {
      label: 'Luxury',
      filters: { priceRange: [50000, 200000] as [number, number], minRating: 4 }
    },
    {
      label: 'Budget',
      filters: { priceRange: [15000, 40000] as [number, number], minRating: 0 }
    },
    {
      label: 'Family',
      filters: { passengerCount: 4, shipType: 'Family Ship' }
    },
    {
      label: 'Romantic',
      filters: { passengerCount: 2, priceRange: [40000, 100000] as [number, number] }
    }
  ];

  // Apply quick filter
  const applyQuickFilter = (quickFilter: any) => {
    onFiltersChange({
      ...filters,
      ...quickFilter.filters
    });
  };
  // Handle input changes
  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  // Handle search submit
  const handleSearchSubmit = () => {
    // Trigger search - in real app this would call API
    console.log('Searching with filters:', filters);
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-lg border border-white/30 shadow-lg p-6 mb-6">
      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm font-medium text-gray-700 mr-2">Quick Filters:</span>
        {quickFilters.map((quickFilter, index) => (
          <button
            key={index}
            onClick={() => applyQuickFilter(quickFilter)}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
          >
            {quickFilter.label}
          </button>
        ))}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
        >
          <Sliders size={14} />
          Advanced
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Search size={20} />
          Search & Filter Cruises
        </h2>
        <button
          onClick={handleSearchSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Search size={18} />
          Search
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Text Search */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Cruises</label>
          <AutoComplete
            options={searchSuggestions.map(suggestion => ({ value: suggestion }))}
            value={filters.searchText}
            onChange={handleSearchChange}
            className="w-full"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={18} />
              <input
                type="text"
                placeholder="Search cruises, destinations..."
                className="w-full pl-10 pr-3 py-2 bg-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </AutoComplete>
        </div>

        {/* Passenger Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
          <select
            value={filters.passengerCount}
            onChange={(e) => handleInputChange('passengerCount', Number(e.target.value))}
            className="w-full px-3 py-2 bg-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5, 6].map((count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? 'Passenger' : 'Passengers'}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleInputChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 bg-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="duration_short">Duration: Short to Long</option>
            <option value="duration_long">Duration: Long to Short</option>
            <option value="popularity">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mt-6 pt-6 border-t border-white/30">
          <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Filter size={18} />
            Advanced Filters
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ₹{filters.priceRange[0].toLocaleString('en-IN')} - ₹{filters.priceRange[1].toLocaleString('en-IN')}
              </label>
              <Slider
                range
                min={15000}
                max={200000}
                step={5000}
                value={filters.priceRange}
                onChange={(value) => handleInputChange('priceRange', value)}
                trackStyle={[{ backgroundColor: '#3B82F6' }]}
                handleStyle={[{ borderColor: '#3B82F6' }, { borderColor: '#3B82F6' }]}
              />
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
              <Rate
                value={filters.minRating}
                onChange={(value) => handleInputChange('minRating', value)}
                className="text-yellow-400"
              />
              <div className="text-xs text-gray-500 mt-1">
                {filters.minRating === 0 ? 'Any rating' : `${filters.minRating}+ stars`}
              </div>
            </div>

            {/* Departure Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
              <DatePicker
                value={filters.departureDate ? dayjs(filters.departureDate) : null}
                onChange={(date) => handleInputChange('departureDate', date ? date.format('YYYY-MM-DD') : '')}
                className="w-full"
                format="DD/MM/YYYY"
                placeholder="Select departure date"
                disabledDate={(current) => current && current < dayjs().endOf('day')}
              />
            </div>
          </div>
        </div>
      )}
              value={filters.searchText}
              onChange={(e) => handleInputChange('searchText', e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
          <select
            value={filters.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
            className="w-full px-3 py-2 bg-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {destinations.map((dest) => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>
        </div>

        {/* Cruise Line */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cruise Line</label>
          <select
            value={filters.cruiseLine}
            onChange={(e) => handleInputChange('cruiseLine', e.target.value)}
            className="w-full px-3 py-2 bg-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {cruiseLines.map((line) => (
              <option key={line} value={line}>{line}</option>
            ))}
          </select>
        </div>

        {/* Ship Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ship Type</label>
          <select
            value={filters.shipType}
            onChange={(e) => handleInputChange('shipType', e.target.value)}
            className="w-full px-3 py-2 bg-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {shipTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Month / Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
          <select
            value={filters.month}
            onChange={(e) => handleInputChange('month', e.target.value)}
            className="w-full px-3 py-2 bg-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(filters).map(([key, value]) => {
          // Skip certain keys or empty values
          if (!value || 
              (typeof value === 'string' && (value.toLowerCase().includes('all') || value === '')) ||
              (Array.isArray(value) && value.length === 0) ||
              (typeof value === 'number' && value === 0)) {
            return null;
          }

          let displayValue = value;
          if (key === 'priceRange' && Array.isArray(value)) {
            displayValue = `₹${value[0].toLocaleString('en-IN')} - ₹${value[1].toLocaleString('en-IN')}`;
          } else if (key === 'minRating' && typeof value === 'number') {
            displayValue = `${value}+ stars`;
          } else if (key === 'departureDate') {
            displayValue = dayjs(value as string).format('DD MMM YYYY');
          }

            return (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}: {displayValue}
                <button
                  onClick={() => {
                    if (key === 'priceRange') {
                      handleInputChange(key as keyof SearchFilters, [15000, 200000]);
                    } else if (key === 'minRating' || key === 'passengerCount') {
                      handleInputChange(key as keyof SearchFilters, 0);
                    } else {
                      handleInputChange(key as keyof SearchFilters, '');
                    }
                  }}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            );
        })}
      </div>
    </div>
  );
};

export default SearchSection;