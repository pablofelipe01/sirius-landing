"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TeamMemberCard {
  id: string;
  name: string;
  role: string;
  photoUrl?: string;
}

interface ProfileCarouselProps {
  members: TeamMemberCard[];
  className?: string;
}

function AvatarFallback() {
  return (
    <div className="w-full h-full bg-[#E8E0D4] flex items-center justify-center">
      <svg width={72} height={72} viewBox="0 0 24 24" fill="none" stroke="#A09585" strokeWidth={1}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    </div>
  );
}

export function ProfileCarousel({ members, className }: ProfileCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!members.length) return null;

  const total = members.length;
  const current = members[currentIndex];

  const handleNext = () => setCurrentIndex(i => (i + 1) % total);
  const handlePrev = () => setCurrentIndex(i => (i - 1 + total) % total);

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>

      {/* ── Desktop ── */}
      <div className="hidden md:flex relative items-center">
        {/* Foto */}
        <div className="w-[420px] h-[480px] rounded-3xl overflow-hidden bg-[#E8E0D4] flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.photoUrl ?? current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              {current.photoUrl ? (
                <Image
                  src={current.photoUrl}
                  alt={current.name}
                  width={420}
                  height={480}
                  unoptimized
                  className="w-full h-full object-cover"
                  draggable={false}
                  priority
                />
              ) : (
                <AvatarFallback />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card info */}
        <div className="bg-[#FBF7F1] rounded-3xl shadow-2xl p-10 ml-[-80px] z-10 max-w-md flex-1 border border-[rgba(14,24,20,0.07)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {/* Contador */}
              <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#1F5538] mb-6 flex items-center gap-2">
                <span className="inline-block w-4 h-px bg-[#1F5538]" />
                {currentIndex + 1} / {total}
              </div>

              <h2
                className="text-3xl font-light text-[#0E1814] mb-3 leading-tight"
                style={{ fontFamily: '"Museo Slab", Georgia, serif', letterSpacing: '-0.015em' }}
              >
                {current.name}
              </h2>

              <p className="text-sm font-semibold tracking-[0.14em] uppercase text-[#7A857F]">
                {current.role}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden max-w-sm mx-auto text-center">
        <div className="w-full aspect-square bg-[#E8E0D4] rounded-3xl overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.photoUrl ?? current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              {current.photoUrl ? (
                <Image
                  src={current.photoUrl}
                  alt={current.name}
                  width={400}
                  height={400}
                  unoptimized
                  className="w-full h-full object-cover"
                  draggable={false}
                  priority
                />
              ) : (
                <AvatarFallback />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="px-2"
          >
            <h2
              className="text-xl font-light text-[#0E1814] mb-2"
              style={{ fontFamily: '"Museo Slab", Georgia, serif' }}
            >
              {current.name}
            </h2>
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7A857F]">
              {current.role}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navegación ── */}
      <div className="flex justify-center items-center gap-6 mt-10">
        <button
          onClick={handlePrev}
          aria-label="Anterior"
          className="w-12 h-12 rounded-full bg-[#F3EEE4] border border-[rgba(14,24,20,0.10)] shadow-md flex items-center justify-center hover:bg-[#EDE8E0] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-[#3A4540]" />
        </button>

        <div className="flex gap-2">
          {members.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Ir al miembro ${i + 1}`}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors cursor-pointer",
                i === currentIndex ? "bg-[#1F5538]" : "bg-[#C8C0B4]"
              )}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Siguiente"
          className="w-12 h-12 rounded-full bg-[#F3EEE4] border border-[rgba(14,24,20,0.10)] shadow-md flex items-center justify-center hover:bg-[#EDE8E0] transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 text-[#3A4540]" />
        </button>
      </div>
    </div>
  );
}
