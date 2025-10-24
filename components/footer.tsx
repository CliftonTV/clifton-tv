export function Footer() {
  return (
    <footer className="py-12 px-4 bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & About */}
          <div className="md:col-span-1">
            <a href="/" className="text-2xl font-bold text-[#d44000] mb-4 block">
              clifton.tv
            </a>
            <p className="text-sm text-gray-400">
              Multiplying business bandwidth through AI & automation.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#hero" className="hover:text-[#d44000] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-[#d44000] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="hover:text-[#d44000] transition-colors">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-[#d44000] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#d44000] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:hello@clifton.tv" className="hover:text-[#d44000] transition-colors">
                  hello@clifton.tv
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 clifton.tv. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
