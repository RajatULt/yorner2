// Extended mock data for comprehensive testing
import type { Cruise } from './cruises';
import type { Hotel } from './hotels';
import type { Agent, BasicAdmin, Complaint, Offer } from './admins';
import type { Booking } from './bookings';

// Additional Cruises (extending existing data)
export const additionalCruises: Cruise[] = [
  {
    id: "11",
    name: "Voyager of the Seas",
    image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg",
    from: "Mumbai",
    to: "Maldives",
    duration: 10,
    departureDates: ["2024-04-20", "2024-04-27", "2024-05-04", "2024-05-11"],
    amenities: ["Ice Skating", "Rock Climbing", "Mini Golf", "Spa", "Casino", "Theater", "Multiple Pools"],
    pricePerPerson: 85000,
    roomTypes: ["Interior", "Ocean View", "Balcony", "Suite", "Penthouse"],
    description: "Adventure-packed cruise to the tropical paradise of Maldives with world-class entertainment.",
    shipType: "Adventure Ship",
    cruiseLine: "Royal Caribbean"
  },
  {
    id: "12",
    name: "Symphony of the Seas",
    image: "https://images.pexels.com/photos/2144326/pexels-photo-2144326.jpeg",
    from: "Chennai",
    to: "Singapore",
    duration: 12,
    departureDates: ["2024-05-15", "2024-05-22", "2024-05-29", "2024-06-05"],
    amenities: ["FlowRider Surf", "Zip Line", "Carousel", "Aqua Theater", "Central Park", "Boardwalk"],
    pricePerPerson: 120000,
    roomTypes: ["Interior", "Ocean View", "Balcony", "Suite", "Penthouse", "Loft Suite"],
    description: "The world's largest cruise ship offering unprecedented entertainment and dining experiences.",
    shipType: "Oasis Class",
    cruiseLine: "Royal Caribbean"
  },
  {
    id: "13",
    name: "Viking Sun",
    image: "https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg",
    from: "Kochi",
    to: "Dubai",
    duration: 14,
    departureDates: ["2024-06-01", "2024-06-15", "2024-06-29", "2024-07-13"],
    amenities: ["Cultural Enrichment", "Cooking Classes", "Wine Tasting", "Spa", "Library", "Observatory"],
    pricePerPerson: 150000,
    roomTypes: ["Veranda", "Deluxe Veranda", "Penthouse Veranda", "Explorer Suite"],
    description: "Cultural expedition cruise focusing on history, cuisine, and local traditions.",
    shipType: "Expedition Ship",
    cruiseLine: "Viking Ocean Cruises"
  },
  {
    id: "14",
    name: "Carnival Horizon",
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    from: "Goa",
    to: "Mumbai",
    duration: 3,
    departureDates: ["2024-04-25", "2024-05-02", "2024-05-09", "2024-05-16"],
    amenities: ["SkyRide", "Ropes Course", "WaterWorks", "Serenity Deck", "Comedy Club"],
    pricePerPerson: 35000,
    roomTypes: ["Interior", "Ocean View", "Balcony"],
    description: "Fun-filled short cruise perfect for families and first-time cruisers.",
    shipType: "Vista Class",
    cruiseLine: "Carnival Cruise Line"
  },
  {
    id: "15",
    name: "Silver Muse",
    image: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg",
    from: "Mumbai",
    to: "Seychelles",
    duration: 16,
    departureDates: ["2024-07-01", "2024-07-17", "2024-08-02", "2024-08-18"],
    amenities: ["Butler Service", "All-Suite Accommodations", "Zagat-Rated Restaurants", "Spa", "Enrichment Programs"],
    pricePerPerson: 280000,
    roomTypes: ["Vista Suite", "Veranda Suite", "Silver Suite", "Royal Suite", "Grand Suite"],
    description: "Ultra-luxury all-suite cruise with personalized service and gourmet dining.",
    shipType: "Ultra-Luxury",
    cruiseLine: "Silversea Cruises"
  }
];

