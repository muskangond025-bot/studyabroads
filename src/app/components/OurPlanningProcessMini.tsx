import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { MessageSquare, Calendar, Palette, CheckCircle, Radio, ShieldCheck, ArrowRight } from 'lucide-react';

const processSteps = [
    {
        id: 1,
        icon: MessageSquare,
        title: 'Initial Consultation',
        description: 'Deep archival discovery to understand your unique vision and spatial requirements.',
        refCode: 'PRC-CON-01',
        blobPath: "M192.1,-148.2C230,-105.8,228.6,-27,204.4,33.7C180.2,94.3,133.3,136.8,77.7,165C22.1,193.1,-42.1,206.9,-94.5,185.7C-146.9,164.5,-187.5,108.3,-201.7,46C-215.9,-16.2,-203.7,-84.5,-165.7,-127C-127.7,-169.5,-63.8,-186.3,6.6,-191.6C77.1,-196.9,154.3,-190.7,192.1,-148.2Z"
    },
    {
        id: 2,
        icon: Calendar,
        title: 'Strategic Planning',
        description: 'Architecting a comprehensive temporal blueprint with precision-timed milestones.',
        refCode: 'PRC-PLN-02',
        blobPath: "M211.2,-158.4C254.3,-112.1,256.7,-30.9,232.1,43.2C207.5,117.3,155.9,184.2,90.4,210.1C24.9,236.1,-54.5,221.1,-118.2,185.4C-181.9,149.7,-229.9,93.4,-241.6,26.2C-253.3,-41.1,-228.7,-119.3,-178.6,-167.3C-128.5,-215.3,-53,-233,-1.4,-231.8C50.2,-230.5,168.1,-204.7,211.2,-158.4Z"
    },
    {
        id: 3,
        icon: Palette,
        title: 'Creative Design',
        description: 'Visualizing atmospheric layers and sensory textures to bring the concept to life.',
        refCode: 'PRC-DSG-03',
        blobPath: "M205.8,-164.2C247.7,-118.6,249.5,-35.1,226.7,35.4C203.9,105.8,156.4,163.3,95.5,188.7C34.6,214.1,-39.7,207.4,-102.1,178.3C-164.5,149.2,-215,97.7,-228.8,32.7C-242.6,-32.3,-219.7,-110.8,-171.1,-158.1C-122.5,-205.4,-48.2,-221.5,19.3,-244.8C86.8,-268.1,163.9,-209.8,205.8,-164.2Z"
    },
    {
        id: 4,
        icon: CheckCircle,
        title: 'Seamless Execution',
        description: 'Flawless synchronization of onsite elements with synchronized archival precision.',
        refCode: 'PRC-EXE-04',
        blobPath: "M224.3,-142.1C268.7,-85.7,267.1,5.2,238.1,78.2C209.1,151.2,152.7,206.2,85.6,230.1C18.5,254.1,-59.3,246.9,-120.7,212.1C-182.1,177.3,-227,114.9,-238.4,45.2C-249.8,-24.5,-227.7,-101.5,-181.1,-158.8C-134.5,-216.1,-63.4,-253.7,11.5,-267.5C86.4,-281.3,179.9,-198.5,224.3,-142.1Z"
    }
];

