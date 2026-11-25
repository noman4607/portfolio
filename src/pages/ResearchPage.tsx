import { sitePath } from '../utils/sitePath';
import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, BookOpen, FileText, Layers, Maximize2 } from 'lucide-react';
import { LightboxModal } from '../components/LightboxModal';
import type { LightboxImageItem } from '../components/LightboxModal';
import { ResilientImage } from '../components/ResilientImage';
import { Reveal } from '../components/Reveal';
import { WaveTankSchematic } from '../components/sections/ResearchSection';
import { educationData, projectsList, researchThesis } from '../data/portfolioData';
import { useDocumentSeo } from '../utils/seo';

interface ResearchPageProps {
  navigate: (to: string) => void;
}

export function ResearchPage({ navigate }: ResearchPageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const relatedProjects = projectsList.filter((p) =>
    p.filterCategories.includes('Research')
  );

  const lightboxItems: LightboxImageItem[] = useMemo(() => {
    const items: LightboxImageItem[] = [];
    if (researchThesis.geometryImageUrl) {
      items.push({
        id: 'wave-tank-schematic',
        title: 'Wave Tank & Plunger Geometry Diagram',
        caption: researchThesis.geometryImageCaption,
        imageUrl: researchThesis.geometryImageUrl,
        alt: researchThesis.geometryImageAlt,
      });
    }
    for (const slot of researchThesis.documentSlots) {
      if (slot.imageUrl && slot.id !== 'wave-tank-schematic') {
        items.push({
          id: slot.id,
          title: slot.title,
          caption: slot.description,
          imageUrl: slot.imageUrl,
          alt: slot.alt || slot.title,
        });
      }
    }
    return items;
  }, []);

  const openLightbox = (id: string) => {
    const idx = lightboxItems.findIndex((item) => item.id === id);
    if (idx >= 0) {
      setLightboxIndex(idx);
    }
  };

  useDocumentSeo({
    title: `${researchThesis.title} | Research — Khan Abdullah All Noman`,
    description:
      'Undergraduate mechanical engineering thesis at KUET by Khan Abdullah All Noman: Numerical Investigation of a Wave Tank Using Reciprocating Wedge Shaped Plunger.',
    canonicalPath: '/research',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: researchThesis.title,
      author: {
        '@type': 'Person',
        name: 'Khan Abdullah All Noman',
      },
      publisher: {
        '@type': 'CollegeOrUniversity',
        name: researchThesis.institution,
      },
      url: `${window.location.origin}${sitePath(`/research`)}`,
    },
  });

  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-[#0B1220]">
      <section className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F7F9FC] dark:bg-[#0E1729]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <a
            href={sitePath('/#research')}
            onClick={(e) => {
              e.preventDefault();
              navigate('/#research');
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748B] dark:text-[#94A3B8] hover:text-[#17243A] dark:hover:text-[#F1F5F9] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            <span>Back to Home</span>
          </a>

          <div className="mt-6 max-w-4xl">
            <div className="flex items-center gap-2 text-sm font-medium text-[#2563EB] dark:text-[#60A5FA]">
              <BookOpen className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              <span>Undergraduate Engineering Thesis</span>
            </div>

            <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#14213D] dark:text-[#F8FAFC] leading-tight">
              {researchThesis.title}
            </h1>

            <p className="mt-4 text-base text-[#64748B] dark:text-[#94A3B8]">
              {researchThesis.institution} · {researchThesis.department} · {educationData.period}
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 space-y-14">
          {/* Abstract & Official Domain Geometry */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <Reveal className="lg:col-span-6 space-y-5">
              <h2 className="font-display text-2xl font-bold text-[#14213D] dark:text-[#F8FAFC]">
                Abstract &amp; Research Overview
              </h2>
              <p className="text-[15.5px] leading-[1.78] text-[#475569] dark:text-[#CBD5E1]">
                {researchThesis.abstractPlaceholder}
              </p>

              <div className="rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F7F9FC] dark:bg-[#111B2E] p-5">
                <p className="text-xs font-semibold text-[#14213D] dark:text-[#F1F5F9]">
                  Academic Integrity Notice
                </p>
                <p className="mt-1.5 text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  Methodology specifics, mesh parameters, numerical simulation findings, and thesis
                  conclusions are intentionally omitted until verified primary thesis files are
                  supplied for publication.
                </p>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-6" delay={0.05}>
              <div className="rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F7F9FC] dark:bg-[#111B2E] p-5">
                {researchThesis.geometryImageUrl ? (
                  <button
                    type="button"
                    onClick={() => openLightbox('wave-tank-schematic')}
                    aria-label="Inspect Wave Tank & Plunger Geometry Diagram in fullscreen"
                    className="group relative block w-full overflow-hidden rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] bg-white cursor-pointer"
                  >
                    <WaveTankSchematic />
                    <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#14213D]/85 text-white text-[11px] font-medium">
                      <Maximize2 className="w-3 h-3" strokeWidth={1.75} />
                      <span>Inspect</span>
                    </span>
                  </button>
                ) : (
                  <WaveTankSchematic />
                )}
                <p className="mt-3 text-xs text-[#64748B] dark:text-[#94A3B8]">
                  {researchThesis.geometryImageCaption}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Research Assets & Documentation Slots */}
          <Reveal className="pt-10 border-t border-[#E2E8F0] dark:border-[#1E293B]">
            <h2 className="font-display text-2xl font-bold text-[#14213D] dark:text-[#F8FAFC]">
              Simulation Results, Diagrams &amp; Supporting Documentation
            </h2>
            <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8]">
              Structured containers prepared for official ANSYS Fluent visuals, numerical plots,
              and downloadable thesis documentation.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {researchThesis.documentSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`rounded-xl border bg-[#F7F9FC] dark:bg-[#111B2E] overflow-hidden flex flex-col justify-between ${
                    slot.imageUrl
                      ? 'border-[#E2E8F0] dark:border-[#1E293B]'
                      : 'border-dashed border-[#CBD5E1] dark:border-[#334155] p-6'
                  }`}
                >
                  {slot.imageUrl ? (
                    <>
                      <button
                        type="button"
                        onClick={() => openLightbox(slot.id)}
                        className="group relative aspect-[16/10] w-full overflow-hidden bg-white border-b border-[#E2E8F0] dark:border-[#1E293B] cursor-pointer"
                      >
                        <ResilientImage
                          src={slot.imageUrl}
                          alt={slot.alt || slot.title}
                          fallbackTitle={slot.title}
                          className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                        <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#14213D]/85 text-white text-[11px] font-medium">
                          <Maximize2 className="w-3 h-3" strokeWidth={1.75} />
                          <span>Inspect</span>
                        </span>
                      </button>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-display text-base font-bold text-[#14213D] dark:text-[#F8FAFC]">
                            {slot.title}
                          </h3>
                          <p className="mt-2 text-sm text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                            {slot.description}
                          </p>
                        </div>
                        <p className="mt-5 pt-4 border-t border-[#E2E8F0] dark:border-[#1E293B] text-xs font-mono text-[#2563EB] dark:text-[#60A5FA]">
                          {slot.status}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="w-10 h-10 rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0D1526] flex items-center justify-center">
                          {slot.id === 'supporting-documentation' ? (
                            <FileText
                              className="w-5 h-5 text-[#2563EB] dark:text-[#60A5FA]"
                              strokeWidth={1.5}
                            />
                          ) : (
                            <Layers
                              className="w-5 h-5 text-[#2563EB] dark:text-[#60A5FA]"
                              strokeWidth={1.5}
                            />
                          )}
                        </div>
                        <h3 className="mt-4 font-display text-base font-bold text-[#14213D] dark:text-[#F8FAFC]">
                          {slot.title}
                        </h3>
                        <p className="mt-2 text-sm text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                          {slot.description}
                        </p>
                      </div>
                      <p className="mt-5 pt-4 border-t border-[#E2E8F0] dark:border-[#1E293B] text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                        {slot.status}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Related Fluid & Wave Energy Projects */}
          <Reveal className="pt-10 border-t border-[#E2E8F0] dark:border-[#1E293B]">
            <h2 className="font-display text-xl font-bold text-[#14213D] dark:text-[#F8FAFC]">
              Related Research &amp; Fluid Engineering Projects
            </h2>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  className="group text-left p-6 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111B2E] hover:border-[#2563EB] dark:hover:border-[#60A5FA] transition-colors cursor-pointer"
                >
                  <p className="text-xs font-medium text-[#2563EB] dark:text-[#60A5FA]">
                    {project.number}. {project.primaryCategory}
                  </p>
                  <p className="mt-1.5 font-display text-lg font-bold text-[#14213D] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                    {project.title}
                  </p>
                  <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                    {project.shortSummary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#2563EB] dark:text-[#60A5FA]">
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
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
