import { sitePath } from '../utils/sitePath';
import { ArrowUp, Moon, Sun } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import type { ThemeMode } from '../hooks/useTheme';

interface FooterProps {
  navigate: (to: string) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
}

const FOOTER_NAV = [
  { label: 'Home', to: '/#home' },
  { label: 'About', to: '/#about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Services', to: '/#services' },
  { label: 'Experience', to: '/#experience' },
  { label: 'Contact', to: '/#contact' },
];

export function Footer({ navigate, theme, toggleTheme }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    event.preventDefault();
    navigate(to);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E2E8F0] dark:border-[#1E293B] bg-[#F7F9FC] dark:bg-[#0D1526]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-10 border-b border-[#E2E8F0] dark:border-[#1E293B]">
          {/* Left: Identity */}
          <div className="lg:col-span-4">
            <p className="font-display text-base font-bold text-[#14213D] dark:text-[#F1F5F9]">
              {personalInfo.fullName}
            </p>
            <p className="mt-1.5 text-sm text-[#64748B] dark:text-[#94A3B8]">
              {personalInfo.roleLine}
            </p>
          </div>

          {/* Middle: Main Navigation */}
          <nav
            aria-label="Footer navigation"
            className="lg:col-span-5 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-sm text-[#64748B] dark:text-[#94A3B8]"
          >
            {FOOTER_NAV.map((item) => (
              <a
                key={item.label}
                href={sitePath(item.to)}
                onClick={(e) => handleLinkClick(e, item.to)}
                className="hover:text-[#17243A] dark:hover:text-[#F1F5F9] transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Email, LinkedIn, Back to Top */}
          <div className="lg:col-span-3 flex flex-wrap lg:justify-end items-center gap-x-5 gap-y-2.5 text-sm">
            <a
              href={`mailto:${personalInfo.contact.email}`}
              className="text-[#17243A] dark:text-[#E2E8F0] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors whitespace-nowrap"
            >
              Email
            </a>

            {personalInfo.contact.linkedinUrl ? (
              <a
                href={personalInfo.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#17243A] dark:text-[#E2E8F0] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors whitespace-nowrap"
              >
                LinkedIn
              </a>
            ) : (
              <a
                href={sitePath('/#contact')}
                onClick={(e) => handleLinkClick(e, '/#contact')}
                title="LinkedIn profile URL pending verification in configuration"
                className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#17243A] dark:hover:text-[#F1F5F9] transition-colors whitespace-nowrap"
              >
                LinkedIn
              </a>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#17243A] dark:text-[#E2E8F0] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Copyright & Discreet Light/Dark Appearance Control */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#64748B] dark:text-[#94A3B8]">
          <p className="tabular-nums">
            &copy; {currentYear} {personalInfo.fullName}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} appearance`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111B2E] text-[#17243A] dark:text-[#E2E8F0] hover:border-[#2563EB] dark:hover:border-[#60A5FA] transition-colors whitespace-nowrap cursor-pointer"
          >
            {theme === 'light' ? (
              <>
                <Moon className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Appearance: Light</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Appearance: Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
}
