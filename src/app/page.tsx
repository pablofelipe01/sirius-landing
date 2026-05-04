import NavBar from '@/components/NavBar';
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
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <NavBar />
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
      <Footer />
    </>
  );
}