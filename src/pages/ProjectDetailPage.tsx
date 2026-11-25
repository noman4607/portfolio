import { sitePath } from '../utils/sitePath';
import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Camera,
  Download,
  FileCode2,
  FileSpreadsheet,
  FileText,
  Layers,
  Loader2,
  Mail,
  Maximize2,
} from 'lucide-react';
import { LightboxModal } from '../components/LightboxModal';
import type { LightboxImageItem } from '../components/LightboxModal';
import { ResilientImage } from '../components/ResilientImage';
import { Reveal } from '../components/Reveal';
import { projectsList } from '../data/portfolioData';
import type { EngineeringProject, ProjectGalleryItem, ServiceType } from '../data/portfolioData';
import { resolvePdfEndpointUrl, sanitizePdfFilename } from '../utils/googleDrivePdf';
import { usePdfDownload } from '../utils/pdfDownload';
import { useDocumentSeo } from '../utils/seo';

interface ProjectDetailPageProps {
  project: EngineeringProject;
  navigate: (to: string) => void;
  onInquireService: (service: ServiceType) => void;
}

function SlotIcon({ kind }: { kind: ProjectGalleryItem['kind'] }) {
  const cls = 'w-5 h-5 text-[#64748B] dark:text-[#94A3B8]';
  switch (kind) {
    case 'cad_render':
      return <Box className={cls} strokeWidth={1.5} />;
    case 'cnc_slot':
      return <FileCode2 className={cls} strokeWidth={1.5} />;
    case 'drawing_slot':
      return <FileSpreadsheet className={cls} strokeWidth={1.5} />;
    case 'exploded_slot':
      return <Layers className={cls} strokeWidth={1.5} />;
    case 'photo_slot':
    default:
      return <Camera className={cls} strokeWidth={1.5} />;
  }
}

