"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Loader,
  MessageCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { ContactApi, SubmitFormPayload } from "@/services/modules/contact";

interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ContactSectionProps {
  data: {
    header?: {
      subtitle?: string;
      title?: string;
      description?: string;
    };
    contactInfo?: {
      title?: string;
      items?: Array<{
        label?: string;
        value?: string;
        description?: string;
        href?: string;
      }>;
    };
    form?: {
      labels?: {
        name?: string;
        email?: string;
        company?: string;
        subject?: string;
        message?: string;
      };
      placeholders?: {
        name?: string;
        email?: string;
        company?: string;
        message?: string;
      };
      subjectOptions?: string[];
      validation?: {
        requiredFields?: string;
        errors?: {
          name?: string;
          email?: {
            required?: string;
            invalid?: string;
          };
          subject?: string;
          message?: {
            required?: string;
            minLength?: string;
          };
        };
      };
      buttons?: {
        submit?: string;
        submitting?: string;
        anotherMessage?: string;
      };
    };
    success?: {
      title?: string;
      description?: string;
    };
    errors?: {
      submission?: string;
      default?: string;
    };
  };
}

const defaultData = {
  header: {
    subtitle: "Get In Touch",
    title: "Let's Start a Conversation",
    description:
      "Have a project in mind or want to learn more about our services? We'd love to hear from you and discuss how we can help.",
  },
  contactInfo: {
    title: "Contact Information",
    items: [
      {
        label: "Email us",
        value: "hello@company.com",
        description: "We'll respond within 24 hours",
        href: "mailto:hello@company.com",
      },
      {
        label: "Call us",
        value: "+1 (555) 123-4567",
        description: "Mon-Fri from 9am to 5pm",
        href: "tel:+15551234567",
      },
      {
        label: "Visit us",
        value: "123 Business Ave",
        description: "San Francisco, CA 94107",
        href: "https://maps.google.com",
      },
      {
        label: "Office hours",
        value: "Monday - Friday",
        description: "9:00 AM - 6:00 PM PST",
      },
    ],
  },
  form: {
    labels: {
      name: "Full Name *",
      email: "Email Address *",
      company: "Company",
      subject: "Subject *",
      message: "Message *",
    },
    placeholders: {
      name: "Enter your full name",
      email: "Enter your email",
      company: "Your company name",
      message: "Tell us about your project or inquiry...",
    },
    subjectOptions: [
      "General Inquiry",
      "Partnership",
      "Support",
      "Sales",
      "Feedback",
      "Other",
    ],
    validation: {
      requiredFields: "* Required fields",
      errors: {
        name: "Name is required",
        email: {
          required: "Email is required",
          invalid: "Please enter a valid email address",
        },
        subject: "Subject is required",
        message: {
          required: "Message is required",
          minLength: "Message must be at least 10 characters",
        },
      },
    },
    buttons: {
      submit: "Send Message",
      submitting: "Sending...",
      anotherMessage: "Send Another Message",
    },
  },
  success: {
    title: "Message Sent Successfully!",
    description:
      "Thank you for reaching out. We've received your message and will get back to you within 24 hours.",
  },
  errors: {
    submission: "Submission Error",
    default: "Failed to send message. Please try again later.",
  },
};

// Helper function to safely access nested properties
const getSafeValue = <T,>(value: T | undefined, defaultValue: T): T => {
  return value ?? defaultValue;
};

