import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowUpRight, Radio, Info } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
    refCode: string;
}

interface FAQMiniProps {
    faqs?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
    {
        question: 'How far in advance should I begin the admissions process?',
        answer: 'We strongly recommend initiating preparation 12-18 months prior to your target intake. This permits sufficient time to construct custom research profiles, secure SAT/GRE targets, and draft outstanding portfolios.',
        refCode: 'PREP-SYNC-01'
    },
    {
        question: 'Do you assist with university placements outside the US & UK?',
        answer: 'Yes! Our advisory network extends globally, including prestigious hubs in Canada, Australia, Singapore, and continental Europe. We tailor strategy to each region\'s specific selection criteria.',
        refCode: 'GLOB-PLAC-04'
    },
    {
        question: 'What is included in your standard advisory strategy?',
        answer: 'Our comprehensive packages are fully customized. They typically encompass academic pathway mapping, customized essay styling, mock university interviews, financial scholarship scouting, and visa relocation compliance.',
        refCode: 'STRAT-EDU-09'
    },
    {
        question: 'What are your success rates for first-choice university placement?',
        answer: 'Over the past decade, we have maintained a 99.2% success rate in placing scholars at one of their top-three selected global institutions, and a 100% success rate in visa approvals.',
        refCode: 'SUCC-METR-12'
    },
    {
        question: 'How do you secure merit scholarships for international scholars?',
        answer: 'We audit and groom each student\'s profile to align with competitive funding matrices. This includes positioning research papers, outlining leadership narratives, and preparing dedicated scholarship essays.',
        refCode: 'SCHL-FUND-05'
    },
    {
        question: 'Can I request single-service consulting like essay-only editing?',
        answer: 'Absolutely. While comprehensive consulting offers the highest rate of placement, we offer targeted modules for essay styling, portfolio auditing, mock interview prep, or visa-only compliance.',
        refCode: 'MODU-PORT-24'
    }
];

