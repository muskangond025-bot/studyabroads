'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useTransform, useScroll } from 'motion/react';
import { Shield, Heart, Clock, Award, Users, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustReason {
    id: number;
    icon: React.ElementType;
    title: string;
    description: string;
    refId: string;
    status: string;
}

const trustReasons: TrustReason[] = [
    {
        id: 1,
        icon: Shield,
        title: 'Proven Track Record',
        refId: 'EDU_PRV_01',
        status: 'VERIFIED',
        description: 'Over 500 successful admissions placements with a 99.2% success rate. Our selective global network speaks for itself.'
    },
    {
        id: 2,
        icon: Heart,
        title: 'Personalized Approach',
        refId: 'EDU_PRS_02',
        status: 'NOMINAL',
        description: "Every student's profile is a unique narrative. We shape research portfolios and personal statements tailored exclusively to your vision."
    },
    {
        id: 3,
        icon: Clock,
        title: 'Admissions Precision',
        refId: 'EDU_TIM_03',
        status: 'SECURE',
        description: 'Punctuality and meticulous compliance are our promise. We guide you through visa pathways and admissions timelines flawlessly.'
    },
    {
        id: 4,
        icon: Award,
        title: 'Elite Mentorship',
        refId: 'EDU_AWD_04',
        status: 'ELITE',
        description: 'Ivy League, Oxbridge, and elite global university mentors advising you at every step of your application.'
    },
    {
        id: 5,
        icon: Users,
        title: 'Expert Professionals',
        refId: 'EDU_PRF_05',
        status: 'STABLE',
        description: 'Our team brings decades of combined advisory experience in luxury international education consulting.'
    },
    {
        id: 6,
        icon: Sparkles,
        title: 'Attention to Detail',
        refId: 'EDU_DTL_06',
        status: 'OPTIMAL',
        description: 'Nothing is overlooked. From academic CV styling to mock admission interviews, we perfect every single element of your profile.'
    }
];

// Responsive center stack coordinates (relative percentages to center the pile exactly)
const offsetsDesktop = [
    { x: "106%", y: "55%" },   // Card 0 (col 0, row 0) -> slides down/right to center
    { x: "0%", y: "55%" },     // Card 1 (col 1, row 0) -> slides down to center
    { x: "-106%", y: "55%" },  // Card 2 (col 2, row 0) -> slides down/left to center
    { x: "106%", y: "-55%" },  // Card 3 (col 0, row 1) -> slides up/right to center
    { x: "0%", y: "-55%" },    // Card 4 (col 1, row 1) -> slides up to center
    { x: "-106%", y: "-55%" }  // Card 5 (col 2, row 1) -> slides up/left to center
];

const offsetsMobile = [
    { x: "0%", y: "250%" },
    { x: "0%", y: "150%" },
    { x: "0%", y: "50%" },
    { x: "0%", y: "-50%" },
    { x: "0%", y: "-150%" },
    { x: "0%", y: "-250%" }
];

const IntegrityCard = ({
    reason,
    index,
    scrollYProgress,
    isDesktop
}: {
    reason: TrustReason;
    index: number;
    scrollYProgress: any;
    isDesktop: boolean;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // 3D Tilt Spring Coordinates
    const mx = useSpring(0, { stiffness: 150, damping: 20 });
    const my = useSpring(0, { stiffness: 150, damping: 20 });
    const rotateX = useTransform(my, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mx, [-0.5, 0.5], [-10, 10]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mx.set((event.clientX - rect.left) / rect.width - 0.5);
        my.set((event.clientY - rect.top) / rect.height - 0.5);
    };

    // Calculate Stack Offset based on Scroll Progress (fully fanned out at 0.6 progress)
    const xOffset = isDesktop ? offsetsDesktop[index].x : offsetsMobile[index].x;
    const yOffset = isDesktop ? offsetsDesktop[index].y : offsetsMobile[index].y;

    const x = useTransform(scrollYProgress, [0, 0.6], [xOffset, "0%"]);
    const y = useTransform(scrollYProgress, [0, 0.6], [yOffset, "0%"]);
    const scale = useTransform(scrollYProgress, [0, 0.6], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.45], [0.35, 1]);
    const zIndex = useTransform(scrollYProgress, [0, 0.6], [10 + index, 10]);

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); mx.set(0); my.set(0); }}
            style={{
                x,
                y,
                scale,
                opacity,
                zIndex,
                rotateX,
                rotateY,
                perspective: 1200
            }}
            className="relative group bg-white/90 backdrop-blur-3xl p-10 rounded-[32px] border border-[#c5a56d]/30 hover:border-[#c5a56d]/85 hover:shadow-[0_30px_80px_-15px_rgba(197,165,109,0.15)] transition-all duration-500 overflow-hidden shadow-2xl shadow-neutral-200/50 w-full"
        >
            {/* Luminous Inner Glow */}
            <div className="absolute inset-0 rounded-[32px] pointer-events-none border border-white/60 z-10" />
            
            {/* Interactive Scanning Laser */}
            <motion.div 
                animate={{ top: isHovered ? ["-100%", "200%"] : "-100%" }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[120px] bg-gradient-to-b from-transparent via-[#c5a56d]/10 to-transparent z-0 pointer-events-none"
            />

            {/* Icon & Title Layer */}
            <div className="relative z-10 mb-8 flex items-end gap-6">
                <div className="p-4 bg-white rounded-2xl border border-[#c5a56d]/20 group-hover:border-[#c5a56d]/50 transition-all duration-500 shadow-sm">
                    <reason.icon className="w-8 h-8 text-[#c5a56d]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#000000] tracking-tighter" style={{ fontFamily: '"Playfair Display", serif' }}>
                    {reason.title}
                </h3>
            </div>

            {/* Content Description */}
            <div className="relative z-10 space-y-6">
                <p className="text-base text-[#1a1a1a] font-light leading-relaxed">
                    {reason.description}
                </p>
            </div>
        </motion.div>
    );
};

export const WhyTrustUsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(true);

    // Track scroll timeline entry
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"] // Coordinates translation fanning from start to page center
    });

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full py-20 md:py-32 bg-[#fdfbf7] overflow-hidden"
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <filter id="noiseTrustBright">
                            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseTrustBright)" />
                    </svg>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(197,165,109,0.02)_0%,transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(197,165,109,0.01)_0%,transparent_50%)]" />
            </div>

            <div className="relative z-10 container mx-auto px-8 max-w-7xl">
                {/* High-Fidelity Header Sequence */}
                <div className="max-w-5xl mb-20 md:mb-28 text-left">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <div className="w-12 h-[1px] bg-[#c5a56d]" />
                    </motion.div>

                    <h2 
                        className="text-6xl md:text-[9rem] font-bold text-[#1a1a1a] tracking-tighter leading-[0.9] mb-12"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Pillars of <br />
                        <span className="text-[#c5a56d]">Excellence</span>
                    </h2>
                </div>

                {/* Grid Container containing Stack-to-Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 relative">
                    {trustReasons.map((reason, index) => (
                        <IntegrityCard
                            key={reason.id}
                            reason={reason}
                            index={index}
                            scrollYProgress={scrollYProgress}
                            isDesktop={isDesktop}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
