/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { getProjectBySlug } from './data/portfolioData';
import type { ServiceType } from './data/portfolioData';
import { useRouter } from './hooks/useRouter';
import { useTheme } from './hooks/useTheme';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ResearchPage } from './pages/ResearchPage';

const HOME_OBSERVED_SECTIONS = ['home', 'about', 'featured-projects', 'services', 'experience', 'contact'];

export default function App() {
  const { route, navigate } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [selectedService, setSelectedService] = useState<ServiceType | undefined>(undefined);
  const [activeSection, setActiveSection] = useState<string>('home');

  const handleInquireService = useCallback(
    (service: ServiceType) => {
      setSelectedService(service);
      navigate('/#contact');
    },
    [navigate]
  );

  // Track active section smoothly while scrolling on the homepage
  useEffect(() => {
    if (route.pathname !== '/') {
      return;
    }

    const elements = HOME_OBSERVED_SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id;
          setActiveSection(id === 'featured-projects' ? 'projects' : id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [route.pathname]);

  // Resolve current view
  const renderPage = () => {
    const cleanPath = route.pathname.replace(/\/+$/, '') || '/';

    if (cleanPath === '/') {
      return (
        <HomePage
          navigate={navigate}
          selectedService={selectedService}
          onInquireService={handleInquireService}
        />
      );
    }

    if (cleanPath === '/projects') {
      return <ProjectsPage navigate={navigate} />;
    }

    if (cleanPath === '/research') {
      return <ResearchPage navigate={navigate} />;
    }

    if (cleanPath.startsWith('/projects/')) {
      const slug = cleanPath.slice('/projects/'.length);
      const project = getProjectBySlug(slug);
      if (project) {
        return (
          <ProjectDetailPage
            project={project}
            navigate={navigate}
            onInquireService={handleInquireService}
          />
        );
      }
    }

    // Graceful 404 fallback
    return (
      <main
        id="main-content"
        className="min-h-[70vh] flex items-center justify-center px-5 py-24 bg-white dark:bg-[#0B1220]"
      >
        <div className="max-w-md text-center">
          <p className="font-mono text-xs tabular-nums text-[#2563EB] dark:text-[#60A5FA]">404</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-[#14213D] dark:text-[#F8FAFC]">
            Page Not Found
          </h1>
          <p className="mt-3 text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            The requested engineering case study or page could not be located.
          </p>
          <div className="mt-7 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-5 py-2.5 text-sm font-medium rounded-lg bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer"
            >
              Return Home
            </button>
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="px-5 py-2.5 text-sm font-medium rounded-lg border border-[#CBD5E1] dark:border-[#334155] text-[#17243A] dark:text-[#F1F5F9] hover:border-[#2563EB] transition-colors cursor-pointer"
            >
              View All Projects
            </button>
          </div>
        </div>
      </main>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0B1220] text-[#17243A] dark:text-[#F1F5F9] transition-colors duration-200">
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#14213D] focus:text-white focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <Navbar
        currentPath={route.pathname}
        activeSection={activeSection}
        navigate={navigate}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <div className="flex-1">{renderPage()}</div>

      <Footer navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}
