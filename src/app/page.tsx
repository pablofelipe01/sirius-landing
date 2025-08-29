import HeroSection from '@/components/HeroSection';
import HistorySection from '@/components/HistorySection';
import ProductsSection from '@/components/ProductsSection';
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
      <ZoomBackgroundSection /> 
      <ProductsSection />
      <SustainabilitySection />
      <GallerySection />
      <TeamSection />
      <ContactSection />
    </main>
  );
}