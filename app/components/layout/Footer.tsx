"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
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
import SubscribersApi from "@/services/modules/subscribers";

interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: string;
}

interface NavigationLink {
  href: string;
  label: string;
}

interface ContactInfo {
  type: string;
  label: string;
  value: string;
  icon: string;
}

interface FooterData {
  logo: {
    src: string;
    alt: string;
  };
  company: {
    description: string;
    contact: ContactInfo[];
  };
  socialLinks: SocialLink[];
  quickLinks: NavigationLink[];
  services: NavigationLink[];
  legalLinks: NavigationLink[];
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    submitText: string;
    submittingText: string;
    successMessage: string;
    errorMessages: {
      empty: string;
      invalid: string;
      generic: string;
    };
  };
  copyright: {
    text: string;
    year: number;
  };
}

// =============================================================================
// Icon Mapping & helpers
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, any> = {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaPaperPlane,
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
    SiThreads,
  };
  return iconMap[iconName] || FaEnvelope;
};

const SocialButton: React.FC<{
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}> = ({ href, label, icon: Icon }) => (
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

const FooterColumn: React.FC<{ title: string; items: NavigationLink[] }> = ({
  title,
  items,
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
      <div className="w-1 h-6 bg-linear-to-b from-primary-500 to-primary-600 rounded-full mr-3" />
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

const ContactRow: React.FC<{
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: React.ReactNode;
  value: string;
  type: string;
}> = ({ icon: Icon, label, value, type }) => {
  // Handle click based on type
  const handleClick = () => {
    switch (type) {
      case "email":
        window.location.href = `mailto:${value}`;
        break;
      case "phone":
        window.location.href = `tel:${value.replace(/\s/g, "")}`;
        break;
      case "address":
        // Open in Google Maps if it's an address
        const encodedAddress = encodeURIComponent(value);
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
          "_blank"
        );
        break;
      default:
        break;
    }
  };

  // Determine if this item should be clickable
  const isClickable = ["email", "phone", "address"].includes(type);

  const content = (
    <div className="flex items-start group">
      <div
        className={`w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center mr-3 mt-0.5 shrink-0 transition-all duration-300 ${
          isClickable
            ? "group-hover:bg-gray-50 group-hover:border-gray-300 group-hover:shadow-sm cursor-pointer"
            : ""
        }`}
      >
        <Icon
          className={`w-3 h-3 ${
            isClickable
              ? "text-gray-600 group-hover:text-gray-900"
              : "text-gray-600"
          } transition-colors duration-300`}
        />
      </div>
      <p
        className={`text-gray-600 transition-colors duration-300 font-medium text-sm leading-relaxed ${
          isClickable ? "group-hover:text-gray-900 cursor-pointer" : ""
        }`}
      >
        {label}
      </p>
    </div>
  );

  if (!isClickable) {
    return content;
  }

  return (
    <button
      onClick={handleClick}
      className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:rounded-lg"
      aria-label={`${
        type === "email"
          ? "Send email to"
          : type === "phone"
          ? "Call"
          : "Open location for"
      } ${value}`}
    >
      {content}
    </button>
  );
};

const NewsletterForm: React.FC<{
  email: string;
  status: "idle" | "error" | "success";
  message: string;
  isSubmitting: boolean;
  placeholder: string;
  submitText: string;
  submittingText: string;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}> = ({
  email,
  status,
  message,
  isSubmitting,
  placeholder,
  submitText,
  submittingText,
  onEmailChange,
  onSubmit,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onEmailChange(e.target.value),
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
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-white border rounded text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ${
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
        className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-linear-to-r from-primary-500 to-primary-600 text-white rounded hover:scale-[1.02] transition-all duration-300 font-semibold shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[120px]"
      >
        {isSubmitting ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <FaPaperPlane className="w-3 h-3" />
        )}
        {isSubmitting ? submittingText : submitText}
      </button>
    </form>
  );
};

const Footer: React.FC<{ data: FooterData }> = ({ data }) => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateEmail = useCallback((value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }, []);

  const deriveNameFromEmail = useCallback((emailAddr: string) => {
    const local = String(emailAddr || "").split("@")[0];
    const cleaned = local
      .replace(/[._-]+/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    return cleaned || emailAddr;
  }, []);

  const handleSubscribe = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("idle");
      setMessage("");
      setIsSubmitting(true);

      if (!email.trim()) {
        setStatus("error");
        setMessage(data.newsletter.errorMessages.empty);
        setIsSubmitting(false);
        return;
      }
      if (!validateEmail(email)) {
        setStatus("error");
        setMessage(data.newsletter.errorMessages.invalid);
        setIsSubmitting(false);
        return;
      }

      const name = deriveNameFromEmail(email);

      try {
        const res = await SubscribersApi.subscribe({
          email,
          name,
          source: "footer",
        });

        if (res.message === "Already subscribed") {
          setStatus("error");
          setMessage("Already subscribed!!");
          return;
        }

        setStatus("success");

        setMessage(data.newsletter.successMessage);
        setEmail("");
      } catch (err: any) {
        console.error("subscribe error:", err);
        setStatus("error");
        setMessage(
          (err && (err.message || err?.response?.message)) ||
            data.newsletter.errorMessages.generic
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, validateEmail, data.newsletter, deriveNameFromEmail]
  );

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      if (status === "error") {
        setStatus("idle");
        setMessage("");
      }
    },
    [status]
  );

  const formatContactInfo = (contact: ContactInfo) => {
    switch (contact.type) {
      case "address":
        return (
          <>
            <strong className="text-gray-900">{contact.label}:</strong>{" "}
            {contact.value}
          </>
        );
      case "phone":
        return (
          <>
            <strong className="text-gray-900">{contact.label}:</strong>{" "}
            {contact.value}
          </>
        );
      case "email":
        return (
          <>
            <strong className="text-gray-900">{contact.label}:</strong>{" "}
            {contact.value}
          </>
        );
      default:
        return contact.value;
    }
  };

  return (
    <footer className="bg-white text-gray-900 relative overflow-hidden border-t border-gray-100">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #111 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="absolute top-0 left-0 w-72 h-72 bg-linear-to-br from-blue-50 to-purple-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-tl from-gray-50 to-blue-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/"
              className="inline-block transition-transform hover:scale-105"
            >
              <img src={data.logo.src} alt={data.logo.alt} />
            </Link>

            <p className="text-gray-600 max-w-md text-base leading-relaxed">
              {data.company.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {data.socialLinks.map((social) => {
                const IconComponent = getIconComponent(social.icon);
                return (
                  <SocialButton
                    key={social.id}
                    href={social.href}
                    label={social.label}
                    icon={IconComponent}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <FooterColumn title="Quick Links" items={data.quickLinks} />
          </div>

          <div>
            <FooterColumn title="Services" items={data.services} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <div className="w-1 h-6 bg-linear-to-b from-primary-500 to-primary-600 rounded-full mr-3" />
              Get in Touch
            </h3>

            <div className="space-y-4">
              {data.company.contact.map((contact) => {
                const IconComponent = getIconComponent(contact.icon);
                return (
                  <ContactRow
                    key={contact.type}
                    icon={IconComponent}
                    label={formatContactInfo(contact)}
                    value={contact.value}
                    type={contact.type}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left space-y-3">
              <h3 className="text-2xl font-semibold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {data.newsletter.title}
              </h3>
              <p className="text-gray-600 text-base max-w-md">
                {data.newsletter.description}
              </p>
            </div>

            <div className="flex flex-col items-end gap-3 w-full lg:w-auto">
              <NewsletterForm
                email={email}
                status={status}
                message={message}
                isSubmitting={isSubmitting}
                placeholder={data.newsletter.placeholder}
                submitText={data.newsletter.submitText}
                submittingText={data.newsletter.submittingText}
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

      <div className="border-t border-gray-200 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-500 text-sm flex items-center flex-wrap gap-2 justify-center md:justify-start">
              {data.copyright.text.replace(
                "{year}",
                data.copyright.year.toString()
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {data.legalLinks.map((link) => (
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
