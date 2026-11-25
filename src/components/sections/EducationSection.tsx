import { Award, FileCheck2, GraduationCap } from 'lucide-react';
import { certificationsList, educationData } from '../../data/portfolioData';
import { ResilientImage } from '../ResilientImage';
import { Reveal } from '../Reveal';

export function EducationSection() {
  return (
    <section
      id="education"
      className="py-20 sm:py-24 bg-[#F7F9FC] dark:bg-[#0E1729] border-b border-[#E2E8F0] dark:border-[#1E293B]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium text-[#2563EB] dark:text-[#60A5FA]">
            Academic Foundation
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D] dark:text-[#F8FAFC]">
            Education &amp; Professional Credentials
          </h2>
        </Reveal>

        {/* University Degree Block */}
        <Reveal className="mt-12" delay={0.05}>
          <div className="rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111B2E] p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F7F9FC] dark:bg-[#0D1526] flex items-center justify-center shrink-0">
                  <GraduationCap
                    className="w-5 h-5 text-[#2563EB] dark:text-[#60A5FA]"
                    strokeWidth={1.6}
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                    {educationData.department}
                  </p>
                  <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-[#14213D] dark:text-[#F8FAFC]">
                    {educationData.degree}
                  </h3>
                  <p className="mt-1 text-base font-medium text-[#17243A] dark:text-[#CBD5E1]">
                    {educationData.institution}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap lg:flex-col lg:items-end gap-x-6 gap-y-1 shrink-0 pt-1">
                <p className="font-mono text-sm tabular-nums font-medium text-[#17243A] dark:text-[#E2E8F0]">
                  {educationData.period}
                </p>
                <p className="font-mono text-sm tabular-nums text-[#2563EB] dark:text-[#60A5FA] font-medium">
                  CGPA: {educationData.cgpa}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#E2E8F0] dark:border-[#1E293B]">
              <p className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                Undergraduate Thesis
              </p>
              <p className="mt-1.5 text-[15.5px] font-medium text-[#17243A] dark:text-[#F1F5F9] leading-relaxed">
                &ldquo;{educationData.thesisTitle}&rdquo;
              </p>
            </div>
          </div>
        </Reveal>

        {/* Certifications Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificationsList.map((cert, idx) => (
            <Reveal key={cert.id} delay={0.08 * (idx + 1)}>
              <article
                className={`h-full rounded-xl border bg-white dark:bg-[#111B2E] p-6 sm:p-7 flex flex-col justify-between ${
                  cert.highlight
                    ? 'border-[#2563EB]/40 dark:border-[#3B82F6]/40'
                    : 'border-[#E2E8F0] dark:border-[#1E293B]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2.5 text-xs font-medium text-[#2563EB] dark:text-[#60A5FA]">
                      <Award className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                      <span>
                        {cert.highlight ? 'Professional Certification' : 'Technical Workshop'}
                      </span>
                    </div>
                    {cert.year && (
                      <span className="font-mono text-xs tabular-nums text-[#64748B] dark:text-[#94A3B8]">
                        {cert.year}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-display text-lg sm:text-xl font-bold text-[#14213D] dark:text-[#F8FAFC]">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#64748B] dark:text-[#94A3B8]">
                    {cert.issuer}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                    {cert.credentialSummary}
                  </p>
                </div>

                {/* Official Certificate Image Frame */}
                <div className="mt-6 pt-5 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                  {cert.certificateImageUrl ? (
                    <div className="aspect-[16/11] rounded-lg overflow-hidden border border-[#E2E8F0] dark:border-[#1E293B] bg-white">
                      <ResilientImage
                        src={cert.certificateImageUrl}
                        alt={`${cert.title} official certificate`}
                        fallbackTitle={cert.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-[#CBD5E1] dark:border-[#334155] bg-[#F7F9FC] dark:bg-[#0D1526] px-4 py-5 flex items-center gap-3">
                      <FileCheck2
                        className="w-5 h-5 text-[#64748B] dark:text-[#94A3B8] shrink-0"
                        strokeWidth={1.5}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#17243A] dark:text-[#E2E8F0]">
                          {cert.certificatePlaceholderLabel}
                        </p>
                        <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                          Attach verified certificate scan in portfolio data when ready.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
