import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Weddings',
    subtitle: 'Luxury',
    description: 'Unforgettable moments, beautifully crafted',
    image: 'https://images.unsplash.com/photo-1759519238029-689e99c6d19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwYmFsbHJvb20lMjBlbGVnYW50fGVufDF8fHx8MTc3MjI1ODY0N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    title: 'Corporate',
    subtitle: 'Events',
    description: 'Professional excellence in every detail',
    image: 'https://images.unsplash.com/photo-1768508947825-0a63f7c46a2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMGNvbmZlcmVuY2UlMjBnYWxhfGVufDF8fHx8MTc3MjI1ODY0N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    title: 'Celebrations',
    subtitle: 'Private',
    description: 'Creating memories that last forever',
    image: 'https://images.unsplash.com/photo-1758870041148-31d28fdf34d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiaXJ0aGRheSUyMGNlbGVicmF0aW9uJTIwcGFydHl8ZW58MXx8fHwxNzcyMjU4NjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, bgX: 0, bgY: 0 });
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getCurrentSlide = () => slides[currentIndex];
  const getPreviousSlide = () => slides[(currentIndex - 1 + slides.length) % slides.length];
  const getNextSlide = () => slides[(currentIndex + 1) % slides.length];

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, slideIndex: number) => {
    const slide = slideRefs.current[slideIndex];
    if (!slide) return;

    const rect = slide.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / (Math.PI * 4));
    const rotY = (x - centerX) / (Math.PI * 3);

    setTilt({
      rotX: rotX,
      rotY: rotY,
      bgX: -rotY * 0.3,
      bgY: rotX * 0.3
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotX: 0, rotY: 0, bgX: 0, bgY: 0 });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white py-20">
      {/* Header */}
      <div className="text-center mb-16 z-10">
        <h2 className="text-5xl md:text-6xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--color-maroon)' }}>
          Event Types
        </h2>
        <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-charcoal)' }}>
          Discover our curated collection of exceptional events
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative z-10 w-full max-w-[900px] h-auto flex items-center justify-center gap-0">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={isTransitioning}
          className="opacity-70 hover:opacity-100 transition-opacity duration-250 z-50 disabled:opacity-30"
          aria-label="Previous slide"
          style={{ color: 'var(--color-maroon)' }}
        >
          <ChevronLeft className="w-10 h-10" strokeWidth={2} />
        </button>

        {/* Slides Wrapper */}
        <div className="relative w-full h-[600px] flex items-center justify-center">
          {/* Previous Slide */}
          <SlideCard
            ref={(el) => { slideRefs.current[0] = el; }}
            slide={getPreviousSlide()}
            position="previous"
            onMouseMove={(e) => handleMouseMove(e, 0)}
            onMouseLeave={handleMouseLeave}
            tilt={tilt}
          />

          {/* Current Slide */}
          <SlideCard
            ref={(el) => { slideRefs.current[1] = el; }}
            slide={getCurrentSlide()}
            position="current"
            onMouseMove={(e) => handleMouseMove(e, 1)}
            onMouseLeave={handleMouseLeave}
            tilt={tilt}
            showInfo
          />

          {/* Next Slide */}
          <SlideCard
            ref={(el) => { slideRefs.current[2] = el; }}
            slide={getNextSlide()}
            position="next"
            onMouseMove={(e) => handleMouseMove(e, 2)}
            onMouseLeave={handleMouseLeave}
            tilt={tilt}
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="opacity-70 hover:opacity-100 transition-opacity duration-250 z-50 disabled:opacity-30"
          aria-label="Next slide"
          style={{ color: 'var(--color-maroon)' }}
        >
          <ChevronRight className="w-10 h-10" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}

interface SlideCardProps {
  slide: Slide;
  position: 'previous' | 'current' | 'next';
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
  tilt: { rotX: number; rotY: number; bgX: number; bgY: number };
  showInfo?: boolean;
}

const SlideCard = React.forwardRef<HTMLDivElement, SlideCardProps>(
  ({ slide, position, onMouseMove, onMouseLeave, tilt, showInfo = false }, ref) => {
    const getTransform = () => {
      const baseStyle = {
        perspective: 1000,
      };

      if (position === 'current') {
        return {
          ...baseStyle,
          transform: `perspective(1000px) translate3d(0px, 0vh, 0px) rotateY(${tilt.rotY}deg) rotateX(${tilt.rotX}deg) scale(1.2)`,
          zIndex: 20,
          filter: 'brightness(0.8)'
        };
      } else if (position === 'next') {
        return {
          ...baseStyle,
          transform: 'perspective(1000px) translate3d(calc(min(25vw, 300px) * 1.07), 0vh, 0px) rotateY(-45deg) scale(1)',
          zIndex: 10,
          filter: 'brightness(0.5)'
        };
      } else {
        return {
          ...baseStyle,
          transform: 'perspective(1000px) translate3d(calc(min(25vw, 300px) * -1.07), 0vh, 0px) rotateY(45deg) scale(1)',
          zIndex: 10,
          filter: 'brightness(0.5)'
        };
      }
    };

    return (
      <motion.div
        ref={ref}
        className="absolute w-[min(25vw,300px)] aspect-[2/3] select-none"
        style={{
          ...getTransform(),
          transition: 'transform 800ms ease, filter 800ms ease',
          pointerEvents: position === 'current' ? 'auto' : 'none'
        }}
        onMouseMove={position === 'current' ? onMouseMove : undefined}
        onMouseLeave={position === 'current' ? onMouseLeave : undefined}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="relative w-full h-full overflow-hidden">
            <motion.img
              src={slide.image}
              alt={slide.title}
              className="absolute top-1/2 left-1/2 w-full h-full object-cover"
              style={{
                transform: `translate(-50%, -50%) scale(1.25) translate3d(${tilt.bgX}%, ${tilt.bgY}%, 0)`,
                transition: 'transform 100ms ease-out'
              }}
            />
          </div>

          {/* Text Overlay for Current Slide */}
          {showInfo && position === 'current' && (
            <div
              className="absolute left-[-15%] bottom-[15%] z-20 pointer-events-none"
              style={{
                transform: 'translateZ(45px)',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '100%' }}
                  transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1], delay: 0.25 }}
                  className="text-white font-bold text-[min(3cqw,2.4rem)] uppercase tracking-wider whitespace-nowrap"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  {slide.title}
                </motion.div>
              </div>

              <div className="overflow-hidden ml-[2cqw]">
                <motion.div
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '100%' }}
                  transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1], delay: 0.35 }}
                  className="text-white font-semibold text-[min(2.2cqw,1.8rem)] uppercase tracking-wide whitespace-nowrap"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  {slide.subtitle}
                </motion.div>
              </div>

              <div className="overflow-hidden ml-[1cqw]">
                <motion.div
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '100%' }}
                  transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1], delay: 0.45 }}
                  className="text-white font-light text-[min(1.5cqw,0.95rem)] whitespace-nowrap"
                  style={{ fontFamily: "'Archivo', sans-serif" }}
                >
                  {slide.description}
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  }
);

SlideCard.displayName = 'SlideCard';