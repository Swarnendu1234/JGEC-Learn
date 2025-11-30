import React, { useState, useRef, useEffect } from 'react';
import './AIChatbot.css';

const AIChatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your AI Study Assistant. I can help you with Python programming, study tips, debugging, project ideas, and motivation. What would you like to explore today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    const responses = {
      'hello': "Hello! I'm here to help with your studies. What would you like to know?",
      'hi': "Hi there! How can I assist you with your learning today?",
      'python': "Python is a versatile programming language! Are you working on functions, loops, or something specific?",
      'function': "Functions in Python are defined with 'def'. They help organize code into reusable blocks. Need help with a specific function?",
      'help': "I can help with: Python concepts, study tips, motivation, course guidance, and programming questions. What interests you?",
      'thanks': "You're welcome! Happy to help with your learning journey anytime!"
    };

    for (const [key, response] of Object.entries(responses)) {
      if (message.includes(key)) {
        return response;
      }
    }

    return "That's an interesting question! Could you tell me more about what you're trying to learn?";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getAIResponse(inputText),
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <div className="chatbot-title">
            <div className="ai-icon">🤖</div>
            <div>
              <h3>AI Study Assistant</h3>
              <p>Smart recommendations for you</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                {message.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="message-content typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your studies..."
            rows="1"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="send-btn"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;