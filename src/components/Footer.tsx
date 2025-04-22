'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/">
              <Image 
                src="/logo.png" 
                alt="Sirius Regenerative" 
                width={150} 
                height={50} 
                className="h-auto mb-4" 
              />
            </Link>
            <p className="text-gray-400 mt-4">
              Transformamos la agricultura convencional con soluciones regenerativas 
              que nutren el suelo y potencian tus cultivos.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://www.instagram.com/sirius.colombia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/company/sirius-regenerative" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="https://wa.me/573132121019" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-span-1">
            <h4 className="text-xl font-bold mb-4 text-green-400">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-gray-400 hover:text-white transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/calculadora" className="text-gray-400 hover:text-white transition-colors">
                  Calculadora de Carbono
                </Link>
              </li>
              <li>
                <Link href="/equipo" className="text-gray-400 hover:text-white transition-colors">
                  Nuestro Equipo
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Productos */}
          <div className="col-span-1">
            <h4 className="text-xl font-bold mb-4 text-green-400">Nuestros Productos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/productos#biochar-blend" className="text-gray-400 hover:text-white transition-colors">
                  Biochar Blend
                </Link>
              </li>
              <li>
                <Link href="/productos#star-dust" className="text-gray-400 hover:text-white transition-colors">
                  Star Dust
                </Link>
              </li>
              <li>
                <Link href="/ventas" className="text-gray-400 hover:text-white transition-colors">
                  Ofertas Especiales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-span-1">
            <h4 className="text-xl font-bold mb-4 text-green-400">Contacto</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">📍</span>
                <span className="text-gray-400">Av. Siempreverde 123, Ciudad Verde</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">📞</span>
                <span className="text-gray-400">+57 313 212 1019</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">✉️</span>
                <a href="mailto:info@siriusregenerative.com" className="text-gray-400 hover:text-white transition-colors">
                  info@siriusregenerative.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Sirius Regenerative. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4">
              <Link href="/privacypolicy" className="text-gray-500 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-500 hover:text-white text-sm transition-colors">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;