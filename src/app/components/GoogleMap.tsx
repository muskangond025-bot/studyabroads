import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'motion/react';
import { MapPin, Navigation, Compass, Globe, Zap, Radio, ShieldCheck } from 'lucide-react';

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

export const GoogleMap = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Tilt Physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!mapContainerRef.current) return;
        const rect = mapContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    return (
        <section className="relative w-full py-16 md:py-24 bg-[#faf9f6] overflow-hidden">
            {/* Ambient Detail: Kinetic Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="mapGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1a1a1a" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#mapGrid)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                {/* Header HUD */}
                <div className="text-center mb-24 space-y-6">
                    <h2 
                        className="text-6xl md:text-8xl font-bold text-[#1a1a1a] tracking-tighter"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Global HQ <span className="italic">Coordinates.</span>
                    </h2>
                </div>

                <motion.div
                    ref={mapContainerRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
                    style={{ rotateX, rotateY, perspective: 1500 }}
                    className="relative w-full h-[600px] bg-white border border-[#1a1a1a]/5 rounded-[48px] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.1)] group"
                >
                    {/* Embedded Map */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.546427357069!2d-0.13786268423019853!3d51.50735097963595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604d3ff539097%3A0xe96cfb5e7d8f331b!2sPall%20Mall%2C%20St.%20James's%2C%20London%2C%20UK!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'grayscale(1) contrast(1.2) brightness(0.9) invert(0.05)' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Office Location"
                    />

                    {/* Technical HUD Overlay: Top Left */}
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="absolute top-10 left-10 p-8 bg-white/40 backdrop-blur-2xl border border-white/20 rounded-[32px] max-w-sm space-y-8 shadow-2xl"
                    >
                        <div className="flex items-center gap-4 border-b border-[#1a1a1a]/5 pb-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-[#d4af37]" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-[#1a1a1a]" style={{ fontFamily: '"Playfair Display", serif' }}>London Global HQ</h3>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-widest leading-relaxed">
                                45 Pall Mall, St. James's<br />
                                London, SW1Y 5JG, United Kingdom
                            </p>
                        </div>

                        <motion.a 
                            href="https://www.google.com/maps/dir//Pall+Mall,+St.+James's,+London,+UK"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center justify-center gap-4 py-4 bg-[#1a1a1a] text-white rounded-full font-bold tracking-[0.3em] uppercase text-[9px] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Get Directions <Navigation className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                            </span>
                        </motion.a>
                    </motion.div>

                    {/* Interactive Scanline Overlay */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div 
                                initial={{ y: "-100%" }}
                                animate={{ y: "100%" }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent h-40 opacity-50"
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};
