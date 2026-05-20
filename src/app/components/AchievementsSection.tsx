'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useInView, useScroll, AnimatePresence } from 'motion/react';
import { Award, Users, Calendar, TrendingUp, Star, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Achievement {
    id: number;
    icon: React.ElementType;
    number: string;
    label: string;
    description: string;
    refId: string;
}

const achievements: Achievement[] = [
    {
        id: 1,
        icon: Calendar,
        number: '500+',
        label: 'Elite Placements',
        description: 'Successfully guided scholars into top global universities.',
        refId: 'EDU_PL_01'
    },
    {
        id: 2,
        icon: Users,
        number: '500+',
        label: 'Admitted Scholars',
        description: 'Placed in Ivy League, Russell Group & top global programs.',
        refId: 'EDU_CL_02'
    },
    {
        id: 3,
        icon: Award,
        number: '18+',
        label: 'Scholarships ($M)',
        description: 'Merit aids and research fellowships successfully awarded.',
        refId: 'EDU_AW_03'
    },
    {
        id: 4,
        icon: Star,
        number: '99%',
        label: 'Admissions Success',
        description: 'Scholars admitted to their first-choice global programs.',
        refId: 'EDU_ST_04'
    },
    {
        id: 5,
        icon: Target,
        number: '10',
        label: 'Years Leadership',
        description: 'Proven track record in elite international admissions strategy.',
        refId: 'EDU_YR_05'
    },
    {
        id: 6,
        icon: TrendingUp,
        number: '100%',
        label: 'Visa Approval',
        description: 'Flawless record in international student visa applications.',
        refId: 'EDU_RT_06'
    }
];

// Stack coordinates fanning outward from the center
const offsetsDesktop = [
    { x: "106%", y: "55%" },   // Card 0 (col 0, row 0)
    { x: "0%", y: "55%" },     // Card 1 (col 1, row 0)
    { x: "-106%", y: "55%" },  // Card 2 (col 2, row 0)
    { x: "106%", y: "-55%" },  // Card 3 (col 0, row 1)
    { x: "0%", y: "-55%" },    // Card 4 (col 1, row 1)
    { x: "-106%", y: "-55%" }  // Card 5 (col 2, row 1)
];

const offsetsMobile = [
    { x: "0%", y: "250%" },
    { x: "0%", y: "150%" },
    { x: "0%", y: "50%" },
    { x: "0%", y: "-50%" },
    { x: "0%", y: "-150%" },
    { x: "0%", y: "-250%" }
];

// Custom 3D hand fan angle offsets for the cards when stacked before scroll
const hoverRotations = [-9, -4, 9, -6, 0, 6];

const MetricCard = ({
    achievement,
    index,
    scrollYProgress,
    isDesktop,
    isStackedHovered
}: {
    achievement: Achievement;
    index: number;
    scrollYProgress: any;
    isDesktop: boolean;
    isStackedHovered: boolean;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: false, margin: "-50px" });
    const [count, setCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Cursor Tilt Springs
    const mx = useSpring(0, { stiffness: 200, damping: 20 });
    const my = useSpring(0, { stiffness: 200, damping: 20 });
    const rotateX = useTransform(my, [-0.5, 0.5], [12, -12]);
    const rotateY = useTransform(mx, [-0.5, 0.5], [-12, 12]);

    // Metric odometer counting logic
    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = parseInt(achievement.number.replace(/\D/g, ''));
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        } else {
            setCount(0);
        }
    }, [isInView, achievement.number]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mx.set((event.clientX - rect.left) / rect.width - 0.5);
        my.set((event.clientY - rect.top) / rect.height - 0.5);
    };

    // Calculate Stack Offset fanning out from viewport scroll progress
    const xOffset = isDesktop ? offsetsDesktop[index].x : offsetsMobile[index].x;
    const yOffset = isDesktop ? offsetsDesktop[index].y : offsetsMobile[index].y;

    const x = useTransform(scrollYProgress, [0, 0.6], [xOffset, "0%"]);
    const y = useTransform(scrollYProgress, [0, 0.6], [yOffset, "0%"]);
    const scale = useTransform(scrollYProgress, [0, 0.6], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.45], [0.35, 1]);
    const zIndex = useTransform(scrollYProgress, [0, 0.6], [10 + index, 10]);

    // Blended Hover Stack Rotation (Active only before cards spread out!)
    const scrollFactor = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const hoverRotSpring = useSpring(0, { stiffness: 100, damping: 15 });

    useEffect(() => {
        hoverRotSpring.set(isStackedHovered ? hoverRotations[index] : 0);
    }, [isStackedHovered]);

    // Combine scroll multiplier and hover rotation springs organically
    const rotate = useTransform([scrollFactor, hoverRotSpring], ([factor, hoverRot]: number[]) => factor * hoverRot);

    return (
        <motion.div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); mx.set(0); my.set(0); }}
            onMouseMove={handleMouseMove}
            style={{
                x,
                y,
                scale,
                opacity,
                zIndex,
                rotate,
                rotateX,
                rotateY,
                perspective: 1500
            }}
            className="relative group bg-white/50 backdrop-blur-3xl p-8 border border-[#1a1a1a]/5 hover:border-[#c5a56d]/50 transition-all duration-500 flex flex-col justify-between aspect-square overflow-hidden rounded-[32px] shadow-2xl shadow-neutral-200/50 w-full"
        >
            {/* Shimmer Draw Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                <motion.rect
                    width="100%"
                    height="100%"
                    rx="32"
                    fill="none"
                    stroke="#c5a56d"
                    strokeWidth="1.5"
                    strokeDasharray="0 100%"
                    animate={{ strokeDasharray: isHovered ? "100% 0" : "0 100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />
            </svg>

            {/* Laser Scan Light */}
            <motion.div
                animate={{ top: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-transparent via-[#c5a56d]/5 to-transparent z-0 pointer-events-none"
            />

            {/* Icon Banner */}
            <div className="relative z-10 flex justify-between items-start">
                <div />
                <motion.div
                    animate={{ rotate: isHovered ? 360 : 0, scale: isHovered ? 1.08 : 1 }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                    className="p-4 bg-white rounded-2xl border border-[#c5a56d]/15 shadow-sm"
                >
                    <achievement.icon className="w-8 h-8 text-[#c5a56d]" />
                </motion.div>
            </div>

            {/* Odometer Metrics */}
            <div className="relative z-10 mt-4 text-left">
                <div className="relative inline-block">
                    <AnimatePresence>
                        {isHovered && (
                            <motion.span
                                initial={{ opacity: 0, x: 0 }}
                                animate={{ opacity: 0.12, x: 10, y: 5 }}
                                exit={{ opacity: 0, x: 0 }}
                                className="absolute inset-0 text-6xl md:text-7xl font-bold text-[#c5a56d] tracking-tighter blur-[4px] pointer-events-none"
                                style={{ fontFamily: '"Playfair Display", serif' }}
                            >
                                {count}
                            </motion.span>
                        )}
                    </AnimatePresence>

                    <motion.div
                        animate={{ scale: isHovered ? 1.03 : 1 }}
                        className="flex items-baseline gap-1 relative z-10"
                    >
                        <span className="text-6xl md:text-7xl font-bold text-[#1a1a1a] tracking-tighter leading-none" style={{ fontFamily: '"Playfair Display", serif' }}>
                            {count}
                        </span>
                        <span className="text-2xl font-light text-[#c5a56d] opacity-90">
                            {achievement.number.includes('+') ? '+' : achievement.number.includes('%') ? '%' : ''}
                        </span>
                    </motion.div>
                </div>
                <div className="w-12 h-[1.5px] bg-[#c5a56d]/30 mt-3 group-hover:w-full transition-all duration-1000" />
            </div>

            {/* Label & description */}
            <div className="relative z-10 space-y-3 mt-4 text-left">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-[1px] bg-[#c5a56d]" />
                    <h3 className="text-[10px] font-bold tracking-[0.4em] text-[#1a1a1a] uppercase">{achievement.label}</h3>
                </div>
                <p className="text-[14px] text-[#1a1a1a]/75 font-normal leading-relaxed">
                    {achievement.description}
                </p>
            </div>
        </motion.div>
    );
};

export const AchievementsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(true);
    const [isStackedHovered, setIsStackedHovered] = useState(false);

    // Track scroll timeline fanning entry
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
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
            {/* Atmospheric Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(197,165,109,0.02)_0%,transparent_75%)]" />
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <filter id="noiseHighPerf">
                            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseHighPerf)" />
                    </svg>
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-8 max-w-7xl">
                {/* Cinematic Header Sequence */}
                <div className="max-w-5xl mb-24 md:mb-32 text-left">
                    <h2
                        className="text-6xl md:text-[9rem] font-bold text-[#1a1a1a] tracking-tighter leading-[0.95] mb-8"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        {"Quantifying".split('').map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ duration: 1, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                                className="inline-block origin-bottom"
                            >
                                {char}
                            </motion.span>
                        ))}
                        <br />
                        <span className="text-[#c5a56d] block italic">Performance</span>
                    </h2>
                </div>

                {/* Grid container with hover listeners to trigger hand rotations when stacked */}
                <div
                    onMouseEnter={() => setIsStackedHovered(true)}
                    onMouseLeave={() => setIsStackedHovered(false)}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 relative"
                >
                    {achievements.map((achievement, index) => (
                        <MetricCard
                            key={achievement.id}
                            achievement={achievement}
                            index={index}
                            scrollYProgress={scrollYProgress}
                            isDesktop={isDesktop}
                            isStackedHovered={isStackedHovered}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
