import React from 'react';
import { Calendar, Clock, MapPin, IndianRupee, Eye, X, Users, Star, CheckCircle, Heart, Share2, BarChart3 } from 'lucide-react';
import { Cruise } from '../data/cruises';
import { wishlistService } from '../services/wishlistService';
import { useToast } from './ToastNotification';

interface CruiseCardProps {
  cruise: Cruise;
  onViewDetails: (cruise: Cruise) => void;
  onCancel: (cruiseId: string) => void;
  onAddToComparison?: (cruise: Cruise) => void;
  isBooked?: boolean;
  loading?: boolean;
}

const CruiseCard: React.FC<CruiseCardProps> = ({ cruise, onViewDetails, onCancel, onAddToComparison, isBooked = false, loading = false }) => {
  const { showSuccess, showError } = useToast();
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Check wishlist status on mount
  useEffect(() => {
    const checkWishlistStatus = async () => {
      const status = await wishlistService.isInWishlist(cruise.id);
      setIsInWishlist(status);
    };
    checkWishlistStatus();
  }, [cruise.id]);

  // Handle cancel with confirmation
  const handleCancel = () => {
    if (isBooked && window.confirm(`Are you sure you want to cancel booking for ${cruise.name}?`)) {
      onCancel(cruise.id);
    }
  };

  // Handle wishlist toggle
  const handleWishlistToggle = async () => {
    try {
      if (isInWishlist) {
        await wishlistService.removeFromWishlist(cruise.id);
        setIsInWishlist(false);
        showSuccess('Removed from Wishlist', `${cruise.name} removed from your wishlist`);
      } else {
        await wishlistService.addToWishlist({
          id: cruise.id,
          name: cruise.name,
          type: 'cruise',
          price: cruise.pricePerPerson,
          image: cruise.image,
          priority: 'Medium',
          notes: ''
        });
        setIsInWishlist(true);
        showSuccess('Added to Wishlist', `${cruise.name} added to your wishlist`);
      }
    } catch (error) {
      showError('Wishlist Error', 'Failed to update wishlist');
    }
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: cruise.name,
          text: cruise.description,
          url: window.location.href
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(`Check out ${cruise.name}: ${cruise.description}`);
        showSuccess('Link Copied', 'Cruise details copied to clipboard');
      }
    } else {
      navigator.clipboard.writeText(`Check out ${cruise.name}: ${cruise.description}`);
      showSuccess('Link Copied', 'Cruise details copied to clipboard');
    }
  };

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Format departure date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format short date for available dates
  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className={`bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-[1.02] mb-6 ${isBooked ? 'ring-2 ring-green-400' : ''}`}>
      {/* Booking Status Banner */}
      {isBooked && (
        <div className="bg-green-500 text-white px-4 py-2 text-sm font-medium flex items-center gap-2">
          <CheckCircle size={16} />
          <span>Booking Confirmed</span>
        </div>
      )}
      
      {/* Horizontal Layout Container */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Section - Cruise Details */}
        <div className="flex-1 p-6 lg:p-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div className="flex-1">
              {/* Cruise Name and Ship Type */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-2">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800">{cruise.name}</h3>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium w-fit">
                  {cruise.shipType}
                </span>
              </div>
              
              {/* Route */}
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <MapPin size={18} />
                <span className="text-lg font-medium">{cruise.from} → {cruise.to}</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="text-right mt-4 sm:mt-0">
              <div className="flex items-center justify-end gap-1 text-3xl font-bold text-green-600 mb-1">
                <IndianRupee size={24} />
                <span>{formatPrice(cruise.pricePerPerson)}</span>
              </div>
              <p className="text-sm text-gray-500">per person</p>
            </div>
          </div>

          {/* Cruise Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Duration and Cruise Line */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={16} />
                <span className="font-medium">{cruise.duration} nights</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded-full font-medium">
                  {cruise.cruiseLine}
                </span>
              </div>
            </div>

            {/* Room Types */}
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Users size={16} />
                <span className="font-medium text-sm">Room Types Available:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {cruise.roomTypes.slice(0, 3).map((room, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {room}
                  </span>
                ))}
                {cruise.roomTypes.length > 3 && (
                  <span className="text-xs text-blue-600 font-medium">
                    +{cruise.roomTypes.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Available Departure Dates */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-gray-700 mb-3">
              <Calendar size={16} />
              <span className="font-medium text-sm">Available Departure Dates:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cruise.departureDates.map((date, index) => (
                <div
                  key={index}
                  className="bg-blue-50 border border-blue-200 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  {formatShortDate(date)}
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Preview */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2 text-sm">Ship Amenities:</h4>
            <div className="flex flex-wrap gap-2">
              {cruise.amenities.slice(0, 6).map((amenity, index) => (
                <span key={index} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded border border-purple-200">
                  {amenity}
                </span>
              ))}
              {cruise.amenities.length > 6 && (
                <span className="text-xs text-purple-600 font-medium">
                  +{cruise.amenities.length - 6} more amenities
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {cruise.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Primary Action Button */}
            <button
              onClick={() => onViewDetails(cruise)}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium"
            >
              <Eye size={18} />
              <span>{isBooked ? 'View Booking Details' : 'View Details & Book'}</span>
            </button>
            
            {/* Secondary Actions */}
            <div className="flex gap-2">
              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors duration-200 font-medium ${
                  isInWishlist
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-white/20 hover:bg-white/30 text-gray-700 border border-white/40'
                }`}
              >
                <Heart size={18} className={isInWishlist ? 'fill-current' : ''} />
              </button>
              
              {/* Share Button */}
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-gray-700 py-3 px-4 rounded-lg transition-colors duration-200 font-medium border border-white/40"
              >
                <Share2 size={18} />
              </button>
              
              {/* Compare Button */}
              {onAddToComparison && (
                <button
                  onClick={() => onAddToComparison(cruise)}
                  className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
                >
                  <BarChart3 size={18} />
                </button>
              )}
            </div>
            
            {/* Cancel Button for Booked Cruises */}
            {isBooked && (
              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X size={18} />
                <span className="hidden sm:inline">{loading ? 'Cancelling...' : 'Cancel Booking'}</span>
                <span className="sm:hidden">{loading ? 'Cancelling...' : 'Cancel'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Section - Cruise Image */}
        <div className="lg:w-80 lg:flex-shrink-0">
          <div className="relative h-64 lg:h-full overflow-hidden lg:rounded-r-2xl">
            <img
              src={cruise.image}
              alt={cruise.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            
            {/* Image Overlay with Rating */}
            <div className="absolute top-4 left-4">
              <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span>4.{Math.floor(Math.random() * 3) + 7}</span>
              </div>
            </div>

            {/* Duration Badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                {cruise.duration} Nights
              </div>
            </div>

            {/* Booking Status Badge */}
            {isBooked && (
              <div className="absolute top-16 right-4">
                <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <CheckCircle size={14} />
                  <span>Booked</span>
                </div>
              </div>
            )}
            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* Next Departure Info */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-white">
                <p className="text-xs opacity-90">Next Departure:</p>
                <p className="font-semibold">{formatDate(cruise.departureDates[0])}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add missing import
import React, { useState, useEffect } from 'react';

export default CruiseCard;