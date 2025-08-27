'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Mantenemos el tracking de scroll para otras posibles animaciones,
    // pero no cambiará el fondo
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => setIsOpen(!isOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav 
      className="fixed w-full z-50 transition-all duration-300 bg-transparent py-4"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image 
                src="/logo.png" 
                alt="Sirius Regenerative" 
                width={150} 
                height={50} 
                className="h-auto max-w-[150px] drop-shadow-md" 
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex space-x-4 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Contáctenos */}
            <Link 
              href="/contacto" 
              className="px-4 py-2 bg-[#5A7836]/80 backdrop-blur-sm rounded-lg text-white hover:bg-[#5A7836] transition-all"
            >
              Contáctenos
            </Link>
            
            {/* Dropdown Menu */}
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="px-4 py-2 bg-[#5A7836]/80 backdrop-blur-sm rounded-lg text-white hover:bg-[#5A7836] transition-all flex items-center gap-2"
              >
                Menú
                <svg 
                  className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Content */}
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-black/80 backdrop-blur-sm rounded-lg shadow-lg border border-white/10"
                >
                  <div className="py-2">
                    <Link 
                      href="/equipo" 
                      className="block px-4 py-2 text-white hover:bg-[#5A7836]/30 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Equipo
                    </Link>
                    <Link 
                      href="/inovacion" 
                      className="block px-4 py-2 text-white hover:bg-[#5A7836]/30 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Innovación
                    </Link>
                    <Link 
                      href="https://pedidos-sirius.vercel.app/" 
                      className="block px-4 py-2 text-[#5A7836] hover:bg-[#5A7836]/30 transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Comprar Ahora
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-black/80 backdrop-blur-sm"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link 
              href="/contacto" 
              className="text-white bg-[#5A7836]/80 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-[#5A7836] transition-all"
              onClick={() => setIsOpen(false)}
            >
              Contáctenos
            </Link>
            <Link 
              href="/equipo" 
              className="text-white bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-[#5A7836]/30 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Equipo
            </Link>
            <Link 
              href="/inovacion" 
              className="text-white bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-[#5A7836]/30 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Innovación
            </Link>
            <Link 
              href="https://pedidos-sirius.vercel.app/" 
              className="bg-[#5A7836] text-white px-5 py-2 rounded-lg hover:bg-[#5A7836]/80 transition-colors inline-block text-center"
              onClick={() => setIsOpen(false)}
            >
              Comprar Ahora
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default NavBar;