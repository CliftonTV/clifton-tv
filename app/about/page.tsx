"use client";

import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Award, Target, Users, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">

      {/* Hero Section */}
      <section className="px-4 pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Multiplying Business Bandwidth Through{" "}
            <span className="text-[#d44000]">Innovation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-8"
          >
            We help ambitious businesses scale faster by leveraging AI automation
            and proven growth strategies.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Clifton.tv was founded on a simple observation: most businesses are severely
              bandwidth-constrained. Talented teams are stuck doing repetitive work instead
              of focusing on strategic growth.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              As an entrepreneur who's built and scaled multiple businesses, I experienced
              this firsthand. Every company hits the same ceiling—there simply aren't enough
              hours in the day to execute everything needed for exponential growth.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              That's when I discovered the power of AI and automation. By systematically
              automating marketing, sales, and communication workflows, I freed up 20+ hours
              per week and 3x'd revenue in under a year.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Now, through Clifton.tv, we bring that same transformation to businesses ready
              to break through their growth ceiling and multiply their operational bandwidth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our core values guide every decision and partnership
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-2 hover:border-[#d44000] transition-all">
                <CardHeader>
                  <div className="h-12 w-12 bg-[#fff5f0] rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-[#d44000]" />
                  </div>
                  <CardTitle className="text-2xl">Speed & Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We believe time is your most valuable asset. Our solutions are designed
                    to deliver maximum impact with minimum friction, getting you results fast.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-2 hover:border-[#d44000] transition-all">
                <CardHeader>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Results-Driven</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Pretty dashboards don't pay the bills. We focus relentlessly on metrics
                    that matter: revenue growth, time saved, and ROI.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-2 hover:border-[#d44000] transition-all">
                <CardHeader>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl">Partnership Mindset</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your success is our success. We don't just hand you tools and disappear—
                    we're in the trenches with you, optimizing and scaling together.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full border-2 hover:border-[#d44000] transition-all">
                <CardHeader>
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-2xl">Proven Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Every strategy we recommend has been battle-tested in real businesses.
                    We only share what actually works at scale.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials/Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Track Record
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real implementations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-[#d44000] mb-2">500+</div>
              <div className="text-gray-600">Leads Generated Monthly</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-5xl font-bold text-green-600 mb-2">3x</div>
              <div className="text-gray-600">Average ROI Increase</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl font-bold text-purple-600 mb-2">20+</div>
              <div className="text-gray-600">Hours Saved Per Week</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-5xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#d44000] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Ready to Multiply Your Bandwidth?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-8 opacity-90"
          >
            Let's discuss how AI automation can transform your business.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/">
              <Button size="lg" className="h-12 px-8 bg-white text-[#d44000] hover:bg-gray-100">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