const ProcessStepCard = ({ step, index, isActive, isAnyHovered, onHover, onLeave }: { 
    step: any, 
    index: number, 
    isActive: boolean, 
    isAnyHovered: boolean,
    onHover: () => void,
    onLeave: () => void
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const Icon = step.icon;

    // 3D Tilt Physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            animate={{ height: isActive ? 420 : 120 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={onHover}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { onLeave(); x.set(0); y.set(0); }}
            style={{ 
                rotateX, 
                rotateY, 
                perspective: 1000,
                opacity: isAnyHovered && !isActive ? 0.6 : 1
            }}
            className="group relative bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 p-8 rounded-[32px] overflow-hidden cursor-pointer shadow-[0_20px_40px_-20px_rgba(26,26,26,0.03)] hover:shadow-[0_40px_80px_-20px_rgba(26,26,26,0.12)] flex flex-col"
        >
            {/* Liquid Blob Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                <svg viewBox="0 0 600 600" className="w-[180%] h-[180%]">
                    <motion.path 
                        animate={{ 
                            d: step.blobPath,
                            y: isActive ? "0%" : "100%",
                            scale: isActive ? 1.4 : 1,
                            fill: isActive ? "rgba(212, 175, 55, 0.08)" : "rgba(212, 175, 55, 0)"
                        }}
                        transition={{ 
                            duration: 0.6, 
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        d={step.blobPath} 
                    />
                </svg>
            </div>

            {/* Top Details with Spring Icon Scale Popping */}
            <div className="relative z-10 flex items-center justify-between w-full h-[56px]">
                <div className="flex items-center gap-5">
                    <div className="relative">
                        <motion.div 
                            animate={{ rotate: isActive ? 360 : 0 }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            className={`absolute -inset-3 border-t border-r border-[#D4AF37]/40 rounded-full transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-30'}`}
                        />
                        <motion.div 
                            initial={{ scale: 0.3, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 300, 
                                damping: 15,
                                delay: index * 0.15 
                            }}
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 relative z-10 ${isActive ? 'bg-[#1a1a1a] text-white shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'bg-gradient-to-br from-white to-[#faf9f6] border border-[#D4AF37]/20 text-[#1a1a1a] shadow-[0_8px_20px_-4px_rgba(212,175,55,0.15)]'}`}
                        >
                            <Icon className="w-6 h-6" />
                        </motion.div>
                    </div>
                    
                    {/* Name next to icon when not hovered */}
                    <motion.div 
                        animate={{ opacity: isActive ? 0 : 1, x: isActive ? -10 : 0 }}
                        className={`whitespace-nowrap transition-all duration-300 ${isActive ? 'pointer-events-none absolute' : 'relative'}`}
                    >
                        <h3 className="text-[17px] font-bold text-[#1a1a1a] tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            {step.title}
                        </h3>
                    </motion.div>
                </div>

                <motion.span 
                    animate={{ opacity: isActive ? 1 : 0 }}
                    className={`text-[9px] font-bold tracking-[0.5em] text-[#D4AF37] uppercase absolute right-0 transition-all duration-300 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`} 
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                    {step.refCode}
                </motion.span>
            </div>

            <motion.div 
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col justify-between"
            >
                {/* Content Details */}
                <div className="relative z-10 space-y-4 pt-12">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-[#D4AF37] opacity-55" style={{ fontFamily: '"Outfit", sans-serif' }}>0{step.id}</span>
                        <div className="w-8 h-[1px] bg-[#D4AF37]/30" />
                    </div>
                    <h3 
                        className="text-2xl font-bold text-[#1a1a1a] tracking-tight group-hover:text-[#D4AF37] transition-colors duration-500"
                        style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                        {step.title}
                    </h3>
                    <p className="text-sm text-[#666666] font-light leading-relaxed group-hover:text-[#1a1a1a] transition-colors duration-500 max-w-[90%]">
                        {step.description}
                    </p>
                </div>

                {/* Footer details */}
                <div className="relative z-10 pt-6 flex items-center justify-between border-t border-[#1a1a1a]/5 mt-6">
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-[#D4AF37] transition-all duration-500 ${isActive ? 'scale-120' : 'scale-0'}`} />
                        <span className="text-[8px] font-bold text-[#666666] uppercase tracking-[0.3em]" style={{ fontFamily: '"Outfit", sans-serif' }}>Phase Synchronized</span>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-all duration-500 ${isActive ? 'text-[#D4AF37] translate-x-1' : 'text-[#1a1a1a]/20'}`} />
                </div>
            </motion.div>

            {/* Verification Node Overlay */}
            <div className={`absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-30' : ''}`}>
                <ShieldCheck className="w-3.5 h-3.5 text-[#1a1a1a]" />
                <span className="text-[6px] font-bold tracking-[0.4em] text-[#1a1a1a] uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>VERIFIED PROTOCOL</span>
            </div>
        </motion.div>
    );
};

export const OurPlanningProcessMini = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <section ref={containerRef} className="w-full pt-16 pb-8 md:pt-16 md:pb-12 bg-[#F8F9FA] overflow-hidden">
            <div className="max-w-7xl mx-auto px-8">
                {/* Section Title */}
                <div className="relative mb-12 flex flex-col items-center text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-6 mb-4"
                    >
                        <div className="w-12 h-[1px] bg-[#D4AF37]" />
                        <span className="text-[10px] font-bold tracking-[1em] text-[#D4AF37] uppercase italic" style={{ fontFamily: '"Outfit", sans-serif' }}>Operational Excellence</span>
                        <div className="w-12 h-[1px] bg-[#D4AF37]" />
                    </motion.div>

                    <h2 
                        className="text-5xl md:text-7xl font-bold text-[#1a1a1a] tracking-tight leading-tight mb-4"
                        style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                        Kinetic <span className="font-light italic text-[#D4AF37]">Planning</span> Method
                    </h2>

                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mt-4 text-[#666666]">
                        <div className="flex flex-col items-center gap-2">
                            <Radio className="w-4 h-4 animate-pulse text-[#D4AF37]" />
                            <span className="text-[8px] font-bold tracking-[0.4em] uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>Active Feed</span>
                        </div>
                        <div className="hidden md:block w-[1px] h-12 bg-[#1a1a1a]/10" />
                        <p className="max-w-md text-base md:text-lg font-light leading-relaxed">
                            "Systematizing the art of celebration through architectural precision and archival storytelling."
                        </p>
                    </div>
                </div>

                {/* Progress Timeline Track */}
                <div className="relative">
                    {/* SVG Connecting line that fills on scroll */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 z-0 opacity-20">
                        <svg width="100%" height="2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <motion.line 
                                x1="0" y1="1" x2="100%" y2="1" 
                                stroke="#D4AF37" strokeWidth="2" 
                                style={{ pathLength }}
                            />
                        </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 items-start min-h-[420px]">
                        {processSteps.map((step, index) => (
                            <ProcessStepCard 
                                key={step.id} 
                                step={step} 
                                index={index} 
                                isActive={activeIndex === index}
                                isAnyHovered={activeIndex !== null}
                                onHover={() => setActiveIndex(index)}
                                onLeave={() => setActiveIndex(null)}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
