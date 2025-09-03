import HeroSection from '@/components/HeroSection';
import HistorySection from '@/components/HistorySection';
import ProductsSection from '@/components/ProductsSection';
import ZoomBackgroundSection from '@/components/ZoomBackgroundSection';
import BiofabricaSection from '@/components/BiofabricaNew';
import ImpactoSection from '@/components/ImpactoNew';
import InvolucrateSection from '@/components/InvolucrateNew';
import ContactoFinalSection from '@/components/ContactoNew';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <HistorySection />
      <ZoomBackgroundSection /> 
      <ProductsSection />
      <BiofabricaSection />
      <ImpactoSection />
      <InvolucrateSection />
      <ContactoFinalSection />
    </main>
  );
}