"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Clock, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    businessSize: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Thanks for reaching out! We\'ll get back to you within 24 hours.' });
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
          businessSize: "",
        });
      } else {
        setMessage({ type: 'error', text: data.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to submit. Please try again or email us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="px-4 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Let's <span className="text-[#d44000]">Talk Growth</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-8"
          >
            Ready to multiply your business bandwidth? Let's start a conversation.
          </motion.p>
        </div>
      </section>

      {/* Contact Form + Info Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-3xl">Send us a message</CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          disabled={isSubmitting}
                          className="h-11"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@company.com"
                          disabled={isSubmitting}
                          className="h-11"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company Inc."
                          disabled={isSubmitting}
                          className="h-11"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                          disabled={isSubmitting}
                          className="h-11"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="businessSize" className="block text-sm font-medium text-gray-700 mb-2">
                        Business Size
                      </label>
                      <select
                        id="businessSize"
                        name="businessSize"
                        value={formData.businessSize}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="">Select business size</option>
                        <option value="solo">Solo Entrepreneur</option>
                        <option value="small">2-10 employees</option>
                        <option value="medium">11-50 employees</option>
                        <option value="large">51+ employees</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell us about your business goals and how we can help..."
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg ${
                          message.type === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {message.text}
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-[#d44000] hover:bg-[#b83600] text-lg"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 bg-[#fff5f0] rounded-lg flex items-center justify-center mb-2">
                    <Mail className="h-6 w-6 text-[#d44000]" />
                  </div>
                  <CardTitle>Email Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="mailto:hello@clifton.tv" className="text-[#d44000] hover:underline">
                    hello@clifton.tv
                  </a>
                  <p className="text-sm text-gray-500 mt-2">
                    We'll respond within 24 hours
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Monday - Friday<br />
                    9:00 AM - 6:00 PM EST
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Same-day response for urgent inquiries
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Quick Questions?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Schedule a free 15-minute discovery call to discuss your needs.
                  </p>
                  <Button className="mt-4 w-full bg-purple-600 hover:bg-purple-700">
                    Book a Call
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-400 text-center mt-20">
        <p>&copy; 2025 Clifton.tv. All rights reserved.</p>
      </footer>
    </div>
  );
}
