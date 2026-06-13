import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, GraduationCap } from 'lucide-react';
import AlumniChatbot from './AlumniChatbot';

const FloatingChatWidget = ({
  onSendMessage,
  onQuickReply,
  position = 'bottom-right',
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  const handleSendMessage = (message) => {
    if (onSendMessage) {
      onSendMessage(message);
    }
    // Simulate receiving a response to show notification when closed
    setTimeout(() => {
      if (!isOpen) {
        setHasNewMessage(true);
      }
    }, 2000);
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`absolute ${position === 'bottom-right' ? 'bottom-20 right-0' : 'bottom-20 left-0'} 
                       w-80 h-[500px] md:w-96 md:h-[600px]`}
          >
            <div className="relative h-full">
              {/* Close Button */}
              <button
                onClick={toggleChat}
                className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-destructive text-destructive-foreground 
                          rounded-full flex items-center justify-center shadow-lg hover:bg-destructive/90 
                          transition-colors duration-200"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
              
              {/* Chat Component */}
              <AlumniChatbot 
                onSendMessage={handleSendMessage}
                onQuickReply={onQuickReply}
                className="h-full border border-border"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="relative w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg 
                   hover:shadow-xl transition-all duration-300 flex items-center justify-center
                   focus:outline-none focus:ring-4 focus:ring-ring/30"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {/* Notification Badge */}
        {hasNewMessage && !isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full 
                       flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </motion.div>
        )}

        {/* Button Icon with Animation */}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6" />
              {/* Pulse Animation when there's a new message */}
              {hasNewMessage && (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0"
                >
                  <MessageCircle className="w-6 h-6 text-secondary" />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ripple Effect */}
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-primary rounded-full -z-10"
        />
      </motion.button>

      {/* Welcome Tooltip */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: position === 'bottom-right' ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className={`absolute top-1/2 -translate-y-1/2 ${
            position === 'bottom-right' ? 'right-16' : 'left-16'
          } bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm 
          whitespace-nowrap shadow-lg pointer-events-none`}
        >
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4" />
            <span>Need help? Chat with us!</span>
          </div>
          {/* Arrow */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${
              position === 'bottom-right' ? '-right-2' : '-left-2'
            } w-0 h-0 border-t-4 border-b-4 border-transparent ${
              position === 'bottom-right' ? 'border-l-4 border-l-primary' : 'border-r-4 border-r-primary'
            }`}
          />
        </motion.div>
      )}
    </div>
  );
};

export default FloatingChatWidget;
