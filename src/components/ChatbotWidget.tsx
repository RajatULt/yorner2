import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ExternalLink, Phone } from 'lucide-react';
import { chatbotResponses, defaultResponse, conversationStarters } from '../data/chatbot';
import type { ChatMessage } from '../data/chatbot';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        type: 'bot',
        message: "Hello! 👋 Welcome to Yorker Holidays! I'm your virtual travel assistant. How can I help you today?",
        timestamp: new Date().toISOString(),
        quickReplies: conversationStarters
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const findBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Find matching response
    const response = chatbotResponses.find(resp =>
      resp.trigger.some(trigger => lowerMessage.includes(trigger.toLowerCase()))
    );
    
    return response || defaultResponse;
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = findBotResponse(message);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: botResponse.response,
        timestamp: new Date().toISOString(),
        quickReplies: botResponse.quickReplies,
        actionButtons: botResponse.actionButtons
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleActionButton = (action: string, url?: string) => {
    switch (action) {
      case 'navigate':
        if (url) {
          // In a real app, this would use router navigation
          console.log('Navigate to:', url);
          alert(`Would navigate to: ${url}`);
        }
        break;
      case 'contact':
        if (url) {
          window.open(url, '_blank');
        }
        break;
      case 'chat':
        alert('Connecting you to a live agent...');
        break;
      case 'subscribe':
        alert('Subscription feature would be implemented here');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Travel Assistant</h3>
                <p className="text-xs opacity-90">Online • Instant replies</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      message.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {message.type === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>

                    {/* Message Bubble */}
                    <div className={`px-3 py-2 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p>{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Replies */}
                {message.type === 'bot' && message.quickReplies && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-8">
                    {message.quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs hover:bg-blue-100 transition-colors border border-blue-200"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                {message.type === 'bot' && message.actionButtons && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-8">
                    {message.actionButtons.map((button, index) => (
                      <button
                        key={index}
                        onClick={() => handleActionButton(button.action, button.url)}
                        className="flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-600 rounded-lg text-xs hover:bg-teal-100 transition-colors border border-teal-200 font-medium"
                      >
                        {button.action === 'navigate' && <ExternalLink size={10} />}
                        {button.action === 'contact' && <Phone size={10} />}
                        {button.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <Bot size={12} />
                  </div>
                  <div className="bg-gray-100 px-3 py-2 rounded-lg">
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

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center group ${
          isOpen ? 'rotate-180' : 'hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageCircle size={24} className="group-hover:animate-pulse" />
        )}
      </button>

      {/* Pulse Animation Ring */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-blue-500/30 animate-ping"></div>
      )}
    </>
  );
};

export default ChatbotWidget;