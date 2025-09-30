import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  ArrowRight,
  Heart,
} from "lucide-react";

function Footer() {
  const socialLinks = [
    { icon: Facebook, label: "Facebook", color: "hover:text-blue-600" },
    { icon: Twitter, label: "Twitter", color: "hover:text-blue-400" },
    { icon: Instagram, label: "Instagram", color: "hover:text-pink-600" },
    { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-700" },
    { icon: Youtube, label: "YouTube", color: "hover:text-red-600" },
  ];

  const quickLinks = [
    "About Us",
    "Services",
    "Portfolio",
    "Careers",
    "Blog",
    "Contact",
  ];

  const services = [
    "Retail & POS",
    "Distributor",
    "Sales Force",
    "Loyalty",
    "Partner Loyalty",
    "On-Ground Services",
  ];

  const legalLinks = [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "Disclaimer",
  ];

  return (
    <footer className="bg-white text-gray-900 relative overflow-hidden border-t border-gray-100">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      {/* Gradient Ornaments */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gray-50 to-blue-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <img src="/logo.svg" alt="IMAST Logo" className="w-25 mb-5" />

            <p className="text-gray-600 mb-6 max-w-md text-base leading-relaxed">
              Empowering innovation through cutting-edge technology solutions.
              We&apos;re committed to delivering excellence and driving digital
              transformation.
            </p>

            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href="#"
                    className={`w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md ${social.color} hover:border-gray-300`}
                    aria-label={social.label}
                  >
                    <IconComponent size={18} className="text-gray-600" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full mr-3"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-all duration-300 flex items-center group font-medium"
                  >
                    <ArrowRight
                      size={14}
                      className="mr-2 transform group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100 text-blue-500"
                    />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full mr-3"></div>
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-all duration-300 flex items-center group font-medium"
                  >
                    <ArrowRight
                      size={14}
                      className="mr-2 transform group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100 text-blue-500"
                    />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full mr-3"></div>
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start group">
                <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:bg-gray-50 group-hover:border-gray-300 transition-all duration-300">
                  <MapPin size={16} className="text-gray-600" />
                </div>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors font-medium">
                  123 Innovation Street
                  <br />
                  Tech City, TC 12345
                </p>
              </div>

              <div className="flex items-center group">
                <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-gray-50 group-hover:border-gray-300 transition-all duration-300">
                  <Phone size={16} className="text-gray-600" />
                </div>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors font-medium">
                  +1 (555) 123-4567
                </p>
              </div>

              <div className="flex items-center group">
                <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-gray-50 group-hover:border-gray-300 transition-all duration-300">
                  <Mail size={16} className="text-gray-600" />
                </div>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors font-medium">
                  hello@imast.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Stay Updated
              </h3>
              <p className="text-gray-600 text-base max-w-md">
                Subscribe to our newsletter for the latest updates and insights
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-96">
              <div className="relative flex-grow">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />
              </div>
              <button className="px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-rose-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                <Send size={18} />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-500 text-sm flex items-center">
              © {new Date().getFullYear()} IMAST. All rights reserved.
              <span className="flex items-center mx-2 text-red-500">
                <Heart size={12} className="mx-1" />
              </span>
              Crafted with passion
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {legalLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 font-medium hover:underline"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
