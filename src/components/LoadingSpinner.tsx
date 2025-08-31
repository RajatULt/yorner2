import React from 'react';
import { Loader2, Ship } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  fullScreen?: boolean;
  type?: 'default' | 'cruise' | 'hotel';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  message = 'Loading...', 
  fullScreen = false,
  type = 'default'
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50'
    : 'flex items-center justify-center p-4';

  const getIcon = () => {
    switch (type) {
      case 'cruise':
        return <Ship className={`${sizeClasses[size]} text-blue-500 animate-bounce`} />;
      case 'hotel':
        return <Loader2 className={`${sizeClasses[size]} text-purple-500 animate-spin`} />;
      default:
        return <Loader2 className={`${sizeClasses[size]} text-blue-500 animate-spin`} />;
    }
  };

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {getIcon()}
        </div>
        {message && (
          <p className="text-gray-600 text-sm font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;