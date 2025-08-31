// Application constants and configuration

export const APP_CONFIG = {
  name: 'Yorker Holidays',
  version: '1.0.0',
  description: 'High-End Cruise & Hotel Booking Platform',
  supportEmail: 'support@yorkeholidays.com',
  supportPhone: '+91 98765 43210',
  address: '123 Holiday Street, Mumbai, India'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  BOOKINGS: '/bookings',
  HOTELS: '/hotels',
  CRUISES: '/cruises'
};

export const USER_ROLES = {
  TRAVEL_AGENT: 'Travel Agent',
  BASIC_ADMIN: 'Basic Admin',
  SUPER_ADMIN: 'Super Admin'
} as const;

export const PERMISSIONS = {
  BOOK_CRUISE: 'book_cruise',
  BOOK_HOTEL: 'book_hotel',
  VIEW_BOOKINGS: 'view_bookings',
  MANAGE_PASSENGERS: 'manage_passengers',
  EXPORT_REPORTS: 'export_reports',
  ACCESS_ANALYTICS: 'access_analytics',
  MANAGE_AGENTS: 'manage_agents',
  MANAGE_INVENTORY: 'manage_inventory',
  RESOLVE_COMPLAINTS: 'resolve_complaints',
  CREATE_OFFERS: 'create_offers',
  FULL_ACCESS: 'full_access',
  MANAGE_PERMISSIONS: 'manage_permissions',
  SYSTEM_ANALYTICS: 'system_analytics',
  CMS_MANAGEMENT: 'cms_management'
} as const;

export const BOOKING_STATUS = {
  CONFIRMED: 'Confirmed',
  PENDING: 'Pending',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed'
} as const;

export const PAYMENT_STATUS = {
  PAID: 'Paid',
  PENDING: 'Pending',
  FAILED: 'Failed',
  REFUNDED: 'Refunded'
} as const;

export const COMPLAINT_STATUS = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  ESCALATED: 'Escalated'
} as const;

export const PRIORITY_LEVELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical'
} as const;

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
} as const;

export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_FILE_SIZE_MB: 5,
  PASSPORT_VALIDITY_MONTHS: 6,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_ADDRESS_LENGTH: 10,
  PHONE_LENGTH: 10
};

export const CURRENCY = {
  CODE: 'INR',
  SYMBOL: '₹',
  LOCALE: 'en-IN'
};

export const DATE_FORMATS = {
  DISPLAY: 'DD MMM YYYY',
  INPUT: 'YYYY-MM-DD',
  FULL: 'DD MMMM YYYY, dddd',
  SHORT: 'DD/MM/YY'
};

export const TIMEOUT_DURATIONS = {
  TOAST: 5000,
  SESSION: 30 * 60 * 1000, // 30 minutes
  API_REQUEST: 30000, // 30 seconds
  DEBOUNCE: 300 // 300ms
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
};

export const COMPARISON_LIMITS = {
  MAX_CRUISES: 4,
  MAX_HOTELS: 4
};

export const REFUND_POLICY = {
  DAYS_30_PLUS: 90, // 90% refund
  DAYS_15_TO_29: 70, // 70% refund
  DAYS_7_TO_14: 50,  // 50% refund
  DAYS_3_TO_6: 25,   // 25% refund
  DAYS_0_TO_2: 0     // No refund
};

export const MODIFICATION_FEES = {
  DATE_CHANGE: 2500,
  ROOM_UPGRADE: 5000,
  GUEST_COUNT_CHANGE: 1000
};