// Additional Hotels (extending existing data)
export const additionalHotels: Hotel[] = [
  {
    id: "13",
    name: "Amanbagh Rajasthan",
    location: "Alwar, Rajasthan",
    image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
    starRating: 5,
    pricePerNight: 65000,
    availableRoomTypes: ["Haveli Suite", "Pool Pavilion", "Garden Pavilion", "Amanbagh Suite"],
    mealPlans: ["Room Only", "Breakfast Included", "Half Board", "Full Board"],
    amenities: ["Spa", "Pool", "Yoga", "Cultural Tours", "Wi-Fi", "AC", "Garden", "Pet Friendly"],
    availableFrom: ["2024-04-15", "2024-04-22", "2024-04-29", "2024-05-06"],
    description: "Luxury resort set in a walled city offering authentic Rajasthani experiences.",
    hotelType: "Luxury",
    hotelChain: "Aman Resorts"
  },
  {
    id: "14",
    name: "The St. Regis Mumbai",
    location: "Mumbai, Maharashtra",
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    starRating: 5,
    pricePerNight: 38000,
    availableRoomTypes: ["Deluxe Room", "Grand Deluxe", "St. Regis Suite", "Presidential Suite"],
    mealPlans: ["Room Only", "Breakfast Included", "Half Board"],
    amenities: ["Spa", "Pool", "Gym", "Butler Service", "Wi-Fi", "AC", "Parking"],
    availableFrom: ["2024-04-18", "2024-04-25", "2024-05-02", "2024-05-09"],
    description: "Iconic luxury hotel in Lower Parel with impeccable service and modern amenities.",
    hotelType: "Luxury",
    hotelChain: "St. Regis"
  },
  {
    id: "15",
    name: "Wildflower Hall Shimla",
    location: "Shimla, Himachal Pradesh",
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    starRating: 5,
    pricePerNight: 32000,
    availableRoomTypes: ["Deluxe Room", "Premium Room", "Luxury Suite", "Presidential Suite"],
    mealPlans: ["Room Only", "Breakfast Included", "Half Board", "Full Board"],
    amenities: ["Spa", "Gym", "Adventure Sports", "Nature Walks", "Wi-Fi", "AC", "Garden"],
    availableFrom: ["2024-05-01", "2024-05-08", "2024-05-15", "2024-05-22"],
    description: "Luxury mountain resort offering breathtaking Himalayan views and outdoor adventures.",
    hotelType: "Luxury",
    hotelChain: "Oberoi Hotels"
  },
  {
    id: "16",
    name: "JW Marriott Pune",
    location: "Pune, Maharashtra",
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    starRating: 5,
    pricePerNight: 15000,
    availableRoomTypes: ["Deluxe Room", "Executive Room", "Junior Suite", "Presidential Suite"],
    mealPlans: ["Room Only", "Breakfast Included", "Half Board"],
    amenities: ["Spa", "Pool", "Gym", "Business Center", "Wi-Fi", "AC", "Parking"],
    availableFrom: ["2024-04-20", "2024-04-27", "2024-05-04", "2024-05-11"],
    description: "Contemporary luxury hotel perfect for business and leisure travelers.",
    hotelType: "Business",
    hotelChain: "Marriott"
  },
  {
    id: "17",
    name: "Alila Diwa Goa",
    location: "South Goa, Goa",
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    starRating: 4,
    pricePerNight: 18000,
    availableRoomTypes: ["Terrace Room", "Diwa Room", "Diwa Suite", "Alila Suite"],
    mealPlans: ["Room Only", "Breakfast Included", "Half Board"],
    amenities: ["Spa", "Pool", "Beach Access", "Yoga", "Wi-Fi", "AC", "Garden"],
    availableFrom: ["2024-04-22", "2024-04-29", "2024-05-06", "2024-05-13"],
    description: "Contemporary resort blending modern luxury with traditional Goan architecture.",
    hotelType: "Luxury",
    hotelChain: "Alila Hotels"
  }
];

