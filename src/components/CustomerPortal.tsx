import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, User, Bot, CheckCircle, Clock } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'customer' | 'agent' | 'system';
  message: string;
  timestamp: string;
  attachments?: File[];
  reactions?: { emoji: string; count: number }[];
  readBy: string[];
}

interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  agentId?: string;
  agentName?: string;
  subject: string;
  status: 'active' | 'resolved' | 'waiting';
  priority: 'low' | 'medium' | 'high';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

interface CustomerPortalProps {
  currentUserId: string;
  userType: 'customer' | 'agent' | 'admin';
  onClose: () => void;
}

const CustomerPortal: React.FC<CustomerPortalProps> = ({ currentUserId, userType, onClose }) => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv1',
      customerId: 'cust1',
      customerName: 'Rahul Gupta',
      agentId: 'ag1',
      agentName: 'John Smith',
      subject: 'Cruise Booking Inquiry',
      status: 'active',
      priority: 'medium',
      lastMessage: 'Thank you for the information. When can I expect the confirmation?',
      lastMessageTime: '2024-03-15T14:30:00Z',
      unreadCount: 2,
      messages: [
        {
          id: 'msg1',
          senderId: 'cust1',
          senderName: 'Rahul Gupta',
          senderType: 'customer',
          message: 'Hi, I\'m interested in booking a Mediterranean cruise for my family.',
          timestamp: '2024-03-15T10:00:00Z',
          readBy: ['ag1'],
          reactions: [{ emoji: '👍', count: 1 }]
        },
        {
          id: 'msg2',
          senderId: 'ag1',
          senderName: 'John Smith',
          senderType: 'agent',
          message: 'Hello Rahul! I\'d be happy to help you find the perfect Mediterranean cruise. How many passengers will be traveling?',
          timestamp: '2024-03-15T10:15:00Z',
          readBy: ['cust1']
        },
        {
          id: 'msg3',
          senderId: 'cust1',
          senderName: 'Rahul Gupta',
          senderType: 'customer',
          message: 'We are 4 people - 2 adults and 2 children (ages 8 and 12). Looking for a 7-10 day cruise.',
          timestamp: '2024-03-15T10:30:00Z',
          readBy: ['ag1']
        },
        {
          id: 'msg4',
          senderId: 'ag1',
          senderName: 'John Smith',
          senderType: 'agent',
          message: 'Perfect! I have some excellent family-friendly options. The Royal Caribbean Explorer has great kids\' programs and family suites. Let me send you the details.',
          timestamp: '2024-03-15T11:00:00Z',
          readBy: ['cust1']
        },
        {
          id: 'msg5',
          senderId: 'cust1',
          senderName: 'Rahul Gupta',
          senderType: 'customer',
          message: 'Thank you for the information. When can I expect the confirmation?',
          timestamp: '2024-03-15T14:30:00Z',
          readBy: []
        }
      ]
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<string>(conversations[0]?.id || '');
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [conversations, selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getCurrentConversation = () => {
    return conversations.find(conv => conv.id === selectedConversation);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const conversation = getCurrentConversation();
    if (!conversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: userType === 'customer' ? 'You' : 'Agent',
      senderType: userType as any,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      readBy: [currentUserId]
    };

    // Update conversation
    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversation) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          lastMessage: message.message,
          lastMessageTime: message.timestamp
        };
      }
      return conv;
    }));

    setNewMessage('');

    // Simulate agent auto-response (for demo)
    if (userType === 'customer') {
      setIsTyping(true);
      setTimeout(() => {
        const autoResponse: Message = {
          id: (Date.now() + 1).toString(),
          senderId: conversation.agentId || 'ag1',
          senderName: conversation.agentName || 'Agent',
          senderType: 'agent',
          message: 'Thank you for your message. I\'m reviewing your request and will get back to you shortly with the best options.',
          timestamp: new Date().toISOString(),
          readBy: [conversation.agentId || 'ag1']
        };

        setConversations(prev => prev.map(conv => {
          if (conv.id === selectedConversation) {
            return {
              ...conv,
              messages: [...conv.messages, autoResponse],
              lastMessage: autoResponse.message,
              lastMessageTime: autoResponse.timestamp
            };
          }
          return conv;
        }));
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleFileAttachment = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Handle file upload (demo)
      alert(`File "${files[0].name}" would be uploaded here`);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === new Date(today.getTime() - 86400000).toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full h-[80vh] flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Messages</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {conversation.customerName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800 truncate">
                        {conversation.customerName}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {formatTime(conversation.lastMessageTime)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{conversation.subject}</p>
                    <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        conversation.status === 'active' ? 'bg-green-100 text-green-800' :
                        conversation.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {conversation.status}
                      </span>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          {getCurrentConversation() && (
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {getCurrentConversation()!.customerName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{getCurrentConversation()!.customerName}</h3>
                    <p className="text-sm text-gray-600">{getCurrentConversation()!.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Video size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {getCurrentConversation()?.messages.map((message, index) => {
              const isCurrentUser = message.senderId === currentUserId;
              const showDate = index === 0 || 
                formatDate(message.timestamp) !== formatDate(getCurrentConversation()!.messages[index - 1].timestamp);

              return (
                <div key={message.id}>
                  {/* Date Separator */}
                  {showDate && (
                    <div className="text-center my-4">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                        {formatDate(message.timestamp)}
                      </span>
                    </div>
                  )}

                  {/* Message */}
                  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-2 max-w-[70%] ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        message.senderType === 'customer' ? 'bg-blue-500 text-white' :
                        message.senderType === 'agent' ? 'bg-green-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {message.senderType === 'system' ? <Bot size={12} /> : <User size={12} />}
                      </div>

                      {/* Message Bubble */}
                      <div className={`px-4 py-2 rounded-lg ${
                        isCurrentUser
                          ? 'bg-blue-500 text-white'
                          : message.senderType === 'agent'
                          ? 'bg-green-100 text-gray-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {!isCurrentUser && (
                          <p className="text-xs font-medium mb-1 opacity-70">
                            {message.senderName}
                          </p>
                        )}
                        <p className="text-sm">{message.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className={`text-xs ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                            {formatTime(message.timestamp)}
                          </p>
                          {isCurrentUser && (
                            <div className="flex items-center gap-1">
                              {message.readBy.length > 1 ? (
                                <CheckCircle size={12} className="text-blue-200" />
                              ) : (
                                <Clock size={12} className="text-blue-200" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Reactions */}
                  {message.reactions && message.reactions.length > 0 && (
                    <div className={`flex gap-1 mt-1 ${isCurrentUser ? 'justify-end mr-10' : 'justify-start ml-10'}`}>
                      {message.reactions.map((reaction, idx) => (
                        <span key={idx} className="bg-white border border-gray-200 rounded-full px-2 py-1 text-xs">
                          {reaction.emoji} {reaction.count}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <User size={12} className="text-white" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <button
                onClick={handleFileAttachment}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Paperclip size={18} />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isTyping}
                />
              </div>

              <button
                onClick={() => alert('Emoji picker would open here')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Smile size={18} />
              </button>

              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isTyping}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={18} />
              </button>
            </div>

            {/* File Input */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              multiple
              accept="image/*,.pdf,.doc,.docx"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;