'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: '/equipo', label: 'Equipo' },
    { href: '/inovacion', label: 'Innovación' },
    { href: '/calculadora', label: 'Calculadora' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#1A1A33]/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image 
                src="/logo.png" 
                alt="Sirius Regenerative" 
                width={150} 
                height={50} 
                className="h-auto max-w-[110px] sm:max-w-[140px]" 
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="px-4 py-2 text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#00A3FF] group-hover:w-3/4 transition-all duration-300" />
              </Link>
            ))}
            
            {/* CTA Button */}
            <Link 
              href="https://pedidos-sirius.vercel.app/" 
              className="ml-3 px-5 py-2 bg-[#0154AC] hover:bg-[#00A3FF] text-white text-sm font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[#00A3FF]/25 hover:shadow-lg"
            >
              Comprar Ahora
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-[#1A1A33]/98 backdrop-blur-lg border-t border-white/5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-white/90 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-all text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link 
                  href="https://pedidos-sirius.vercel.app/" 
                  className="block bg-[#0154AC] hover:bg-[#00A3FF] text-white px-5 py-3 rounded-full text-center text-sm font-bold transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Comprar Ahora
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;