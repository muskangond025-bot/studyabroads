import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'motion/react';
import { Mail, ArrowRight, Check, ShieldCheck, Zap, Globe, Compass, Radio } from 'lucide-react';

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

export const NewsletterCTA = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setEmail('');
            }, 5000);
        }
    };

    return (
        <section className="relative w-full py-24 md:py-32 bg-[#faf9f6] overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="newsletterGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#newsletterGrid)" />
                    </svg>
                </div>
            </div>

            {/* Atmospheric Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#d4af37]/20 rounded-full"
                        animate={{
                            y: [0, -1000],
                            x: Math.random() * 100 - 50,
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 20
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: "-5%"
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => { x.set(0); y.set(0); }}
                    style={{ rotateX, rotateY, perspective: 1000 }}
                    className="relative max-w-5xl mx-auto bg-white/80 backdrop-blur-3xl border border-[#1a1a1a]/5 rounded-[48px] p-12 md:p-24 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.05)] overflow-hidden group"
                >
                    {/* Inner Decorative HUDs */}


                    <div className="relative z-10 text-center space-y-12">
                        {/* Status Marker */}
                        <div className="flex flex-col items-center gap-6">
                            <motion.div 
                                className="w-20 h-20 rounded-full border border-[#d4af37]/30 flex items-center justify-center relative"
                            >
                                <Mail className="w-8 h-8 text-[#d4af37]" />
                            </motion.div>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-6">
                            <h2 
                                className="text-5xl md:text-7xl font-bold text-[#1a1a1a] tracking-tighter"
                                style={{ fontFamily: '"Playfair Display", serif' }}
                            >
                                Stay <span className="text-[#d4af37] italic">Synchronized.</span>
                            </h2>
                            <div className="max-w-2xl mx-auto">
                                <p className="text-lg md:text-xl text-[#1a1a1a]/50 font-light italic leading-relaxed">
                                    Get the latest event planning tips, trends, and exclusive insights delivered straight to your inbox.
                                </p>
                            </div>
                        </div>

                        {/* Newsletter Form */}
                        <form 
                            onSubmit={handleSubmit}
                            className="max-w-2xl mx-auto"
                        >
                            <AnimatePresence mode="wait">
                                {!submitted ? (
                                    <motion.div 
                                        key="form"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex flex-col md:flex-row gap-6"
                                    >
                                        <div className="flex-1 relative group">
                                            <input 
                                                type="email"
                                                placeholder="Enter Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full bg-[#1a1a1a]/5 border border-[#1a1a1a]/10 rounded-2xl px-8 py-6 text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 outline-none focus:ring-1 focus:ring-[#d4af37] transition-all font-bold tracking-widest text-[11px] uppercase"
                                            />
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20">
                                                <Compass className="w-4 h-4 text-[#1a1a1a]" />
                                            </div>
                                        </div>
                                        <motion.button 
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="group relative px-12 py-6 bg-[#d4af37] text-black rounded-2xl font-bold tracking-[0.3em] uppercase text-[11px] overflow-hidden"
                                        >
                                            <span className="relative z-10 flex items-center gap-4">
                                                Subscribe <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                            </span>
                                            <motion.div 
                                                className="absolute inset-0 bg-white"
                                                initial={{ x: "-100%" }}
                                                whileHover={{ x: 0 }}
                                                transition={{ duration: 0.4 }}
                                            />
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-8 border border-[#d4af37] bg-[#d4af37]/10 rounded-[32px] space-y-4"
                                    >
                                        <div className="flex items-center justify-center gap-4 text-[#d4af37]">
                                            <Check className="w-6 h-6" />
                                            <span className="text-[11px] font-bold tracking-[0.5em] uppercase">Subscription Successful</span>
                                        </div>
                                        <p className="text-[#1a1a1a]/50 text-xs italic">Welcome to our community. You'll hear from us soon.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};
