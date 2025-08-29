// Chatbot data and responses
export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
  quickReplies?: string[];
  actionButtons?: { label: string; action: string; url?: string }[];
}

export interface ChatbotResponse {
  trigger: string[];
  response: string;
  quickReplies?: string[];
  actionButtons?: { label: string; action: string; url?: string }[];
}

export const chatbotResponses: ChatbotResponse[] = [
  {
    trigger: ["hello", "hi", "hey", "start", "help"],
    response: "Hello! 👋 Welcome to Yorker Holidays! I'm here to help you with your travel needs. How can I assist you today?",
    quickReplies: ["Book a cruise", "Find hotels", "Check my bookings", "Contact support"],
    actionButtons: [
      { label: "Browse Cruises", action: "navigate", url: "/dashboard" },
      { label: "View Hotels", action: "navigate", url: "/hotels" }
    ]
  },
  {
    trigger: ["book", "cruise", "booking", "book a cruise"],
    response: "Great choice! 🚢 I can help you find the perfect cruise. We have amazing deals on luxury cruises to various destinations. Would you like to see our current offers?",
    quickReplies: ["Show cruise deals", "Mediterranean cruises", "Caribbean cruises", "Pricing info"],
    actionButtons: [
      { label: "Browse All Cruises", action: "navigate", url: "/dashboard" },
      { label: "Special Offers", action: "navigate", url: "/offers" }
    ]
  },
  {
    trigger: ["hotel", "hotels", "accommodation", "stay"],
    response: "Perfect! 🏨 We have partnerships with luxury hotels worldwide. From 5-star resorts to boutique properties, we can find the ideal accommodation for your trip.",
    quickReplies: ["Luxury hotels", "Budget options", "Hotel deals", "Location search"],
    actionButtons: [
      { label: "Browse Hotels", action: "navigate", url: "/hotels" },
      { label: "Hotel Deals", action: "navigate", url: "/hotel-offers" }
    ]
  },
  {
    trigger: ["booking", "bookings", "my booking", "reservation"],
    response: "I can help you with your bookings! 📋 You can view, modify, or cancel your reservations through your dashboard. Would you like me to guide you there?",
    quickReplies: ["View bookings", "Cancel booking", "Modify booking", "Booking status"],
    actionButtons: [
      { label: "My Bookings", action: "navigate", url: "/profile" },
      { label: "Booking History", action: "navigate", url: "/history" }
    ]
  },
  {
    trigger: ["support", "help", "contact", "problem", "issue"],
    response: "I'm here to help! 🤝 For immediate assistance, you can contact our 24/7 support team or browse our help center. What specific issue can I help you with?",
    quickReplies: ["Call support", "Email support", "Live chat", "FAQ"],
    actionButtons: [
      { label: "Contact Support", action: "contact", url: "tel:+919876543210" },
      { label: "Live Chat", action: "chat" }
    ]
  },
  {
    trigger: ["price", "cost", "pricing", "how much", "expensive"],
    response: "Our pricing varies based on your preferences! 💰 We offer competitive rates and exclusive deals. Cruise prices start from ₹25,000 per person, and hotels from ₹3,500 per night.",
    quickReplies: ["Cruise pricing", "Hotel pricing", "Special offers", "Payment options"],
    actionButtons: [
      { label: "View Deals", action: "navigate", url: "/offers" },
      { label: "Calculate Cost", action: "navigate", url: "/calculator" }
    ]
  },
  {
    trigger: ["destination", "where", "places", "locations"],
    response: "We cover amazing destinations! 🌍 Popular cruise routes include Mumbai-Goa, Chennai-Kochi, and international destinations. For hotels, we have properties in major cities worldwide.",
    quickReplies: ["Indian destinations", "International", "Beach destinations", "City breaks"],
    actionButtons: [
      { label: "Explore Destinations", action: "navigate", url: "/destinations" },
      { label: "Route Map", action: "navigate", url: "/routes" }
    ]
  },
  {
    trigger: ["payment", "pay", "card", "refund"],
    response: "We accept all major payment methods! 💳 Credit cards, debit cards, UPI, and bank transfers. All transactions are secure and encrypted. Need help with payment?",
    quickReplies: ["Payment methods", "Refund policy", "Payment issues", "Secure payment"],
    actionButtons: [
      { label: "Payment Help", action: "navigate", url: "/payment-help" },
      { label: "Refund Status", action: "navigate", url: "/refunds" }
    ]
  },
  {
    trigger: ["cancel", "cancellation", "refund"],
    response: "I understand you need to cancel. 🔄 Our cancellation policy varies by booking type. Most bookings can be cancelled with partial or full refund depending on timing.",
    quickReplies: ["Cancellation policy", "Cancel booking", "Refund timeline", "Speak to agent"],
    actionButtons: [
      { label: "Cancel Booking", action: "navigate", url: "/cancel" },
      { label: "Refund Policy", action: "navigate", url: "/refund-policy" }
    ]
  },
  {
    trigger: ["agent", "human", "person", "representative"],
    response: "I'll connect you with one of our travel experts! 👨‍💼 Our agents are available 24/7 to provide personalized assistance with your travel planning.",
    quickReplies: ["Call now", "Schedule callback", "Live chat", "Email agent"],
    actionButtons: [
      { label: "Call Agent", action: "contact", url: "tel:+919876543210" },
      { label: "Live Chat", action: "chat" }
    ]
  },
  {
    trigger: ["offers", "deals", "discount", "promotion"],
    response: "Great timing! 🎉 We have several active promotions: Early Bird Cruise Special (15% off), Family Package Discounts, and Luxury Hotel Weekend Deals.",
    quickReplies: ["Cruise offers", "Hotel deals", "Family packages", "Last minute deals"],
    actionButtons: [
      { label: "View All Offers", action: "navigate", url: "/offers" },
      { label: "Subscribe to Deals", action: "subscribe" }
    ]
  },
  {
    trigger: ["thank", "thanks", "bye", "goodbye"],
    response: "You're welcome! 😊 Thank you for choosing Yorker Holidays. Have a wonderful day and happy travels! Feel free to reach out anytime you need assistance.",
    quickReplies: ["Book now", "Browse more", "Contact later", "Subscribe updates"],
    actionButtons: [
      { label: "Start Booking", action: "navigate", url: "/dashboard" },
      { label: "Stay Updated", action: "subscribe" }
    ]
  }
];

export const defaultResponse: ChatbotResponse = {
  trigger: ["default"],
  response: "I'm not sure I understand that completely. 🤔 But I'm here to help! You can ask me about bookings, cruises, hotels, pricing, or any other travel-related questions.",
  quickReplies: ["Book cruise", "Find hotels", "Check pricing", "Contact support"],
  actionButtons: [
    { label: "Browse Services", action: "navigate", url: "/dashboard" },
    { label: "Talk to Human", action: "contact", url: "tel:+919876543210" }
  ]
};

// Predefined conversation starters
export const conversationStarters = [
  "How can I book a cruise?",
  "What are your best hotel deals?",
  "I need help with my booking",
  "Show me cruise destinations",
  "What payment methods do you accept?"
];