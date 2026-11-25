import { experienceList } from '../../data/portfolioData';
import { Reveal } from '../Reveal';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-20 sm:py-24 bg-white dark:bg-[#0B1220] border-b border-[#E2E8F0] dark:border-[#1E293B]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium text-[#2563EB] dark:text-[#60A5FA]">Experience</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D] dark:text-[#F8FAFC]">
            Experience &amp; Professional Journey
          </h2>
          <p className="mt-3 text-base text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            Applied industrial CAD design, CNC fabrication support, and hands-on 3D printing
            product development.
          </p>
        </Reveal>

        {/* Vertical Timeline */}
        <div className="mt-12 relative">
          {/* Continuous Vertical Hairline Axis */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-[11px] top-3 bottom-3 w-[1px] bg-[#E2E8F0] dark:bg-[#1E293B]"
          />

          <div className="space-y-8">
            {experienceList.map((entry, idx) => (
              <Reveal key={entry.id} delay={0.07 * idx}>
                <article className="relative md:pl-12">
                  {/* Minimal geometric node on timeline */}
                  <span
                    aria-hidden="true"
                    className="hidden md:block absolute left-[5px] top-7 w-[13px] h-[13px] rounded-[3px] border-2 border-[#2563EB] dark:border-[#60A5FA] bg-white dark:bg-[#0B1220]"
                  />

                  <div className="rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F7F9FC]/60 dark:bg-[#111B2E] p-6 sm:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-6 border-b border-[#E2E8F0] dark:border-[#1E293B]">
                      <div>
                        <p className="text-xs font-medium text-[#2563EB] dark:text-[#60A5FA]">
                          {entry.engagementType}
                        </p>
                        <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#14213D] dark:text-[#F8FAFC]">
                          {entry.role}
                        </h3>
                        <p className="mt-1 font-display text-base sm:text-lg font-semibold text-[#17243A] dark:text-[#CBD5E1]">
                          {entry.organization}
                        </p>
                      </div>

                      <div className="lg:text-right shrink-0">
                        <p className="font-mono text-sm tabular-nums text-[#17243A] dark:text-[#E2E8F0] font-medium">
                          {entry.period}
                        </p>
                      </div>
                    </div>

                    {entry.clarificationNote && (
                      <p className="mt-5 text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                        {entry.clarificationNote}
                      </p>
                    )}

                    <div className="mt-5">
                      <h4 className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] tracking-wide">
                        Key Responsibilities
                      </h4>
                      <ul className="mt-3 space-y-2.5">
                        {entry.responsibilities.map((resp) => (
                          <li
                            key={resp}
                            className="flex items-start gap-3 text-[15px] leading-relaxed text-[#17243A] dark:text-[#E2E8F0]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[9px] w-1.5 h-1.5 rounded-[1px] bg-[#2563EB] dark:bg-[#60A5FA] shrink-0"
                            />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
