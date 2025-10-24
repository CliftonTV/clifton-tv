"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-[#d44000]">
              clifton.tv
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#services" className="text-gray-700 hover:text-[#d44000] transition-colors">
              Services
            </a>
            <a href="/#testimonials" className="text-gray-700 hover:text-[#d44000] transition-colors">
              Testimonials
            </a>
            <Link href="/about" className="text-gray-700 hover:text-[#d44000] transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#d44000] transition-colors">
              Contact
            </Link>
            <Link href="/#hero">
              <Button className="bg-[#d44000] hover:bg-[#b83600]">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#d44000] p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/#services"
              className="block px-3 py-2 text-gray-700 hover:text-[#d44000] hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a
              href="/#testimonials"
              className="block px-3 py-2 text-gray-700 hover:text-[#d44000] hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </a>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-700 hover:text-[#d44000] hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-gray-700 hover:text-[#d44000] hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="px-3 py-2">
              <Link href="/#hero">
                <Button className="w-full bg-[#d44000] hover:bg-[#b83600]">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