export function FAQMini({ faqs = defaultFAQs }: FAQMiniProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [isHovered, setIsHovered] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);

    const showSliced = !hasEntered || isHovered;

    const renderCardInner = () => (
        <div className="relative w-full h-full p-10 md:p-12 bg-white border border-[#1a1a1a]/5 rounded-[32px] flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 select-none shadow-[0_50px_80px_-30px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/5 to-transparent pointer-events-none rounded-[32px]" />
            
            <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center">
                        <Info className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#d4af37] uppercase">STILL HAVE QUESTIONS?</span>
                </div>
            </div>
            
            <p className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] max-w-2xl px-6 leading-snug md:leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                Our academic advisors are ready to compile your customized strategy.
            </p>
            
            <div className="relative z-10">
                <div className="bg-[#1a1a1a] text-[#faf9f6] px-10 py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-xs shadow-lg transition-colors group-hover:bg-[#d4af37] flex items-center gap-2">
                    Begin Consultation
                </div>
            </div>

            {/* Technical HUD Accents */}
            <div className="absolute top-8 left-8 flex items-center gap-2 opacity-20">
                <Radio className="w-3 h-3 text-[#1a1a1a]" />
                <span className="text-[8px] font-bold tracking-[0.3em] text-[#1a1a1a] uppercase">SYNC-ID: 882-ARC</span>
            </div>
        </div>
    );

    return (
        <section className="relative w-full bg-[#faf9f6] py-32 overflow-hidden flex flex-col items-center">
            {/* Ambient Background Detail */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFAQ">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFAQ)" />
                </svg>
            </div>

            {/* Right Telemetry HUD */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-12 opacity-10 pointer-events-none hidden lg:flex">
                <span className="text-[10px] font-bold tracking-[1em] text-[#1a1a1a] uppercase rotate-90 origin-center whitespace-nowrap">FAQ ARCHIVE</span>
                <div className="w-[1px] h-32 bg-[#1a1a1a]" />
                <span className="text-[10px] font-bold text-[#1a1a1a] uppercase rotate-90 origin-center">REF: KNOWLEDGE-BASE-01</span>
            </div>

            <div className="container mx-auto px-8 relative z-10 max-w-4xl">
                {/* Section Header */}
                <div className="text-center mb-24 space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-4"
                    >
                        <div className="w-12 h-[1px] bg-[#d4af37]" />
                        <span className="text-[10px] font-bold tracking-[1em] text-[#d4af37] uppercase italic">FAQ Archive</span>
                        <div className="w-12 h-[1px] bg-[#d4af37]" />
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-7xl font-bold text-[#1a1a1a] tracking-tighter"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#1a1a1a]/40 font-light italic max-w-2xl mx-auto"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        "Access the compiled intelligence of our admissions strategy and global enrollment methodologies."
                    </motion.p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <FAQItemComponent 
                            key={index} 
                            faq={faq} 
                            isOpen={openIndex === index} 
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            index={index}
                        />
                    ))}
                </div>

                {/* Contact CTA: Awwwards Sliced 3D Card Animation Sequence */}
                <motion.div 
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ scale: 1.015, y: -4 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative mt-24 w-full h-[400px] md:h-[360px] lg:h-[330px] rounded-[32px] overflow-visible"
                    style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
                >
                    {/* Active Interactive Link Overlay */}
                    <a 
                        href="#contact"
                        className="absolute inset-0 z-30 w-full h-full rounded-[32px] cursor-pointer pointer-events-auto"
                        aria-label="Begin Consultation"
                    />

                    {/* Slices container */}
                    <div className="absolute inset-0 w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                        
                        {/* Slice 1: Left Layer */}
                        <motion.div
                            variants={{
                                initial: {
                                    x: -120,
                                    z: 80,
                                    rotateY: -15,
                                    opacity: 0,
                                },
                                animate: {
                                    x: 0,
                                    z: 0,
                                    rotateY: 0,
                                    opacity: 1,
                                    transition: {
                                        ease: [0.19, 1, 0.22, 1],
                                        duration: 1.8,
                                        delay: 0.2,
                                    }
                                }
                            }}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            style={{ 
                                clipPath: 'inset(0% 66.5% 0% 0%)',
                                transformStyle: "preserve-3d",
                                backfaceVisibility: "hidden"
                            }}
                        >
                            {renderCardInner()}
                        </motion.div>

                        {/* Slice 2: Middle Layer */}
                        <motion.div
                            variants={{
                                initial: {
                                    y: -60,
                                    z: -100,
                                    rotateX: 12,
                                    opacity: 0,
                                },
                                animate: {
                                    y: 0,
                                    z: 0,
                                    rotateX: 0,
                                    opacity: 1,
                                    transition: {
                                        ease: [0.19, 1, 0.22, 1],
                                        duration: 1.8,
                                        delay: 0.7,
                                    }
                                }
                            }}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            style={{ 
                                clipPath: 'inset(0% 33% 0% 33%)',
                                transformStyle: "preserve-3d",
                                backfaceVisibility: "hidden"
                            }}
                        >
                            {renderCardInner()}
                        </motion.div>

                        {/* Slice 3: Right Layer */}
                        <motion.div
                            variants={{
                                initial: {
                                    x: 120,
                                    z: 80,
                                    rotateY: 15,
                                    opacity: 0,
                                },
                                animate: {
                                    x: 0,
                                    z: 0,
                                    rotateY: 0,
                                    opacity: 1,
                                    transition: {
                                        ease: [0.19, 1, 0.22, 1],
                                        duration: 1.8,
                                        delay: 1.2,
                                    }
                                }
                            }}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            style={{ 
                                clipPath: 'inset(0% 0% 0% 66.5%)',
                                transformStyle: "preserve-3d",
                                backfaceVisibility: "hidden"
                            }}
                        >
                            {renderCardInner()}
                        </motion.div>

                        {/* Staggered Vertical Neon Laser Guidelines */}
                        {/* Left Slice line */}
                        <motion.div
                            variants={{
                                initial: {
                                    opacity: 0,
                                    scaleY: 0,
                                    x: -60,
                                },
                                animate: {
                                    opacity: [0, 0.6, 0],
                                    scaleY: [0, 1, 1],
                                    x: 0,
                                    transition: {
                                        ease: [0.19, 1, 0.22, 1],
                                        duration: 2.2,
                                        delay: 0.2,
                                    }
                                }
                            }}
                            className="absolute top-0 left-[33.3%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#d4af37] to-transparent z-25 pointer-events-none"
                            style={{ 
                                transformStyle: "preserve-3d"
                            }}
                        />

                        {/* Right Slice line */}
                        <motion.div
                            variants={{
                                initial: {
                                    opacity: 0,
                                    scaleY: 0,
                                    x: 60,
                                },
                                animate: {
                                    opacity: [0, 0.6, 0],
                                    scaleY: [0, 1, 1],
                                    x: 0,
                                    transition: {
                                        ease: [0.19, 1, 0.22, 1],
                                        duration: 2.2,
                                        delay: 0.7,
                                    }
                                }
                            }}
                            className="absolute top-0 left-[66.6%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#d4af37] to-transparent z-25 pointer-events-none"
                            style={{ 
                                transformStyle: "preserve-3d"
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

const FAQItemComponent = ({ faq, isOpen, onClick, index }: { faq: FAQItem, isOpen: boolean, onClick: () => void, index: number }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`group relative bg-white border ${isOpen ? 'border-[#d4af37]/30 shadow-[0_30px_60px_-10px_rgba(212,175,55,0.1)]' : 'border-[#1a1a1a]/5 shadow-sm'} rounded-[24px] overflow-hidden transition-all duration-700`}
        >
            <button
                onClick={onClick}
                className="w-full text-left p-8 flex items-center justify-between gap-8 relative z-10"
            >
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <span className="text-[8px] font-bold text-[#d4af37] tracking-[0.4em] uppercase">{faq.refCode}</span>
                        <div className={`w-1 h-1 rounded-full bg-[#d4af37] transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <h3 
                        className={`text-2xl font-bold transition-colors duration-700 ${isOpen ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/70 group-hover:text-[#1a1a1a]'}`}
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        {faq.question}
                    </h3>
                </div>

                <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-700 ${isOpen ? 'bg-[#1a1a1a] text-white rotate-180' : 'bg-[#faf9f6] text-[#1a1a1a]/30 group-hover:text-[#1a1a1a]'}`}
                >
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="px-8 pb-8 relative z-10">
                            <div className="w-full h-[1px] bg-[#1a1a1a]/5 mb-6" />
                            <p className="text-lg text-[#1a1a1a]/70 font-light leading-relaxed max-w-2xl">
                                {faq.answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Kinetic Scanline for Open State */}
            {isOpen && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[24px]">
                    <motion.div 
                        animate={{ y: ["-100%", "400%"] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent"
                    />
                </div>
            )}
        </motion.div>
    );
};