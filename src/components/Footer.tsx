'use client';

import Link from 'next/link';
import Image from 'next/image';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href="/">
              <Image 
                src="/logo.png" 
                alt="Sirius Regenerative" 
                width={120} 
                height={40} 
                className="h-auto mb-4 w-auto max-w-[120px] sm:max-w-[150px]" 
              />
            </Link>
            <p className="text-gray-400 mt-4 text-sm sm:text-base">
              Transformamos la agricultura convencional con soluciones regenerativas 
              que nutren el suelo y potencian tus cultivos.
            </p>
            <div className="flex space-x-3 sm:space-x-4 mt-6">
              <a 
                href="https://www.instagram.com/sirius.colombia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} className="sm:w-6 sm:h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/company/sirius-regenerative" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} className="sm:w-6 sm:h-6" />
              </a>
              {/* <a 
                href="https://wa.me/573208653324" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={24} />
              </a> */}
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-span-1">
            <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-green-400">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/calculadora" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  Calculadora de Carbono
                </Link>
              </li>
              <li>
                <Link href="/equipo" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  Nuestro Equipo
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Productos */}
          <div className="col-span-1">
            <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-green-400">Nuestros Productos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/productos#biochar-blend" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  Biochar Blend
                </Link>
              </li>
              <li>
                <Link href="/productos#star-dust" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  Star Dust
                </Link>
              </li>
              <li>
                <Link href="/ventas" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  Ofertas Especiales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-green-400">Información de contacto</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 text-sm">📍</span>
                <span className="text-gray-400 text-sm sm:text-base">Kl-7 Via Cabuyaro Barranca de Upía</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 text-sm">📞</span>
                <span className="text-gray-400 text-sm sm:text-base">+57 320 865 3324</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 text-sm">✉️</span>
                <a href="mailto:marketingsirius@siriusregenerative.com" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base break-all">
                  marketingsirius@siriusregenerative.com
                </a>
              </li>
              <li className="flex items-start mt-3 sm:mt-4">
                <span className="text-gray-400 mr-2 text-sm">🕒</span>
                <div className="text-gray-400 text-sm sm:text-base">
                  <p>Lunes a Viernes: 9am - 6pm</p>
                  <p>Sábados: 9am - 1pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-0">
              &copy; {new Date().getFullYear()} Sirius Regenerative. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <Link href="/privacypolicy" className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors">
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