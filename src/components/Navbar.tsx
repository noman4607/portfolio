import { sitePath } from '../utils/sitePath';
import { useEffect, useState } from 'react';
import { Download, Loader2, Menu, Moon, Sun, X } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import type { ThemeMode } from '../hooks/useTheme';
import { resolvePdfEndpointUrl } from '../utils/googleDrivePdf';
import { usePdfDownload } from '../utils/pdfDownload';

interface NavbarProps {
  currentPath: string;
  activeSection: string;
  navigate: (to: string) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', to: '/#home', key: 'home' },
  { label: 'About', to: '/#about', key: 'about' },
  { label: 'Projects', to: '/projects', key: 'projects' },
  { label: 'Services', to: '/#services', key: 'services' },
  { label: 'Experience', to: '/#experience', key: 'experience' },
  { label: 'Contact', to: '/#contact', key: 'contact' },
];

export function Navbar({
  currentPath,
  activeSection,
  navigate,
  theme,
  toggleTheme,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { downloadingKey, downloadError, clearDownloadError, handleDownload } = usePdfDownload();

  const resolvedResume = resolvePdfEndpointUrl(
    personalInfo.resumeDownloadUrl,
    personalInfo.resumeFileName,
    personalInfo.resumeGoogleDriveUrl
  );
  const resumeHref = resolvedResume.endpointUrl || personalInfo.resumeDownloadUrl;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  const isNavItemActive = (key: string) => {
    if (key === 'projects') {
      return currentPath.startsWith('/projects') || (currentPath === '/' && activeSection === 'projects');
    }
    if (currentPath !== '/') {
      return false;
    }
    return activeSection === key;
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    navigate(to);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-white/92 dark:bg-[#0B1220]/92 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#1E293B]'
          : 'bg-white/80 dark:bg-[#0B1220]/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href={sitePath('/')}
          onClick={(e) => handleNavClick(e, '/')}
          className="font-display text-[17px] font-bold tracking-tight text-[#14213D] dark:text-[#F1F5F9] whitespace-nowrap shrink-0 hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors"
        >
          <span className="hidden sm:inline">{personalInfo.brandWordmark}</span>
          <span className="sm:hidden">Khan A. A. Noman</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const active = isNavItemActive(item.key);
            return (
              <a
                key={item.key}
                href={sitePath(item.to)}
                onClick={(e) => handleNavClick(e, item.to)}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  active
                    ? 'text-[#2563EB] dark:text-[#60A5FA]'
                    : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#17243A] dark:hover:text-[#F1F5F9]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-[2px] h-[1.5px] bg-[#2563EB] dark:bg-[#60A5FA] transition-transform duration-150 origin-left ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action (Desktop) */}
        <div className="hidden lg:flex items-center shrink-0">
          <a
            href={resumeHref}
            download={personalInfo.resumeFileName}
            onClick={(e) => {
              e.preventDefault();
              void handleDownload('navbar-resume-desktop', {
                sourceUrl: personalInfo.resumeDownloadUrl,
                googleDriveUrl: personalInfo.resumeGoogleDriveUrl,
                fileName: personalInfo.resumeFileName,
              });
            }}
            aria-busy={downloadingKey === 'navbar-resume-desktop'}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[#14213D] text-white hover:bg-[#1E335C] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            {downloadingKey === 'navbar-resume-desktop' ? (
              <Loader2 className="w-4 h-4 shrink-0 animate-spin" strokeWidth={1.75} />
            ) : (
              <Download className="w-4 h-4 shrink-0" strokeWidth={1.75} />
            )}
            <span>Download Resume</span>
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] text-[#17243A] dark:text-[#F1F5F9] hover:bg-[#F7F9FC] dark:hover:bg-[#111B2E] transition-colors shrink-0"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" strokeWidth={1.75} />
          ) : (
            <Menu className="w-5 h-5" strokeWidth={1.75} />
          )}
        </button>
      </div>

      {/* Responsive Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden border-t border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0B1220]"
        >
          <div className="max-w-[1240px] mx-auto px-5 py-5 flex flex-col gap-1">
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                const active = isNavItemActive(item.key);
                return (
                  <a
                    key={item.key}
                    href={sitePath(item.to)}
                    onClick={(e) => handleNavClick(e, item.to)}
                    aria-current={active ? 'page' : undefined}
                    className={`py-3 px-3 rounded-lg text-base font-medium transition-colors ${
                      active
                        ? 'text-[#2563EB] dark:text-[#60A5FA] bg-[#F7F9FC] dark:bg-[#111B2E]'
                        : 'text-[#17243A] dark:text-[#E2E8F0] hover:bg-[#F7F9FC] dark:hover:bg-[#111B2E]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="pt-4 mt-3 border-t border-[#E2E8F0] dark:border-[#1E293B] flex flex-col sm:flex-row gap-3">
              <a
                href={resumeHref}
                download={personalInfo.resumeFileName}
                onClick={(e) => {
                  e.preventDefault();
                  void handleDownload('navbar-resume-mobile', {
                    sourceUrl: personalInfo.resumeDownloadUrl,
                    googleDriveUrl: personalInfo.resumeGoogleDriveUrl,
                    fileName: personalInfo.resumeFileName,
                  });
                }}
                aria-busy={downloadingKey === 'navbar-resume-mobile'}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium rounded-lg bg-[#14213D] text-white hover:bg-[#1E335C] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] transition-colors whitespace-nowrap"
              >
                {downloadingKey === 'navbar-resume-mobile' ? (
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.75} />
                ) : (
                  <Download className="w-4 h-4" strokeWidth={1.75} />
                )}
                <span>Download Resume</span>
              </a>

              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] text-[#17243A] dark:text-[#F1F5F9] hover:bg-[#F7F9FC] dark:hover:bg-[#111B2E] transition-colors whitespace-nowrap"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-4 h-4" strokeWidth={1.75} />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4" strokeWidth={1.75} />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {downloadError && (
        <div
          role="alert"
          className="border-t border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-200 text-xs sm:text-sm"
        >
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-2.5 flex items-center justify-between gap-4">
            <span>{downloadError}</span>
            <button
              type="button"
              onClick={clearDownloadError}
              className="font-medium underline shrink-0 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
