import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Heart, Clock, Shield, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface ReasonItem {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  refCode: string;
}

const reasons: ReasonItem[] = [
  {
    id: 1,
    icon: Award,
    title: 'Expert Team',
    description: '15+ years of archival experience and precision curation.',
    refCode: 'RLB-EXP-01'
  },
  {
    id: 2,
    icon: Heart,
    title: 'Personalized Service',
    description: 'Architecting unique visions with empathetic spatial design.',
    refCode: 'RLB-PRZ-02'
  },
  {
    id: 3,
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'Synchronized temporal execution with 100% temporal reliability.',
    refCode: 'RLB-TME-03'
  },
  {
    id: 4,
    icon: Shield,
    title: 'Quality Guarantee',
    description: 'Archival-grade standards and technical satisfaction protocols.',
    refCode: 'RLB-QLT-04'
  }
];

const ReliabilityCard = ({ item, index }: { item: ReasonItem, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15, 
        ease: [0.215, 0.61, 0.355, 1] 
      }}
      whileHover={{
        y: -12,
        scale: 1.03,
        borderColor: "rgba(197, 165, 109, 0.3)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 p-10 rounded-[32px] cursor-pointer shadow-[0_20px_40px_-20px_rgba(26,26,26,0.03)] hover:shadow-[0_40px_80px_-20px_rgba(26,26,26,0.12)] transition-all duration-500 min-h-[380px] flex flex-col justify-between overflow-hidden"
    >
      {/* Decorative Gradient Background Wash */}
      <div className={`absolute inset-0 bg-gradient-to-br from-[#c5a56d]/5 to-transparent opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />

      {/* Top Section */}
      <div className="relative z-10 flex justify-between items-start">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isHovered ? 'bg-[#1a1a1a] text-white' : 'bg-[#1a1a1a]/5 text-[#1a1a1a]'}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[8px] font-bold tracking-[0.5em] text-[#c5a56d] uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>{item.refCode}</span>
          <div className={`h-[2px] bg-[#c5a56d] transition-all duration-500 ${isHovered ? 'w-8' : 'w-3'}`} />
        </div>
      </div>

      {/* Body Content */}
      <div className="relative z-10 space-y-4 pt-8">
        <h3 
          className="text-2xl font-bold text-[#1a1a1a] tracking-tight group-hover:text-[#c5a56d] transition-colors duration-500"
          style={{ fontFamily: '"Outfit", sans-serif' }}
        >
          {item.title}
        </h3>
        <p className="text-sm text-[#666666] font-light leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Footer Details */}
      <div className="relative z-10 pt-6 border-t border-[#1a1a1a]/5 flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className={`w-3.5 h-3.5 transition-colors duration-500 ${isHovered ? 'text-[#c5a56d]' : 'text-[#1a1a1a]/30'}`} />
          <span className="text-[7px] font-bold tracking-[0.3em] text-[#666666] uppercase italic" style={{ fontFamily: '"Outfit", sans-serif' }}>Reliability Sync</span>
        </div>
        <ArrowRight className={`w-4 h-4 transition-all duration-500 ${isHovered ? 'text-[#c5a56d] translate-x-1' : 'text-[#1a1a1a]/20'}`} />
      </div>

      {/* Telemetry Hover Detail */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.08, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
          >
            <Zap className="w-48 h-48 text-[#c5a56d]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const WhyChooseUsMini = () => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#F8F9FA] overflow-hidden">
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a1a1a" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-6 mb-8"
          >
            <div className="w-12 h-[1px] bg-[#c5a56d]" />
            <span className="text-[10px] font-bold tracking-[1em] text-[#c5a56d] uppercase italic" style={{ fontFamily: '"Outfit", sans-serif' }}>Spatial Standards</span>
            <div className="w-12 h-[1px] bg-[#c5a56d]" />
          </motion.div>

          <h2 
            className="text-5xl md:text-7xl font-bold text-[#1a1a1a] tracking-tight leading-tight mb-8"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            {"Why Choose Us".split(' ').map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-4 pb-2 -mb-2">
                <motion.span
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <p className="text-lg md:text-xl text-[#666666] font-light leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: '"Outfit", sans-serif' }}>
            "What sets us apart in event management excellence through architectural precision and archival reliability."
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, index) => (
            <ReliabilityCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* Kinetic Scanline */}
      <motion.div 
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none opacity-[0.01] bg-gradient-to-b from-transparent via-[#1a1a1a] to-transparent h-40"
      />
    </section>
  );
};