import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimationFrame, animate } from 'motion/react';
import { Heart, Briefcase, Cake, Sparkles, Music, Baby, GraduationCap, Users, ArrowUpRight, Zap, ShieldCheck, Radio, Globe, Compass } from 'lucide-react';
import { useNavigate } from 'react-router';

const eventCategories = [
    {
        id: 1,
        slug: 'uk',
        icon: GraduationCap,
        title: 'United Kingdom',
        description: 'Oxford, Cambridge, and London collegiate hubs with elite research infrastructure.',
        refCode: 'DEST-UK-01',
        blobPath: "M192.1,-148.2C230,-105.8,228.6,-27,204.4,33.7C180.2,94.3,133.3,136.8,77.7,165C22.1,193.1,-42.1,206.9,-94.5,185.7C-146.9,164.5,-187.5,108.3,-201.7,46C-215.9,-16.2,-203.7,-84.5,-165.7,-127C-127.7,-169.5,-63.8,-186.3,6.6,-191.6C77.1,-196.9,154.3,-190.7,192.1,-148.2Z"
    },
    {
        id: 2,
        slug: 'us',
        icon: Globe,
        title: 'United States',
        description: 'Ivy League networks, prestigious STEM innovation, and liberal arts foundations.',
        refCode: 'DEST-US-02',
        blobPath: "M194.1,-154.4C241.7,-95.1,263.7,-14.9,242.8,47C222,108.9,158.3,152.7,93.7,177.1C29.1,201.5,-36.4,206.6,-87.6,182C-138.8,157.3,-175.7,102.9,-189.7,42.9C-203.7,-17.1,-194.9,-82.8,-159.5,-139.3C-124.1,-195.9,-62,-243.5,5.6,-247.9C73.2,-252.4,146.5,-213.8,194.1,-154.4Z"
    },
    {
        id: 3,
        slug: 'canada',
        icon: Compass,
        title: 'Canada',
        description: 'World-leading co-op internships, direct employment streams, and beautiful research campus sites.',
        refCode: 'DEST-CAN-03',
        blobPath: "M165.5,-128.2C208.5,-84.1,233.3,-16.5,219.7,41.2C206.1,98.9,154.1,146.7,92.5,168.3C30.9,189.9,-40.3,185.3,-97.7,157.7C-155.1,130.1,-198.7,79.5,-210.1,19.3C-221.5,-40.9,-200.7,-110.7,-156.5,-154.8C-112.3,-198.9,-44.7,-217.3,11.2,-226.2C67.1,-235.1,122.5,-172.3,165.5,-128.2Z"
    },
    {
        id: 4,
        slug: 'australia',
        icon: Sparkles,
        title: 'Australia',
        description: 'High-ranking career employability, modern research universities, and incredible student lifestyle.',
        refCode: 'DEST-AUS-04',
        blobPath: "M201.1,-143.2C245.4,-89.7,255.4,-11.2,232.8,55.5C210.2,122.2,154.9,177.1,88.7,202.1C22.5,227.1,-54.7,222.2,-114.5,190.1C-174.3,158,-216.7,98.7,-226.7,33.5C-236.7,-31.7,-214.3,-102.8,-170.5,-156.3C-126.7,-209.8,-61.4,-245.7,5.5,-250.1C72.4,-254.5,156.8,-196.7,201.1,-143.2Z"
    },
    {
        id: 5,
        slug: 'switzerland',
        icon: Zap,
        title: 'Switzerland',
        description: 'Leading computer science, robotics, and hospitality academies with low public tuition fees.',
        refCode: 'DEST-SUI-05',
        blobPath: "M172.5,-125.2C218.5,-78.1,245.3,-12.3,230.1,45.2C214.9,102.7,157.7,151.9,93.5,175.3C29.3,198.7,-41.9,196.3,-101.5,171.7C-161.1,147.1,-209.1,100.3,-222.7,40.3C-236.3,-19.7,-215.5,-92.9,-170.5,-140C-125.5,-187.1,-56.3,-208.1,7.2,-213.9C70.7,-219.7,126.5,-172.3,172.5,-125.2Z"
    },
    {
        id: 6,
        slug: 'singapore',
        icon: Briefcase,
        title: 'Singapore',
        description: 'Asia’s premier academic epicenter with pioneering business strategy and East-West research links.',
        refCode: 'DEST-SGP-06',
        blobPath: "M184.1,-133.2C230.7,-75.1,254.7,-5.7,238.8,56.5C222.9,118.7,167.1,173.7,100.7,196.1C34.3,218.5,-42.7,208.3,-104.5,179.7C-166.3,151.1,-212.9,104.1,-225.7,44.1C-238.5,-15.9,-217.5,-88.9,-171.5,-147C-125.5,-205.1,-54.5,-248.3,11.5,-257.5C77.5,-266.7,137.5,-241.9,184.1,-133.2Z"
    },
    {
        id: 7,
        slug: 'germany',
        icon: ShieldCheck,
        title: 'Germany',
        description: 'Tuition-free state-of-the-art engineering, automotive science, and public university systems.',
        refCode: 'DEST-GER-07',
        blobPath: "M190.1,-145.2C241.7,-87.1,265.7,-12.7,247.8,50C229.9,112.7,170.1,163.7,101.7,189.1C33.3,214.5,-43.7,214.3,-107.5,186.7C-171.3,159.1,-221.9,104.1,-234.7,40.1C-247.5,-23.9,-222.5,-96.9,-171.5,-155C-120.5,-213.1,-43.5,-256.3,15.5,-268.7C74.5,-281.1,138.5,-203.3,190.1,-145.2Z"
    },
    {
        id: 8,
        slug: 'netherlands',
        icon: Users,
        title: 'Netherlands',
        description: 'English-taught elite business strategy, international law programs, and research hubs.',
        refCode: 'DEST-NED-08',
        blobPath: "M182.1,-138.2C230.7,-82.1,257.7,-10.7,242.8,55C227.9,120.7,171.1,180.7,102.7,208.1C34.3,235.5,-45.7,230.3,-112.5,198.7C-179.3,167.1,-232.9,109.1,-244.7,42.1C-256.5,-24.9,-226.5,-100.9,-175.5,-157C-124.5,-213.1,-52.5,-249.3,10.5,-257.7C73.5,-266.1,133.5,-246.3,182.1,-138.2Z"
    }
];

