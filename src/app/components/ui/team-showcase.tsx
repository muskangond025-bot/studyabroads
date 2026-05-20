'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'motion/react';
import { FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  refId: string;
  experience: string;
  description: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Elizabeth Vance',
    role: 'FOUNDER & CHIEF ADVISOR',
    refId: 'EDU_DIR_001',
    experience: '18 YRS',
    description: 'Admissions pioneer with nearly two decades of elite consulting experience. Specializes in strategic Oxford, Cambridge, and Ivy League candidate preparation.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    social: { twitter: '#', linkedin: '#', instagram: '#' },
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    role: 'HEAD OF VISA & STRATEGY',
    refId: 'EDU_OPS_002',
    experience: '15 YRS',
    description: 'Master strategist for complex visa protocols and relocational administration. Successfully placed over 800 candidates in elite programs across North America and Europe.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '3',
    name: 'Dr. Clara Montgomery',
    role: 'SENIOR ACADEMIC PLANNER',
    refId: 'EDU_PLN_003',
    experience: '12 YRS',
    description: 'Expert curriculum architect and strategic placement counselor. Focuses on technical portfolio design, early scholarship mapping, and research syllabus construction.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    social: { linkedin: '#', instagram: '#' },
  },
  {
    id: '4',
    name: 'Dr. Alistair Sterling',
    role: 'PORTFOLIO & ESSAY STRATEGIST',
    refId: 'EDU_DSG_004',
    experience: '10 YRS',
    description: 'Creative advisor helping candidates craft compelling personal profiles and stand-out university application essays. Alumnus of Yale and Princeton University admissions boards.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    social: { twitter: '#', linkedin: '#' },
  },
];

