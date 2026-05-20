import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Calendar, Mail, Phone, User, MessageSquare, Send, ShieldCheck, MapPin, Radio, Clock, Globe, ChevronRight } from 'lucide-react';

export function GetQuoteSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

    useEffect(() => {
        setIsDesktop(window.innerWidth >= 1024);
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        budget: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                eventType: '',
                eventDate: '',
                guestCount: '',
                budget: '',
                message: ''
            });
        }, 5000);
    };

    // Mobile panel variants
    const mobilePanelVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (custom: number) => ({
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: "easeOut", delay: custom * 0.15 }
        })
    };

    return (
        <section ref={sectionRef} className="relative w-full bg-[#0a0a0a] py-32 overflow-hidden flex flex-col items-center">
            {/* Background 3D Cinematic Render */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img 
                    src="/quote_section_bg.png" 
                    alt="Futuristic Anti-gravity UI Digital Map" 
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]" />
            </div>

            <div className="container mx-auto px-8 relative z-10 w-full">
                {/* Section Header */}
                <div className="text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
                    >
                        <Globe className="w-4 h-4 text-[#d4af37] animate-pulse" />
                        <span className="text-[9px] font-bold tracking-[0.3em] text-[#d4af37] uppercase">Interactive Selective Admissions Map</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white tracking-tighter"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Request Consultation
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-white/50 font-light italic max-w-2xl mx-auto"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        "Commence the strategic blueprint of your academic journey through our secure selective-placement portal."
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="w-full">
                    {isDesktop ? (
                        /* Desktop View: Interactive 3D Tri-Fold Map Unfolding */
                        <div className="relative w-full max-w-6xl mx-auto h-[740px]" style={{ perspective: 3500, transformStyle: "preserve-3d" }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.88, rotateX: 10, translateZ: -250 }}
                                animate={isInView ? { opacity: 1, scale: 1, rotateX: 0, translateZ: 0 } : { opacity: 0, scale: 0.88, rotateX: 10, translateZ: -250 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="w-full h-full relative"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* PANEL 1: Leftmost Hinge (Anchor) */}
                                <motion.div
                                    initial={{ rotateY: -80 }}
                                    animate={isInView ? { rotateY: 0 } : { rotateY: -80 }}
                                    transition={{ duration: 1.3, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
                                    style={{
                                        transformOrigin: "left center",
                                        transformStyle: "preserve-3d",
                                        backfaceVisibility: "hidden",
                                        width: "33.333%",
                                        height: "100%",
                                    }}
                                    className="absolute left-0 top-0 p-10 flex flex-col justify-between bg-[#121212]/95 border border-white/10 rounded-l-[40px] shadow-[0_50px_60px_rgba(0,0,0,0.5)] relative"
                                >
                                    {/* Crease shadow on the right edge of Panel 1 */}
                                    <motion.div 
                                        initial={{ opacity: 0.6 }}
                                        animate={isInView ? { opacity: 0.05 } : { opacity: 0.6 }}
                                        transition={{ duration: 1.3 }}
                                        className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-20" 
                                    />
                                    
                                    <div className="space-y-8">
                                        <div className="space-y-3">
                                            <span className="text-[10px] font-mono tracking-[0.3em] text-[#d4af37]">01 / INITIATE</span>
                                            <h3 className="text-3xl font-bold text-white leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>Let's Start Preparing</h3>
                                            <p className="text-sm text-white/50 leading-relaxed font-light">
                                                Our selective advisory team is here to map your academic pathways. Initialize your profile appraisal.
                                            </p>
                                        </div>

                                        <div className="space-y-6 pt-4 border-t border-white/5">
                                            <ContactItem icon={Phone} label="Transmission Line" value="+44 (20) 7946 0192" />
                                            <ContactItem icon={Mail} label="Secure Dispatch" value="advisors@globalpath.com" />
                                            <ContactItem icon={Clock} label="Operational Hours" value="Mon-Fri: 0900 - 1800" />
                                        </div>
                                    </div>

                                    {/* Guarantee HUD Card */}
                                    <div className="p-5 bg-white/[0.02] border border-[#d4af37]/20 rounded-2xl relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative z-10 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl border border-[#d4af37]/30 flex items-center justify-center bg-white/5">
                                                <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                                            </div>
                                            <div>
                                                <span className="text-[8px] font-bold tracking-[0.2em] text-[#d4af37] uppercase">SLA GUARANTEE</span>
                                                <p className="text-xs text-white font-medium mt-0.5">Appraisal within 4 business hours.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PANEL 2: Middle Hinge (Connected to Panel 1 Right Edge) */}
                                    <motion.div
                                        initial={{ rotateY: 155 }}
                                        animate={isInView ? { rotateY: 0 } : { rotateY: 155 }}
                                        transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
                                        style={{
                                            transformOrigin: "left center",
                                            transformStyle: "preserve-3d",
                                            backfaceVisibility: "hidden",
                                            position: "absolute",
                                            left: "100%",
                                            top: 0,
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        className="p-10 flex flex-col justify-between bg-[#0e0e0e]/95 border-y border-r border-white/10 shadow-[0_50px_60px_rgba(0,0,0,0.5)] relative"
                                    >
                                        {/* Crease shadow on the right edge of Panel 2 */}
                                        <motion.div 
                                            initial={{ opacity: 0.7 }}
                                            animate={isInView ? { opacity: 0.05 } : { opacity: 0.7 }}
                                            transition={{ duration: 1.4 }}
                                            className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-20" 
                                        />

                                        <div className="space-y-8">
                                            <div className="space-y-3">
                                                <span className="text-[10px] font-mono tracking-[0.3em] text-[#d4af37]">02 / STRATEGY</span>
                                                <h3 className="text-3xl font-bold text-white leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>Appraisal Pathway</h3>
                                                <p className="text-sm text-white/50 leading-relaxed font-light">
                                                    Specify your selective placement parameters and intake cycle to orient your evaluation parameters.
                                                </p>
                                            </div>

                                            <div className="space-y-5 pt-4 border-t border-white/5">
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-bold tracking-[0.25em] text-white/70 uppercase ml-1">Pathway Focus</label>
                                                    <div className="relative">
                                                        <select 
                                                            name="eventType" 
                                                            value={formData.eventType} 
                                                            onChange={handleChange}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors appearance-none cursor-pointer"
                                                        >
                                                            <option value="" className="bg-[#1a1a1a] text-white">Select focus...</option>
                                                            <option value="undergrad" className="bg-[#1a1a1a] text-white">Undergraduate Admissions</option>
                                                            <option value="postgrad" className="bg-[#1a1a1a] text-white">Postgraduate & PhD Strategy</option>
                                                            <option value="scholarship" className="bg-[#1a1a1a] text-white">Scholarship & Merit Funding</option>
                                                            <option value="visa" className="bg-[#1a1a1a] text-white">Visa & Relocation Advisory</option>
                                                        </select>
                                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                                            <Radio className="w-3.5 h-3.5 text-[#d4af37]" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <FormField label="Target Intake" name="eventDate" type="date" icon={Calendar} value={formData.eventDate} onChange={handleChange} />
                                                    <FormField label="Current GPA / Score" name="guestCount" type="text" icon={User} value={formData.guestCount} onChange={handleChange} placeholder="e.g. 3.9 / 1550" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Glowing Target Destinations Badge Block */}
                                        <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
                                                    <span className="text-[8px] font-bold tracking-[0.2em] text-white/50 uppercase">TARGET HUBS</span>
                                                </div>
                                                <span className="text-[7px] font-mono text-[#d4af37] tracking-widest animate-pulse">ACTIVE PLACEMENT</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <DestinationBadge code="LND" city="London, UK" coords="51.50° N" />
                                                <DestinationBadge code="BOS" city="Boston, US" coords="42.36° N" />
                                                <DestinationBadge code="ZRH" city="Zurich, CH" coords="47.37° N" />
                                            </div>
                                        </div>

                                        {/* PANEL 3: Rightmost Hinge (Connected to Panel 2 Right Edge) */}
                                        <motion.div
                                            initial={{ rotateY: -155 }}
                                            animate={isInView ? { rotateY: 0 } : { rotateY: -155 }}
                                            transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1], delay: 0.35 }}
                                            style={{
                                                transformOrigin: "left center",
                                                transformStyle: "preserve-3d",
                                                backfaceVisibility: "hidden",
                                                position: "absolute",
                                                left: "100%",
                                                top: 0,
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            className="p-10 flex flex-col justify-between bg-[#0d0d0d]/95 border-y border-r border-white/10 rounded-r-[40px] shadow-[0_50px_60px_rgba(0,0,0,0.5)] relative overflow-hidden"
                                        >
                                            <div className="space-y-6">
                                                <div className="space-y-3">
                                                    <span className="text-[10px] font-mono tracking-[0.3em] text-[#d4af37]">03 / SECURITY GATEWAY</span>
                                                    <h3 className="text-3xl font-bold text-white leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>Scholar Profile</h3>
                                                    <p className="text-sm text-white/50 leading-relaxed font-light">
                                                        Enter your direct contact transmission credentials to securely route your appraisal dashboard.
                                                    </p>
                                                </div>

                                                <div className="space-y-4 pt-4 border-t border-white/5">
                                                    <FormField label="Full Name" name="name" icon={User} value={formData.name} onChange={handleChange} placeholder="Alex Rivera" required />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <FormField label="Email Address" name="email" type="email" icon={Mail} value={formData.email} onChange={handleChange} placeholder="alex@gmail.com" required />
                                                        <FormField label="Contact Line" name="phone" type="tel" icon={Phone} value={formData.phone} onChange={handleChange} placeholder="+44 20 7946" required />
                                                    </div>
                                                    
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-bold tracking-[0.25em] text-white/70 uppercase ml-1">Additional Specifications</label>
                                                        <div className="relative">
                                                            <MessageSquare className="absolute left-5 top-4 w-3.5 h-3.5 text-[#d4af37]" />
                                                            <textarea 
                                                                name="message" 
                                                                value={formData.message} 
                                                                onChange={handleChange}
                                                                rows={2}
                                                                placeholder="Academic background, target universities, research..."
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-3.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]/50 transition-colors resize-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <motion.button 
                                                whileHover={{ scale: 1.02, backgroundColor: "#d4af37", color: "#000" }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                className="w-full bg-white text-[#1a1a1a] py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-[10px] flex items-center justify-center gap-3 transition-all cursor-pointer"
                                            >
                                                <Send className="w-3.5 h-3.5" />
                                                Request Profile Appraisal
                                            </motion.button>

                                            {/* Luxury dark gold appraisal submission success overlay */}
                                            <AnimatePresence>
                                                {isSubmitted && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                                                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                                        className="absolute inset-0 bg-[#0d0d0d]/95 z-50 flex flex-col items-center justify-center text-center p-8 border border-[#d4af37]/30 rounded-r-[40px]"
                                                    >
                                                        <div className="w-16 h-16 rounded-full border border-[#d4af37] flex items-center justify-center mb-6">
                                                            <motion.div 
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                                            >
                                                                <ShieldCheck className="w-5 h-5 text-black" />
                                                            </motion.div>
                                                        </div>
                                                        <h4 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Appraisal Registered</h4>
                                                        <p className="text-white/60 font-light italic text-xs max-w-xs">
                                                            "Your scholarly credentials have been logged in our secure global placements ledger."
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </div>
                    ) : (
                        /* Mobile & Tablet Fallback View: Staggered Fade Up Cards */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                            {/* Panel 1 Card */}
                            <motion.div 
                                custom={0}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={mobilePanelVariants}
                                className="p-8 space-y-8 bg-[#121212]/95 border border-white/10 rounded-3xl"
                            >
                                <div className="space-y-3">
                                    <span className="text-[9px] font-mono tracking-[0.3em] text-[#d4af37]">01 / INITIATE</span>
                                    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Let's Start Preparing</h3>
                                    <p className="text-xs text-white/50 leading-relaxed font-light">
                                        Our selective advisory team is here to map your academic pathways. Initialize your profile appraisal.
                                    </p>
                                </div>

                                <div className="space-y-5 pt-4 border-t border-white/5">
                                    <ContactItem icon={Phone} label="Transmission Line" value="+44 (20) 7946 0192" />
                                    <ContactItem icon={Mail} label="Secure Dispatch" value="advisors@globalpath.com" />
                                    <ContactItem icon={Clock} label="Operational Hours" value="Mon-Fri: 0900 - 1800" />
                                </div>

                                <div className="p-4 bg-white/[0.02] border border-[#d4af37]/20 rounded-xl flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                                    <div>
                                        <span className="text-[7px] font-bold tracking-[0.2em] text-[#d4af37] uppercase">SLA GUARANTEE</span>
                                        <p className="text-[10px] text-white/70">Response within 4 business hours.</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Panel 2 Card */}
                            <motion.div 
                                custom={1}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={mobilePanelVariants}
                                className="p-8 space-y-8 bg-[#0e0e0e]/95 border border-white/10 rounded-3xl"
                            >
                                <div className="space-y-3">
                                    <span className="text-[9px] font-mono tracking-[0.3em] text-[#d4af37]">02 / STRATEGY</span>
                                    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Appraisal Pathway</h3>
                                    <p className="text-xs text-white/50 leading-relaxed font-light">
                                        Specify your selective placement parameters and intake cycle to orient your evaluation parameters.
                                    </p>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <div className="space-y-2">
                                        <label className="text-[8px] font-bold tracking-[0.25em] text-white/70 uppercase ml-1">Pathway Focus</label>
                                        <div className="relative">
                                            <select 
                                                name="eventType" 
                                                value={formData.eventType} 
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors appearance-none"
                                            >
                                                <option value="" className="bg-[#1a1a1a] text-white">Select focus...</option>
                                                <option value="undergrad" className="bg-[#1a1a1a] text-white">Undergraduate Admissions</option>
                                                <option value="postgrad" className="bg-[#1a1a1a] text-white">Postgraduate & PhD Strategy</option>
                                                <option value="scholarship" className="bg-[#1a1a1a] text-white">Scholarship & Merit Funding</option>
                                                <option value="visa" className="bg-[#1a1a1a] text-white">Visa & Relocation Advisory</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                                <Radio className="w-3.5 h-3.5 text-[#d4af37]" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField label="Target Intake" name="eventDate" type="date" icon={Calendar} value={formData.eventDate} onChange={handleChange} />
                                        <FormField label="GPA / Score" name="guestCount" type="text" icon={User} value={formData.guestCount} onChange={handleChange} placeholder="3.9 / 1550" />
                                    </div>
                                </div>

                                <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
                                        <span className="text-[8px] font-bold tracking-[0.2em] text-white/50 uppercase">TARGET PLACEMENTS</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <DestinationBadge code="LND" city="London" coords="51.5° N" />
                                        <DestinationBadge code="BOS" city="Boston" coords="42.3° N" />
                                        <DestinationBadge code="ZRH" city="Zurich" coords="47.3° N" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Panel 3 Card (Spans full width on md screen for balance) */}
                            <motion.div 
                                custom={2}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={mobilePanelVariants}
                                className="p-8 space-y-8 bg-[#0d0d0d]/95 border border-white/10 rounded-3xl md:col-span-2 relative overflow-hidden"
                            >
                                <div className="space-y-3">
                                    <span className="text-[9px] font-mono tracking-[0.3em] text-[#d4af37]">03 / SECURITY GATEWAY</span>
                                    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Scholar Profile & Credentials</h3>
                                    <p className="text-xs text-white/50 leading-relaxed font-light">
                                        Enter your direct contact transmission credentials to securely route your appraisal dashboard.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                                    <FormField label="Full Name" name="name" icon={User} value={formData.name} onChange={handleChange} placeholder="Alex Rivera" required />
                                    <FormField label="Email Address" name="email" type="email" icon={Mail} value={formData.email} onChange={handleChange} placeholder="alex@gmail.com" required />
                                    <FormField label="Contact Line" name="phone" type="tel" icon={Phone} value={formData.phone} onChange={handleChange} placeholder="+44 20" required />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[8px] font-bold tracking-[0.25em] text-white/70 uppercase ml-1">Additional Specifications</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-4 w-3.5 h-3.5 text-[#d4af37]" />
                                        <textarea 
                                            name="message" 
                                            value={formData.message} 
                                            onChange={handleChange}
                                            rows={3}
                                            placeholder="Academic background, target universities, research..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]/50 transition-colors resize-none"
                                        />
                                    </div>
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.02, backgroundColor: "#d4af37", color: "#000" }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-white text-[#1a1a1a] py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-[10px] flex items-center justify-center gap-3 transition-all cursor-pointer"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    Request Profile Appraisal
                                </motion.button>

                                <AnimatePresence>
                                    {isSubmitted && (
                                        <motion.div 
                                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                            className="absolute inset-0 bg-[#0d0d0d]/95 z-50 flex flex-col items-center justify-center text-center p-8 border border-[#d4af37]/20 rounded-3xl"
                                        >
                                            <div className="w-14 h-14 rounded-full border border-[#d4af37] flex items-center justify-center mb-4">
                                                <div className="w-9 h-9 bg-[#d4af37] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                                                    <ShieldCheck className="w-5 h-5 text-black" />
                                                </div>
                                            </div>
                                            <h4 className="text-xl font-bold text-white mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>Appraisal Registered</h4>
                                            <p className="text-white/60 font-light italic text-[10px] max-w-xs">
                                                "Your credentials have been securely logged in our global placement ledger."
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}

const ContactItem = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-start gap-4 group">
        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:border-[#d4af37]/40 group-hover:shadow-[0_8px_20px_-8px_rgba(212,175,55,0.25)] flex-shrink-0">
            <Icon className="w-4.5 h-4.5 text-white/50 group-hover:text-[#d4af37] transition-colors" />
        </div>
        <div className="space-y-0.5">
            <span className="text-[8px] font-bold tracking-[0.2em] text-[#d4af37] uppercase">{label}</span>
            <p className="text-white text-xs font-medium">{value}</p>
        </div>
    </div>
);

const FormField = ({ label, icon: Icon, ...props }: any) => (
    <div className="space-y-2 w-full">
        <label className="text-[8px] font-bold tracking-[0.25em] text-white/70 uppercase ml-1">{label}</label>
        <div className="relative">
            <Icon className="absolute left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#d4af37]" />
            <input 
                {...props}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors placeholder:text-white/30"
            />
        </div>
    </div>
);

const DestinationBadge = ({ code, city, coords }: { code: string; city: string; coords: string }) => (
    <motion.div 
        whileHover={{ scale: 1.05, borderColor: "rgba(212, 175, 55, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300 group cursor-pointer"
    >
        <span className="text-xs font-bold text-white tracking-widest group-hover:text-[#d4af37] transition-colors">{code}</span>
        <span className="text-[8px] text-white/40 uppercase mt-0.5 tracking-wider font-light">{city}</span>
        <span className="text-[7px] text-[#d4af37]/50 font-mono mt-0.5">{coords}</span>
    </motion.div>
);