// Additional Agents
export const additionalAgents: Agent[] = [
  {
    id: "ag5",
    name: "Meera Joshi",
    email: "meera.joshi@yorkeholidays.com",
    adminId: "ba3",
    region: "Mumbai",
    joinedDate: "2024-01-20",
    status: "Active",
    performance: {
      totalBookings: 28,
      totalSales: 1400000,
      commissionEarned: 70000,
      successRate: 82,
      grade: "B"
    },
    contactInfo: {
      phone: "+91 9876543218",
      address: "567 Bandra West, Mumbai"
    }
  },
  {
    id: "ag6",
    name: "Karthik Reddy",
    email: "karthik.reddy@yorkeholidays.com",
    adminId: "ba2",
    region: "Hyderabad",
    joinedDate: "2024-02-15",
    status: "Active",
    performance: {
      totalBookings: 35,
      totalSales: 1750000,
      commissionEarned: 87500,
      successRate: 88,
      grade: "A"
    },
    contactInfo: {
      phone: "+91 9876543219",
      address: "890 Jubilee Hills, Hyderabad"
    }
  },
  {
    id: "ag7",
    name: "Anjali Sharma",
    email: "anjali.sharma@yorkeholidays.com",
    adminId: "ba1",
    region: "Haryana",
    joinedDate: "2024-03-01",
    status: "Active",
    performance: {
      totalBookings: 22,
      totalSales: 1100000,
      commissionEarned: 55000,
      successRate: 75,
      grade: "B"
    },
    contactInfo: {
      phone: "+91 9876543220",
      address: "234 Sector 14, Gurgaon"
    }
  }
];

// Additional Bookings
export const additionalBookings: Booking[] = [
  {
    id: "BK009",
    type: "Cruise",
    itemId: "11",
    itemName: "Voyager of the Seas",
    agentId: "ag5",
    agentName: "Meera Joshi",
    customerName: "Rohit Sharma",
    customerEmail: "rohit.sharma@email.com",
    customerPhone: "+91 9876543218",
    bookingDate: "2024-03-20",
    travelDate: "2024-04-20",
    status: "Confirmed",
    totalAmount: 170000,
    commissionAmount: 8500,
    paymentStatus: "Paid",
    guests: 2,
    specialRequests: "Balcony cabin with sea view",
    region: "Mumbai"
  },
  {
    id: "BK010",
    type: "Hotel",
    itemId: "13",
    itemName: "Amanbagh Rajasthan",
    agentId: "ag6",
    agentName: "Karthik Reddy",
    customerName: "Sanjana Patel",
    customerEmail: "sanjana.patel@email.com",
    customerPhone: "+91 9876543219",
    bookingDate: "2024-03-22",
    travelDate: "2024-04-15",
    status: "Confirmed",
    totalAmount: 195000,
    commissionAmount: 9750,
    paymentStatus: "Paid",
    guests: 2,
    specialRequests: "Spa package included",
    region: "Hyderabad"
  },
  {
    id: "BK011",
    type: "Cruise",
    itemId: "12",
    itemName: "Symphony of the Seas",
    agentId: "ag7",
    agentName: "Anjali Sharma",
    customerName: "Aditya Kumar",
    customerEmail: "aditya.kumar@email.com",
    customerPhone: "+91 9876543220",
    bookingDate: "2024-03-25",
    travelDate: "2024-05-15",
    status: "Pending",
    totalAmount: 240000,
    commissionAmount: 12000,
    paymentStatus: "Pending",
    guests: 2,
    specialRequests: "Anniversary celebration package",
    region: "Haryana"
  },
  {
    id: "BK012",
    type: "Hotel",
    itemId: "14",
    itemName: "The St. Regis Mumbai",
    agentId: "ag5",
    agentName: "Meera Joshi",
    customerName: "Priyanka Singh",
    customerEmail: "priyanka.singh@email.com",
    customerPhone: "+91 9876543221",
    bookingDate: "2024-03-28",
    travelDate: "2024-04-18",
    status: "Confirmed",
    totalAmount: 114000,
    commissionAmount: 5700,
    paymentStatus: "Paid",
    guests: 2,
    specialRequests: "Butler service requested",
    region: "Mumbai"
  }
];

