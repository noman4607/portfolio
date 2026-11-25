import { sitePath } from '../utils/sitePath';
import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Download, Loader2 } from 'lucide-react';
import { ResilientImage } from '../components/ResilientImage';
import { Reveal } from '../components/Reveal';
import {
  projectFilterCategories,
  projectsList,
} from '../data/portfolioData';
import type { ProjectFilterCategory } from '../data/portfolioData';
import { resolvePdfEndpointUrl, sanitizePdfFilename } from '../utils/googleDrivePdf';
import { usePdfDownload } from '../utils/pdfDownload';
import { useDocumentSeo } from '../utils/seo';

interface ProjectsPageProps {
  navigate: (to: string) => void;
}

export function ProjectsPage({ navigate }: ProjectsPageProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterCategory>('All Projects');
  const { downloadingKey, downloadError, clearDownloadError, handleDownload } = usePdfDownload();

  useDocumentSeo({
    title: 'Engineering Projects | Khan Abdullah All Noman',
    description:
      'Complete archive of mechanical design, SOLIDWORKS CAD modeling, CNC plasma manufacturing, 3D printing, automation, and research projects by Khan Abdullah All Noman.',
    canonicalPath: '/projects',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Engineering Projects — Khan Abdullah All Noman',
      description:
        'Seven mechanical engineering projects spanning automated poultry equipment, 3D printing hardware, renewable energy prototypes, and heavy lifting machinery.',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: projectsList.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: project.title,
          url: `${window.location.origin}${sitePath(`/projects/${project.slug}`)}`,
        })),
      },
    },
  });

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All Projects') {
      return projectsList;
    }
    return projectsList.filter((project) =>
      project.filterCategories.includes(activeFilter)
    );
  }, [activeFilter]);

  const getCountForCategory = (category: ProjectFilterCategory) => {
    if (category === 'All Projects') return projectsList.length;
    return projectsList.filter((project) => project.filterCategories.includes(category)).length;
  };

  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-[#0B1220]">
      {/* Page Header */}
      <section className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F7F9FC] dark:bg-[#0E1729]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <a
            href={sitePath('/')}
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748B] dark:text-[#94A3B8] hover:text-[#17243A] dark:hover:text-[#F1F5F9] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            <span>Back to Home</span>
          </a>

          <div className="mt-6 max-w-3xl">
            <p className="text-sm font-medium text-[#2563EB] dark:text-[#60A5FA]">
              Engineering Portfolio Archive
            </p>
            <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#14213D] dark:text-[#F8FAFC]">
              Engineering Projects
            </h1>
            <p className="mt-4 text-base sm:text-[17px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
              Seven documented projects spanning SOLIDWORKS mechanical design, CNC plasma cutting
              preparation, product prototyping, fluid mechanics test rigs, and residential
              automation.
            </p>
          </div>

          {/* Functional Category Filter Controls */}
          <div className="mt-9">
            <div
              role="tablist"
              aria-label="Filter projects by engineering discipline"
              className="flex flex-wrap items-center gap-2"
            >
              {projectFilterCategories.map((category) => {
                const selected = activeFilter === category;
                const count = getCountForCategory(category);
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveFilter(category)}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      selected
                        ? 'bg-[#14213D] text-white border-[#14213D] dark:bg-[#2563EB] dark:border-[#2563EB]'
                        : 'bg-white dark:bg-[#111B2E] text-[#475569] dark:text-[#CBD5E1] border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#94A3B8] dark:hover:border-[#334155] hover:text-[#17243A] dark:hover:text-white'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        selected
                          ? 'text-white/80'
                          : 'text-[#64748B] dark:text-[#94A3B8]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Filtered Projects Grid */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="mb-8 flex items-center justify-between text-sm text-[#64748B] dark:text-[#94A3B8]">
            <p className="tabular-nums">
              Showing <span className="font-semibold text-[#17243A] dark:text-[#F1F5F9]">{filteredProjects.length}</span>{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'}
              {activeFilter !== 'All Projects' ? ` in ${activeFilter}` : ''}
            </p>
            {activeFilter !== 'All Projects' && (
              <button
                type="button"
                onClick={() => setActiveFilter('All Projects')}
                className="text-sm font-medium text-[#2563EB] dark:text-[#60A5FA] hover:underline cursor-pointer"
              >
                Reset filter
              </button>
            )}
          </div>

          {downloadError && (
            <div
              role="alert"
              className="mb-6 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/50 px-4 py-3 text-sm text-red-800 dark:text-red-200 flex items-center justify-between gap-4"
            >
              <span>{downloadError}</span>
              <button
                type="button"
                onClick={clearDownloadError}
                className="text-xs font-medium underline shrink-0 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <Reveal key={project.id} delay={Math.min(index * 0.04, 0.2)}>
                <article
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  className="group h-full flex flex-col rounded-xl overflow-hidden border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111B2E] hover:border-[#94A3B8] dark:hover:border-[#334155] transition-colors duration-200 cursor-pointer"
                >
                  {project.heroImage && (
                    <div className="aspect-[4/3] overflow-hidden bg-[#F7F9FC] dark:bg-[#0D1526] border-b border-[#E2E8F0] dark:border-[#1E293B]">
                      <ResilientImage
                        src={project.heroImage}
                        alt={project.heroImageAlt || project.title}
                        fallbackTitle={project.title}
                        priority={index < 2}
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  )}

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                        <span className="font-mono tabular-nums text-[#2563EB] dark:text-[#60A5FA]">
                          {project.number}.
                        </span>
                        <span>{project.primaryCategory}</span>
                        {project.client && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#17243A] dark:text-[#CBD5E1]">
                              {project.client}
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="mt-2.5 font-display text-xl sm:text-[22px] font-bold tracking-tight text-[#14213D] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                        {project.number}. {project.title}
                      </h2>

                      <p className="mt-3 text-[15px] leading-[1.68] text-[#475569] dark:text-[#CBD5E1]">
                        {project.shortSummary}
                      </p>

                      {!project.heroImage && (
                        <p className="mt-3.5 text-[14px] leading-[1.68] text-[#64748B] dark:text-[#94A3B8]">
                          {project.overview}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-5 border-t border-[#E2E8F0] dark:border-[#1E293B] space-y-3">
                      <p className="text-xs sm:text-[13px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                        {project.tools.join(' · ')}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                          <a
                            href={sitePath(`/projects/${project.slug}`)}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              navigate(`/projects/${project.slug}`);
                            }}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] dark:text-[#60A5FA] whitespace-nowrap"
                          >
                            <span>View Case Study</span>
                            <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                          </a>

                          {(project.reportDownloadUrl || project.reportGoogleDriveUrl) && (() => {
                            const fileName = sanitizePdfFilename(
                              project.reportFileName || `${project.slug}_Report.pdf`
                            );
                            const resolved = resolvePdfEndpointUrl(
                              project.reportDownloadUrl,
                              fileName,
                              project.reportGoogleDriveUrl
                            );
                            const href = resolved.endpointUrl || project.reportDownloadUrl || '#';
                            const isBusy = downloadingKey === project.id;
                            return (
                              <a
                                href={href}
                                download={fileName}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  void handleDownload(project.id, {
                                    sourceUrl: project.reportDownloadUrl,
                                    googleDriveUrl: project.reportGoogleDriveUrl,
                                    fileName,
                                  });
                                }}
                                aria-busy={isBusy}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#14213D] dark:text-[#E2E8F0] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors whitespace-nowrap"
                              >
                                {isBusy ? (
                                  <Loader2 className="w-4 h-4 shrink-0 animate-spin" strokeWidth={1.75} />
                                ) : (
                                  <Download className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                                )}
                                <span>Download Report</span>
                              </a>
                            );
                          })()}
                        </div>

                        <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                          {project.filterCategories.join(' / ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
