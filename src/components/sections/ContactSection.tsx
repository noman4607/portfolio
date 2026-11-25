import { useEffect, useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { personalInfo, servicesList } from '../../data/portfolioData';
import type { ServiceType } from '../../data/portfolioData';
import { Reveal } from '../Reveal';

interface ContactSectionProps {
  selectedService?: ServiceType;
}

export function ContactSection({ selectedService }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState<ServiceType>(
    selectedService || 'Mechanical Design'
  );
  const [description, setDescription] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedService) {
      setProjectType(selectedService);
    }
  }, [selectedService]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.contact.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback gracefully if clipboard unavailable
    }
  };

  const validateClient = () => {
    const errors: Record<string, string> = {};
    if (name.trim().length < 2) {
      errors.name = 'Please enter your name (at least 2 characters).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (description.trim().length < 15) {
      errors.description = 'Please describe your project requirements (at least 15 characters).';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateClient()) return;

    const subject = encodeURIComponent(`Engineering Inquiry: ${projectType}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\r\nEmail: ${email.trim()}\r\nProject type: ${projectType}\r\n\r\n${description.trim()}`
    );
    window.location.href = `mailto:${personalInfo.contact.email}?subject=${subject}&body=${body}`;
  };

  const directMailtoHref = `mailto:${personalInfo.contact.email}?subject=${encodeURIComponent(
    `Engineering Inquiry: ${projectType}`
  )}`;

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 bg-white dark:bg-[#0B1220]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium text-[#2563EB] dark:text-[#60A5FA]">Contact</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D] dark:text-[#F8FAFC]">
            Let&apos;s Build Something Meaningful
          </h2>
          <p className="mt-3 text-base text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            Have a mechanical design challenge, CAD modeling requirement, or 3D printing project?
            Let&apos;s discuss how I can help turn your concept into a practical solution.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Verified Contact Information */}
          <Reveal className="lg:col-span-5" delay={0.05}>
            <div className="rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F7F9FC] dark:bg-[#111B2E] p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-[#14213D] dark:text-[#F8FAFC]">
                Direct Contact Details
              </h3>
              <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                Available for mechanical engineering roles, project-based CAD design, CNC cutting
                preparation, and custom 3D printing inquiries.
              </p>

              <dl className="mt-6 divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                {/* Email */}
                <div className="py-4 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <Mail
                      className="w-4 h-4 mt-1 text-[#2563EB] dark:text-[#60A5FA] shrink-0"
                      strokeWidth={1.75}
                    />
                    <div className="min-w-0">
                      <dt className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                        Email
                      </dt>
                      <dd className="mt-0.5">
                        <a
                          href={`mailto:${personalInfo.contact.email}`}
                          className="text-sm font-medium text-[#17243A] dark:text-[#F1F5F9] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors break-all"
                        >
                          {personalInfo.contact.email}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0D1526] text-[#17243A] dark:text-[#CBD5E1] hover:border-[#2563EB] transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2563EB]" strokeWidth={2} />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" strokeWidth={1.75} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Phone */}
                <div className="py-4 flex items-start gap-3">
                  <Phone
                    className="w-4 h-4 mt-1 text-[#2563EB] dark:text-[#60A5FA] shrink-0"
                    strokeWidth={1.75}
                  />
                  <div>
                    <dt className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                      Phone
                    </dt>
                    <dd className="mt-0.5">
                      <a
                        href={personalInfo.contact.phoneHref}
                        className="font-mono text-sm tabular-nums font-medium text-[#17243A] dark:text-[#F1F5F9] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors"
                      >
                        {personalInfo.contact.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>

                {/* Location */}
                <div className="py-4 flex items-start gap-3">
                  <MapPin
                    className="w-4 h-4 mt-1 text-[#2563EB] dark:text-[#60A5FA] shrink-0"
                    strokeWidth={1.75}
                  />
                  <div>
                    <dt className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                      Location
                    </dt>
                    <dd className="mt-0.5 text-sm font-medium text-[#17243A] dark:text-[#F1F5F9]">
                      {personalInfo.contact.location}
                    </dd>
                  </div>
                </div>

                {/* LinkedIn (Strictly verified URL only — no assumed link) */}
                <div className="py-4 flex items-start gap-3">
                  <Linkedin
                    className="w-4 h-4 mt-1 text-[#2563EB] dark:text-[#60A5FA] shrink-0"
                    strokeWidth={1.75}
                  />
                  <div>
                    <dt className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                      LinkedIn
                    </dt>
                    <dd className="mt-0.5">
                      {personalInfo.contact.linkedinUrl ? (
                        <a
                          href={personalInfo.contact.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-[#17243A] dark:text-[#F1F5F9] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors"
                        >
                          {personalInfo.contact.linkedinDisplayName}
                        </a>
                      ) : (
                        <div>
                          <p className="text-sm font-medium text-[#17243A] dark:text-[#F1F5F9]">
                            {personalInfo.contact.linkedinDisplayName}
                          </p>
                          <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                            Verified LinkedIn URL to be linked when supplied.
                          </p>
                        </div>
                      )}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* Right Column: Accessible Contact Inquiry Form */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Project inquiry form"
              className="rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111B2E] p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block text-sm font-medium text-[#17243A] dark:text-[#F1F5F9]"
                  >
                    Name <span className="text-[#2563EB]">*</span>
                  </label>
                  <input
                    id="inquiry-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (fieldErrors.name) {
                        setFieldErrors((prev) => ({ ...prev, name: '' }));
                      }
                    }}
                    placeholder="Your full name"
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? 'inquiry-name-error' : undefined}
                    className="mt-2 w-full rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#0D1526] px-3.5 py-2.5 text-sm text-[#17243A] dark:text-[#F1F5F9] placeholder:text-[#94A3B8] focus:border-[#2563EB] dark:focus:border-[#60A5FA] focus:outline-none transition-colors"
                  />
                  {fieldErrors.name && (
                    <p
                      id="inquiry-name-error"
                      className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldErrors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block text-sm font-medium text-[#17243A] dark:text-[#F1F5F9]"
                  >
                    Email Address <span className="text-[#2563EB]">*</span>
                  </label>
                  <input
                    id="inquiry-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email) {
                        setFieldErrors((prev) => ({ ...prev, email: '' }));
                      }
                    }}
                    placeholder="name@company.com"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'inquiry-email-error' : undefined}
                    className="mt-2 w-full rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#0D1526] px-3.5 py-2.5 text-sm text-[#17243A] dark:text-[#F1F5F9] placeholder:text-[#94A3B8] focus:border-[#2563EB] dark:focus:border-[#60A5FA] focus:outline-none transition-colors"
                  />
                  {fieldErrors.email && (
                    <p
                      id="inquiry-email-error"
                      className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldErrors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="inquiry-project-type"
                  className="block text-sm font-medium text-[#17243A] dark:text-[#F1F5F9]"
                >
                  Project Type <span className="text-[#2563EB]">*</span>
                </label>
                <select
                  id="inquiry-project-type"
                  name="projectType"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value as ServiceType)}
                  className="mt-2 w-full rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#0D1526] px-3.5 py-2.5 text-sm text-[#17243A] dark:text-[#F1F5F9] focus:border-[#2563EB] dark:focus:border-[#60A5FA] focus:outline-none transition-colors"
                >
                  {servicesList.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="inquiry-description"
                  className="block text-sm font-medium text-[#17243A] dark:text-[#F1F5F9]"
                >
                  Project Description <span className="text-[#2563EB]">*</span>
                </label>
                <textarea
                  id="inquiry-description"
                  name="description"
                  rows={5}
                  required
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (fieldErrors.description) {
                      setFieldErrors((prev) => ({ ...prev, description: '' }));
                    }
                  }}
                  placeholder="Outline your mechanical design goals, CAD files or specifications, 3D printing needs, and desired timeline."
                  aria-invalid={Boolean(fieldErrors.description)}
                  aria-describedby={
                    fieldErrors.description ? 'inquiry-description-error' : undefined
                  }
                  className="mt-2 w-full rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#0D1526] px-3.5 py-2.5 text-sm text-[#17243A] dark:text-[#F1F5F9] placeholder:text-[#94A3B8] focus:border-[#2563EB] dark:focus:border-[#60A5FA] focus:outline-none transition-colors resize-y"
                />
                {fieldErrors.description && (
                  <p
                    id="inquiry-description-error"
                    className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{fieldErrors.description}</span>
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-[#2563EB] text-white hover:bg-[#1D4ED8] disabled:opacity-60 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  <span>Open Email Draft</span>
                </button>

                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                  Opens your email app. You can also email{' '}
                  <a
                    href={directMailtoHref}
                    className="text-[#17243A] dark:text-[#E2E8F0] underline hover:text-[#2563EB]"
                  >
                    {personalInfo.contact.email}
                  </a>
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
