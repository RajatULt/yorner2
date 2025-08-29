// Notification system data
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  userId: string;
  category: 'booking' | 'system' | 'promotion' | 'reminder' | 'review';
}

export const notifications: Notification[] = [
  {
    id: "notif1",
    type: "success",
    title: "Booking Confirmed",
    message: "Your cruise booking for Royal Caribbean Explorer has been confirmed",
    timestamp: "2024-03-15T10:30:00Z",
    read: false,
    actionUrl: "/bookings/BK001",
    userId: "ag1",
    category: "booking"
  },
  {
    id: "notif2",
    type: "info",
    title: "New Offer Available",
    message: "Early Bird Cruise Special - Save 15% on advance bookings",
    timestamp: "2024-03-14T14:20:00Z",
    read: false,
    actionUrl: "/offers",
    userId: "ag1",
    category: "promotion"
  },
  {
    id: "notif3",
    type: "warning",
    title: "Payment Reminder",
    message: "Payment pending for booking BK004 - Due in 2 days",
    timestamp: "2024-03-13T09:15:00Z",
    read: true,
    actionUrl: "/bookings/BK004",
    userId: "ag1",
    category: "reminder"
  },
  {
    id: "notif4",
    type: "success",
    title: "Review Received",
    message: "Customer left a 5-star review for your service",
    timestamp: "2024-03-12T16:45:00Z",
    read: true,
    actionUrl: "/reviews",
    userId: "ag1",
    category: "review"
  },
  {
    id: "notif5",
    type: "error",
    title: "Booking Cancelled",
    message: "Customer cancelled booking BK003 - Refund processed",
    timestamp: "2024-03-11T11:30:00Z",
    read: true,
    actionUrl: "/bookings/BK003",
    userId: "ag3",
    category: "booking"
  },
  {
    id: "notif6",
    type: "info",
    title: "System Maintenance",
    message: "Scheduled maintenance on March 20th from 2-4 AM",
    timestamp: "2024-03-10T08:00:00Z",
    read: false,
    actionUrl: "/system-status",
    userId: "ag1",
    category: "system"
  },
  {
    id: "notif7",
    type: "success",
    title: "Commission Credited",
    message: "₹4,500 commission credited for booking BK001",
    timestamp: "2024-03-09T12:20:00Z",
    read: true,
    actionUrl: "/earnings",
    userId: "ag1",
    category: "booking"
  },
  {
    id: "notif8",
    type: "info",
    title: "New Hotel Added",
    message: "Ritz-Carlton Mumbai now available for booking",
    timestamp: "2024-03-08T15:30:00Z",
    read: true,
    actionUrl: "/hotels",
    userId: "ag2",
    category: "system"
  },
  {
    id: "notif9",
    type: "warning",
    title: "Document Required",
    message: "Customer needs to upload passport copy for booking BK007",
    timestamp: "2024-03-07T10:45:00Z",
    read: false,
    actionUrl: "/bookings/BK007",
    userId: "ag1",
    category: "reminder"
  },
  {
    id: "notif10",
    type: "success",
    title: "Target Achieved",
    message: "Congratulations! You've achieved your monthly booking target",
    timestamp: "2024-03-06T18:00:00Z",
    read: true,
    actionUrl: "/performance",
    userId: "ag1",
    category: "system"
  },
  {
    id: "notif11",
    type: "info",
    title: "Training Session",
    message: "New product training session scheduled for March 25th",
    timestamp: "2024-03-05T09:30:00Z",
    read: false,
    actionUrl: "/training",
    userId: "ag2",
    category: "system"
  },
  {
    id: "notif12",
    type: "success",
    title: "Customer Feedback",
    message: "Positive feedback received from Rahul Gupta",
    timestamp: "2024-03-04T14:15:00Z",
    read: true,
    actionUrl: "/reviews",
    userId: "ag1",
    category: "review"
  }
];