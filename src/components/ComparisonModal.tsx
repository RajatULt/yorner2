import React, { useState } from 'react';
import { X, Star, MapPin, Calendar, Users, Wifi, Car, Dumbbell, Waves, Heart, Share2, Download } from 'lucide-react';
import { Cruise } from '../data/cruises';
import { Hotel } from '../data/hotels';
import { wishlistService } from '../services/wishlistService';
import { useToast } from './ToastNotification';

interface ComparisonModalProps {
  items: (Cruise | Hotel)[];
  type: 'cruise' | 'hotel';
  onClose: () => void;
  onRemoveItem: (itemId: string) => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ items, type, onClose, onRemoveItem }) => {
  const { showSuccess, showError } = useToast();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = async (item: Cruise | Hotel) => {
    try {
      const isInWishlist = await wishlistService.isInWishlist(item.id);
      
      if (isInWishlist) {
        await wishlistService.removeFromWishlist(item.id);
        showSuccess('Removed from Wishlist', `${item.name} removed from your wishlist`);
      } else {
        await wishlistService.addToWishlist({
          id: item.id,
          name: item.name,
          type: type,
          price: type === 'cruise' ? (item as Cruise).pricePerPerson : (item as Hotel).pricePerNight,
          image: item.image,
          priority: 'Medium',
          notes: ''
        });
        showSuccess('Added to Wishlist', `${item.name} added to your wishlist`);
      }
    } catch (error) {
      showError('Wishlist Error', 'Failed to update wishlist');
    }
  };

  // Handle share
  const handleShare = async (item: Cruise | Hotel) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.name,
          text: item.description,
          url: window.location.href
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(`Check out ${item.name}: ${item.description}`);
        showSuccess('Link Copied', 'Sharing link copied to clipboard');
      }
    } else {
      navigator.clipboard.writeText(`Check out ${item.name}: ${item.description}`);
      showSuccess('Link Copied', 'Sharing link copied to clipboard');
    }
  };

  // Export comparison
  const handleExportComparison = () => {
    const comparisonData = items.map(item => ({
      name: item.name,
      price: type === 'cruise' ? (item as Cruise).pricePerPerson : (item as Hotel).pricePerNight,
      description: item.description,
      amenities: type === 'cruise' ? (item as Cruise).amenities : (item as Hotel).amenities
    }));

    const dataStr = JSON.stringify(comparisonData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${type}_comparison_${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showSuccess('Export Complete', 'Comparison data exported successfully');
  };

  // Get best value item
  const getBestValue = () => {
    if (items.length === 0) return null;
    
    return items.reduce((best, current) => {
      const currentPrice = type === 'cruise' ? (current as Cruise).pricePerPerson : (current as Hotel).pricePerNight;
      const bestPrice = type === 'cruise' ? (best as Cruise).pricePerPerson : (best as Hotel).pricePerNight;
      
      return currentPrice < bestPrice ? current : best;
    });
  };

  const bestValue = getBestValue();

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl max-w-md w-full p-8 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">No Items to Compare</h3>
          <p className="text-gray-600 mb-6">Add items to your comparison list to see them here.</p>
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Compare {type === 'cruise' ? 'Cruises' : 'Hotels'}
            </h2>
            <p className="text-gray-600">Compare up to {items.length} {type}s side by side</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportComparison}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download size={18} />
              Export
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Best Value Banner */}
          {bestValue && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-green-700">
                <Star size={20} className="text-yellow-500 fill-current" />
                <span className="font-medium">Best Value: {bestValue.name}</span>
              </div>
              <p className="text-green-600 text-sm mt-1">
                Lowest price with great amenities - 
                {type === 'cruise' 
                  ? formatPrice((bestValue as Cruise).pricePerPerson)
                  : formatPrice((bestValue as Hotel).pricePerNight)
                }
              </p>
            </div>
          )}

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="p-4 font-medium text-gray-700 border-b border-gray-200 w-48">
                    Features
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 border-b border-gray-200 min-w-64">
                      <div className="relative">
                        {/* Remove button */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X size={12} />
                        </button>
                        
                        {/* Item image */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        
                        {/* Item name */}
                        <h3 className="font-bold text-gray-800 mb-2">{item.name}</h3>
                        
                        {/* Best value badge */}
                        {bestValue?.id === item.id && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Best Value
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              
              <tbody>
                {/* Price Row */}
                <tr className="bg-blue-50">
                  <td className="p-4 font-medium text-gray-700 border-b border-gray-200">
                    Price {type === 'cruise' ? 'per Person' : 'per Night'}
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 border-b border-gray-200">
                      <div className="text-2xl font-bold text-green-600">
                        {type === 'cruise' 
                          ? formatPrice((item as Cruise).pricePerPerson)
                          : formatPrice((item as Hotel).pricePerNight)
                        }
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Location/Route Row */}
                <tr>
                  <td className="p-4 font-medium text-gray-700 border-b border-gray-200">
                    {type === 'cruise' ? 'Route' : 'Location'}
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span>
                          {type === 'cruise' 
                            ? `${(item as Cruise).from} → ${(item as Cruise).to}`
                            : (item as Hotel).location
                          }
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Duration/Rating Row */}
                <tr className="bg-gray-50">
                  <td className="p-4 font-medium text-gray-700 border-b border-gray-200">
                    {type === 'cruise' ? 'Duration' : 'Star Rating'}
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 border-b border-gray-200">
                      {type === 'cruise' ? (
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span>{(item as Cruise).duration} nights</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              size={16}
                              className={`${
                                index < (item as Hotel).starRating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-600">
                            ({(item as Hotel).starRating})
                          </span>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Type/Chain Row */}
                <tr>
                  <td className="p-4 font-medium text-gray-700 border-b border-gray-200">
                    {type === 'cruise' ? 'Ship Type' : 'Hotel Chain'}
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 border-b border-gray-200">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        {type === 'cruise' 
                          ? (item as Cruise).shipType
                          : (item as Hotel).hotelChain
                        }
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Amenities Row */}
                <tr className="bg-gray-50">
                  <td className="p-4 font-medium text-gray-700 border-b border-gray-200">
                    Amenities
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 border-b border-gray-200">
                      <div className="space-y-1">
                        {(type === 'cruise' ? (item as Cruise).amenities : (item as Hotel).amenities)
                          .slice(0, 5)
                          .map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>{amenity}</span>
                            </div>
                          ))
                        }
                        {(type === 'cruise' ? (item as Cruise).amenities : (item as Hotel).amenities).length > 5 && (
                          <div className="text-xs text-blue-600 font-medium">
                            +{(type === 'cruise' ? (item as Cruise).amenities : (item as Hotel).amenities).length - 5} more
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Room Types Row */}
                <tr>
                  <td className="p-4 font-medium text-gray-700 border-b border-gray-200">
                    {type === 'cruise' ? 'Cabin Types' : 'Room Types'}
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 border-b border-gray-200">
                      <div className="space-y-1">
                        {(type === 'cruise' ? (item as Cruise).roomTypes : (item as Hotel).availableRoomTypes)
                          .map((roomType, index) => (
                            <span key={index} className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs mr-1 mb-1">
                              {roomType}
                            </span>
                          ))
                        }
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Description Row */}
                <tr className="bg-gray-50">
                  <td className="p-4 font-medium text-gray-700 border-b border-gray-200">
                    Description
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 border-b border-gray-200">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* Actions Row */}
                <tr>
                  <td className="p-4 font-medium text-gray-700">
                    Actions
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4">
                      <div className="space-y-2">
                        <button
                          onClick={() => handleWishlistToggle(item)}
                          className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          <Heart size={16} />
                          Wishlist
                        </button>
                        <button
                          onClick={() => handleShare(item)}
                          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          <Share2 size={16} />
                          Share
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            // In real app, this would navigate to booking
                            alert(`Booking ${item.name}...`);
                          }}
                          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors font-medium"
                        >
                          Book Now
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Comparison Summary */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Comparison Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Items Compared:</span>
                <span className="font-medium ml-2">{items.length}</span>
              </div>
              <div>
                <span className="text-blue-700">Price Range:</span>
                <span className="font-medium ml-2">
                  {formatPrice(Math.min(...items.map(item => 
                    type === 'cruise' ? (item as Cruise).pricePerPerson : (item as Hotel).pricePerNight
                  )))} - {formatPrice(Math.max(...items.map(item => 
                    type === 'cruise' ? (item as Cruise).pricePerPerson : (item as Hotel).pricePerNight
                  )))}
                </span>
              </div>
              <div>
                <span className="text-blue-700">Best Value:</span>
                <span className="font-medium ml-2">{bestValue?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;