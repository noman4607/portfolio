import { Download, Loader2 } from 'lucide-react';
import { aboutData, personalInfo } from '../../data/portfolioData';
import { resolvePdfEndpointUrl } from '../../utils/googleDrivePdf';
import { usePdfDownload } from '../../utils/pdfDownload';
import { Reveal } from '../Reveal';

export function AboutSection() {
  const { downloadingKey, downloadError, handleDownload } = usePdfDownload();
  const resolvedResume = resolvePdfEndpointUrl(
    personalInfo.resumeDownloadUrl,
    personalInfo.resumeFileName,
    personalInfo.resumeGoogleDriveUrl
  );
  const resumeHref = resolvedResume.endpointUrl || personalInfo.resumeDownloadUrl;
  return (
    <section
      id="about"
      className="py-20 sm:py-24 bg-[#F7F9FC] dark:bg-[#0E1729] border-b border-[#E2E8F0] dark:border-[#1E293B]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-medium text-[#2563EB] dark:text-[#60A5FA]">About</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D] dark:text-[#F8FAFC]">
            {aboutData.heading}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Narrative & Personal Statement */}
          <Reveal className="lg:col-span-7 space-y-5" delay={0.05}>
            {aboutData.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-[15.5px] sm:text-base leading-[1.75] text-[#475569] dark:text-[#CBD5E1]"
              >
                {paragraph}
              </p>
            ))}

            <blockquote className="mt-6 p-6 rounded-xl bg-white dark:bg-[#111B2E] border border-[#E2E8F0] dark:border-[#1E293B]">
              <p className="text-[15.5px] leading-[1.7] text-[#17243A] dark:text-[#F1F5F9] font-medium">
                &ldquo;{aboutData.personalStatement}&rdquo;
              </p>
              <footer className="mt-3 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                — {personalInfo.fullName}
              </footer>
            </blockquote>

            <div className="pt-2">
              <a
                href={resumeHref}
                download={personalInfo.resumeFileName}
                onClick={(e) => {
                  e.preventDefault();
                  void handleDownload('about-resume', {
                    sourceUrl: personalInfo.resumeDownloadUrl,
                    googleDriveUrl: personalInfo.resumeGoogleDriveUrl,
                    fileName: personalInfo.resumeFileName,
                  });
                }}
                aria-busy={downloadingKey === 'about-resume'}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#2563EB] dark:text-[#60A5FA] hover:text-[#1D4ED8] dark:hover:text-[#93C5FD] transition-colors"
              >
                {downloadingKey === 'about-resume' ? (
                  <Loader2 className="w-4 h-4 shrink-0 animate-spin" strokeWidth={1.75} />
                ) : (
                  <Download className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                )}
                <span>Download Full Resume (PDF)</span>
              </a>
              {downloadError && (
                <p role="alert" className="mt-2 text-xs text-red-600 dark:text-red-400">
                  {downloadError}
                </p>
              )}
            </div>
          </Reveal>

          {/* Right Column: Structured Professional Details */}
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="rounded-xl bg-white dark:bg-[#111B2E] border border-[#E2E8F0] dark:border-[#1E293B] px-6 py-2">
              <dl className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                {aboutData.profileDetails.map((item) => (
                  <div key={item.label} className="py-4">
                    <dt className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-[#17243A] dark:text-[#F1F5F9] leading-snug">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
