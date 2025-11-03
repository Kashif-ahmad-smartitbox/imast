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
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-primary-100">
            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {content.success.title}
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {content.success.description}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              {content.form.buttons.anotherMessage}
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-2xl sm:text-3xl font-semibold text-primary-600 mb-2">
            {content.header.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {content.header.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.header.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-primary-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  {content.contactInfo.title}
                </h3>
              </div>

              <div className="space-y-6">
                {content.contactInfo.items.map((item, index) => {
                  const IconComponent =
                    iconMap[item.label as keyof typeof iconMap] ||
                    MessageCircle;
                  return (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                        <IconComponent className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="block text-primary-600 hover:text-primary-700 font-medium transition-colors mt-1"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-primary-600 font-medium mt-1">
                            {item.value}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 transition-shadow">
              {/* Error Message */}
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-medium">
                      {content.errors.submission}
                    </p>
                    <p className="text-red-700 text-sm mt-1">{submitError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      {content.form.labels.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.name ? "border-red-300" : "border-gray-300"
                      } focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-colors`}
                      placeholder={content.form.placeholders.name}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      {content.form.labels.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      } focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-colors`}
                      placeholder={content.form.placeholders.email}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      {content.form.labels.company}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-colors"
                      placeholder={content.form.placeholders.company}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      {content.form.labels.subject}
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pr-12 rounded-xl border appearance-none ${
                          errors.subject ? "border-red-300" : "border-gray-300"
                        } focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-colors bg-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
                        disabled={isSubmitting}
                      >
                        <option value="">Select a subject</option>
                        {content.form.subjectOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      {/* Custom dropdown icon */}
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                          className={`w-4 h-4 transition-colors duration-200 ${
                            formData.subject
                              ? "text-primary-500"
                              : isSubmitting
                              ? "text-gray-300"
                              : "text-gray-400"
                          }`}
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
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    {content.form.labels.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.message ? "border-red-300" : "border-gray-300"
                    } focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-colors resize-vertical disabled:opacity-50`}
                    placeholder={content.form.placeholders.message}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-gray-500">
                    {content.form.validation.requiredFields}
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        {content.form.buttons.submitting}
                      </>
                    ) : (
                      <>
                        {content.form.buttons.submit}
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
