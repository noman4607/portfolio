import { ArrowRight, Box, Cog, Lightbulb, Printer } from 'lucide-react';
import { servicesList } from '../../data/portfolioData';
import type { ServiceItem, ServiceType } from '../../data/portfolioData';
import { Reveal } from '../Reveal';

interface ServicesSectionProps {
  onInquireService: (service: ServiceType) => void;
}

function ServiceIcon({ iconKey }: { iconKey: ServiceItem['iconKey'] }) {
  const iconClass = 'w-5 h-5 text-[#2563EB] dark:text-[#60A5FA]';
  switch (iconKey) {
    case 'mechanical':
      return <Cog className={iconClass} strokeWidth={1.6} />;
    case 'cad':
      return <Box className={iconClass} strokeWidth={1.6} />;
    case 'printing':
      return <Printer className={iconClass} strokeWidth={1.6} />;
    case 'problem':
      return <Lightbulb className={iconClass} strokeWidth={1.6} />;
  }
}

export function ServicesSection({ onInquireService }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="py-20 sm:py-24 bg-white dark:bg-[#0B1220] border-b border-[#E2E8F0] dark:border-[#1E293B]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium text-[#2563EB] dark:text-[#60A5FA]">Capabilities</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D] dark:text-[#F8FAFC]">
            Engineering Services
          </h2>
          <p className="mt-3 text-base text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            Practical engineering solutions from initial concept to functional design.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, idx) => (
            <Reveal key={service.id} delay={0.05 * idx}>
              <article className="group h-full rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F7F9FC]/60 dark:bg-[#111B2E] hover:bg-white dark:hover:bg-[#152238] hover:border-[#94A3B8] dark:hover:border-[#334155] transition-colors duration-200 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0D1526] flex items-center justify-center">
                    <ServiceIcon iconKey={service.iconKey} />
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-[#14213D] dark:text-[#F8FAFC]">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                  <button
                    type="button"
                    onClick={() => onInquireService(service.title)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] dark:text-[#60A5FA] hover:text-[#1D4ED8] dark:hover:text-[#93C5FD] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Inquire</span>
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                      strokeWidth={1.75}
                    />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
