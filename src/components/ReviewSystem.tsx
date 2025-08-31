import React, { useState } from 'react';
import { Star, Send, ThumbsUp, ThumbsDown, User } from 'lucide-react';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface ReviewSystemProps {
  entityType: 'cruise' | 'hotel';
  entityId: string;
  entityName: string;
  canReview: boolean;
  currentUserId: string;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({
  entityType,
  entityId,
  entityName,
  canReview,
  currentUserId
}) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Rahul Gupta',
      rating: 5,
      comment: 'Absolutely amazing experience! The service was exceptional and the facilities were world-class.',
      date: '2024-03-10',
      helpful: 12,
      verified: true
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Priya Sharma',
      rating: 4,
      comment: 'Great value for money. Staff was friendly and accommodating. Would definitely recommend.',
      date: '2024-03-08',
      helpful: 8,
      verified: true
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Arjun Patel',
      rating: 5,
      comment: 'Perfect for our anniversary celebration. Every detail was taken care of beautifully.',
      date: '2024-03-05',
      helpful: 15,
      verified: true
    }
  ]);

  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  });

  const [showReviewForm, setShowReviewForm] = useState(false);

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  // Handle new review submission
  const handleSubmitReview = () => {
    if (newReview.rating === 0) {
      alert('Please select a rating');
      return;
    }

    if (!newReview.comment.trim()) {
      alert('Please write a review comment');
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      userId: currentUserId,
      userName: 'Current User',
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: true
    };

    setReviews(prev => [review, ...prev]);
    setNewReview({ rating: 0, comment: '' });
    setShowReviewForm(false);
    alert('Review submitted successfully!');
  };

  // Handle helpful vote
  const handleHelpfulVote = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Customer Reviews</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={`${
                    index < Math.round(averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
            </span>
          </div>
        </div>

        {canReview && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Write Review
          </button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && canReview && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-4">Write Your Review</h4>
          
          {/* Rating Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                  className="p-1"
                >
                  <Star
                    size={24}
                    className={`${
                      rating <= newReview.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 hover:text-yellow-300'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              placeholder={`Share your experience with ${entityName}...`}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSubmitReview}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Send size={16} />
              Submit Review
            </button>
            <button
              onClick={() => {
                setShowReviewForm(false);
                setNewReview({ rating: 0, comment: '' });
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="text-white" size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-800">{review.userName}</h4>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={14}
                          className={`${
                            index < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

            {/* Review Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleHelpfulVote(review.id)}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors text-sm"
              >
                <ThumbsUp size={14} />
                <span>Helpful ({review.helpful})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Reviews Message */}
      {reviews.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <Star size={48} />
          </div>
          <h4 className="text-lg font-medium text-gray-600 mb-2">No reviews yet</h4>
          <p className="text-gray-500">Be the first to review this {entityType}!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewSystem;