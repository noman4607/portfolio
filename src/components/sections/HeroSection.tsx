import { ArrowRight, Mail, UserRound } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { personalInfo } from '../../data/portfolioData';
import { ResilientImage } from '../ResilientImage';

interface HeroSectionProps {
  navigate: (to: string) => void;
}

export function HeroSection({ navigate }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white dark:bg-[#0B1220] border-b border-[#E2E8F0] dark:border-[#1E293B]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          {/* Left Column: Editorial Typography & CTAs */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm sm:text-[15px] font-medium text-[#2563EB] dark:text-[#60A5FA] tracking-tight">
              {personalInfo.heroGreeting}
            </p>

            <h1 className="mt-4 font-display font-bold text-[#14213D] dark:text-[#F8FAFC] text-[2.35rem] sm:text-[3.1rem] lg:text-[3.55rem] leading-[1.08] tracking-[-0.025em] max-w-[20ch]">
              {personalInfo.heroHeadline}
            </h1>

            <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.7] text-[#64748B] dark:text-[#94A3B8] max-w-[58ch]">
              {personalInfo.heroDescription}
            </p>

            {/* Primary CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/#featured-projects')}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm sm:text-[15px] font-medium rounded-lg bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              </button>

              <button
                type="button"
                onClick={() => navigate('/#contact')}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm sm:text-[15px] font-medium rounded-lg border border-[#CBD5E1] dark:border-[#334155] text-[#17243A] dark:text-[#F1F5F9] hover:border-[#14213D] dark:hover:border-[#60A5FA] hover:bg-[#F7F9FC] dark:hover:bg-[#111B2E] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Mail className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Compact Expertise Indicators */}
            <div className="mt-10 pt-6 border-t border-[#E2E8F0] dark:border-[#1E293B]">
              <ul
                aria-label="Core engineering disciplines"
                className="flex flex-wrap items-center gap-y-2 text-sm font-medium text-[#17243A] dark:text-[#CBD5E1]"
              >
                {personalInfo.heroIndicators.map((indicator, index) => (
                  <li key={indicator} className="inline-flex items-center">
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className="mx-3.5 h-3.5 w-[1px] bg-[#CBD5E1] dark:bg-[#334155]"
                      />
                    )}
                    <span className="whitespace-nowrap">{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Clean Portrait Frame with Secondary Engineering Grid Framing */}
          <motion.div
            className="lg:col-span-5 flex items-center"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F7F9FC] dark:bg-[#111B2E] cad-grid-bg">
              {/* Restrained CAD Registration Corner Hairlines (secondary framing) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#94A3B8]/60 dark:border-[#475569]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#94A3B8]/60 dark:border-[#475569]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#94A3B8]/60 dark:border-[#475569]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#94A3B8]/60 dark:border-[#475569]"
              />

              {/* Subtle top technical metadata line */}
              <div
                aria-hidden="true"
                className="flex items-center justify-end text-[11px] font-mono tabular-nums text-[#64748B]/80 dark:text-[#94A3B8]/70 mb-3 px-1"
              >
                <span>KUET · ME</span>
              </div>

              {/* Inner Portrait Container (nested radius math: outer 16px - padding -> rounded-xl) */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0D1526]">
                {personalInfo.portraitImageUrl ? (
                  <ResilientImage
                    src={personalInfo.portraitImageUrl}
                    alt={personalInfo.portraitAlt}
                    fallbackTitle={personalInfo.fullName}
                    priority
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label="Profile photograph placeholder for Khan Abdullah All Noman"
                    className="w-full h-full flex flex-col items-center justify-between p-6 sm:p-8 text-center"
                  >
                    {/* Subtle cross-axis engineering reference */}
                    <div className="w-full flex items-center justify-between text-[11px] font-mono tabular-nums text-[#94A3B8] dark:text-[#64748B]">
                      <span>PORTRAIT FRAME</span>
                      <span>4 : 5</span>
                    </div>

                    <div className="flex flex-col items-center max-w-[260px]">
                      <div className="w-24 h-24 rounded-full border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F9FC] dark:bg-[#111B2E] flex items-center justify-center">
                        <UserRound
                          className="w-10 h-10 text-[#64748B] dark:text-[#94A3B8]"
                          strokeWidth={1.25}
                        />
                      </div>

                      <p className="mt-5 font-display text-base font-semibold text-[#14213D] dark:text-[#F1F5F9]">
                        {personalInfo.fullName}
                      </p>
                      <p className="mt-1 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                        Profile Photograph Placeholder
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-[#64748B]/90 dark:text-[#94A3B8]/80">
                        Reserved for supplied official portrait photograph. Update{' '}
                        <span className="font-mono text-[11px] text-[#17243A] dark:text-[#CBD5E1]">
                          portraitImageUrl
                        </span>{' '}
                        in portfolio data when available.
                      </p>
                    </div>

                    <div className="w-full pt-4 border-t border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between text-[11px] font-mono tabular-nums text-[#94A3B8] dark:text-[#64748B]">
                      <span>X 00.0</span>
                      <span>Y 00.0</span>
                      <span>Z 00.0</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
