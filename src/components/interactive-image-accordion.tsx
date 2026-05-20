import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'motion/react';
import { Radio, ShieldCheck, Zap, ArrowRight, MousePointer2 } from 'lucide-react';

const AnimatedShader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Dynamic wave settings in brand-aligned HSL palette
    let time = 0;
    const colorPalette = {
      bg: '#fcfaf6', // editorial cream
      wave1: 'rgba(247, 235, 198, 0.45)', // Soft cream gold
      wave2: 'rgba(197, 165, 109, 0.16)',  // Antique champagne gold
      wave3: 'rgba(246, 227, 230, 0.35)'   // Delicate rose blush
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      time += 0.0035;

      // Base coat
      ctx.fillStyle = colorPalette.bg;
      ctx.fillRect(0, 0, width, height);

      // Layer 1: Rose-Blush Organic Drifter
      ctx.beginPath();
      ctx.fillStyle = colorPalette.wave3;
      for (let x = 0; x < width; x++) {
        const y = 
          height * 0.35 + 
          Math.sin(x * 0.0018 + time * 1.3) * 75 + 
          Math.cos(x * 0.0009 - time * 0.7) * 35;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // Layer 2: Soft Cream Gold Waves
      ctx.beginPath();
      ctx.fillStyle = colorPalette.wave1;
      for (let x = 0; x < width; x++) {
        const y = 
          height * 0.45 + 
          Math.cos(x * 0.0014 - time * 1.1) * 85 + 
          Math.sin(x * 0.0028 + time * 0.6) * 45;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // Layer 3: Shimmering Antique Champagne Highlights
      ctx.beginPath();
      ctx.fillStyle = colorPalette.wave2;
      for (let x = 0; x < width; x++) {
        const y = 
          height * 0.55 + 
          Math.sin(x * 0.0022 + time * 1.8) * 55 + 
          Math.cos(x * 0.0011 - time * 1.3) * 65;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // Ambient pearl sheen wash
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
};

interface ServiceItem {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  refCode: string;
}

const accordionItems: ServiceItem[] = [
  {
    id: 1,
    title: 'University Admissions',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1080&auto=format&fit=crop',
    description: 'Elite application strategy and narrative building for Ivy League & top global universities.',
    refCode: 'EXE-ADM-26'
  },
  {
    id: 2,
    title: 'Scholarship Strategy',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1080&auto=format&fit=crop',
    description: 'Securing prestigious financial fellowships, research grants, and fully-funded opportunities.',
    refCode: 'EXE-SCH-26'
  },
  {
    id: 3,
    title: 'Visa & Relocation',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1080&auto=format&fit=crop',
    description: 'Bespoke advisory managing travel, visa documentation, and global transition logistics.',
    refCode: 'EXE-VIS-26'
  },
  {
    id: 4,
    title: 'Test Preparation',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1080&auto=format&fit=crop',
    description: 'High-caliber coaching for GMAT, GRE, SAT, and IELTS with personalized premium mentorship.',
    refCode: 'EXE-TST-26'
  }
];

const AccordionItem = ({ item, isActive, onMouseEnter, index }: { item: ServiceItem, isActive: boolean, onMouseEnter: () => void, index: number }) => {
  return (
    <motion.div
      layout
      className={`relative h-[600px] rounded-[40px] overflow-hidden cursor-pointer transition-all duration-700 ${isActive ? 'w-[500px]' : 'w-[100px]'}`}
      onMouseEnter={onMouseEnter}
      animate={isActive ? {
        y: [0, -8, 0],
      } : { y: 0 }}
      transition={isActive ? {
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        },
        layout: { type: "spring", stiffness: 100, damping: 20 }
      } : { layout: { type: "spring", stiffness: 100, damping: 20 } }}
    >
      <motion.img
        layout
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-[2s]"
        animate={{ 
          scale: isActive ? 1.1 : 1.2,
          filter: isActive ? 'brightness(0.9) contrast(1.1)' : 'brightness(0.4) blur(4px)' 
        }}
      />
      
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-40'}`} />

      <div className="absolute inset-0 p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className={`w-2 h-2 rounded-full bg-[#c5a56d] transition-all duration-700 ${isActive ? 'scale-100' : 'scale-0'}`} />
        </div>

        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-white text-3xl font-bold tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                {item.title}
              </h3>
              <p className="text-white/80 text-sm max-w-[320px] leading-relaxed font-light">
                {item.description}
              </p>
              <div className="pt-4 flex items-center gap-4">
                <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase">Explore Service</span>
                <div className="w-12 h-[1px] bg-white/20" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="inactive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 rotate-90 origin-center whitespace-nowrap"
            >
              <span className="text-white/60 text-[10px] font-bold tracking-[0.6em] uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>
                {item.title}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full bg-[#fcfaf6] overflow-hidden flex items-center pt-32 pb-16">
      {/* Animated Liquid Pearl & Champagne Shader */}
      <AnimatedShader />

      {/* Ambient Grid Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a1a1a" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>

      {/* Moving Geometric Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#1a1a1a]/10 to-[#c5a56d]/5 rounded-full blur-[120px] opacity-70"
        />
        <motion.div
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 50, -50, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-gradient-to-bl from-[#c5a56d]/8 to-[#1a1a1a]/10 rounded-full blur-[140px] opacity-60"
        />
        
        {/* Rotating Globe Outline SVG */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute right-[-10%] top-[10%] w-[800px] h-[800px] opacity-[0.03] text-[#1a1a1a]"
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-full h-full">
            <circle cx="50" cy="50" r="45" />
            <ellipse cx="50" cy="50" rx="30" ry="45" />
            <ellipse cx="50" cy="50" rx="15" ry="45" />
            <line x1="5" y1="50" x2="95" y2="50" />
            <line x1="10" y1="27.5" x2="90" y2="27.5" />
            <line x1="10" y1="72.5" x2="90" y2="72.5" />
          </svg>
        </motion.div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          
          {/* Left Side: Staggered Content */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a1a1a] tracking-tight leading-[1.15]"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                {"Architecting Elite Academic Futures".split(' ').map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden pb-2 -mb-2 mr-3">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className={`inline-block ${i === 1 ? 'text-[#c5a56d] font-semibold' : ''}`}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <p className="text-lg md:text-xl text-[#666666] font-light leading-relaxed max-w-lg" style={{ fontFamily: '"Outfit", sans-serif' }}>
                "Guiding exceptional minds toward world-class universities through precision portfolio strategy and bespoke global admissions storytelling."
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-8"
            >
              <motion.button 
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(197, 165, 109, 0.4)",
                    "0 0 0 15px rgba(197, 165, 109, 0)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="group relative px-12 py-6 bg-[#1a1a1a] text-white rounded-full font-bold tracking-[0.2em] uppercase text-[10px] overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Begin Consultation <ArrowRight className="w-4 h-4" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-[#c5a56d]"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
 
              <div className="flex items-center gap-4 text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors duration-300">
                <MousePointer2 className="w-4 h-4 text-[#c5a56d]" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>Explore Universities</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Spatial Accordion */}
          <div className="lg:col-span-3">
            <div className="flex flex-row items-center justify-end gap-4 min-h-[600px]">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  index={index}
                  isActive={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Kinetic Scanline Detail */}
      <motion.div 
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none opacity-[0.01] bg-gradient-to-b from-transparent via-[#1a1a1a] to-transparent h-20"
      />
    </section>
  );
}
