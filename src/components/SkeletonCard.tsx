import React from 'react';

interface SkeletonCardProps {
  type?: 'cruise' | 'hotel' | 'dashboard' | 'table';
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ type = 'cruise' }) => {
  if (type === 'dashboard') {
    return (
      <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 rounded w-16"></div>
        </div>
        <div className="h-12 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <tr className="animate-pulse">
        <td className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-3 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
        </td>
        <td className="p-4">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </td>
        <td className="p-4">
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </td>
        <td className="p-4">
          <div className="h-6 bg-gray-300 rounded w-12"></div>
        </td>
        <td className="p-4">
          <div className="flex gap-2">
            <div className="h-8 bg-gray-300 rounded w-16"></div>
            <div className="h-8 bg-gray-300 rounded w-12"></div>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg overflow-hidden mb-6 animate-pulse">
      <div className="flex flex-col lg:flex-row">
        {/* Left Section - Details Skeleton */}
        <div className="flex-1 p-6 lg:p-8">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div className="flex-1">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-3"></div>
            </div>
            <div className="text-right mt-4 sm:mt-0">
              <div className="h-10 bg-gray-300 rounded w-24 mb-1"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
          </div>

          {/* Details Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-20"></div>
              <div className="h-6 bg-gray-300 rounded w-32"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="flex gap-1">
                <div className="h-6 bg-gray-300 rounded w-16"></div>
                <div className="h-6 bg-gray-300 rounded w-16"></div>
                <div className="h-6 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          </div>

          {/* Amenities Skeleton */}
          <div className="mb-4">
            <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-6 bg-gray-300 rounded w-20"></div>
              ))}
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="mb-6">
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 h-12 bg-gray-300 rounded-lg"></div>
            <div className="h-12 bg-gray-300 rounded-lg w-32"></div>
          </div>
        </div>

        {/* Right Section - Image Skeleton */}
        <div className="lg:w-80 lg:flex-shrink-0">
          <div className="h-64 lg:h-full bg-gray-300 lg:rounded-r-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;