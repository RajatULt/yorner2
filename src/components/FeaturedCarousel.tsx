import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Star, Eye, TrendingUp, Award, Users } from 'lucide-react';
import { Cruise } from '../data/cruises';
import { Hotel } from '../data/hotels';
import { wishlistService } from '../services/wishlistService';
import { useToast } from './ToastNotification';

interface FeaturedItem {
  id: string;
  name: string;
  image: string;
  type: 'cruise' | 'hotel';
  price: number;
  rating: number;
  description: string;
  badge: string;
  stats: {
    bookings: number;
    satisfaction: number;
    repeatCustomers: number;
  };
}

interface FeaturedCarouselProps {
  items: (Cruise | Hotel)[];
  onViewDetails: (item: Cruise | Hotel) => void;
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ items, onViewDetails }) => {
  const { showSuccess, showError } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState<{ [key: string]: boolean }>({});

  // Convert items to featured format
  const featuredItems: FeaturedItem[] = items.slice(0, 6).map((item, index) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    type: 'cruiseLine' in item ? 'cruise' : 'hotel',
    price: 'pricePerPerson' in item ? item.pricePerPerson : item.pricePerNight,
    rating: 4.2 + (index * 0.1), // Mock rating
    description: item.description,
    badge: index === 0 ? 'Most Popular' : index === 1 ? 'Best Value' : index === 2 ? 'Trending' : 'Featured',
    stats: {
      bookings: 150 + (index * 50),
      satisfaction: 92 + (index * 2),
      repeatCustomers: 68 + (index * 3)
    }
  }));

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [featuredItems.length]);

  // Check wishlist status
  useEffect(() => {
    const checkWishlistStatus = async () => {
      const status: { [key: string]: boolean } = {};
      for (const item of featuredItems) {
        status[item.id] = await wishlistService.isInWishlist(item.id);
      }
      setIsInWishlist(status);
    };
    
    checkWishlistStatus();
  }, [featuredItems]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = async (item: FeaturedItem) => {
    try {
      const currentStatus = isInWishlist[item.id];
      
      if (currentStatus) {
        await wishlistService.removeFromWishlist(item.id);
        setIsInWishlist(prev => ({ ...prev, [item.id]: false }));
        showSuccess('Removed from Wishlist', `${item.name} removed from your wishlist`);
      } else {
        await wishlistService.addToWishlist({
          id: item.id,
          name: item.name,
          type: item.type,
          price: item.price,
          image: item.image,
          priority: 'Medium',
          notes: ''
        });
        setIsInWishlist(prev => ({ ...prev, [item.id]: true }));
        showSuccess('Added to Wishlist', `${item.name} added to your wishlist`);
      }
    } catch (error) {
      showError('Wishlist Error', 'Failed to update wishlist');
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (featuredItems.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured
            <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Travel Experiences
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked premium experiences with exceptional value and customer satisfaction
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl">
            {featuredItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                      {/* Left - Main Info */}
                      <div>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                          <Award size={16} />
                          {item.badge}
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                          {item.name}
                        </h3>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${
                                  i < Math.floor(item.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-400'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-white font-medium">{item.rating.toFixed(1)}</span>
                          <span className="text-white/70 text-sm">({item.stats.bookings} reviews)</span>
                        </div>
                        
                        {/* Description */}
                        <p className="text-white/90 text-lg leading-relaxed mb-4 max-w-lg">
                          {item.description}
                        </p>
                        
                        {/* Price */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="text-3xl font-bold text-white">
                            {formatPrice(item.price)}
                          </div>
                          <span className="text-white/70">
                            per {item.type === 'cruise' ? 'person' : 'night'}
                          </span>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => onViewDetails(items.find(i => i.id === item.id)!)}
                            className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
                          >
                            <Eye size={18} />
                            View Details
                          </button>
                          <button
                            onClick={() => handleWishlistToggle(item)}
                            className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                              isInWishlist[item.id]
                                ? 'bg-red-500 text-white hover:bg-red-600'
                                : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                            }`}
                          >
                            <Heart size={18} className={isInWishlist[item.id] ? 'fill-current' : ''} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Right - Stats */}
                      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
                        <h4 className="text-white font-semibold mb-4">Why Customers Love This</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <TrendingUp size={16} className="text-green-400" />
                              <span className="text-white text-sm">Bookings</span>
                            </div>
                            <span className="text-white font-bold">{item.stats.bookings}+</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Star size={16} className="text-yellow-400" />
                              <span className="text-white text-sm">Satisfaction</span>
                            </div>
                            <span className="text-white font-bold">{item.stats.satisfaction}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Users size={16} className="text-blue-400" />
                              <span className="text-white text-sm">Repeat Customers</span>
                            </div>
                            <span className="text-white font-bold">{item.stats.repeatCustomers}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 shadow-lg"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {featuredItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-blue-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-white/30 p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600 text-sm">Featured Experiences</div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-white/30 p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">4.8★</div>
            <div className="text-gray-600 text-sm">Average Rating</div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-white/30 p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600 text-sm">Customer Satisfaction</div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-white/30 p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600 text-sm">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;