'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Slide {
  id: number;
  hint: string;
  title: string;
  text: string;
  image: string;
  tag: string;
  number: string;
}

const slides: Slide[] = [
  {
    id: 1,
    number: "01",
    hint: "Premium Experiences",
    title: "YOUR EVENTS \n REIMAGINED",
    text: "Architecting unforgettable environments with meticulous attention to detail and passionate creativity.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2074&auto=format&fit=crop",
    tag: "SIGNATURE"
  },
  {
    id: 2,
    number: "02",
    hint: "Bespoke Celebrations",
    title: "TIMELESS \n WEDDINGS",
    text: "From intimate gatherings to grand celebrations, we bring your unique love story to life.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
    tag: "ROMANTIC"
  },
  {
    id: 3,
    number: "03",
    hint: "Corporate Excellence",
    title: "STRATEGIC \n CONFERENCES",
    text: "Elevating professional networking and brand innovation through executive-grade event management.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    tag: "ELITE"
  }
];

export const RotatingCarousel = () => {
  const [index, setIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useSpring(mousePosition.x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(mousePosition.y, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 40,
      y: (clientY / innerHeight - 0.5) * 40,
    });
  };

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden cursor-none"
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[100] opacity-[0.04] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Lens Flare / Ambient Light */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none z-10"
        style={{ x: mouseX, y: mouseY, left: '20%', top: '10%' }}
      />

      <AnimatePresence mode="wait">
        <motion.section
          key={slides[index].id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background Image with Parallax */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{ 
              x: useTransform(mouseX, [ -20, 20 ], [ 15, -15 ]),
              y: useTransform(mouseY, [ -20, 20 ], [ 15, -15 ]),
              scale: 1.1 
            }}
          >
            <motion.div
              className="w-full h-full"
              initial={{ scale: 1.2, filter: 'blur(20px)' }}
              animate={{ scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
            >
              <ImageWithFallback
                src={slides[index].image}
                alt={slides[index].hint}
                className="w-full h-full object-cover grayscale-[30%] contrast-[1.1]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </motion.div>

          {/* Content Wrapper */}
          <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-8 md:px-24">
            <div className="flex items-center gap-12 mb-12">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-[1px] bg-[#d4af37]"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col gap-1"
              >
                <span className="text-[10px] font-bold tracking-[0.8em] uppercase text-[#d4af37]" style={{ fontFamily: '"Outfit", sans-serif' }}>
                  {slides[index].tag}
                </span>
              </motion.div>
            </div>

            <h1 className="mb-12">
              {slides[index].title.split('\n').map((line, lineIdx) => (
                <div key={lineIdx} className="overflow-hidden py-4 -my-4">
                  <motion.span
                    initial={{ y: "100%", rotateX: -90 }}
                    animate={{ y: 0, rotateX: 0 }}
                    transition={{ 
                      delay: 0.8 + lineIdx * 0.2, 
                      duration: 1.2, 
                      ease: [0.215, 0.61, 0.355, 1] 
                    }}
                    className="block text-7xl md:text-[10rem] font-bold leading-[1.1] text-white"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed mb-16 font-light"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              {slides[index].text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="flex items-center gap-12"
            >
              <button 
                className="group relative px-14 py-7 rounded-full overflow-hidden transition-transform duration-500 hover:scale-105"
                onClick={() => {
                  const scrollSection = document.getElementById('categories');
                  if (scrollSection) scrollSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="absolute inset-0 border border-[#d4af37]/30 rounded-full" />
                <motion.div
                  className="absolute inset-0 bg-[#d4af37]"
                  initial={{ x: "-101%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                />
                <span className="relative z-10 text-[10px] font-bold tracking-[0.5em] uppercase text-[#d4af37] group-hover:text-[#1a1a1a] transition-colors duration-500">
                  ESTABLISH VISION
                </span>
              </button>

              <div className="hidden md:flex items-center gap-4 text-white/20">
                <span className="text-[10px] font-bold tracking-widest">EST. 2010</span>
                <div className="w-8 h-[1px] bg-white/10" />
                <span className="text-[10px] font-bold tracking-widest">WORLDWIDE</span>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Navigation Indicators - Archival Style */}
      <div className="absolute left-12 bottom-12 z-50 hidden lg:flex flex-col gap-8">
        {slides.map((slide, i) => (
          <motion.div
            key={slide.id}
            className="group flex items-center gap-6 cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <span className={`text-[10px] font-bold tracking-tighter transition-colors duration-500 ${index === i ? 'text-[#d4af37]' : 'text-white/20'}`}>
              {slide.number}
            </span>
            <motion.div 
              className={`h-[1px] transition-all duration-700 ${index === i ? 'w-12 bg-[#d4af37]' : 'w-4 bg-white/10 group-hover:w-8 group-hover:bg-white/30'}`}
            />
          </motion.div>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-12 right-12 z-50 flex items-baseline gap-2">
        <span className="text-4xl font-bold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
          {slides[index].number}
        </span>
        <span className="text-xs font-bold text-white/20">/ 03</span>
      </div>

      {/* Custom Cursor Circle */}
      <motion.div 
        className="fixed w-12 h-12 border border-[#d4af37]/30 rounded-full pointer-events-none z-[200] hidden md:block"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
      />
    </div>
  );
};
