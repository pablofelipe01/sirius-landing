'use client';

import React, { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

const ScrollAnimation = ({
  children,
  direction = 'up',
  duration = 0.5,
  delay = 0,
  distance = 50,
  className = '',
  once = true,
}: ScrollAnimationProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px -10% 0px' });

  // Configurar direcciones de animación
  const animationDirections = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  const animationDirection = animationDirections[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...animationDirection }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...animationDirection }
      }
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;