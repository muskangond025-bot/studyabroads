import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform, useScroll, useInView } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Zap, Globe, Compass, Radio } from 'lucide-react';

const WritingText = ({ text, className, delay = 0, speed = 0.03 }: { text: string; className?: string; delay?: number; speed?: number }) => {
    return (
        <span className={className}>
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.1,
                        delay: delay + (i * speed),
                        ease: "linear"
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
};

const ContactExhibitionCard = ({ info, index }: { info: any; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Tilt Physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    const Icon = info.icon;

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="group relative w-full h-full bg-white border border-[#1a1a1a]/5 rounded-[32px] p-10 space-y-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(128,0,32,0.1)] transition-all duration-500 overflow-hidden"
        >


            {/* Icon Transmission */}
            <div className="relative w-16 h-16 rounded-2xl bg-[#faf9f6] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-6 h-6 text-[#d4af37]" />
                <AnimatePresence>
                    {isHovered && (
                        <motion.div 
                            className="absolute inset-0 rounded-2xl border border-[#d4af37]"
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Content Protocol */}
            <div className="space-y-4">
                <h3 
                    className="text-2xl font-bold text-[#1a1a1a] leading-tight"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                >
                    {info.title}
                </h3>
                <div className="space-y-2">
                    <span className="text-sm font-bold text-[#1a1a1a] uppercase tracking-widest block">
                        {info.description}
                    </span>
                    <p className="text-xs text-[#1a1a1a]/70 italic leading-relaxed">
                        {info.details}
                    </p>
                </div>
            </div>

            {/* Interactive Scanline */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#d4af37]/5 to-transparent w-32 skew-x-12"
                    />
                )}
            </AnimatePresence>


        </motion.div>
    );
};

const contactInfoData = [
    {
        icon: MapPin,
        protocol: 'LONDON_HQ',
        title: 'London Headquarters',
        description: '45 Pall Mall, St. James\'s',
        details: 'London, SW1Y 5JG, United Kingdom',
        color: '#d4af37'
    },
    {
        icon: Phone,
        protocol: 'VOICE_LINK',
        title: 'Academic Hotline',
        description: '+44 (20) 7946 0192',
        details: 'Mon - Fri: 8:00 AM - 8:00 PM GMT',
        color: '#d4af37'
    },
    {
        icon: Mail,
        protocol: 'ADMISSIONS_LINK',
        title: 'Appraisals Intake',
        description: 'advisors@globalpath.com',
        details: 'Response time standard: under 12 hours',
        color: '#d4af37'
    },
    {
        icon: Clock,
        protocol: 'ZURICH_OFFICE',
        title: 'Zurich Office',
        description: 'Bahnhofstrasse 108',
        details: '8001 Zürich, Switzerland',
        color: '#d4af37'
    }
];

export const ContactInfoCards = () => {
    return (
        <section className="relative w-full bg-[#faf9f6] overflow-hidden pt-4 pb-16 md:pt-4 md:pb-16">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="contactGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="50" cy="50" r="1" fill="#1a1a1a" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#contactGrid)" />
                </svg>
            </div>

            <div className="hidden lg:block relative z-10 max-w-7xl mx-auto px-8">
                <InteractiveStackDeck data={contactInfoData} />
            </div>

            <div className="block lg:hidden relative z-10">
                <MobileGrid data={contactInfoData} />
            </div>
        </section>
    );
};

const MobileGrid = ({ data }: { data: any[] }) => {
    return (
        <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-8 space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center gap-3 mb-2"
                >
                    <div className="w-12 h-[1px] bg-[#d4af37]/30" />
                    <span className="text-[10px] font-extrabold tracking-[0.35em] text-[#d4af37] uppercase font-mono">
                        07 / Support Portal
                    </span>
                    <div className="w-12 h-[1px] bg-[#d4af37]/30" />
                </motion.div>
                <h2 
                    className="text-5xl md:text-7xl font-bold text-[#1a1a1a] tracking-tighter"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                >
                    We're Here to <span className="font-light italic text-[#d4af37]">Help.</span>
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.map((info, index) => (
                    <ContactExhibitionCard key={index} info={info} index={index} />
                ))}
            </div>
        </div>
    );
};

const InteractiveStackDeck = ({ data }: { data: any[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // Trigger unfold when the section scrolls into view
    const isInView = useInView(containerRef, { margin: "-200px 0px", once: false });
    
    // Unfold if hovered OR scrolled into view
    const isUnfolded = isHovered || isInView;

    return (
        <div 
            ref={containerRef} 
            className="w-full relative flex flex-col items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); }}
        >
            {/* Section Header HUD */}
            <div className="text-center mb-8 space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center gap-3 mb-2"
                >
                    <div className="w-12 h-[1px] bg-[#d4af37]/30" />
                    <span className="text-[10px] font-extrabold tracking-[0.35em] text-[#d4af37] uppercase font-mono">
                        07 / Support Portal
                    </span>
                    <div className="w-12 h-[1px] bg-[#d4af37]/30" />
                </motion.div>
                <h2 
                    className="text-6xl md:text-7xl font-bold text-[#1a1a1a] tracking-tighter"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                >
                    We're Here to <span className="font-light italic text-[#d4af37]">Help.</span>
                </h2>
            </div>

            {/* Interactive Cards Container */}
            <div className="relative w-full h-[380px] flex justify-center">
                {data.map((info, index) => (
                    <AnimatedStackedCard 
                        key={index} 
                        info={info} 
                        index={index} 
                        isUnfolded={isUnfolded}
                    />
                ))}
            </div>
        </div>
    );
};

const AnimatedStackedCard = ({ info, index, isUnfolded }: { info: any, index: number, isUnfolded: boolean }) => {
    // Deck Position (Centered stack)
    const deckX = index * 4; 
    const deckY = index * 6;
    const deckRotate = (index - 1.5) * 6;
    
    // Dealt Position (Linear grid side by side)
    const dealtXPositions = [-468, -156, 156, 468];
    
    const targetX = isUnfolded ? dealtXPositions[index] : deckX;
    const targetY = isUnfolded ? 0 : deckY;
    const targetRotate = isUnfolded ? 0 : deckRotate;
    
    return (
        <motion.div 
            className="absolute top-0 w-[280px] h-[380px]"
            style={{ left: 'calc(50% - 140px)', zIndex: 10 - index }}
            animate={{ 
                x: targetX, 
                y: targetY, 
                rotate: targetRotate 
            }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: isUnfolded ? index * 0.15 : (3 - index) * 0.1 // Stagger out sequentially (0->3), stagger in sequentially (3->0)
            }}
        >
            <ContactExhibitionCard info={info} index={index} />
        </motion.div>
    );
};
