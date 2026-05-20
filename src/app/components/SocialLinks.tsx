import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'motion/react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, MessageCircle, ShieldCheck, Zap, Globe, Compass, Radio } from 'lucide-react';

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

const SocialExhibitionTile = ({ platform, index, activeIndex, setActiveIndex }: { platform: any; index: number; activeIndex: number | null; setActiveIndex: (i: number | null) => void }) => {
    const tileRef = useRef<HTMLAnchorElement>(null);
    const isActive = activeIndex === index;
    const isDimmed = activeIndex !== null && !isActive;

    // 3D Tilt Physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!tileRef.current) return;
        const rect = tileRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    const Icon = platform.icon;

    return (
        <motion.a
            ref={tileRef}
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => { setActiveIndex(null); x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, perspective: 1000 }}
            className={`group relative bg-white border border-[#1a1a1a]/5 rounded-[40px] p-10 overflow-hidden transition-all duration-700 shadow-sm
                ${isDimmed ? 'opacity-40 scale-[0.98] blur-[1px]' : 'opacity-100 scale-100'}
                ${isActive ? 'border-[#d4af37]/20 shadow-2xl' : ''}`}
        >
            {/* Individual Card Curtain Reveal */}
            <motion.div 
                className="absolute inset-0 z-50 bg-[#1a1a1a]"
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.15 }}
                style={{ originY: 1 }}
            />
            {/* Archival Blob Background (Requested Feature) */}
            <svg 
                className={`absolute top-0 left-0 w-[150%] transition-all duration-1000 ease-out pointer-events-none opacity-20
                    ${isActive ? 'translate-y-0 scale-150 rotate-12 fill-[#d4af37]' : 'translate-y-full scale-50 rotate-0 fill-transparent'}`}
                viewBox="0 0 600 600"
            >
                <path d={platform.blobPath} />
            </svg>



            {/* Platform Identity */}
            <div className="relative space-y-6 z-10">
                <div className={`relative w-20 h-20 rounded-full border flex items-center justify-center transition-all duration-500 
                    ${isActive ? 'bg-[#d4af37] border-white scale-110 shadow-[0_0_30px_rgba(212,175,55,0.4)]' : 'bg-[#faf9f6] border-[#1a1a1a]/10'}`}>
                    <Icon className={`w-8 h-8 transition-colors duration-500 ${isActive ? 'text-white' : 'text-[#1a1a1a]/30'}`} />
                    <AnimatePresence>
                        {isActive && (
                            <motion.div 
                                className="absolute inset-0 rounded-full border border-white"
                                initial={{ scale: 1, opacity: 1 }}
                                animate={{ scale: 1.6, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-2">
                    <h3 className={`text-3xl font-bold tracking-tighter transition-colors duration-500 ${isActive ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/80'}`} style={{ fontFamily: '"Playfair Display", serif' }}>
                        {platform.name}
                    </h3>
                    <WritingText 
                        text={platform.handle} 
                        className={`text-[10px] font-bold tracking-[0.3em] uppercase block transition-colors duration-500 ${isActive ? 'text-white' : 'text-[#d4af37]'}`} 
                        delay={0.2}
                    />
                </div>

                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#1a1a1a]/60 uppercase tracking-widest">{platform.followers}</span>
                    </div>
                    <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className={`px-6 py-2 rounded-full text-[9px] font-bold tracking-[0.3em] uppercase transition-all duration-500
                            ${isActive ? 'bg-[#1a1a1a] text-white shadow-xl' : 'bg-[#1a1a1a]/5 text-[#1a1a1a]/40'}`}
                    >
                        {platform.name === 'WhatsApp' ? 'Handshake' : 'Synchronize'}
                    </motion.div>
                </div>

            {/* Interactive Scanline */}
            <AnimatePresence>
                {isActive && (
                    <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent w-40 skew-x-12 z-20"
                    />
                )}
            </AnimatePresence>

            {/* Background Texture Detail */}
            <div className={`absolute bottom-4 right-4 transition-all duration-500 ${isActive ? 'opacity-40 scale-125' : 'opacity-[0.05] scale-100'}`}>
                <Globe className="w-12 h-12 text-[#1a1a1a]" />
            </div>
        </motion.a>
    );
};

const socialPlatforms = [
    {
        name: 'Facebook',
        protocol: 'META_SYNC_FB',
        icon: Facebook,
        handle: '@GlobalPathAdmissions',
        followers: '50K Reach',
        link: 'https://facebook.com',
        blobPath: "M192.1,-148.2C230,-105.8,228.6,-27,204.4,33.7C180.2,94.3,133.3,136.8,77.7,165C22.1,193.1,-42.1,206.9,-94.5,185.7C-146.9,164.5,-187.5,108.3,-201.7,46C-215.9,-16.2,-203.7,-84.5,-165.7,-127C-127.7,-169.5,-63.8,-186.3,6.6,-191.6C77.1,-196.9,154.3,-190.7,192.1,-148.2Z"
    },
    {
        name: 'Instagram',
        protocol: 'PHOTO_XFER_IG',
        icon: Instagram,
        handle: '@globalpath.admissions',
        followers: '75K Reach',
        link: 'https://instagram.com',
        blobPath: "M194.1,-154.4C241.7,-95.1,263.7,-14.9,242.8,47C222,108.9,158.3,152.7,93.7,177.1C29.1,201.5,-36.4,206.6,-87.6,182C-138.8,157.3,-175.7,102.9,-189.7,42.9C-203.7,-17.1,-194.9,-82.8,-159.5,-139.3C-124.1,-195.9,-62,-243.5,5.6,-247.9C73.2,-252.4,146.5,-213.8,194.1,-154.4Z"
    },
    {
        name: 'LinkedIn',
        protocol: 'CORP_LINK_LN',
        icon: Linkedin,
        handle: 'GlobalPath Admissions',
        followers: '25K Reach',
        link: 'https://linkedin.com',
        blobPath: "M192.1,-148.2C230,-105.8,228.6,-27,204.4,33.7C180.2,94.3,133.3,136.8,77.7,165C22.1,193.1,-42.1,206.9,-94.5,185.7C-146.9,164.5,-187.5,108.3,-201.7,46C-215.9,-16.2,-203.7,-84.5,-165.7,-127C-127.7,-169.5,-63.8,-186.3,6.6,-191.6C77.1,-196.9,154.3,-190.7,192.1,-148.2Z"
    },
    {
        name: 'WhatsApp',
        protocol: 'VOICE_READY_WA',
        icon: MessageCircle,
        handle: '+44 (20) 7946 0192',
        followers: 'Active Link',
        link: 'https://wa.me/442079460192',
        blobPath: "M194.1,-154.4C241.7,-95.1,263.7,-14.9,242.8,47C222,108.9,158.3,152.7,93.7,177.1C29.1,201.5,-36.4,206.6,-87.6,182C-138.8,157.3,-175.7,102.9,-189.7,42.9C-203.7,-17.1,-194.9,-82.8,-159.5,-139.3C-124.1,-195.9,-62,-243.5,5.6,-247.9C73.2,-252.4,146.5,-213.8,194.1,-154.4Z"
    }
];

export const SocialLinks = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="relative w-full py-16 md:py-24 bg-[#faf9f6] overflow-hidden">
            {/* Atmospheric Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/5 via-transparent to-transparent" />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="socialGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#socialGrid)" />
                    </svg>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                {/* Section Header HUD */}
                <div className="text-center mb-24 space-y-8">
                    <div className="flex flex-col items-center gap-6">
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1.2 }}
                            className="w-32 h-[1px] bg-[#d4af37]" 
                        />
                    </div>
                    <h2 
                        className="text-6xl md:text-8xl font-bold text-[#1a1a1a] tracking-tighter"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Join Our <span className="italic">Sphere.</span>
                    </h2>
                    <p className="text-xl text-[#1a1a1a]/50 font-light italic max-w-2xl mx-auto leading-relaxed">
                        "Stay connected and access daily placement coordinates, admissions deadlines, and elite scholarship opportunities."
                    </p>
                </div>

                {/* Social Exhibition Tiles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {socialPlatforms.map((platform, index) => (
                        <SocialExhibitionTile 
                            key={index} 
                            platform={platform} 
                            index={index} 
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                        />
                    ))}
                </div>


            </div>


        </section>
    );
};