export function ProjectDetailPage({
  project,
  navigate,
  onInquireService,
}: ProjectDetailPageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { downloadingKey, downloadError, handleDownload } = usePdfDownload();

  const reportFileName = sanitizePdfFilename(
    project.reportFileName || `${project.slug}_Report.pdf`
  );
  const resolvedReport = resolvePdfEndpointUrl(
    project.reportDownloadUrl,
    reportFileName,
    project.reportGoogleDriveUrl
  );
  const reportHref = resolvedReport.endpointUrl || project.reportDownloadUrl || '#';
  const hasReport = Boolean(project.reportDownloadUrl || project.reportGoogleDriveUrl);

  const currentIndex = projectsList.findIndex((p) => p.slug === project.slug);
  const previousProject =
    currentIndex > 0 ? projectsList[currentIndex - 1] : projectsList[projectsList.length - 1];
  const nextProject =
    currentIndex < projectsList.length - 1 ? projectsList[currentIndex + 1] : projectsList[0];

  const lightboxItems: LightboxImageItem[] = useMemo(() => {
    const items = project.gallery
      .filter((item): item is ProjectGalleryItem & { imageUrl: string } => Boolean(item.imageUrl))
      .map((item) => ({
        id: item.id,
        title: item.title,
        caption: item.caption,
        imageUrl: item.imageUrl,
        alt: item.alt,
      }));
    if (items.length === 0 && project.heroImage) {
      return [
        {
          id: `${project.id}-hero`,
          title: project.title,
          caption: project.heroImageNote || project.shortSummary,
          imageUrl: project.heroImage,
          alt: project.heroImageAlt || project.title,
        },
      ];
    }
    return items;
  }, [project]);

  useDocumentSeo({
    title: project.seoTitle,
    description: project.seoDescription,
    canonicalPath: `/projects/${project.slug}`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.seoDescription,
      creator: {
        '@type': 'Person',
        name: 'Khan Abdullah All Noman',
      },
      keywords: project.tools.join(', '),
      genre: project.primaryCategory,
      url: `${window.location.origin}${sitePath(`/projects/${project.slug}`)}`,
    },
  });

  const openLightboxForItem = (itemId: string) => {
    const idx = lightboxItems.findIndex((item) => item.id === itemId);
    setLightboxIndex(idx >= 0 ? idx : 0);
  };

  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-[#0B1220]">
      {/* Section 1: Case Study Header & Hero Visual */}
      <section className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F7F9FC] dark:bg-[#0E1729]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-[#64748B] dark:text-[#94A3B8]"
          >
            <a
              href={sitePath('/projects')}
              onClick={(e) => {
                e.preventDefault();
                navigate('/projects');
              }}
              className="inline-flex items-center gap-1.5 font-medium hover:text-[#17243A] dark:hover:text-[#F1F5F9] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
              <span>All Projects</span>
            </a>
            <span aria-hidden="true">/</span>
            <span className="font-mono text-xs tabular-nums text-[#2563EB] dark:text-[#60A5FA]">
              {project.number}
            </span>
            <span className="text-[#17243A] dark:text-[#E2E8F0] font-medium truncate">
              {project.title}
            </span>
          </nav>

          <div className="mt-7 max-w-4xl">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-medium text-[#64748B] dark:text-[#94A3B8]">
              <span className="text-[#2563EB] dark:text-[#60A5FA]">{project.primaryCategory}</span>
              {project.client && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#17243A] dark:text-[#E2E8F0]">
                    Client: {project.client}
                  </span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span>{project.filterCategories.join(' / ')}</span>
            </div>

            <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#14213D] dark:text-[#F8FAFC]">
              {project.number}. {project.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-[#CBD5E1] leading-relaxed max-w-3xl">
              {project.shortSummary}
            </p>

            {hasReport && (
              <div className="mt-6">
                <a
                  href={reportHref}
                  download={reportFileName}
                  onClick={(e) => {
                    e.preventDefault();
                    void handleDownload('detail-hero-report', {
                      sourceUrl: project.reportDownloadUrl,
                      googleDriveUrl: project.reportGoogleDriveUrl,
                      fileName: reportFileName,
                    });
                  }}
                  aria-busy={downloadingKey === 'detail-hero-report'}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-[#14213D] text-white hover:bg-[#1E335C] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] transition-colors whitespace-nowrap"
                >
                  {downloadingKey === 'detail-hero-report' ? (
                    <Loader2 className="w-4 h-4 shrink-0 animate-spin" strokeWidth={1.75} />
                  ) : (
                    <Download className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  )}
                  <span>Download Project Report (PDF)</span>
                </a>
                {downloadError && (
                  <p role="alert" className="mt-2.5 text-xs text-red-600 dark:text-red-400">
                    {downloadError}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Expandable Hero Project Visual (rendered only when project has visual media) */}
          {project.heroImage && (
            <figure className="mt-10">
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                aria-label={`Inspect ${project.title} image in fullscreen viewer`}
                className="group relative block w-full overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111B2E] text-left cursor-pointer"
              >
                <div className="aspect-[16/10] sm:aspect-[16/9] max-h-[580px] w-full overflow-hidden bg-[#F7F9FC] dark:bg-[#0D1526]">
                  <ResilientImage
                    src={project.heroImage}
                    alt={project.heroImageAlt || project.title}
                    fallbackTitle={project.title}
                    priority
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                  />
                </div>
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14213D]/90 text-white text-xs font-medium backdrop-blur-sm">
                  <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Expand View</span>
                </span>
              </button>
              {project.heroImageNote && (
                <figcaption className="mt-3 text-xs text-[#64748B] dark:text-[#94A3B8]">
                  {project.heroImageNote}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </section>

      {/* Main Engineering Case Study Content */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Primary Technical Narrative Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* 2. Project Overview */}
              <Reveal>
                <h2 className="font-display text-2xl font-bold text-[#14213D] dark:text-[#F8FAFC]">
                  Project Overview
                </h2>
                <p className="mt-3.5 text-[15.5px] leading-[1.78] text-[#475569] dark:text-[#CBD5E1]">
                  {project.overview}
                </p>
              </Reveal>

              {/* 3. Engineering Problem or Objective */}
              <Reveal className="pt-8 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                <h2 className="font-display text-2xl font-bold text-[#14213D] dark:text-[#F8FAFC]">
                  Engineering Problem &amp; Objective
                </h2>
                <p className="mt-3.5 text-[15.5px] leading-[1.78] text-[#475569] dark:text-[#CBD5E1]">
                  {project.problemObjective}
                </p>
              </Reveal>

              {/* 4. Design Approach */}
              <Reveal className="pt-8 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                <h2 className="font-display text-2xl font-bold text-[#14213D] dark:text-[#F8FAFC]">
                  Design Approach
                </h2>
                <p className="mt-3.5 text-[15.5px] leading-[1.78] text-[#475569] dark:text-[#CBD5E1]">
                  {project.designApproach}
                </p>
              </Reveal>

              {/* 6. Design Development & Engineering Process */}
              <Reveal className="pt-8 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                <h2 className="font-display text-2xl font-bold text-[#14213D] dark:text-[#F8FAFC]">
                  Design Development &amp; Engineering Process
                </h2>
                <ol className="mt-5 space-y-4">
                  {project.developmentProcess.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 text-[15.5px] leading-[1.7] text-[#17243A] dark:text-[#E2E8F0]"
                    >
                      <span className="font-mono text-xs tabular-nums font-medium text-[#2563EB] dark:text-[#60A5FA] pt-1.5 shrink-0">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>

              {/* 7. Visual Documentation Gallery */}
              {project.gallery.length > 0 && (
                <Reveal className="pt-8 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                  <h2 className="font-display text-2xl font-bold text-[#14213D] dark:text-[#F8FAFC]">
                    {project.gallery.every((item) => item.kind === 'photo_slot')
                      ? 'Project Photographs'
                      : 'CAD Models, Drawings & Documentation Gallery'}
                  </h2>
                  {project.cadAndDrawingsNotes && (
                    <p className="mt-3.5 text-[15.5px] leading-[1.75] text-[#475569] dark:text-[#CBD5E1]">
                      {project.cadAndDrawingsNotes}
                    </p>
                  )}

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {project.gallery.map((item, idx) => {
                      const isLeadFullSpan =
                        idx === 0 && project.gallery.length % 2 === 1 && Boolean(item.imageUrl);
                      return (
                      <figure
                        key={item.id}
                        className={`rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F7F9FC] dark:bg-[#111B2E] overflow-hidden flex flex-col ${
                          isLeadFullSpan ? 'sm:col-span-2' : ''
                        }`}
                      >
                        {item.imageUrl ? (
                          <button
                            type="button"
                            onClick={() => openLightboxForItem(item.id)}
                            className={`group relative w-full overflow-hidden bg-white dark:bg-[#0D1526] border-b border-[#E2E8F0] dark:border-[#1E293B] cursor-pointer ${
                              isLeadFullSpan ? 'aspect-[16/10]' : 'aspect-[4/3]'
                            }`}
                          >
                            <ResilientImage
                              src={item.imageUrl}
                              alt={item.alt}
                              fallbackTitle={item.title}
                              className="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                            <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#14213D]/85 text-white text-[11px] font-medium">
                              <Maximize2 className="w-3 h-3" strokeWidth={1.75} />
                              <span>Inspect</span>
                            </span>
                          </button>
                        ) : (
                          <div className="aspect-[4/3] w-full p-6 flex flex-col items-center justify-center text-center bg-[#F7F9FC] dark:bg-[#0D1526] cad-grid-bg border-b border-[#E2E8F0] dark:border-[#1E293B]">
                            <div className="w-10 h-10 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#111B2E] flex items-center justify-center">
                              <SlotIcon kind={item.kind} />
                            </div>
                            <p className="mt-3 text-xs font-semibold text-[#17243A] dark:text-[#E2E8F0]">
                              {item.kind === 'cad_render'
                                ? 'CAD Render Slot Reserved'
                                : item.kind === 'photo_slot'
                                  ? 'Photograph Slot Reserved'
                                  : 'Asset Slot Reserved'}
                            </p>
                            <p className="mt-1 text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8]">
                              {item.kind === 'cad_render'
                                ? 'SOLIDWORKS 3D CAD Render'
                                : item.kind === 'cnc_slot'
                                  ? 'SheetCAM / CNC G-Code Preview'
                                  : item.kind === 'drawing_slot'
                                    ? '2D Engineering Drawing / CAD'
                                    : item.kind === 'exploded_slot'
                                      ? 'Exploded CAD Assembly'
                                      : 'Real-Life Project Photograph'}
                            </p>
                          </div>
                        )}

                        <figcaption className="p-4 flex-1">
                          <p className="text-sm font-semibold text-[#14213D] dark:text-[#F1F5F9]">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-[#64748B] dark:text-[#94A3B8]">
                            {item.caption}
                          </p>
                        </figcaption>
                      </figure>
                      );
                    })}
                  </div>
                </Reveal>
              )}

              {/* 8. Manufacturing or Fabrication Process */}
              <Reveal className="pt-8 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                <h2 className="font-display text-2xl font-bold text-[#14213D] dark:text-[#F8FAFC]">
                  {project.hasManufacturingPhase
                    ? 'Manufacturing & Fabrication Process'
                    : 'Manufacturability & Design Considerations'}
                </h2>
                <p className="mt-3.5 text-[15.5px] leading-[1.78] text-[#475569] dark:text-[#CBD5E1]">
                  {project.manufacturingProcess}
                </p>
              </Reveal>

              {/* 9. Final Outcome & Photographs */}
              <Reveal className="pt-8 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                <h2 className="font-display text-2xl font-bold text-[#14213D] dark:text-[#F8FAFC]">
                  Final Outcome &amp; Documentation Status
                </h2>
                <p className="mt-3.5 text-[15.5px] leading-[1.78] text-[#475569] dark:text-[#CBD5E1]">
                  {project.finalOutcome}
                </p>
              </Reveal>

              {/* 10. Key Engineering Insights */}
              <Reveal className="pt-8 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                <h2 className="font-display text-2xl font-bold text-[#14213D] dark:text-[#F8FAFC]">
                  Key Engineering Insights
                </h2>
                <ul className="mt-4 space-y-3">
                  {project.engineeringInsights.map((insight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-[15.5px] leading-[1.7] text-[#17243A] dark:text-[#E2E8F0]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[10px] w-1.5 h-1.5 rounded-[1px] bg-[#2563EB] dark:bg-[#60A5FA] shrink-0"
                      />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Right Technical Specification Sidebar (Section 5: Software, Tools & Metadata) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F7F9FC] dark:bg-[#111B2E] p-6">
                <h2 className="font-display text-base font-bold text-[#14213D] dark:text-[#F8FAFC] pb-4 border-b border-[#E2E8F0] dark:border-[#1E293B]">
                  Project Specifications
                </h2>

                <dl className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                  <div className="py-3.5">
                    <dt className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                      Project Index
                    </dt>
                    <dd className="mt-1 font-mono text-sm tabular-nums font-medium text-[#17243A] dark:text-[#F1F5F9]">
                      Project {project.number} of 07
                    </dd>
                  </div>

                  {project.client && (
                    <div className="py-3.5">
                      <dt className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                        Client
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-[#17243A] dark:text-[#F1F5F9]">
                        {project.client}
                      </dd>
                    </div>
                  )}

                  <div className="py-3.5">
                    <dt className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                      Engineering Domain
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-[#17243A] dark:text-[#F1F5F9]">
                      {project.primaryCategory}
                    </dd>
                  </div>

                  <div className="py-3.5">
                    <dt className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                      Scope Classifications
                    </dt>
                    <dd className="mt-1 text-sm text-[#17243A] dark:text-[#CBD5E1]">
                      {project.filterCategories.join(' · ')}
                    </dd>
                  </div>

                  <div className="py-3.5">
                    <dt className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                      Software, Tools &amp; Technologies
                    </dt>
                    <dd className="mt-2">
                      <ul className="space-y-1.5">
                        {project.tools.map((tool) => (
                          <li
                            key={tool}
                            className="text-sm font-medium text-[#17243A] dark:text-[#E2E8F0]"
                          >
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Project Report Download Card (when available) */}
              {hasReport && (
                <div className="rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111B2E] p-6">
                  <div className="flex items-center gap-2.5">
                    <FileText
                      className="w-5 h-5 text-[#2563EB] dark:text-[#60A5FA] shrink-0"
                      strokeWidth={1.75}
                    />
                    <h3 className="font-display text-base font-bold text-[#14213D] dark:text-[#F8FAFC]">
                      Project Report
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                    Download the PDF project summary covering design objectives, methodology, and
                    fabrication overview.
                  </p>
                  <a
                    href={reportHref}
                    download={reportFileName}
                    onClick={(e) => {
                      e.preventDefault();
                      void handleDownload('detail-sidebar-report', {
                        sourceUrl: project.reportDownloadUrl,
                        googleDriveUrl: project.reportGoogleDriveUrl,
                        fileName: reportFileName,
                      });
                    }}
                    aria-busy={downloadingKey === 'detail-sidebar-report'}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-[#14213D] text-white hover:bg-[#1E335C] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] transition-colors"
                  >
                    {downloadingKey === 'detail-sidebar-report' ? (
                      <Loader2 className="w-4 h-4 shrink-0 animate-spin" strokeWidth={1.75} />
                    ) : (
                      <Download className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                    )}
                    <span>Download Report (PDF)</span>
                  </a>
                  {downloadError && (
                    <p role="alert" className="mt-2.5 text-xs text-red-600 dark:text-red-400">
                      {downloadError}
                    </p>
                  )}
                </div>
              )}

              {/* Project Inquiry CTA */}
              <div className="rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111B2E] p-6">
                <h3 className="font-display text-base font-bold text-[#14213D] dark:text-[#F8FAFC]">
                  Need a Similar Solution?
                </h3>
                <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  Discuss mechanical design, CAD modeling, or prototyping requirements related to
                  this discipline.
                </p>
                <button
                  type="button"
                  onClick={() => onInquireService(project.serviceTag)}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  <span>Inquire About {project.serviceTag}</span>
                </button>
              </div>
            </aside>
          </div>

          {/* Previous & Next Project Navigation */}
          <nav
            aria-label="Project navigation"
            className="mt-16 pt-10 border-t border-[#E2E8F0] dark:border-[#1E293B] grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <button
              type="button"
              onClick={() => navigate(`/projects/${previousProject.slug}`)}
              className="group text-left p-5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#2563EB] dark:hover:border-[#60A5FA] bg-[#F7F9FC]/50 dark:bg-[#111B2E] transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Previous Project</span>
              </span>
              <p className="mt-1.5 font-display text-base font-bold text-[#14213D] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                {previousProject.number}. {previousProject.title}
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigate(`/projects/${nextProject.slug}`)}
              className="group text-left sm:text-right p-5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#2563EB] dark:hover:border-[#60A5FA] bg-[#F7F9FC]/50 dark:bg-[#111B2E] transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center sm:justify-end gap-1.5 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                <span>Next Project</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
              </span>
              <p className="mt-1.5 font-display text-base font-bold text-[#14213D] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                {nextProject.number}. {nextProject.title}
              </p>
            </button>
          </nav>
        </div>
      </section>

      <LightboxModal
        items={lightboxItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />
    </main>
  );
}
