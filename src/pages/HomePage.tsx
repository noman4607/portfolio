import { AboutSection } from '../components/sections/AboutSection';
import { ContactSection } from '../components/sections/ContactSection';
import { EducationSection } from '../components/sections/EducationSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { FeaturedProjectsSection } from '../components/sections/FeaturedProjectsSection';
import { HeroSection } from '../components/sections/HeroSection';
import { ResearchSection } from '../components/sections/ResearchSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import type { ServiceType } from '../data/portfolioData';
import { useDocumentSeo } from '../utils/seo';

interface HomePageProps {
  navigate: (to: string) => void;
  selectedService?: ServiceType;
  onInquireService: (service: ServiceType) => void;
}

export function HomePage({ navigate, selectedService, onInquireService }: HomePageProps) {
  useDocumentSeo({
    title: 'Khan Abdullah All Noman | Mechanical Engineer & CAD Designer',
    description:
      'Explore the mechanical engineering portfolio of Khan Abdullah All Noman, featuring SOLIDWORKS CAD design, CNC manufacturing, 3D printing, automation, and engineering projects.',
    canonicalPath: '/',
    structuredData: null,
  });

  return (
    <main id="main-content">
      <HeroSection navigate={navigate} />
      <AboutSection />
      <FeaturedProjectsSection navigate={navigate} />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ServicesSection onInquireService={onInquireService} />
      <ResearchSection navigate={navigate} />
      <ContactSection selectedService={selectedService} />
    </main>
  );
}
