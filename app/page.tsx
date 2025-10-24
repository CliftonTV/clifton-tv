"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, TrendingUp, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Thanks for subscribing! We\'ll be in touch soon.' });
        setEmail("");
      } else {
        setMessage({ type: 'error', text: data.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to submit. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="px-4 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Multiply Your Business Bandwidth with{" "}
            <span className="text-blue-600">AI & Automation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Scale faster, work smarter, and grow revenue without burning out.
            Transform your business operations with cutting-edge automation.
          </motion.p>

          {/* Email Capture */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="flex-1 h-12 text-lg"
            />
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Submitting..." : "Get Started"}
              {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </motion.form>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 p-3 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm text-gray-500"
          >
            Join hundreds of businesses increasing their operational bandwidth
          </motion.p>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-white/50">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-gray-500 text-sm uppercase tracking-wider mb-8">
            Trusted by innovative businesses
          </p>
          <div className="flex justify-center items-center gap-12 flex-wrap opacity-40">
            {/* Placeholder for logos - replace with actual client logos */}
            <div className="h-12 w-32 bg-gray-300 rounded"></div>
            <div className="h-12 w-32 bg-gray-300 rounded"></div>
            <div className="h-12 w-32 bg-gray-300 rounded"></div>
            <div className="h-12 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              How We Increase Your Bandwidth
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three proven pillars to automate, optimize, and amplify your business growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1: Marketing Automation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg h-full">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Marketing Automation</CardTitle>
                <CardDescription className="text-base">
                  AI-powered marketing systems that run 24/7
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Streamline your entire marketing funnel with intelligent automation.
                  From lead generation to nurturing, let AI handle the heavy lifting
                  while you focus on strategic growth.
                </p>
              </CardContent>
            </Card>
            </motion.div>

            {/* Service 2: Paid Advertising */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg h-full">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Sales Funnel Optimization</CardTitle>
                <CardDescription className="text-base">
                  Data-driven strategies that convert and scale
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Partner with experts to create high-converting funnels and advertising
                  campaigns. Maximize ROI with proven strategies and real-time optimization
                  powered by AI analytics.
                </p>
              </CardContent>
            </Card>
            </motion.div>

            {/* Service 3: Communication & Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg h-full">
              <CardHeader>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">AI-Powered Communication</CardTitle>
                <CardDescription className="text-base">
                  Copywriting and messaging at machine speed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Generate compelling copy, automate customer communications, and maintain
                  consistent brand voice across all channels. Let AI handle routine messaging
                  while you focus on relationships.
                </p>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Real Results from Real Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how we've helped companies multiply their bandwidth and accelerate growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <CardTitle className="text-xl">Increased leads by 400%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    "The AI automation transformed our entire lead generation process. We went from manually processing 50 leads per week to 200+ on autopilot."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      SK
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Sarah Kim</p>
                      <p className="text-sm text-gray-500">CEO, TechFlow Solutions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <CardTitle className="text-xl">Saved 20 hours per week</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    "The marketing automation freed up our entire team. We redirected that time into strategic growth and product development. Game changer."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      MR
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Marcus Rodriguez</p>
                      <p className="text-sm text-gray-500">Founder, GrowthLab</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <CardTitle className="text-xl">3x ROI on ad spend</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    "Our funnel optimization and AI-powered targeting tripled our advertising ROI in just 3 months. The results speak for themselves."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      JL
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Jessica Lee</p>
                      <p className="text-sm text-gray-500">CMO, ScaleUp Inc</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to 10x Your Business Bandwidth?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the AI automation revolution. Start scaling smarter today.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="flex-1 h-12 text-lg text-gray-900"
            />
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-12 px-8 bg-white text-blue-600 hover:bg-gray-100"
            >
              {isSubmitting ? "Submitting..." : "Get Started"}
              {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </form>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-md mx-auto p-3 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-400 text-center">
        <p>&copy; 2025 Clifton.tv. All rights reserved.</p>
      </footer>
    </div>
  );
}
