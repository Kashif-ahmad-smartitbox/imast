"use client";
import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  FileText,
  X,
  Inbox,
  Calendar,
  DollarSign,
  Award,
  Share2,
  ExternalLink,
  Filter,
  ChevronDown,
  Loader2,
} from "lucide-react";

export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | string;
  summary?: string;
  postedAt?: string;
  responsibilities?: string[];
  qualifications?: string[];
  externalApplyUrl?: string;
  detailsUrl?: string;
  salary?: string;
  experience?: string;
  tags?: string[];
  urgency?: "Urgent" | "High" | "Normal";
  remote?: boolean;
};

export type CareersData = {
  heading?: string;
  subheading?: string;
  intro?: string;
  jobs: Job[];
  features?: {
    enableSearch?: boolean;
    enableFilters?: boolean;
    enableSorting?: boolean;
    showPostedDate?: boolean;
    showSalary?: boolean;
    showExperience?: boolean;
    showTags?: boolean;
  };
  styling?: {
    primaryColor?: string;
    cardStyle?: "modern" | "classic" | "minimal";
    showFeaturedJobs?: boolean;
  };
};

export type CareerSectionProps = {
  data: CareersData;
  className?: string;
  onExternalApply?: (job: Job) => void;
  onDetailsClick?: (job: Job) => void;
  onApplicationSubmit?: (application: {
    job: Job;
    name: string;
    email: string;
    cover: string;
    resume: File;
  }) => Promise<void>;
};

function formatDate(date?: string) {
  if (!date) return "";
  try {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;

    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return date;
  }
}

function bytesToMB(bytes: number) {
  return Math.round((bytes / (1024 * 1024)) * 10) / 10;
}

function getUrgencyColor(urgency?: string) {
  switch (urgency) {
    case "Urgent":
      return "bg-red-100 text-red-800 border-red-200";
    case "High":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-blue-100 text-blue-800 border-blue-200";
  }
}

