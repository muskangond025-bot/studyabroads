'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';

interface MilestoneData {
  id: number;
  tabLabel: string;
  tag: string;
  title: string;
  description: string;
  bullets?: string[];
  ctaText: string;
  imageUrl: string;
}

const milestoneData: MilestoneData[] = [
  {
    id: 0,
    tabLabel: "Foundations",
    tag: "01 • STUDY ABROAD FOUNDATIONS",
    title: "Pioneering elite study abroad strategies in London.",
    description: "Established our premier global study abroad advisory system, pioneering customized international student portfolio mentoring and high-fidelity elite university preparation pipelines.",
    ctaText: "Explore Foundations",
    imageUrl: "/london_foundations.png"
  },
  {
    id: 1,
    tabLabel: "Expansion",
    tag: "02 • GLOBAL STUDY PATHWAYS",
    title: "Expanding premium study abroad hubs worldwide.",
    description: "Expanded our global footprint to Toronto, Singapore, and Sydney, establishing direct fellowship pipelines and secure study abroad pathways with leading research universities.",
    ctaText: "Explore Pathways",
    imageUrl: "/global_pathways.png"
  },
  {
    id: 2,
    tabLabel: "Achievements",
    tag: "03 • STUDY ABROAD PRESTIGE",
    title: "Celebrating top-percentile study abroad placements.",
    description: "Meticulously engineering academic portfolios that capture elite global university interest, achieving industry-leading study abroad placement metrics year-over-year.",
    bullets: [
      "Over 500+ successful global study abroad placements",
      "Awarded 'Premier Global Study Abroad Consultancy'",
      "99.2% student university placement success rate",
      "Direct pathways to 50+ elite international universities"
    ],
    ctaText: "Begin Consultation",
    imageUrl: "/placement_prestige.png"
  }
];

const ThreeDImageCard = ({ imageUrl, altText }: { imageUrl: string; altText: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 22 });
  const y = useSpring(0, { stiffness: 150, damping: 22 });

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / rect.width) - 0.5;
    const yPct = (mouseY / rect.height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square rounded-[40px] bg-neutral-100/50 dark:bg-neutral-900/10 border border-neutral-200/40 flex items-center justify-center overflow-hidden group cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.015)]"
      style={{ perspective: 1000 }}
    >
      {/* 3D Dynamic Glow Aura */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#c5a56d]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

      {/* Dynamic Rotational Radar Grid in background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute w-72 h-72 border border-[#c5a56d]/10 rounded-full border-dashed pointer-events-none opacity-40 group-hover:scale-105 transition-transform duration-1000 z-0"
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          width: '90%',
          height: '90%'
        }}
        className="relative z-10 transition-transform duration-200 ease-out rounded-3xl overflow-hidden border border-neutral-200/50 shadow-2xl"
      >
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Soft luxurious gold/dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
};

export function OurServices() {
  const [activeTab, setActiveTab] = useState(0);
  const currentMilestone = milestoneData[activeTab];

  return (
    <section className="relative w-full bg-[#fcfaf6] py-32 overflow-hidden flex flex-col items-center" id="services">
      {/* Editorial Grid Backing */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="milestoneGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a1a1a" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#milestoneGrid)" />
        </svg>
      </div>

      <div className="container mx-auto px-8 relative z-10 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <span className="text-[10px] font-bold tracking-[0.4em] text-[#c5a56d] uppercase block">
            Academic Milestones
          </span>
          <h2
            className="text-5xl md:text-7xl font-bold text-[#1a1a1a] tracking-tighter"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            A Legacy of Strategic Placements
          </h2>
          <p
            className="text-lg md:text-xl text-[#1a1a1a]/40 font-light italic max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            "An archival database tracking the milestone timelines of our elite study abroad placements."
          </p>
        </div>

        {/* Tab Switcher: Inspired by Shadcn */}
        <div className="flex justify-center gap-3 mb-16">
          {milestoneData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#1a1a1a] text-white shadow-md scale-105"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {tab.tabLabel}
            </button>
          ))}
        </div>

        {/* Responsive Redesigned Card Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom ease-out cubic-bezier
            className="bg-white/70 backdrop-blur-md border border-neutral-200/50 rounded-[48px] p-8 md:p-16 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.025)] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              {/* Left Column: Strategy Info */}
              <div className="lg:col-span-7 space-y-8 text-left">
                <span className="text-[10px] font-bold text-[#c5a56d] tracking-[0.3em] uppercase block">
                  {currentMilestone.tag}
                </span>
                
                <h3
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1a1a1a] leading-none"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {currentMilestone.title}
                </h3>
                
                <p className="text-lg md:text-xl text-[#1a1a1a]/70 font-light leading-relaxed max-w-2xl">
                  {currentMilestone.description}
                </p>

                {/* Sub-Bullets for Achievements tab */}
                {currentMilestone.bullets && (
                  <div className="space-y-3 pt-2">
                    {currentMilestone.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex gap-4 items-center text-[#1a1a1a]/80">
                        <div className="w-5 h-5 rounded-full bg-[#c5a56d]/10 border border-[#c5a56d]/30 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-[#c5a56d]" strokeWidth={3} />
                        </div>
                        <span className="text-base font-medium tracking-tight leading-relaxed">{bullet}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sleek Dark CTA Button */}
                <div className="pt-6">
                  <button className="group relative px-10 py-5 bg-[#1a1a1a] text-white rounded-full font-bold tracking-[0.2em] uppercase text-[10px] overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg hover:shadow-xl">
                    <span className="relative z-10 flex items-center gap-3">
                      {currentMilestone.ctaText} <ArrowRight className="w-4 h-4" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-[#c5a56d]"
                      initial={{ y: "100%" }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </button>
                </div>
              </div>

              {/* Right Column: 3D Image Illustration Container */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <ThreeDImageCard 
                  imageUrl={currentMilestone.imageUrl} 
                  altText={currentMilestone.title} 
                />
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}