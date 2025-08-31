import React from 'react';
import { Search, Ship, Building, Calendar, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  type: 'search' | 'bookings' | 'cruises' | 'hotels' | 'notifications' | 'error';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  type, 
  title, 
  description, 
  actionLabel, 
  onAction,
  icon 
}) => {
  const getDefaultIcon = () => {
    switch (type) {
      case 'search':
        return <Search size={48} className="text-gray-400" />;
      case 'cruises':
        return <Ship size={48} className="text-blue-400" />;
      case 'hotels':
        return <Building size={48} className="text-purple-400" />;
      case 'bookings':
        return <Calendar size={48} className="text-green-400" />;
      case 'error':
        return <AlertCircle size={48} className="text-red-400" />;
      default:
        return <Search size={48} className="text-gray-400" />;
    }
  };

  return (
    <div className="text-center py-12">
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 p-8 max-w-md mx-auto">
        <div className="mb-4">
          {icon || getDefaultIcon()}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;