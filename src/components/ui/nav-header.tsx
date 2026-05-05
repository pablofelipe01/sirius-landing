'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface NavLink {
  href: string;
  label: string;
}

interface SlideNavProps {
  links: NavLink[];
  scrolled: boolean;
  onNavClick: (href: string) => void;
}

function NavTab({
  children,
  setPosition,
  onClick,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>;
  onClick: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10 block cursor-pointer select-none px-4 py-2"
    >
      {children}
    </li>
  );
}

export function SlideNav({ links, scrolled, onNavClick }: SlideNavProps) {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });

  const pillColor   = scrolled ? '#1F5538'                    : '#4ecdc4';
  const borderColor = scrolled ? 'rgba(14,24,20,0.14)'        : 'rgba(241,233,218,0.20)';
  const containerBg = scrolled ? 'rgba(255,255,255,0.55)'     : 'rgba(5,5,16,0.32)';
  const textColor   = scrolled ? '#3A4540'                    : 'rgba(241,233,218,0.85)';

  return (
    <ul
      className="relative flex w-fit rounded-full p-1"
      style={{ border: `1.5px solid ${borderColor}`, background: containerBg, backdropFilter: 'blur(10px)' }}
      onMouseLeave={() => setPosition(pv => ({ ...pv, opacity: 0 }))}
    >
      {links.map(l => (
        <NavTab key={l.href} setPosition={setPosition} onClick={() => onNavClick(l.href)}>
          <span style={{
            fontFamily: '"Museo Slab", Georgia, serif',
            fontSize: 11, fontWeight: 600,
            letterSpacing: '0.10em', textTransform: 'uppercase',
            color: textColor,
            position: 'relative', zIndex: 10,
            transition: 'color 0.2s',
            whiteSpace: 'nowrap',
          }}>
            {l.label}
          </span>
        </NavTab>
      ))}

      <motion.li
        animate={position}
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        className="absolute z-0 top-1 rounded-full"
        style={{
          height: 'calc(100% - 8px)',
          backgroundColor: pillColor,
          opacity: position.opacity,
          pointerEvents: 'none',
        }}
      />
    </ul>
  );
}
