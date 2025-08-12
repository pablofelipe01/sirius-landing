import HeroSection from '@/components/HeroSection';
import HistorySection from '@/components/HistorySection';
// import BenefitsSection from '@/components/BenefitsSection';
import SustainabilitySection from '@/components/SustainabilitySection';
import GallerySection from '@/components/GallerySection';
import ZoomBackgroundSection from '@/components/ZoomBackgroundSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <HistorySection />
      {/* <BenefitsSection /> */}
      <ZoomBackgroundSection /> 
      <SustainabilitySection />
      <GallerySection />
      <TeamSection />
      <ContactSection />
    </main>
  );
}