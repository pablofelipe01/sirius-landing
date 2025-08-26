'use client';

import { motion, AnimatePresence } from 'framer-motion';

const textVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeInOut' } },
};

const InteractiveInfographic = ({ stages, hoveredIndex }) => {
  return (
    <div className="absolute w-72 h-72 flex items-center justify-center pointer-events-none">
      <AnimatePresence mode="wait">
        {hoveredIndex !== null && stages[hoveredIndex] ? (
          <motion.div
            key={stages[hoveredIndex].name}
            className="w-full h-full bg-white/10 backdrop-blur-md rounded-full p-6 text-center flex flex-col items-center justify-center border border-white/20"
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="text-5xl mb-2">{stages[hoveredIndex].icon}</div>
            <h4 className="font-bold text-xl text-white mb-2" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
              {stages[hoveredIndex].name}
            </h4>
            <p className="text-white/80 text-base" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              {stages[hoveredIndex].details}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            className="text-center"
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h4 className="font-bold text-2xl text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
              Nuestro Ciclo
            </h4>
            <p className="text-white/80" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
              Pasa el cursor sobre un ícono
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveInfographic;