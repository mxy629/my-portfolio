import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import PriceSection from './sections/PriceSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

/** The page body — everything below the language provider. */
export default function Page() {
  return (
    <main
      className="relative w-full bg-[#0C0C0C] font-kanit"
      style={{ overflowX: 'clip' }}
    >
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <PriceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
