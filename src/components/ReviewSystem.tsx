import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, User, Calendar, Tag, Send } from 'lucide-react';
import { reviews, reviewStats } from '../data/reviews';
import type { Review } from '../data/reviews';

interface ReviewSystemProps {
  entityType: 'agent' | 'cruise' | 'hotel' | 'service';
  entityId: string;
  entityName: string;
  canReview?: boolean;
  currentUserId?: string;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({ 
  entityType, 
  entityId, 
  entityName, 
  canReview = false,
  currentUserId 
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    reviewerName: '',
    reviewerEmail: ''
  });

  // Filter reviews for this entity
  const entityReviews = reviews.filter(
    review => review.entityType === entityType && review.entityId === entityId
  );

  // Get stats for this entity
  const stats = reviewStats.find(
    stat => stat.entityType === entityType && stat.entityId === entityId
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would submit to backend
    console.log('Submitting review:', {
      ...newReview,
      entityType,
      entityId,
      entityName
    });

    // Reset form
    setNewReview({
      rating: 5,
      title: '',
      comment: '',
      reviewerName: '',
      reviewerEmail: ''
    });
    setShowReviewForm(false);
    
    // Show success message
    alert('Thank you for your review! It will be published after verification.');
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <Star
              size={16}
              className={`${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Reviews & Ratings</h3>
          <p className="text-sm text-gray-600">for {entityName}</p>
        </div>
        {canReview && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Write Review
          </button>
        )}
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Average Rating */}
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {stats.averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(stats.averageRating))}
              </div>
              <p className="text-sm text-gray-600">{stats.totalReviews} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Rating Distribution</h4>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2 mb-1">
                  <span className="text-sm w-3">{rating}</span>
                  <Star size={12} className="text-yellow-400 fill-current" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${stats.totalReviews > 0 ? (stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution] / stats.totalReviews) * 100 : 0}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-6">
                    {stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]}
                  </span>
                </div>
              ))}
            </div>

            {/* Top Tags */}
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Common Mentions</h4>
              <div className="flex flex-wrap gap-2">
                {stats.topTags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                  >
                    <Tag size={10} />
                    {tag.tag} ({tag.count})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
          <h4 className="font-medium text-gray-800 mb-4">Write a Review</h4>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={newReview.reviewerName}
                  onChange={(e) => setNewReview(prev => ({ ...prev, reviewerName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={newReview.reviewerEmail}
                  onChange={(e) => setNewReview(prev => ({ ...prev, reviewerEmail: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating *
              </label>
              <div className="flex items-center gap-2">
                {renderStars(newReview.rating, true, (rating) => 
                  setNewReview(prev => ({ ...prev, rating }))
                )}
                <span className="text-sm text-gray-600 ml-2">
                  {newReview.rating} out of 5 stars
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review Title *
              </label>
              <input
                type="text"
                required
                value={newReview.title}
                onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Summarize your experience"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Review *
              </label>
              <textarea
                required
                rows={4}
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your detailed experience..."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Send size={16} />
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {entityReviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
            <p>No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          entityReviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-4">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    <User size={16} />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">{review.reviewerName}</h5>
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating)}
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(review.timestamp)}
                  </p>
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-3">
                <h6 className="font-medium text-gray-800 mb-2">{review.title}</h6>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>

              {/* Tags */}
              {review.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {review.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Response */}
              {review.response && (
                <div className="bg-gray-50 rounded-lg p-3 mt-3 border-l-4 border-blue-500">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {review.response.responderName.charAt(0)}
                    </div>
                    <span className="font-medium text-sm text-gray-800">
                      {review.response.responderName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(review.response.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{review.response.message}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200">
                <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  <ThumbsUp size={14} />
                  Helpful ({review.helpful})
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  <MessageCircle size={14} />
                  Reply
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSystem;