'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ScrollExpandMediaProps {
  bgImageSrc: string;
  title?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  bgImageSrc,
  title,
  children,
}: ScrollExpandMediaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress over 2 viewports (200vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Animations based on scroll progress
  // 0 -> 0.5: Expansion phase
  // 0.5 -> 1: Content phase

  const expansionProgress = useTransform(smoothProgress, [0, 0.4], [0, 1]);
  const contentOpacity = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);
  const heroOpacity = useTransform(smoothProgress, [0.8, 1], [1, 0]);

  const textTranslateX = useTransform(expansionProgress, [0, 1], [0, 150]);
  const bgScale = useTransform(expansionProgress, [0, 1], [1.1, 1]);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={containerRef} className='relative h-[250vh] w-full bg-[#faf9f6]'>
      <div className='sticky top-0 h-screen w-full overflow-hidden'>
        {/* Background Image */}
        <motion.div
          className='absolute inset-0 z-0'
          style={{
            scale: bgScale,
            opacity: useTransform(smoothProgress, [0, 0.4], [1, 0.8])
          }}
        >
          <ImageWithFallback
            src={bgImageSrc}
            alt='Background'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/20' />
        </motion.div>

        {/* Hero Text Reveal */}
        <div className='relative z-10 flex flex-col items-center justify-center h-full w-full pointer-events-none'>
          <div className='flex flex-col items-center justify-center gap-4 w-full'>
            <motion.h2
              className='text-6xl md:text-8xl lg:text-8xl font-bold tracking-tight text-white'
              style={{
                x: useTransform(textTranslateX, (val) => `-${val}px`),
                fontFamily: '"Playfair Display", serif',
                textShadow: '0 10px 40px rgba(0,0,0,0.4), 0 0 20px rgba(0,0,0,0.2)',
                opacity: useTransform(expansionProgress, [0.8, 1], [1, 0])
              }}
            >
              YOUR EVENTS
            </motion.h2>
            <motion.h2
              className='text-6xl md:text-8xl lg:text-8xl font-bold italic tracking-tight bg-gradient-to-br from-[#f4e4a6] via-[#d4af37] to-[#ff6b6b] bg-clip-text text-transparent'
              style={{
                x: useTransform(textTranslateX, (val) => `${val}px`),
                fontFamily: '"Playfair Display", serif',
                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
                opacity: useTransform(expansionProgress, [0.8, 1], [1, 0])
              }}
            >
              REIMAGINED
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Content Section - Appears as you scroll further */}
      <motion.div
        className='relative z-20 w-full min-h-screen flex items-center'
        style={{ opacity: contentOpacity }}
      >
        <div className='w-full'>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollExpandMedia;
