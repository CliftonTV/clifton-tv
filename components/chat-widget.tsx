"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! 👋 I'm here to help you learn more about multiplying your business bandwidth with AI automation. What would you like to know?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "How does AI automation work?",
    "What's the ROI?",
    "Can you help my business?",
    "Pricing information",
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        "how does ai automation work?": "AI automation streamlines your business processes by using intelligent systems to handle repetitive tasks. We implement custom workflows for marketing, sales, and customer communication that run 24/7, freeing up your team for strategic work.",
        "what's the roi?": "Our clients typically see 3x ROI within the first 3 months. We've helped businesses save 20+ hours per week and increase leads by 400%. The exact ROI depends on your current processes and goals.",
        "can you help my business?": "We work with businesses of all sizes looking to scale faster. Whether you're a solo entrepreneur or have a team of 50+, if you're ready to multiply your operational bandwidth, we can help. Want to schedule a free consultation?",
        "pricing information": "Our pricing is customized based on your specific needs and business size. We offer flexible packages starting from strategic consulting to full-service automation implementation. Book a free discovery call to discuss your requirements!",
      };

      const responseKey = message.toLowerCase();
      const response = responses[responseKey] ||
        "That's a great question! I'd love to discuss this in detail. You can book a free 15-minute discovery call or reach out via our contact page. Our team will provide personalized answers based on your specific business needs.";

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-16 w-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg flex items-center justify-center"
            >
              <MessageCircle size={28} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="shadow-2xl border-2">
              <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Chat with Us</CardTitle>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-blue-700 p-1 rounded"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-sm text-blue-100 mt-1">
                  Typically responds instantly
                </p>
              </CardHeader>
              <CardContent className="p-0">
                {/* Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-800 border border-gray-200"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Questions (only show initially) */}
                  {messages.length === 1 && (
                    <div className="space-y-2 pt-2">
                      <p className="text-xs text-gray-500 text-center">Quick questions:</p>
                      {quickQuestions.map((q, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickQuestion(q)}
                          className="w-full text-left p-2 text-sm bg-white hover:bg-blue-50 border border-gray-200 rounded-lg transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage(inputMessage);
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message..."
                      disabled={isTyping}
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      disabled={isTyping || !inputMessage.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send size={18} />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
