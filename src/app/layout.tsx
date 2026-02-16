import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sirius Regenerative - Soluciones para la agricultura regenerativa',
  description: 'Transformamos la agricultura convencional con soluciones regenerativas que nutren el suelo y potencian tus cultivos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="font-sans antialiased">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}