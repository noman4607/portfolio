import { sitePath } from '../../utils/sitePath';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { featuredProjects } from '../../data/portfolioData';
import { ResilientImage } from '../ResilientImage';
import { Reveal } from '../Reveal';

interface FeaturedProjectsSectionProps {
  navigate: (to: string) => void;
}

export function FeaturedProjectsSection({ navigate }: FeaturedProjectsSectionProps) {
  const [leadProject, ...secondaryProjects] = featuredProjects;

  return (
    <section
      id="featured-projects"
      className="py-20 sm:py-24 bg-white dark:bg-[#0B1220] border-b border-[#E2E8F0] dark:border-[#1E293B]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#2563EB] dark:text-[#60A5FA]">
              Featured Projects
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D] dark:text-[#F8FAFC]">
              Selected Engineering Work
            </h2>
            <p className="mt-3 text-base text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
              A collection of mechanical design, manufacturing, automation, and product development
              projects.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-[#CBD5E1] dark:border-[#334155] text-[#17243A] dark:text-[#F1F5F9] hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA] transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={1.75} />
          </button>
        </Reveal>

        {/* Flagship Lead Featured Project (Asymmetrical Full-Width Split) */}
        {leadProject && (
          <Reveal className="mt-12" delay={0.05}>
            <article
              onClick={() => navigate(`/projects/${leadProject.slug}`)}
              className="group grid grid-cols-1 lg:grid-cols-12 rounded-xl overflow-hidden border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111B2E] hover:border-[#94A3B8] dark:hover:border-[#334155] transition-colors duration-200 cursor-pointer"
            >
              {leadProject.heroImage && (
                <div className="lg:col-span-7 aspect-[4/3] lg:aspect-auto lg:min-h-[380px] overflow-hidden bg-[#F7F9FC] dark:bg-[#0D1526]">
                  <ResilientImage
                    src={leadProject.heroImage}
                    alt={leadProject.heroImageAlt || leadProject.title}
                    fallbackTitle={leadProject.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              )}

              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                    <span className="font-mono tabular-nums text-[#2563EB] dark:text-[#60A5FA]">
                      {leadProject.number}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{leadProject.primaryCategory}</span>
                    {leadProject.client && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#17243A] dark:text-[#CBD5E1]">
                          Client: {leadProject.client}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="mt-3 font-display text-2xl sm:text-[26px] font-bold tracking-tight text-[#14213D] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                    {leadProject.title}
                  </h3>

                  <p className="mt-4 text-[15px] leading-[1.7] text-[#475569] dark:text-[#CBD5E1]">
                    {leadProject.shortSummary}
                  </p>

                  <div className="mt-6 pt-5 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                    <p className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                      Tools &amp; Technologies
                    </p>
                    <p className="mt-1.5 text-sm text-[#17243A] dark:text-[#E2E8F0] leading-relaxed">
                      {leadProject.tools.join(' · ')}
                    </p>
                  </div>
                </div>

                <div className="mt-7 pt-2">
                  <a
                    href={sitePath(`/projects/${leadProject.slug}`)}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/projects/${leadProject.slug}`);
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] dark:text-[#60A5FA] group-hover:gap-2.5 transition-all"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {/* Secondary Featured Projects (Balanced 2-Column Grid) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {secondaryProjects.map((project, idx) => (
            <Reveal key={project.id} delay={0.08 * (idx + 1)}>
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
                      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                )}

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                      <span className="font-mono tabular-nums text-[#2563EB] dark:text-[#60A5FA]">
                        {project.number}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{project.primaryCategory}</span>
                    </div>

                    <h3 className="mt-2.5 font-display text-xl sm:text-[22px] font-bold tracking-tight text-[#14213D] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-[15px] leading-[1.68] text-[#475569] dark:text-[#CBD5E1]">
                      {project.shortSummary}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-[#E2E8F0] dark:border-[#1E293B] flex flex-col gap-4">
                    <p className="text-xs sm:text-[13px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                      {project.tools.join(' · ')}
                    </p>

                    <a
                      href={sitePath(`/projects/${project.slug}`)}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/projects/${project.slug}`);
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] dark:text-[#60A5FA] self-start"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
