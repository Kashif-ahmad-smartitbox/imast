"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
  FaHeart,
  FaArrowRight,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaBloggerB,
  FaPinterestP,
  FaTumblr,
  FaComments,
} from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import Link from "next/link";

// =============================================================================
// Types
// =============================================================================

interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

interface NavigationLink {
  href: string;
  label: string;
}

interface FooterColumnProps {
  title: string;
  items: NavigationLink[];
}

interface ContactRowProps {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: React.ReactNode;
}

interface SocialButtonProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

// =============================================================================
// Constants
// =============================================================================

const SOCIAL_LINKS: SocialLink[] = [
  { id: "facebook", label: "Facebook", href: "#", icon: FaFacebookF },
  { id: "twitter", label: "X / Twitter", href: "#", icon: FaTwitter },
  { id: "instagram", label: "Instagram", href: "#", icon: FaInstagram },
  { id: "linkedin", label: "LinkedIn", href: "#", icon: FaLinkedinIn },
  { id: "youtube", label: "YouTube", href: "#", icon: FaYoutube },
  { id: "blogger", label: "Blogger", href: "#", icon: FaBloggerB },
  { id: "pinterest", label: "Pinterest", href: "#", icon: FaPinterestP },
  { id: "tumblr", label: "Tumblr", href: "#", icon: FaTumblr },
  { id: "threads", label: "Threads", href: "#", icon: SiThreads },
];

const QUICK_LINKS: NavigationLink[] = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const SERVICES: NavigationLink[] = [
  { href: "/solutions/retail-point", label: "Retail & POS" },
  { href: "/solutions/distributor", label: "Distributor" },
  { href: "/solutions/sales-force", label: "Sales Force" },
  { href: "/solutions/loyalty", label: "Loyalty" },
  { href: "/solutions/partner-loyalty", label: "Partner Loyalty" },
  { href: "/services/on-ground", label: "On-Ground Services" },
];

const LEGAL_LINKS: NavigationLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookie", label: "Cookie Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
];

// =============================================================================
// Helper Components
// =============================================================================

const SocialButton: React.FC<SocialButtonProps> = ({
  href,
  label,
  icon: Icon,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-700 hover:shadow-md transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 hover:border-primary-200 hover:text-primary-600"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
};

const FooterColumn: React.FC<FooterColumnProps> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full mr-3" />
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <a
              href={item.href}
              className="text-gray-600 hover:text-gray-900 transition-all duration-300 flex items-center group font-medium text-sm"
            >
              <FaArrowRight className="mr-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300 w-3 h-3" />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ContactRow: React.FC<ContactRowProps> = ({ icon: Icon, label }) => {
  return (
    <div className="flex items-start group">
      <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover:bg-gray-50 group-hover:border-gray-300 transition-all duration-300 group-hover:shadow-sm">
        <Icon className="w-3 h-3 text-gray-600" />
      </div>
      <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300 font-medium text-sm leading-relaxed">
        {label}
      </p>
    </div>
  );
};

// =============================================================================
// Newsletter Form Component
// =============================================================================

interface NewsletterFormProps {
  email: string;
  status: "idle" | "error" | "success";
  message: string;
  isSubmitting: boolean;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  email,
  status,
  message,
  isSubmitting,
  onEmailChange,
  onSubmit,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onEmailChange(e.target.value);
    },
    [onEmailChange]
  );

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full lg:w-96"
      noValidate
    >
      <div className="flex-1">
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
          className={`w-full px-4 py-3 bg-white border rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ${
            status === "error"
              ? "border-primary-400 shadow-sm"
              : "border-gray-200 hover:border-gray-300"
          }`}
          aria-invalid={status === "error"}
          aria-describedby={
            status !== "idle" ? "subscription-message" : undefined
          }
          disabled={isSubmitting}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:scale-[1.02] transition-all duration-300 font-semibold shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[120px]"
      >
        {isSubmitting ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <FaPaperPlane className="w-3 h-3" />
        )}
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
};

// =============================================================================
// Main Footer Component
// =============================================================================

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateEmail = useCallback((value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }, []);

  const handleSubscribe = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      setStatus("idle");
      setMessage("");
      setIsSubmitting(true);

      // Validation
      if (!email.trim()) {
        setStatus("error");
        setMessage("Please enter your email address.");
        setIsSubmitting(false);
        return;
      }

      if (!validateEmail(email)) {
        setStatus("error");
        setMessage("Please enter a valid email address.");
        setIsSubmitting(false);
        return;
      }

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStatus("success");
        setMessage(
          "🎉 Successfully subscribed! Check your inbox for confirmation."
        );
        setEmail("");
      } catch (error) {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, validateEmail]
  );

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      // Clear error when user starts typing
      if (status === "error") {
        setStatus("idle");
        setMessage("");
      }
    },
    [status]
  );

  return (
    <footer className="bg-white text-gray-900 relative overflow-hidden border-t border-gray-100">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #111 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gray-50 to-blue-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-50 pointer-events-none" />

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/"
              className="inline-block transition-transform hover:scale-105"
            >
              <img src="/logo.svg" alt="Imast Logo" />
            </Link>

            <p className="text-gray-600 max-w-md text-base leading-relaxed">
              Empowering innovation through practical, outcome-focused
              technology for retail, distribution, and loyalty solutions that
              drive real business growth.
            </p>

            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => (
                <SocialButton
                  key={social.id}
                  href={social.href}
                  label={social.label}
                  icon={social.icon}
                />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <FooterColumn title="Quick Links" items={QUICK_LINKS} />
          </div>

          {/* Services */}
          <div>
            <FooterColumn title="Services" items={SERVICES} />
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full mr-3" />
              Get in Touch
            </h3>

            <div className="space-y-4">
              <ContactRow
                icon={FaMapMarkerAlt}
                label={
                  <>
                    <strong className="text-gray-900">Address:</strong> 123
                    Innovation Street, Tech City
                  </>
                }
              />
              <ContactRow
                icon={FaPhone}
                label={
                  <>
                    <strong className="text-gray-900">Phone:</strong> +1 (555)
                    123-4567
                  </>
                }
              />
              <ContactRow
                icon={FaEnvelope}
                label={
                  <>
                    <strong className="text-gray-900">Email:</strong>{" "}
                    hello@imast.com
                  </>
                }
              />
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left space-y-3">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Stay Updated
              </h3>
              <p className="text-gray-600 text-base max-w-md">
                Subscribe for product updates, practical playbooks, and
                exclusive events.
              </p>
            </div>

            <div className="flex flex-col items-end gap-3 w-full lg:w-auto">
              <NewsletterForm
                email={email}
                status={status}
                message={message}
                isSubmitting={isSubmitting}
                onEmailChange={handleEmailChange}
                onSubmit={handleSubscribe}
              />

              {message && (
                <div
                  id="subscription-message"
                  className={`w-full text-sm font-medium text-center lg:text-right ${
                    status === "error" ? "text-primary-500" : "text-green-600"
                  }`}
                  role="alert"
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-500 text-sm flex items-center flex-wrap gap-2 justify-center md:justify-start">
              © {new Date().getFullYear()} IMAST. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 font-medium hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
