import React, { useState } from 'react';
import { MessageCircle, X, Phone, Mail, Clock, Send, User } from 'lucide-react';
import ChatbotWidget from './ChatbotWidget';

const FloatingHelp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'support',
      message: 'Hello! How can I help you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const toggleHelp = () => {
    setIsOpen(!isOpen);
    setChatMode(false);
  };

  const startChat = () => {
    setChatMode(true);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: 'user',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString()
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Simulate support response
      setTimeout(() => {
        const supportResponse = {
          id: chatMessages.length + 2,
          sender: 'support',
          message: 'Thank you for your message. Our team will assist you shortly. Is there anything specific about cruise bookings I can help you with?',
          timestamp: new Date().toLocaleTimeString()
        };
        setChatMessages(prev => [...prev, supportResponse]);
      }, 1000);
    }
  };
  const handleWhatsApp = () => {
    // In a real application, this would open WhatsApp with a pre-filled message
    window.open('https://wa.me/1234567890?text=Hi! I need help with cruise booking.', '_blank');
  };

  const handleCall = () => {
    window.open('tel:+1234567890');
  };

  const handleEmail = () => {
    window.open('mailto:support@oceanlux.com?subject=Cruise Booking Inquiry');
  };

  // This component is now replaced by ChatbotWidget
  // Return null to avoid conflicts
  return null;
};

export default FloatingHelp;