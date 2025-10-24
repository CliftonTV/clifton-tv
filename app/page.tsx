"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, TrendingUp, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    // TODO: Add email submission logic
    alert("Thanks for your interest! We'll be in touch soon.");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Multiply Your Business Bandwidth with{" "}
            <span className="text-blue-600">AI & Automation</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Scale faster, work smarter, and grow revenue without burning out.
            Transform your business operations with cutting-edge automation.
          </p>

          {/* Email Capture */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 text-lg"
            />
            <Button type="submit" size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
          <p className="text-sm text-gray-500">
            Join hundreds of businesses increasing their operational bandwidth
          </p>
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
      <section className="py-20 px-4">
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
            <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
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

            {/* Service 2: Paid Advertising */}
            <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
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

            {/* Service 3: Communication & Copy */}
            <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
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
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 text-lg text-gray-900"
            />
            <Button type="submit" size="lg" className="h-12 px-8 bg-white text-blue-600 hover:bg-gray-100">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-400 text-center">
        <p>&copy; 2025 Clifton.tv. All rights reserved.</p>
      </footer>
    </div>
  );
}