export const EventCategoriesGrid = () => {
    const navigate = useNavigate();
    const [isOrbitPaused, setIsOrbitPaused] = useState(false);

    return (
        <section className="w-full pt-16 pb-8 md:pt-32 md:pb-32 bg-[#faf9f6] overflow-hidden relative">
            {/* Ambient Background Detail: Animated Noise */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilterGrid">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilterGrid)" />
                </svg>
            </div>



            <div className="container mx-auto px-8 relative z-10 max-w-7xl">
                {/* Section Header: Premium Layout (Mobile/Tablet Only) */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 lg:hidden gap-12">
                    <div className="space-y-8 max-w-2xl text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4"
                        >
                            <div className="w-12 h-[1px] bg-[#d4af37]" />
                            <span className="text-[10px] font-bold tracking-[1em] text-[#d4af37] uppercase italic">Exhibition 01</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-7xl md:text-8xl font-bold text-[#1a1a1a] tracking-tighter leading-[0.9]"
                            style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                            Global <br /> Destinations
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="max-w-md"
                    >
                        <p
                            className="text-xl text-[#1a1a1a]/40 font-light italic leading-relaxed"
                            style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                            "A curated directory of global educational hubs, where every academic destination is selected with elite precision and scholastic opportunity."
                        </p>
                    </motion.div>
                </div>

                <OrbitalSystem categories={eventCategories} navigate={navigate} />

                {/* Grid Container (Mobile/Tablet) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-10 items-start min-h-[520px]">
                    {eventCategories.map((category, index) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            index={index}
                            onClick={() => navigate(`/events/${category.slug}`)}
                        />
                    ))}
                </div>
            </div>


        </section>
    );
};

const OrbitalSystem = ({ categories, navigate }: { categories: any[], navigate: any }) => {
    const [isSystemHovered, setIsSystemHovered] = useState(false);
    const linearProgress = useSpring(0, { stiffness: 60, damping: 15 });
    const rotationAngle = useMotionValue(0);
    const orbitRadius = 340;
    const xDrag = useMotionValue(0);

    useEffect(() => {
        linearProgress.set(isSystemHovered ? 1 : 0);
        if (!isSystemHovered) {
            animate(xDrag, 0, { type: "spring", stiffness: 60, damping: 15 });
        }
    }, [isSystemHovered]);

    useAnimationFrame((time, delta) => {
        if (!isSystemHovered && linearProgress.get() < 0.05) {
            rotationAngle.set(rotationAngle.get() + delta * 0.006);
        }
    });

    const ringOpacity = useTransform(linearProgress, [0, 0.3], [1, 0]);
    const centerY = useTransform(linearProgress, [0, 1], [0, -200]);

    return (
        <div 
            className="hidden lg:flex relative w-full max-w-[900px] h-[1100px] mx-auto items-center justify-center my-10 cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsSystemHovered(true)}
            onMouseLeave={() => setIsSystemHovered(false)}
        >
            {/* Center Orbit Rings */}
            <motion.div style={{ opacity: ringOpacity }} className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 rounded-full border border-[#1a1a1a]/5 animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-[15%] rounded-full border border-[#1a1a1a]/5 animate-[spin_40s_linear_infinite_reverse]" />
                <div className="absolute inset-[30%] rounded-full border border-dashed border-[#d4af37]/20 animate-[spin_80s_linear_infinite]" />
                <div className="absolute inset-[45%] rounded-full border border-[#1a1a1a]/5 animate-[spin_120s_linear_infinite_reverse]" />
            </motion.div>

            {/* Center Content */}
            <motion.div style={{ y: centerY }} className="absolute text-center z-0 flex flex-col items-center pointer-events-none">
                <div className="w-12 h-[1px] bg-[#d4af37] mb-6" />
                <h2
                    className="text-7xl font-bold text-[#1a1a1a] tracking-tighter leading-[0.9] mb-8"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                >
                    Global <br /> Destinations
                </h2>
                <p className="text-base text-[#1a1a1a]/50 font-light italic max-w-[320px] leading-relaxed" style={{ fontFamily: '"Playfair Display", serif' }}>
                    "A curated directory of global educational hubs, where every academic destination is selected with elite precision."
                </p>
                
                {/* Center decorative element */}
                <motion.div style={{ opacity: ringOpacity }} className="mt-12 relative w-24 h-24 rounded-full border border-[#d4af37]/30 flex items-center justify-center">
                    <Globe className="w-8 h-8 text-[#d4af37] animate-pulse" />
                    <div className="absolute inset-0 rounded-full border border-[#d4af37]/10 animate-ping" />
                </motion.div>
            </motion.div>

            {/* Orbit Nodes */}
            <motion.div 
                className="absolute inset-0 z-20 flex items-center justify-center"
                drag={isSystemHovered ? "x" : false}
                dragConstraints={{ left: -1000, right: 1000 }}
                style={{ x: xDrag }}
            >
                {categories.map((category, index) => (
                    <OrbitNode 
                        key={category.id} 
                        category={category} 
                        index={index} 
                        total={categories.length} 
                        linearProgress={linearProgress} 
                        rotationAngle={rotationAngle} 
                        orbitRadius={orbitRadius} 
                        onClick={() => navigate(`/events/${category.slug}`)} 
                    />
                ))}
            </motion.div>
        </div>
    );
};

const OrbitNode = ({ category, index, total, linearProgress, rotationAngle, orbitRadius, onClick }: any) => {
    const baseAngle = index * (360 / total);
    
    const x = useTransform(() => {
        const p = linearProgress.get();
        const currentAngle = rotationAngle.get() + baseAngle;
        const orbitX = Math.sin(currentAngle * Math.PI / 180) * orbitRadius;
        
        const spacing = 340;
        const totalWidth = spacing * (total - 1);
        const linearX = (index * spacing) - (totalWidth / 2);
        
        return orbitX * (1 - p) + linearX * p;
    });

    const y = useTransform(() => {
        const p = linearProgress.get();
        const currentAngle = rotationAngle.get() + baseAngle;
        const orbitY = -Math.cos(currentAngle * Math.PI / 180) * orbitRadius;
        
        const linearY = 120; // 120px below center when unraveling
        
        return orbitY * (1 - p) + linearY * p;
    });

    return (
        <div className="absolute top-1/2 left-1/2 pointer-events-none">
            <motion.div style={{ x, y }} className="pointer-events-auto">
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
                    <CategoryCard category={category} index={index} onClick={onClick} isOrbital={true} />
                </div>
            </motion.div>
        </div>
    );
};

const CategoryCard = ({ category, index, onClick, isOrbital }: { category: any, index: number, onClick: () => void, isOrbital?: boolean }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const Icon = category.icon;

    // 3D Tilt Physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    // Magnetic Icon Physics
    const iconX = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
    const iconY = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });

    // Dynamic Glow Position
    const glowX = useMotionValue(0);
    const glowY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);

        // Magnetic effect for icon
        const magnetStrength = 15;
        iconX.set((e.clientX - centerX) / (rect.width / 2) * magnetStrength);
        iconY.set((e.clientY - centerY) / (rect.height / 2) * magnetStrength);

        // Glow position
        glowX.set(e.clientX - rect.left);
        glowY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
        iconX.set(0);
        iconY.set(0);
    };

    return (
        <>
            {/* Gooey Filter for Liquid Effect */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="gooey">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feBlend in="SourceGraphic" in2="goo" />
                </filter>
            </svg>

            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{ 
                    height: isHovered ? 520 : 120,
                    width: isOrbital ? (isHovered ? 340 : 280) : "100%"
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
                style={{ rotateX, rotateY, perspective: 1000 }}
                className="group relative bg-white border border-[#1a1a1a]/5 p-8 rounded-[40px] overflow-hidden cursor-pointer shadow-[0_30px_60px_-25px_rgba(0,0,0,0.04)] hover:shadow-[0_60px_100px_-30px_rgba(212,175,55,0.15)] flex flex-col"
            >
                {/* Dynamic Light Reconstruction Glow */}
                <motion.div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background: useTransform(
                            [glowX, glowY],
                            (latest: any) => `radial-gradient(600px circle at ${latest[0]}px ${latest[1]}px, rgba(212,175,55,0.05), transparent 80%)`
                        )
                    }}
                />

                {/* Kinetic Perimeter Trace */}
                <motion.div
                    className="absolute inset-0 z-50 pointer-events-none rounded-[40px] border-2 border-[#d4af37]"
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        clipPath: isHovered ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 100% 0%)'
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Kinetic Scanline */}
                {isHovered && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: "400%" }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent h-1"
                    />
                )}

                {/* Liquid Background: Gooey Dual Blobs */}
                <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center filter-[url(#gooey)]">
                    <svg viewBox="0 0 600 600" className={`w-[200%] h-[200%] transition-all duration-1000 ease-[0.22,1,0.36,1] ${isHovered ? 'fill-[#d4af37]/5 scale-125 rotate-12' : 'fill-transparent scale-50 opacity-0'}`}>
                        <motion.path
                            animate={{ d: category.blobPath }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            d={category.blobPath}
                        />
                    </svg>
                </div>

                {/* Top Section: Icon & Ref */}
                <div className="relative z-10 flex items-center justify-between w-full h-[56px]">
                    <div className="flex items-center gap-8">
                        <div className="relative">
                            {/* Orbital Animation */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className={`absolute -inset-5 border border-dashed border-[#d4af37]/40 rounded-full transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-40'}`}
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#d4af37] rounded-full shadow-[0_0_8px_#d4af37]" />
                            </motion.div>

                            <motion.div
                                style={{ x: iconX, y: iconY }}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 relative z-10 ${isHovered ? 'bg-[#1a1a1a] text-white shadow-2xl' : 'bg-gradient-to-br from-white to-[#faf9f6] border border-[#d4af37]/20 text-[#1a1a1a] shadow-[0_8px_20px_-4px_rgba(212,175,55,0.15)]'}`}
                            >
                                <Icon className="w-6 h-6" />
                            </motion.div>
                        </div>

                        {/* Title next to icon when not hovered */}
                        <motion.div 
                            animate={{ opacity: isHovered ? 0 : 1, x: isHovered ? -10 : 0 }}
                            className={`whitespace-nowrap transition-all duration-300 ${isHovered ? 'pointer-events-none absolute' : 'relative'}`}
                        >
                            <h3 className="text-[17px] font-bold text-[#1a1a1a] tracking-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                                {category.title}
                            </h3>
                        </motion.div>
                    </div>

                    <motion.span 
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className={`text-[9px] font-bold tracking-[0.5em] text-[#d4af37] uppercase absolute right-0 transition-all duration-300 ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`} 
                        style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                        {category.refCode}
                    </motion.span>
                </div>

                <motion.div 
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                    transition={{ duration: 0.4 }}
                    className="flex-1 flex flex-col justify-between"
                >
                    {/* Middle Section: Title & Description */}
                    <div className="relative z-10 space-y-6 mt-4 pt-8">
                        <h3
                            className="text-2xl font-bold text-[#1a1a1a] tracking-tighter leading-[1.1] group-hover:text-[#d4af37] transition-colors duration-700 overflow-hidden"
                            style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                            {category.title.split('').map((char: string, i: number) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: 0 }}
                                    animate={{ y: isHovered ? [0, -4, 0] : 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.02 }}
                                    className="inline-block"
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </h3>
                        <p className="text-sm md:text-base text-[#1a1a1a]/60 font-light leading-relaxed group-hover:text-[#1a1a1a] transition-all duration-700 max-w-[90%]">
                            {category.description}
                        </p>
                    </div>

                    {/* Bottom Section: Footer Transmission */}
                    <div className="relative z-10 pt-8 flex items-center justify-between border-t border-[#1a1a1a]/5">
                        <div className="flex items-center gap-3">
                            <Radio className={`w-4 h-4 transition-all duration-700 ${isHovered ? 'text-[#d4af37] animate-pulse' : 'text-[#1a1a1a]/10'}`} />
                            <span className="text-[9px] font-bold text-[#1a1a1a]/40 uppercase tracking-[0.3em] group-hover:text-[#1a1a1a]/70 transition-colors duration-700">Explore Destination</span>
                        </div>
                        <motion.div
                            animate={{ x: isHovered ? 4 : 0, y: isHovered ? -4 : 0 }}
                            className={`transition-colors duration-700 ${isHovered ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/10'}`}
                        >
                            <ArrowUpRight className="w-5 h-5" />
                        </motion.div>
                    </div>
                </motion.div>


            </motion.div>
        </>
    );
};