const StackCard = ({
  member,
  position,
  onFlip,
  isTop,
}: {
  member: TeamMember;
  position: number;
  onFlip: () => void;
  isTop: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Spring Physics - only active on the top/front card
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isTop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Stack Positioning coordinates (0 = top, 1 = middle, 2 = bottom, 3 = hidden/back)
  const getCardStyle = () => {
    switch (position) {
      case 0: // Front card
        return {
          x: 0,
          y: 0,
          scale: 1,
          zIndex: 40,
          opacity: 1,
          rotate: 0,
          rotateY: 0,
        };
      case 1: // Middle card
        return {
          x: 12,
          y: -12,
          scale: 0.96,
          zIndex: 30,
          opacity: 0.9,
          rotate: 1.5,
          rotateY: 0,
        };
      case 2: // Bottom card
        return {
          x: 24,
          y: -24,
          scale: 0.92,
          zIndex: 20,
          opacity: 0.75,
          rotate: -1.5,
          rotateY: 0,
        };
      default: // Hidden / Back card executing the flip slide-off
        return {
          x: -240,
          y: 30,
          scale: 0.85,
          zIndex: 10,
          opacity: 0,
          rotate: -12,
          rotateY: 90,
        };
    }
  };

  return (
    <motion.div
      ref={cardRef}
      animate={getCardStyle()}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => isTop && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => isTop && onFlip()}
      style={{
        rotateX: isTop ? rotateX : 0,
        rotateY: isTop ? rotateY : 0,
        perspective: 1200,
      }}
      className={cn(
        "absolute w-full h-full bg-white border border-[#1a1a1a]/5 hover:border-[#c5a56d]/30 rounded-[32px] overflow-hidden p-5 flex flex-col group select-none shadow-xl shadow-[#1a1a1a]/5",
        isTop ? "cursor-pointer pointer-events-auto" : "pointer-events-none"
      )}
    >
      {/* Image Wrap */}
      <div className="relative overflow-hidden rounded-[24px] aspect-[4/5] w-full mb-6 z-0">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/30 to-transparent pointer-events-none" />
        
        {/* Experience Badge */}
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#1a1a1a] text-[9px] font-extrabold tracking-[0.2em] px-3.5 py-1.5 rounded-full border border-black/5 uppercase">
          {member.experience} EXP
        </span>
      </div>

      {/* Meta Identifier */}
      <span className="text-[9px] font-bold tracking-[0.25em] text-[#c5a56d] uppercase mb-2">
        {member.refId}
      </span>

      {/* Name */}
      <h3
        className="text-2xl md:text-3xl font-bold text-[#1a1a1a] tracking-tight group-hover:text-[#c5a56d] transition-colors duration-300 mb-2 leading-none"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {member.name}
      </h3>

      {/* Role */}
      <p className="text-[10px] font-bold tracking-[0.18em] text-[#1a1a1a]/50 uppercase mb-4">
        {member.role}
      </p>

      {/* Shimmer Border Overlay */}
      {isTop && (
        <div className="absolute inset-0 rounded-[32px] border border-[#c5a56d]/0 group-hover:border-[#c5a56d]/30 pointer-events-none transition-colors duration-500" />
      )}
    </motion.div>
  );
};

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: { members?: TeamMember[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cycleDuration = 4000; // 4 seconds per flip
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % members.length);
    }, cycleDuration);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [members.length]);

  const handleFlip = () => {
    setActiveIndex((prev) => (prev + 1) % members.length);
    resetTimer(); // Reset auto-flip interval on manual interaction
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + members.length) % members.length);
    resetTimer();
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % members.length);
    resetTimer();
  };

  const activeMember = members[activeIndex];

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24 w-full pt-4">
      {/* ── Left Column: 3D Stack Deck ── */}
      <div className="w-full lg:w-1/2 flex justify-center py-6 relative select-none">
        <div className="relative w-[310px] h-[450px] sm:w-[330px] sm:h-[480px]">
          {members.map((member, i) => {
            // Calculate relative index position in the stack (0 = top, 1 = middle, 2 = bottom, 3 = back)
            const position = (i - activeIndex + members.length) % members.length;
            const isTop = position === 0;

            return (
              <StackCard
                key={member.id}
                member={member}
                position={position}
                onFlip={handleFlip}
                isTop={isTop}
              />
            );
          })}
        </div>
      </div>

      {/* ── Right Column: Strategist Ledger Metadata Dossier ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center pt-6 lg:pt-12 select-none">
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5 text-left"
            >
              {/* Telemetry pill */}
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-extrabold tracking-[0.25em] text-[#c5a56d] uppercase">
                  {activeMember.refId} • STRATEGIST DOSSIER
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a56d]/40 animate-pulse" />
              </div>

              {/* Title Name */}
              <h3
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1a1a1a] tracking-tight leading-none mb-1"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                {activeMember.name}
              </h3>

              {/* Position Subtitle */}
              <p className="text-[10px] font-bold tracking-[0.25em] text-[#1a1a1a]/40 uppercase">
                {activeMember.role}
              </p>

              {/* Strategy Bio */}
              <p
                className="text-lg sm:text-xl text-[#1a1a1a]/70 font-normal leading-relaxed italic max-w-xl mb-4"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                "{activeMember.description}"
              </p>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-8 border-t border-b border-[#1a1a1a]/5 py-5 mt-2">
                <div>
                  <span className="text-[9px] font-bold text-[#1a1a1a]/40 tracking-widest uppercase block mb-1">
                    Advisory Tenure
                  </span>
                  <span className="text-xl font-bold text-[#1a1a1a]">
                    {activeMember.experience} Placement
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-[#1a1a1a]/40 tracking-widest uppercase block mb-1">
                    Ivy League Success
                  </span>
                  <span className="text-xl font-bold text-[#c5a56d]">
                    100% Guaranteed
                  </span>
                </div>
              </div>

              {/* Dossier Social Footprint */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-[9px] font-extrabold text-[#1a1a1a]/70 hover:text-[#c5a56d] transition-colors duration-300 tracking-widest uppercase cursor-default">
                  Social Fingerprint:
                </span>
                <div className="flex items-center gap-2">
                  {activeMember.social?.linkedin && (
                    <a
                      href={activeMember.social.linkedin}
                      className="text-[#1a1a1a]/70 hover:text-[#c5a56d] transition-colors duration-300"
                    >
                      <FaLinkedinIn size={12} />
                    </a>
                  )}
                  {activeMember.social?.twitter && (
                    <a
                      href={activeMember.social.twitter}
                      className="text-[#1a1a1a]/70 hover:text-[#c5a56d] transition-colors duration-300"
                    >
                      <FaTwitter size={12} />
                    </a>
                  )}
                  {activeMember.social?.instagram && (
                    <a
                      href={activeMember.social.instagram}
                      className="text-[#1a1a1a]/70 hover:text-[#c5a56d] transition-colors duration-300"
                    >
                      <FaInstagram size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* HUD Dossier Navigation Controls */}
        <div className="flex items-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-[#1a1a1a]/10 hover:border-[#c5a56d] hover:bg-[#c5a56d]/5 flex items-center justify-center text-[#1a1a1a]/60 hover:text-[#c5a56d] transition-all duration-300"
          >
            <ChevronLeft size={16} />
          </button>
          
          <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#1a1a1a]/50 uppercase">
            0{activeIndex + 1} / 0{members.length}
          </span>
          
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-[#1a1a1a]/10 hover:border-[#c5a56d] hover:bg-[#c5a56d]/5 flex items-center justify-center text-[#1a1a1a]/60 hover:text-[#c5a56d] transition-all duration-300"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