export default function CareerSectionPage({
  data,
  className = "",
  onExternalApply,
  onDetailsClick,
  onApplicationSubmit,
}: CareerSectionProps) {
  const {
    heading = "Join Our Team",
    subheading = "Careers",
    intro = "Discover opportunities that match your skills and ambitions. Grow with us.",
    jobs = [],
    features = {
      enableSearch: true,
      enableFilters: true,
      enableSorting: true,
      showPostedDate: true,
      showSalary: true,
      showExperience: true,
      showTags: true,
    },
    styling = {
      primaryColor: "primary",
      cardStyle: "modern",
      showFeaturedJobs: false,
    },
  } = data ?? {};

  // State management
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<string>("All");
  const [location, setLocation] = useState<string>("All");
  const [jobType, setJobType] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"newest" | "title" | "department">(
    "newest"
  );
  const [showFilters, setShowFilters] = useState(false);

  // Modal state
  const [openJob, setOpenJob] = useState<Job | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cover, setCover] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [copiedJobId, setCopiedJobId] = useState<string | null>(null);

  // Derived data
  const departments = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.department)))],
    [jobs]
  );

  const locations = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.location)))],
    [jobs]
  );

  const jobTypes = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.type)))],
    [jobs]
  );

  const filteredAndSortedJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    let filtered = jobs.filter((j) => {
      if (department !== "All" && j.department !== department) return false;
      if (location !== "All" && j.location !== location) return false;
      if (jobType !== "All" && j.type !== jobType) return false;
      if (!q) return true;

      const searchText = `${j.title} ${j.summary ?? ""} ${j.department} ${
        j.location
      } ${j.tags?.join(" ") ?? ""} ${j.experience ?? ""}`.toLowerCase();
      return searchText.includes(q);
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.postedAt || 0).getTime() -
            new Date(a.postedAt || 0).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "department":
          return a.department.localeCompare(b.department);
        default:
          return 0;
      }
    });

    return filtered;
  }, [jobs, search, department, location, jobType, sortBy]);

  const featuredJobs = useMemo(
    () => filteredAndSortedJobs.filter((job) => job.urgency === "Urgent"),
    [filteredAndSortedJobs]
  );

  const regularJobs = useMemo(
    () => filteredAndSortedJobs.filter((job) => job.urgency !== "Urgent"),
    [filteredAndSortedJobs]
  );

  // Handlers
  const handleApply = (job: Job) => {
    if (job.externalApplyUrl) {
      onExternalApply?.(job);
      window.open(job.externalApplyUrl, "_blank", "noopener");
      return;
    }
    setOpenJob(job);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCover("");
    setResumeFile(null);
    setFormError("");
  };

  const closeModal = () => {
    setOpenJob(null);
    setFormError("");
    setSubmitting(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError("");
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setResumeFile(null);
      return;
    }

    const maxBytes = 5 * 1024 * 1024;
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setFormError("Please upload a PDF or Word document (.pdf, .doc, .docx).");
      setResumeFile(null);
      return;
    }

    if (file.size > maxBytes) {
      setFormError(
        `File too large. Max 5 MB (your file is ${bytesToMB(file.size)} MB).`
      );
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
  };

  const submitApplication = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFormError("");

    if (!openJob || !resumeFile) return;

    // Validation
    if (!name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      if (onApplicationSubmit) {
        await onApplicationSubmit({
          job: openJob,
          name: name.trim(),
          email: email.trim(),
          cover: cover.trim(),
          resume: resumeFile,
        });
      } else {
        // Fallback to default behavior
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setSubmitting(false);
      closeModal();
      // Show success message
      alert(`Application for ${openJob.title} submitted successfully!`);
    } catch (error) {
      setSubmitting(false);
      setFormError("Failed to submit application. Please try again.");
    }
  };

  const handleDetailsClick = (job: Job) => {
    onDetailsClick?.(job);
    if (job.detailsUrl) {
      const isExternal = /^https?:\/\//i.test(job.detailsUrl);
      if (isExternal) {
        window.open(job.detailsUrl, "_blank", "noopener");
      } else {
        window.location.href = job.detailsUrl;
      }
    } else {
      setOpenJob(job);
    }
  };

  const copyJobLink = async (job: Job) => {
    const url = job.detailsUrl || `${window.location.href}#${job.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedJobId(job.id);
      setTimeout(() => setCopiedJobId(null), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const getCardStyleClasses = () => {
    switch (styling.cardStyle) {
      case "classic":
        return "border-l-4 border-l-primary-500 shadow-md";
      case "minimal":
        return "border border-gray-200 bg-white";
      default: // modern
        return "rounded-xl border border-gray-100 p-6 shadow-sm bg-white hover:shadow-md transition-shadow duration-300";
    }
  };

  return (
    <section
      className={`py-16 bg-gray-50 ${className}`}
      aria-labelledby="careers-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          {subheading && (
            <p className="text-primary-600 font-semibold mb-2">{subheading}</p>
          )}
          <h1
            id="careers-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {heading}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{intro}</p>
        </div>

        {/* Controls */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              {features.enableSearch && (
                <div className="flex-1 relative min-w-[300px]">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search roles, skills, keywords..."
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              )}

              <div className="flex gap-3">
                {features.enableFilters && (
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Filter size={18} />
                    Filters
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        showFilters ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}

                {features.enableSorting && (
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="title">Title A-Z</option>
                    <option value="department">Department</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && features.enableFilters && (
            <div className="mt-4 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Jobs Grid */}
        <div className="max-w-6xl mx-auto">
          {/* Featured Jobs */}
          {styling.showFeaturedJobs && featuredJobs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Featured Roles
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    features={features}
                    styling={styling}
                    cardStyle={getCardStyleClasses()}
                    onApply={handleApply}
                    onDetailsClick={handleDetailsClick}
                    onCopyLink={copyJobLink}
                    copiedJobId={copiedJobId}
                    isFeatured={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Jobs */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {styling.showFeaturedJobs ? "All Open Roles" : "Open Positions"}
            </h2>

            {filteredAndSortedJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-12">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    No positions found
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Try adjusting your search or filters to find what you're
                    looking for.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {regularJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    features={features}
                    styling={styling}
                    cardStyle={getCardStyleClasses()}
                    onApply={handleApply}
                    onDetailsClick={handleDetailsClick}
                    onCopyLink={copyJobLink}
                    copiedJobId={copiedJobId}
                    isFeatured={false}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {openJob && (
        <ApplicationModal
          job={openJob}
          isOpen={!!openJob}
          onClose={closeModal}
          name={name}
          email={email}
          cover={cover}
          resumeFile={resumeFile}
          submitting={submitting}
          formError={formError}
          onNameChange={setName}
          onEmailChange={setEmail}
          onCoverChange={setCover}
          onFileChange={handleFileChange}
          onSubmit={submitApplication}
        />
      )}
    </section>
  );
}

// Job Card Component
function JobCard({
  job,
  features,
  styling,
  cardStyle,
  onApply,
  onDetailsClick,
  onCopyLink,
  copiedJobId,
  isFeatured,
}: any) {
  return (
    <article
      className={`${cardStyle} ${isFeatured ? "ring-2 ring-primary-200" : ""}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {job.title}
                </h3>
                {job.urgency && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(
                      job.urgency
                    )}`}
                  >
                    {job.urgency}
                  </span>
                )}
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                <span className="inline-flex items-center gap-1">
                  <Briefcase size={14} />
                  {job.department}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={14} />
                  {job.location}
                  {job.remote && " • Remote"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <FileText size={14} />
                  {job.type}
                </span>
              </div>

              {/* Additional Info */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 mb-4">
                {features.showSalary && job.salary && (
                  <span className="inline-flex items-center gap-1">
                    <DollarSign size={14} />
                    {job.salary}
                  </span>
                )}
                {features.showExperience && job.experience && (
                  <span className="inline-flex items-center gap-1">
                    <Award size={14} />
                    {job.experience}
                  </span>
                )}
                {features.showPostedDate && job.postedAt && (
                  <span className="inline-flex items-center gap-1 ml-auto">
                    <Calendar size={14} />
                    {formatDate(job.postedAt)}
                  </span>
                )}
              </div>

              {/* Tags */}
              {features.showTags && job.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Summary */}
              {job.summary && (
                <p className="text-gray-600 line-clamp-2">{job.summary}</p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onApply(job)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              Apply Now
              {job.externalApplyUrl && <ExternalLink size={16} />}
            </button>

            <button
              onClick={() => onDetailsClick(job)}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              View Details
            </button>
          </div>

          <button
            onClick={() => onCopyLink(job)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy job link"
          >
            {copiedJobId === job.id ? (
              <span className="text-green-600 text-sm">Copied!</span>
            ) : (
              <Share2 size={16} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

// Application Modal Component
function ApplicationModal({
  job,
  isOpen,
  onClose,
  name,
  email,
  cover,
  resumeFile,
  submitting,
  formError,
  onNameChange,
  onEmailChange,
  onCoverChange,
  onFileChange,
  onSubmit,
}: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Apply for Position
              </h2>
              <p className="text-lg text-primary-600 font-semibold mt-1">
                {job.title}
              </p>
              <p className="text-gray-600 mt-1">
                {job.department} • {job.location}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-6">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter (Optional)
              </label>
              <textarea
                value={cover}
                onChange={(e) => onCoverChange(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume *
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    onChange={onFileChange}
                    accept=".pdf,.doc,.docx"
                    className="sr-only"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                    <Inbox className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      <span className="text-primary-600 font-medium">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>
                </label>
                {resumeFile && (
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{resumeFile.name}</p>
                    <p>{bytesToMB(resumeFile.size)} MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Error Display */}
            {formError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{formError}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