// Additional Complaints
export const additionalComplaints: Complaint[] = [
  {
    id: "comp4",
    bookingId: "BK009",
    agentId: "ag5",
    customerName: "Rohit Sharma",
    subject: "Delayed departure notification",
    description: "Was not informed about the 2-hour departure delay until reaching the port. This caused inconvenience.",
    status: "In Progress",
    priority: "Medium",
    createdDate: "2024-03-21",
    assignedTo: "ba3",
    category: "Service Quality"
  },
  {
    id: "comp5",
    bookingId: "BK010",
    agentId: "ag6",
    customerName: "Sanjana Patel",
    subject: "Room upgrade not honored",
    description: "Paid for room upgrade but was given standard room. Hotel staff was unhelpful in resolving the issue.",
    status: "Open",
    priority: "High",
    createdDate: "2024-03-23",
    category: "Booking Issue"
  },
  {
    id: "comp6",
    bookingId: "BK011",
    agentId: "ag7",
    customerName: "Aditya Kumar",
    subject: "Payment processing error",
    description: "Payment was processed but booking status shows pending. Need immediate clarification.",
    status: "Open",
    priority: "Critical",
    createdDate: "2024-03-26",
    category: "Payment Problem"
  }
];

// Additional Offers
export const additionalOffers: Offer[] = [
  {
    id: "off4",
    title: "Monsoon Special Cruise Deal",
    description: "Beat the heat with our monsoon cruise packages. Special rates for July-September bookings.",
    discountType: "Percentage",
    discountValue: 20,
    validFrom: "2024-04-01",
    validTo: "2024-06-30",
    applicableFor: "Cruises",
    status: "Active",
    createdBy: "Super Admin",
    assignedAgents: ["ag5", "ag6", "ag7"],
    usageCount: 8,
    maxUsage: 200,
    regions: ["Mumbai", "Goa", "Chennai"]
  },
  {
    id: "off5",
    title: "Business Traveler Hotel Package",
    description: "Exclusive rates for business travelers with complimentary airport transfers and WiFi.",
    discountType: "Fixed Amount",
    discountValue: 5000,
    validFrom: "2024-03-15",
    validTo: "2024-12-31",
    applicableFor: "Hotels",
    status: "Active",
    createdBy: "ba2",
    assignedAgents: ["ag6", "ag3"],
    usageCount: 15,
    maxUsage: 500,
    regions: ["Hyderabad", "Bangalore", "Chennai"]
  },
  {
    id: "off6",
    title: "Honeymoon Paradise Package",
    description: "Romantic getaway packages for newlyweds with special amenities and services.",
    discountType: "Percentage",
    discountValue: 25,
    validFrom: "2024-04-01",
    validTo: "2024-08-31",
    applicableFor: "Both",
    status: "Active",
    createdBy: "Super Admin",
    assignedAgents: ["ag1", "ag2", "ag5", "ag7"],
    usageCount: 6,
    maxUsage: 100,
    regions: ["All"]
  }
];

// Customer data for reviews and bookings
export const customers = [
  {
    id: "cust1",
    name: "Rahul Gupta",
    email: "rahul.gupta@email.com",
    phone: "+91 9876543210",
    preferences: ["Luxury", "Ocean View", "Spa"],
    totalBookings: 3,
    totalSpent: 245000,
    loyaltyTier: "Gold"
  },
  {
    id: "cust2",
    name: "Priya Mehta",
    email: "priya.mehta@email.com",
    phone: "+91 9876543211",
    preferences: ["Family Friendly", "All Inclusive", "Entertainment"],
    totalBookings: 2,
    totalSpent: 165000,
    loyaltyTier: "Silver"
  },
  {
    id: "cust3",
    name: "Arjun Sharma",
    email: "arjun.sharma@email.com",
    phone: "+91 9876543212",
    preferences: ["Luxury", "Fine Dining", "Cultural"],
    totalBookings: 4,
    totalSpent: 380000,
    loyaltyTier: "Platinum"
  }
];

// System analytics data
export const systemAnalytics = {
  totalUsers: 1250,
  activeUsers: 892,
  totalBookings: 3456,
  totalRevenue: 45600000,
  averageBookingValue: 85000,
  customerSatisfaction: 4.6,
  repeatCustomerRate: 68,
  conversionRate: 12.5,
  topDestinations: [
    { name: "Goa", bookings: 456, revenue: 12500000 },
    { name: "Mumbai", bookings: 389, revenue: 15600000 },
    { name: "Chennai", bookings: 234, revenue: 8900000 }
  ],
  monthlyGrowth: [
    { month: "Jan", bookings: 245, revenue: 3200000 },
    { month: "Feb", bookings: 289, revenue: 3800000 },
    { month: "Mar", bookings: 356, revenue: 4600000 }
  ]
};