import HeroSection from '@/components/HeroSection';
import TesisSection from '@/components/TesisSection';
import ComoFuncionaSection from '@/components/ComoFuncionaSection';
import ProductsSection from '@/components/ProductsSection';
import ImpactoSection from '@/components/ImpactoNew';
import CalculadoraSection from '@/components/CalculadoraSection';
import BiofabricaSection from '@/components/BiofabricaNew';
import CertificacionesSection from '@/components/CertificacionesSection';
import TeamSection from '@/components/TeamSection';
import AliadosSection from '@/components/AliadosSection';
import BlogSection from '@/components/BlogSection';
import ContactoSection from '@/components/ContactoNew';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TesisSection />
      <ComoFuncionaSection />
      <ProductsSection />
      <ImpactoSection />
      <CalculadoraSection />
      <BiofabricaSection />
      <CertificacionesSection />
      <TeamSection />
      <AliadosSection />
      <BlogSection />
      <ContactoSection />
    </main>
  );
}