'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, Eye, Target } from 'lucide-react';

interface ContentCard {
  images: string[];
  title: string;
  description: string;
  index: string;
  id: string;
  icon: React.ElementType;
}

const content: ContentCard[] = [
  {
    images: ["https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920"],
    title: "Our Story",
    description: "A decade of pioneering academic pathways, elite mentorship, and university admissions success. Founded on the principle of uncompromised admissions integrity and strategic student preparation.",
    index: "01",
    id: "EDU_STORY_992",
    icon: History
  },
  {
    images: [
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1920&auto=format&fit=crop"
    ],
    title: "Our Vision",
    description: "To define the global benchmark for elite admissions advisory, transforming every scholar's aspiration into a secure placement at the world's most prestigious collegiate institutions.",
    index: "02",
    id: "EDU_VISION_441",
    icon: Eye
  },
  {
    images: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1920&auto=format&fit=crop"
    ],
    title: "Our Mission",
    description: "Delivering high-fidelity academic strategy, technical portfolio development, and comprehensive relocational guidance through uncompromising advisory integrity.",
    index: "03",
    id: "EDU_MISSION_108",
    icon: Target
  }
];

export function StoryMissionVision() {
  const [[currentSlide, direction], setSlide] = useState([0, 0]);
  const slideDuration = 6000; // 6 seconds per slide
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setSlide(([prevSlide]) => {
        const nextSlide = (prevSlide + 1) % content.length;
        return [nextSlide, 1]; // direction 1 for auto-forward
      });
    }, slideDuration);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleManualSelect = (idx: number) => {
    setSlide(([prevSlide]) => {
      const dir = idx > prevSlide ? 1 : -1;
      return [idx, dir];
    });
    resetTimer(); // Reset auto-scroll timer on manual override
  };

  const item = content[currentSlide];

  // Awwwards-winning Cinematic 3D Book Page Turn Variants
  const pageTurnVariants = {
    initial: (direction: number) => ({
      rotateY: direction >= 0 ? 90 : -90,
      opacity: 0,
      z: -250,
      transformOrigin: direction >= 0 ? "left center" : "right center",
    }),
    animate: (direction: number) => ({
      rotateY: 0,
      opacity: 1,
      z: 0,
      transformOrigin: direction >= 0 ? "left center" : "right center",
      transition: {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1], // Cinematic cubic-bezier ease-out
      }
    }),
    exit: (direction: number) => ({
      rotateY: direction >= 0 ? -90 : 90,
      opacity: 0,
      z: -250,
      transformOrigin: direction >= 0 ? "left center" : "right center",
      transition: {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
      }
    })
  };

  return (
    <section className="relative w-full h-[100vh] bg-[#0d0d0d] z-10 select-none flex items-center justify-center overflow-hidden" style={{ perspective: "2500px", transformStyle: "preserve-3d" }}>
      
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={pageTurnVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
        >
          {/* 3D Page Turn Shading Shadow Overlay */}
          <motion.div
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0.7 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-[#0d0d0d]/80 pointer-events-none z-20"
          />

          {/* Cinematic Zoom Backdrop */}
          <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
            {item.images.length === 1 ? (
              <motion.img
                key={`single-${currentSlide}`}
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.15, filter: "brightness(0.35) blur(1px)" }}
                animate={{ scale: 1.0, filter: "brightness(0.55) blur(0px)" }}
                transition={{ duration: 5.8, ease: "easeOut" }}
              />
            ) : (
              <div className="grid grid-cols-2 w-full h-full gap-[2px] bg-[#0d0d0d]">
                <motion.img
                  key={`left-${currentSlide}`}
                  src={item.images[0]}
                  alt={`${item.title} left`}
                  className="w-full h-full object-cover opacity-90"
                  initial={{ scale: 1.15, filter: "brightness(0.35) blur(1px)" }}
                  animate={{ scale: 1.0, filter: "brightness(0.55) blur(0px)" }}
                  transition={{ duration: 5.8, ease: "easeOut" }}
                />
                <motion.img
                  key={`right-${currentSlide}`}
                  src={item.images[1]}
                  alt={`${item.title} right`}
                  className="w-full h-full object-cover opacity-90"
                  initial={{ scale: 1.15, filter: "brightness(0.35) blur(1px)" }}
                  animate={{ scale: 1.0, filter: "brightness(0.55) blur(0px)" }}
                  transition={{ duration: 5.8, ease: "easeOut" }}
                />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/85 via-[#0d0d0d]/40 to-[#0d0d0d]/80 pointer-events-none" />
          </div>

          {/* Premium Archival Telemetry HUD Header */}
          <div className="absolute top-10 left-8 right-8 md:left-16 md:right-16 flex items-center justify-between pointer-events-none text-white/30 text-[9px] font-bold tracking-[0.3em] uppercase z-10">
            <div className="flex items-center gap-3">
              <span>ARCHIVAL PROFILE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/50" />
              <span className="text-[#d4af37]/80">{item.id}</span>
            </div>
            <div className="hidden sm:block w-24 h-[1px] bg-white/10" />
            <div>
              <span>SECTION {item.index} / 03</span>
            </div>
          </div>

          {/* Center Card Content Split Layout with Staggered Entrance */}
          <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center gap-8 md:gap-12 px-8">
            {/* Badge Circular Icon */}
            <div className="flex flex-col items-center gap-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md bg-white/5 shadow-2xl"
              >
                <item.icon className="w-10 h-10 md:w-12 md:h-12 text-[#d4af37]" />
              </motion.div>
            </div>

            {/* Text Strategy Info */}
            <div className="flex flex-col items-center text-center">
              <motion.h2
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-6xl md:text-[7.5rem] font-bold text-white tracking-tighter leading-none mb-6 text-center"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                {item.title.split(' ').map((word, index) => (
                  <span key={index} className={index === 1 ? "text-[#d4af37]" : ""}>
                    {word}{" "}
                  </span>
                ))}
              </motion.h2>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="text-lg sm:text-xl md:text-2xl text-white/80 font-normal italic max-w-2xl leading-relaxed text-center"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                "{item.description}"
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progressive Gold Time Capsule Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 z-30">
        {content.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleManualSelect(idx)}
            className="flex flex-col items-start gap-2 cursor-pointer group text-left"
          >
            <span className={`text-[9px] font-bold tracking-[0.22em] uppercase transition-colors duration-300 ${idx === currentSlide ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
              {item.index} / {item.title}
            </span>
            
            {/* Progress Capsule Bar */}
            <div className="w-28 sm:w-36 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
              {idx === currentSlide ? (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  key={currentSlide} // Reset and re-trigger animation when currentSlide changes
                  transition={{ duration: slideDuration / 1000, ease: "linear" }}
                  className="absolute top-0 left-0 h-full bg-[#d4af37]"
                />
              ) : (
                <div className={`absolute top-0 left-0 h-full bg-[#d4af37]/30 transition-all duration-300 ${idx < currentSlide ? 'w-full' : 'w-0'}`} />
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}