export default function ContactSection({ data }: ContactSectionProps) {
  // Safely merge data with defaults
  const content = {
    header: { ...defaultData.header, ...data?.header },
    contactInfo: {
      title: getSafeValue(
        data?.contactInfo?.title,
        defaultData.contactInfo.title
      ),
      items: data?.contactInfo?.items ?? defaultData.contactInfo.items,
    },
    form: {
      labels: { ...defaultData.form.labels, ...data?.form?.labels },
      placeholders: {
        ...defaultData.form.placeholders,
        ...data?.form?.placeholders,
      },
      subjectOptions:
        data?.form?.subjectOptions ?? defaultData.form.subjectOptions,
      validation: {
        requiredFields: getSafeValue(
          data?.form?.validation?.requiredFields,
          defaultData.form.validation.requiredFields
        ),
        errors: {
          name: getSafeValue(
            data?.form?.validation?.errors?.name,
            defaultData.form.validation.errors.name
          ),
          email: {
            required: getSafeValue(
              data?.form?.validation?.errors?.email?.required,
              defaultData.form.validation.errors.email.required
            ),
            invalid: getSafeValue(
              data?.form?.validation?.errors?.email?.invalid,
              defaultData.form.validation.errors.email.invalid
            ),
          },
          subject: getSafeValue(
            data?.form?.validation?.errors?.subject,
            defaultData.form.validation.errors.subject
          ),
          message: {
            required: getSafeValue(
              data?.form?.validation?.errors?.message?.required,
              defaultData.form.validation.errors.message.required
            ),
            minLength: getSafeValue(
              data?.form?.validation?.errors?.message?.minLength,
              defaultData.form.validation.errors.message.minLength
            ),
          },
        },
      },
      buttons: { ...defaultData.form.buttons, ...data?.form?.buttons },
    },
    success: { ...defaultData.success, ...data?.success },
    errors: { ...defaultData.errors, ...data?.errors },
  };

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = content.form.validation.errors.name;
    }

    if (!formData.email.trim()) {
      newErrors.email = content.form.validation.errors.email.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = content.form.validation.errors.email.invalid;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = content.form.validation.errors.subject;
    }

    if (!formData.message.trim()) {
      newErrors.message = content.form.validation.errors.message.required;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = content.form.validation.errors.message.minLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare payload for ContactApi
      const payload: SubmitFormPayload = {
        formName: "contact",
        data: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
        },
        email: formData.email,
        name: formData.name,
        honeypot: null,
      };

      // Call the actual API
      const result = await ContactApi.submitForm(payload);

      // Handle successful submission
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
      setTouched({});

      console.log("Form submitted successfully:", result);
    } catch (error: any) {
      console.error("Failed to submit form:", error);

      // Handle different types of errors
      if (error.response?.data?.message) {
        setSubmitError(error.response.data.message);
      } else if (error.message) {
        setSubmitError(error.message);
      } else {
        setSubmitError(content.errors.default);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Icon mapping for contact info items
  const iconMap = {
    "Email us": Mail,
    "Call us": Phone,
    "Visit us": MapPin,
    "Office hours": Clock,
  };

  if (isSubmitted) {
    return (
      <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-10 right-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-primary-100 shadow-2xl transform transition-all duration-500 hover:scale-105">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {content.success.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              {content.success.description}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg group"
            >
              {content.form.buttons.anotherMessage}
              <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50"
      id="contact"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 mb-6 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm font-semibold uppercase tracking-wide text-primary-700">
              {content.header.subtitle}
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {content.header.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {content.header.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Enhanced Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-primary-100 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {content.contactInfo.title}
                </h3>
              </div>

              <div className="space-y-6">
                {content.contactInfo.items.map((item, index) => {
                  const IconComponent =
                    iconMap[item.label as keyof typeof iconMap] ||
                    MessageCircle;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 group p-4 rounded-2xl hover:bg-primary-50 transition-all duration-300 cursor-pointer"
                      onClick={() =>
                        item.href && window.open(item.href, "_blank")
                      }
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <IconComponent className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium transition-colors mt-1 group/link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.value}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          <p className="text-primary-600 font-medium mt-1">
                            {item.value}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-primary-100 shadow-xl hover:shadow-2xl transition-all duration-500">
              {/* Error Message */}
              {submitError && (
                <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4 animate-shake">
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-semibold text-lg">
                      {content.errors.submission}
                    </p>
                    <p className="text-red-700 mt-2">{submitError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-3"
                    >
                      {content.form.labels.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur("name")}
                      className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${
                        errors.name
                          ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      } outline-none group-hover:border-primary-300 disabled:opacity-50`}
                      placeholder={content.form.placeholders.name}
                      disabled={isSubmitting}
                    />
                    {errors.name && touched.name && (
                      <p className="mt-2 text-sm text-red-600 animate-fadeIn">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-3"
                    >
                      {content.form.labels.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${
                        errors.email
                          ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      } outline-none group-hover:border-primary-300 disabled:opacity-50`}
                      placeholder={content.form.placeholders.email}
                      disabled={isSubmitting}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-2 text-sm text-red-600 animate-fadeIn">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Company */}
                  <div className="group">
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold text-gray-700 mb-3"
                    >
                      {content.form.labels.company}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all duration-300 group-hover:border-primary-300 disabled:opacity-50"
                      placeholder={content.form.placeholders.company}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Enhanced Subject Dropdown */}
                  <div className="group">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 mb-3"
                    >
                      {content.form.labels.subject}
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={() => handleBlur("subject")}
                        className={`w-full px-5 py-4 pr-12 rounded-2xl border-2 appearance-none transition-all duration-300 ${
                          errors.subject
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                        } outline-none group-hover:border-primary-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
                        disabled={isSubmitting}
                      >
                        <option value="" className="text-gray-400">
                          Select a subject
                        </option>
                        {content.form.subjectOptions.map((option) => (
                          <option
                            key={option}
                            value={option}
                            className="text-gray-900"
                          >
                            {option}
                          </option>
                        ))}
                      </select>

                      {/* Custom dropdown icon */}
                      <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                          className={`w-5 h-5 transition-all duration-300 ${
                            formData.subject
                              ? "text-primary-500"
                              : isSubmitting
                              ? "text-gray-300"
                              : "text-gray-400 group-hover:text-primary-400"
                          } ${isSubmitting ? "animate-pulse" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.subject && touched.subject && (
                      <p className="mt-2 text-sm text-red-600 animate-fadeIn">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* Enhanced Message Textarea */}
                <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-3"
                  >
                    {content.form.labels.message}
                    <span className="text-xs font-normal text-gray-500 ml-2">
                      ({formData.message.length}/10 min)
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur("message")}
                    rows={6}
                    className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${
                      errors.message
                        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                    } outline-none resize-vertical group-hover:border-primary-300 disabled:opacity-50`}
                    placeholder={content.form.placeholders.message}
                    disabled={isSubmitting}
                  />
                  {errors.message && touched.message && (
                    <p className="mt-2 text-sm text-red-600 animate-fadeIn">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Enhanced Submit Button */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    {content.form.validation.requiredFields}
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        {content.form.buttons.submitting}
                      </>
                    ) : (
                      <>
                        {content.form.buttons.submit}
                        <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
