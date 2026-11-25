import { Activity, Compass, Cpu, Factory } from 'lucide-react';
import { skillCategories } from '../../data/portfolioData';
import type { SkillCategory } from '../../data/portfolioData';
import { Reveal } from '../Reveal';

function SkillIcon({ iconKey }: { iconKey: SkillCategory['iconKey'] }) {
  const iconClass = 'w-5 h-5 text-[#2563EB] dark:text-[#60A5FA]';
  switch (iconKey) {
    case 'design':
      return <Compass className={iconClass} strokeWidth={1.6} />;
    case 'manufacturing':
      return <Factory className={iconClass} strokeWidth={1.6} />;
    case 'simulation':
      return <Activity className={iconClass} strokeWidth={1.6} />;
    case 'automation':
      return <Cpu className={iconClass} strokeWidth={1.6} />;
  }
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-20 sm:py-24 bg-[#F7F9FC] dark:bg-[#0E1729] border-b border-[#E2E8F0] dark:border-[#1E293B]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium text-[#2563EB] dark:text-[#60A5FA]">
            Technical Capabilities
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D] dark:text-[#F8FAFC]">
            Tools, Technologies &amp; Expertise
          </h2>
          <p className="mt-3 text-base text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            Core engineering software, manufacturing processes, and analytical capabilities applied
            across CAD design, fabrication, and prototyping workflows.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <Reveal key={category.id} delay={0.05 * idx}>
              <div className="h-full rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111B2E] p-6 flex flex-col">
                <div className="flex items-center gap-3 pb-4 border-b border-[#E2E8F0] dark:border-[#1E293B]">
                  <SkillIcon iconKey={category.iconKey} />
                  <h3 className="font-display text-base font-bold text-[#14213D] dark:text-[#F8FAFC] leading-snug">
                    {category.title}
                  </h3>
                </div>

                <ul className="mt-4 divide-y divide-[#E2E8F0]/70 dark:divide-[#1E293B]">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="py-2.5 text-sm text-[#17243A] dark:text-[#CBD5E1] leading-snug"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
