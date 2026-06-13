/*
 * Alumni Management System Chatbot Component (JS Version)
 * 
 * HOW TO INTEGRATE:
 * 1. Install required dependencies:
 *    npm install framer-motion lottie-react lucide-react
 * 
 * 2. Import and use:
 *    import AlumniChatbot from './components/AlumniChatbot';
 *    <AlumniChatbot onSendMessage={(msg) => handleMessage(msg)} />
 * 
 * 3. Replace LOTTIE_URL with your actual Lottie animation URL
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Send, Paperclip, Settings, GraduationCap, Users, Calendar, User } from 'lucide-react';

// TODO: Replace with actual Lottie animation URL
const LOTTIE_URL = "https://lottie.host/4f7b0a4a-6f2a-4b5a-8b5a-4a5b8a5b4a5b/mCxmE5eA9q.json";

const AlumniChatbot = ({
  onSendMessage,
  onQuickReply,
  className = "",
  initialMessages = []
}) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Welcome back to your alumni community! How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    },
    ...initialMessages
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [characterAnimation, setCharacterAnimation] = useState('idle');

  const quickReplies = [
    { text: 'Update Profile', action: 'update-profile', icon: User },
    { text: 'Find Batchmates', action: 'find-batchmates', icon: Users },
    { text: 'Upcoming Events', action: 'upcoming-events', icon: Calendar },
    { text: 'Get Help', action: 'get-help', icon: GraduationCap }
  ];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setCharacterAnimation('wave'); // Trigger character animation

    if (onSendMessage) onSendMessage(inputValue);

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // TODO: Replace with actual bot response from API
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: "I've received your message! Our team will get back to you soon.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);

    // Reset character animation
    setTimeout(() => setCharacterAnimation('idle'), 800);
  };

  const handleQuickReply = (action, text) => {
    if (onQuickReply) onQuickReply(action);
    
    const quickReplyMessage = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date(),
      type: 'quick-reply'
    };

    setMessages(prev => [...prev, quickReplyMessage]);
    setCharacterAnimation('bounce');
    
    // Reset animation
    setTimeout(() => setCharacterAnimation('idle'), 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`flex flex-col h-screen max-h-[800px] bg-background rounded-2xl shadow-2xl overflow-hidden ${className}`}>
      {/* Header */}
      <header className="gradient-campus p-4 md:p-6 text-white relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Alumni Connect</h1>
              <p className="text-white/80 text-sm">Your campus community awaits</p>
            </div>
          </div>
          
          {/* Lottie Character - Desktop */}
          <div className="hidden md:block w-16 h-16">
            <motion.div
              animate={
                characterAnimation === 'wave' ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } :
                characterAnimation === 'bounce' ? { y: [0, -10, 0] } :
                { y: [0, -3, 0] }
              }
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Lottie
                animationData={null} // TODO: Load from LOTTIE_URL
                className="w-full h-full"
                loop={true}
              />
            </motion.div>
          </div>

          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-secondary text-primary px-2 py-1 rounded-full text-xs font-medium"
              >
                {unreadCount}
              </motion.div>
            )}
            <button
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Character Banner */}
        <div className="md:hidden mt-3 flex justify-center">
          <motion.div
            animate={
              characterAnimation === 'wave' ? { scale: [1, 1.1, 1] } :
              characterAnimation === 'bounce' ? { y: [0, -5, 0] } :
              { y: [0, -2, 0] }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-12 h-12"
          >
            <Lottie
              animationData={null} // TODO: Load from LOTTIE_URL
              className="w-full h-full"
              loop={true}
            />
          </motion.div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/20">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`message-bubble ${
                  message.sender === 'user' 
                    ? 'message-outgoing' 
                    : 'message-incoming'
                } ${message.type === 'quick-reply' ? 'border-l-4 border-secondary' : ''}`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex justify-start"
          >
            <div className="message-bubble message-incoming">
              <div className="flex space-x-1">
                <div className="typing-dot animate-typing"></div>
                <div className="typing-dot animate-typing" style={{ animationDelay: '0.2s' }}></div>
                <div className="typing-dot animate-typing" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Chips */}
      <div className="px-4 py-2 bg-muted/30">
        <div className="flex flex-wrap gap-2 justify-center">
          {quickReplies.map((reply) => {
            const IconComponent = reply.icon;
            return (
              <motion.button
                key={reply.action}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickReply(reply.action, reply.text)}
                className="quick-chip group"
                aria-label={reply.text}
              >
                <IconComponent className="w-4 h-4 mr-2 group-hover:text-accent transition-colors" />
                <span className="text-xs font-medium">{reply.text}</span>
              </motion.button>
            );
          })}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">
          Kya help chahiye? Choose an option above or type below
        </p>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex items-end space-x-3">
          <button
            className="p-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors"
            aria-label="Attach file"
          >
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="w-full px-4 py-3 bg-input border border-border rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                         placeholder:text-muted-foreground text-sm resize-none
                         transition-all duration-200"
              aria-label="Type your message"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="p-3 bg-primary text-primary-foreground rounded-xl 
                       hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AlumniChatbot;
