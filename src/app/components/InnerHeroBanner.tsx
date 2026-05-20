import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Radio, ShieldCheck, Zap, Compass, Globe } from 'lucide-react';

interface InnerHeroBannerProps {
    title: string;
    subtitle: string;
    description?: string;
    backgroundImage?: string;
}

const WritingText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
    return (
        <span className={className}>
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.1,
                        delay: delay + (i * 0.03),
                        ease: "linear"
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
};

export const InnerHeroBanner: React.FC<InnerHeroBannerProps> = ({
    title,
    subtitle,
    description,
    backgroundImage
}) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
            {/* Parallax Background Image */}
            {backgroundImage && (
                <motion.div 
                    style={{ y: y1 }}
                    className="absolute inset-0 z-0"
                >
                    <div 
                        className="absolute inset-0 bg-cover bg-center scale-110"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    />
                    <div 
                        className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]"
                    />
                    {/* Technical Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                </motion.div>
            )}

            {/* Ambient Detail: Kinetic Grid */}
            <div className="absolute inset-0 z-1 opacity-[0.05] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="innerHeroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#innerHeroGrid)" />
                </svg>
            </div>

            {/* Main Content */}
            <motion.div 
                style={{ opacity }}
                className="relative z-10 max-w-6xl mx-auto px-8 text-center space-y-12"
            >


                <h1 
                    className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                >
                    {title.split(' ').map((word, i) => (
                        <span key={i} className="inline-block overflow-hidden mx-2">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="inline-block"
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </h1>

                {description && (
                    <div className="max-w-3xl mx-auto">
                        <WritingText 
                            text={`"${description}"`} 
                            className="text-xl md:text-2xl text-white/80 font-light italic leading-relaxed"
                            delay={1.5}
                        />
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2 }}
                    className="pt-12 flex flex-col md:flex-row items-center justify-center gap-20"
                >

                    
                    {/* Magnetic Glass Terminal Button */}
                    <motion.div
                        className="relative group cursor-pointer"
                        whileHover="hover"
                    >
                        {/* Magnetic Glow */}
                        <motion.div 
                            className="absolute -inset-4 bg-[#d4af37]/10 rounded-full blur-2xl opacity-0 transition-opacity group-hover:opacity-100"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        <button
                            className="relative px-12 py-5 bg-white text-[#1a1a1a] rounded-full font-bold tracking-[0.3em] uppercase text-[9px] transition-all overflow-hidden shadow-2xl group-hover:text-white"
                        >
                            <span className="relative z-20 flex items-center gap-3">
                                Explore Placements 
                                <motion.div
                                    variants={{
                                        hover: { x: 5 }
                                    }}
                                >
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </motion.div>
                            </span>
                            
                            {/* Liquid Fill */}
                            <motion.div 
                                className="absolute inset-0 bg-[#d4af37]"
                                variants={{
                                    hover: { y: 0 }
                                }}
                                initial={{ y: "100%" }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            />

                            {/* Secondary Scanline */}
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-32 skew-x-12"
                                variants={{
                                    hover: { x: ["-100%", "200%"] }
                                }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                        </button>


                    </motion.div>


                </motion.div>
            </motion.div>


        </section>
    );
};
