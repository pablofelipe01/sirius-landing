'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardProps {
  title: string;
  description: string;
  videoSrc: string; // Changed from imageSrc to videoSrc
  tag?: string;
  link: string;
}

const ProductCard = ({
  title,
  description,
  videoSrc, // Updated parameter name
  tag = "Nuevo",
  link
}: ProductCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl overflow-hidden shadow-lg transition-shadow hover:shadow-xl"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <video 
          src={videoSrc} 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-64 object-cover"
        />
        {tag && (
          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            {tag}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <Link href={link} passHref>
          <motion.div 
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-full font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Descubrir más
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;