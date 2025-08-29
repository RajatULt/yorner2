// Review system data
export interface Review {
  id: string;
  entityType: 'agent' | 'cruise' | 'hotel' | 'service';
  entityId: string;
  entityName: string;
  reviewerId: string;
  reviewerName: string;
  reviewerEmail: string;
  rating: number; // 1-5 stars
  title: string;
  comment: string;
  timestamp: string;
  verified: boolean;
  helpful: number;
  response?: {
    responderId: string;
    responderName: string;
    message: string;
    timestamp: string;
  };
  tags: string[];
}

export const reviews: Review[] = [
  {
    id: "rev1",
    entityType: "agent",
    entityId: "ag1",
    entityName: "John Smith",
    reviewerId: "cust1",
    reviewerName: "Rahul Gupta",
    reviewerEmail: "rahul.gupta@email.com",
    rating: 5,
    title: "Excellent Service!",
    comment: "John provided exceptional service throughout my cruise booking process. Very professional and knowledgeable about different cruise options. Highly recommended!",
    timestamp: "2024-03-12T16:45:00Z",
    verified: true,
    helpful: 8,
    response: {
      responderId: "ag1",
      responderName: "John Smith",
      message: "Thank you so much for your kind words, Rahul! It was a pleasure helping you plan your cruise vacation.",
      timestamp: "2024-03-12T18:30:00Z"
    },
    tags: ["professional", "knowledgeable", "helpful"]
  },
  {
    id: "rev2",
    entityType: "cruise",
    entityId: "1",
    entityName: "Royal Caribbean Explorer",
    reviewerId: "cust2",
    reviewerName: "Priya Mehta",
    reviewerEmail: "priya.mehta@email.com",
    rating: 4,
    title: "Great Cruise Experience",
    comment: "Amazing cruise with excellent amenities. The food was outstanding and staff was very friendly. Only minor issue was the cabin size could have been bigger.",
    timestamp: "2024-03-10T14:20:00Z",
    verified: true,
    helpful: 12,
    tags: ["food", "staff", "amenities", "cabin"]
  },
  {
    id: "rev3",
    entityType: "hotel",
    entityId: "1",
    entityName: "The Oberoi Mumbai",
    reviewerId: "cust3",
    reviewerName: "Arjun Sharma",
    reviewerEmail: "arjun.sharma@email.com",
    rating: 5,
    title: "Luxury at its Best",
    comment: "Absolutely stunning hotel with impeccable service. The sea view from our room was breathtaking. Worth every penny!",
    timestamp: "2024-03-08T11:30:00Z",
    verified: true,
    helpful: 15,
    tags: ["luxury", "service", "view", "value"]
  },
  {
    id: "rev4",
    entityType: "agent",
    entityId: "ag2",
    entityName: "Amit Patel",
    reviewerId: "cust4",
    reviewerName: "Kavya Nair",
    reviewerEmail: "kavya.nair@email.com",
    rating: 4,
    title: "Good Support",
    comment: "Amit was helpful in finding the right hotel for our honeymoon. Quick responses and good recommendations.",
    timestamp: "2024-03-06T09:15:00Z",
    verified: true,
    helpful: 6,
    response: {
      responderId: "ag2",
      responderName: "Amit Patel",
      message: "Thank you Kavya! Wishing you both a wonderful honeymoon!",
      timestamp: "2024-03-06T10:45:00Z"
    },
    tags: ["responsive", "helpful", "recommendations"]
  },
  {
    id: "rev5",
    entityType: "cruise",
    entityId: "2",
    entityName: "Celebrity Infinity",
    reviewerId: "cust5",
    reviewerName: "Ravi Kumar",
    reviewerEmail: "ravi.kumar@email.com",
    rating: 5,
    title: "Perfect Family Vacation",
    comment: "This cruise was perfect for our family. Kids loved the activities and we enjoyed the fine dining. Will definitely book again!",
    timestamp: "2024-03-04T16:30:00Z",
    verified: true,
    helpful: 10,
    tags: ["family", "activities", "dining", "repeat"]
  },
  {
    id: "rev6",
    entityType: "service",
    entityId: "booking",
    entityName: "Booking Service",
    reviewerId: "cust6",
    reviewerName: "Deepika Rao",
    reviewerEmail: "deepika.rao@email.com",
    rating: 4,
    title: "Smooth Booking Process",
    comment: "The online booking system is user-friendly and the confirmation was instant. Great experience overall.",
    timestamp: "2024-03-02T13:45:00Z",
    verified: true,
    helpful: 7,
    tags: ["user-friendly", "instant", "smooth"]
  },
  {
    id: "rev7",
    entityType: "hotel",
    entityId: "2",
    entityName: "Taj Lake Palace Udaipur",
    reviewerId: "cust7",
    reviewerName: "Neha Patel",
    reviewerEmail: "neha.patel@email.com",
    rating: 5,
    title: "Royal Treatment",
    comment: "Felt like royalty during our stay. The palace is magnificent and the service is world-class. Unforgettable experience!",
    timestamp: "2024-02-28T19:20:00Z",
    verified: true,
    helpful: 18,
    tags: ["royal", "magnificent", "world-class", "unforgettable"]
  },
  {
    id: "rev8",
    entityType: "agent",
    entityId: "ag3",
    entityName: "Sneha Reddy",
    reviewerId: "cust8",
    reviewerName: "Vikram Singh",
    reviewerEmail: "vikram.singh@email.com",
    rating: 5,
    title: "Outstanding Agent",
    comment: "Sneha went above and beyond to ensure our trip was perfect. Her attention to detail and customer service is exceptional.",
    timestamp: "2024-02-25T12:10:00Z",
    verified: true,
    helpful: 9,
    response: {
      responderId: "ag3",
      responderName: "Sneha Reddy",
      message: "Thank you Vikram! Your satisfaction is my priority. Hope you had a wonderful trip!",
      timestamp: "2024-02-25T14:30:00Z"
    },
    tags: ["detail-oriented", "exceptional", "customer-service"]
  },
  {
    id: "rev9",
    entityType: "cruise",
    entityId: "3",
    entityName: "Norwegian Gem",
    reviewerId: "cust9",
    reviewerName: "Anita Sharma",
    reviewerEmail: "anita.sharma@email.com",
    rating: 4,
    title: "Fun for the Whole Family",
    comment: "Great family cruise with lots of activities for kids. The water slides were a hit! Food variety could be better.",
    timestamp: "2024-02-22T15:40:00Z",
    verified: true,
    helpful: 11,
    tags: ["family", "kids", "activities", "food-variety"]
  },
  {
    id: "rev10",
    entityType: "hotel",
    entityId: "3",
    entityName: "ITC Grand Chola Chennai",
    reviewerId: "cust10",
    reviewerName: "Rajesh Kumar",
    reviewerEmail: "rajesh.kumar@email.com",
    rating: 4,
    title: "Business Traveler Friendly",
    comment: "Excellent facilities for business travelers. Good conference rooms and reliable WiFi. Location is convenient too.",
    timestamp: "2024-02-20T10:25:00Z",
    verified: true,
    helpful: 5,
    tags: ["business", "facilities", "wifi", "location"]
  },
  {
    id: "rev11",
    entityType: "service",
    entityId: "support",
    entityName: "Customer Support",
    reviewerId: "cust11",
    reviewerName: "Meera Joshi",
    reviewerEmail: "meera.joshi@email.com",
    rating: 5,
    title: "24/7 Support is Amazing",
    comment: "Had an issue during my trip and the support team resolved it immediately. Available round the clock and very helpful.",
    timestamp: "2024-02-18T08:50:00Z",
    verified: true,
    helpful: 13,
    tags: ["24/7", "immediate", "helpful", "available"]
  },
  {
    id: "rev12",
    entityType: "cruise",
    entityId: "4",
    entityName: "Princess Sapphire",
    reviewerId: "cust12",
    reviewerName: "Suresh Gupta",
    reviewerEmail: "suresh.gupta@email.com",
    rating: 5,
    title: "Luxury Redefined",
    comment: "This cruise redefined luxury for us. Every detail was perfect from the cabin to the dining to the entertainment. Highly recommend!",
    timestamp: "2024-02-15T17:30:00Z",
    verified: true,
    helpful: 16,
    tags: ["luxury", "perfect", "dining", "entertainment"]
  },
  {
    id: "rev13",
    entityType: "agent",
    entityId: "ag1",
    entityName: "John Smith",
    reviewerId: "cust13",
    reviewerName: "Pooja Agarwal",
    reviewerEmail: "pooja.agarwal@email.com",
    rating: 4,
    title: "Knowledgeable and Patient",
    comment: "John patiently answered all my questions and helped me choose the perfect cruise for my budget. Very knowledgeable about different options.",
    timestamp: "2024-02-12T14:15:00Z",
    verified: true,
    helpful: 7,
    tags: ["patient", "knowledgeable", "budget-friendly", "helpful"]
  },
  {
    id: "rev14",
    entityType: "hotel",
    entityId: "4",
    entityName: "The Leela Palace New Delhi",
    reviewerId: "cust14",
    reviewerName: "Amit Verma",
    reviewerEmail: "amit.verma@email.com",
    rating: 5,
    title: "Exceptional Hospitality",
    comment: "The hospitality at Leela Palace is unmatched. Staff anticipated our needs and the amenities were top-notch. Will definitely return!",
    timestamp: "2024-02-10T11:45:00Z",
    verified: true,
    helpful: 14,
    tags: ["hospitality", "staff", "amenities", "return"]
  },
  {
    id: "rev15",
    entityType: "service",
    entityId: "mobile-app",
    entityName: "Mobile App",
    reviewerId: "cust15",
    reviewerName: "Sanjay Patel",
    reviewerEmail: "sanjay.patel@email.com",
    rating: 4,
    title: "Convenient Mobile Experience",
    comment: "The mobile app makes booking and managing trips very convenient. Interface is clean and easy to use. Could use more features though.",
    timestamp: "2024-02-08T09:30:00Z",
    verified: true,
    helpful: 8,
    tags: ["convenient", "clean", "easy", "more-features"]
  }
];

// Review statistics
export interface ReviewStats {
  entityId: string;
  entityType: string;
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  topTags: { tag: string; count: number }[];
}

export const reviewStats: ReviewStats[] = [
  {
    entityId: "ag1",
    entityType: "agent",
    totalReviews: 3,
    averageRating: 4.7,
    ratingDistribution: { 5: 2, 4: 1, 3: 0, 2: 0, 1: 0 },
    topTags: [
      { tag: "professional", count: 2 },
      { tag: "knowledgeable", count: 2 },
      { tag: "helpful", count: 2 }
    ]
  },
  {
    entityId: "1",
    entityType: "cruise",
    totalReviews: 1,
    averageRating: 4.0,
    ratingDistribution: { 5: 0, 4: 1, 3: 0, 2: 0, 1: 0 },
    topTags: [
      { tag: "food", count: 1 },
      { tag: "staff", count: 1 },
      { tag: "amenities", count: 1 }
    ]
  }
];