import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform, useScroll } from 'motion/react';
import { Send, User, Mail, Phone, MessageSquare, Calendar, Users, CheckCircle, ShieldCheck, Zap, Globe, Compass, Radio } from 'lucide-react';

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

export const EnquiryForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const formContainerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });
    
    const x3DVal = useTransform(smoothProgress, [0, 1], [1, -1]);
    const x3D = useTransform(x3DVal, val => val * (isDesktop ? 150 : 30));

    const rotateY3DVal = useTransform(smoothProgress, [0, 1], [-1, 1]);
    const rotateY3D = useTransform(rotateY3DVal, val => val * (isDesktop ? 15 : 5));

    const z3DVal = useTransform(smoothProgress, [0, 0.5, 1], [-1, 0, -1]);
    const z3D = useTransform(z3DVal, val => val * (isDesktop ? -120 : -30));

    const opacity3D = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        targetDestination: '',
        targetIntake: '',
        targetDegree: '',
        message: ''
    });

    // 3D Tilt Physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!formContainerRef.current) return;
        const rect = formContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', targetDestination: '', targetIntake: '', targetDegree: '', message: '' });
        }, 5000);
    };

    return (
        <section ref={sectionRef} className="relative w-full py-16 md:py-24 bg-[#faf9f6] overflow-hidden">
            {/* Ambient Detail: Kinetic Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="enquiryGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#1a1a1a" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#enquiryGrid)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

                    {/* Left: Atmospheric Content */}
                    <div className="space-y-16 lg:sticky lg:top-32">
                        <div className="space-y-6">
                            <h2
                                className="text-6xl md:text-8xl font-bold text-[#1a1a1a] tracking-tighter leading-[0.9] flex flex-wrap"
                                style={{ fontFamily: '"Playfair Display", serif', perspective: 1000 }}
                            >
                                {["Securing", "Your", "Academic", "Destiny."].map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, rotateX: -90, y: 50 }}
                                        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ 
                                            type: "spring", 
                                            stiffness: 100, 
                                            damping: 12, 
                                            delay: i * 0.15 
                                        }}
                                        style={{ transformOrigin: "bottom" }}
                                        className={`inline-block mr-4 lg:mr-6 ${i === 3 ? "italic text-[#d4af37]" : ""}`}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                                className="text-xl text-[#1a1a1a]/60 font-light italic leading-relaxed" 
                                style={{ fontFamily: '"Playfair Display", serif' }}
                            >
                                "Commence your elite study abroad application. Transmit your academic aspirations to our global placement team, and we will initiate your portfolio review within 12 standard hours."
                            </motion.p>
                        </div>

                        {/* Technical Feature Protocols */}
                        <div className="space-y-8">
                            {[
                                { icon: Zap, title: "Accelerated Response", desc: "Expert placement advisors respond to high-priority files in under 12 hours." },
                                { icon: ShieldCheck, title: "Initial Strategic Evaluation", desc: "Complimentary placement appraisal covering target universities and fee waivers." },
                                { icon: Globe, title: "Elite Admissions Advisory", desc: "Sourcing world-class courses and merit fellowships across 8 premier destinations." }
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -50, rotateY: 45 }}
                                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ 
                                        type: "spring",
                                        stiffness: 80,
                                        damping: 15,
                                        delay: 0.8 + i * 0.15 
                                    }}
                                    style={{ perspective: 1000 }}
                                    className="flex items-start gap-6 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white border border-[#1a1a1a]/5 flex items-center justify-center shadow-sm">
                                        <feature.icon className="w-5 h-5 text-[#d4af37]" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-widest">{feature.title}</h4>
                                        <p className="text-xs text-[#1a1a1a]/50 italic leading-relaxed">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Spatial Inquiry Terminal */}
                    <motion.div
                        style={{
                            x: x3D,
                            rotateY: rotateY3D,
                            z: z3D,
                            opacity: opacity3D,
                            perspective: 1500,
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <motion.div
                            ref={formContainerRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => { x.set(0); y.set(0); }}
                            initial={{ opacity: 0, x: 100, scale: 0.95 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d',
                                perspective: 2000
                            }}
                            className="relative bg-white border border-[#1a1a1a]/5 rounded-[48px] p-10 md:p-16 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.08)] overflow-hidden h-full"
                        >
                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-8 relative z-10"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Name Field */}
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-[#d4af37] uppercase">
                                                <User className="w-3 h-3" /> Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Your Name"
                                                className="w-full bg-[#faf9f6] border border-[#1a1a1a]/5 rounded-2xl px-6 py-5 text-sm outline-none focus:ring-1 focus:ring-[#d4af37] transition-all font-bold tracking-widest uppercase text-[11px]"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* Phone Field */}
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-[#d4af37] uppercase">
                                                <Phone className="w-3 h-3" /> Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="+44 (20) 7946 0192"
                                                className="w-full bg-[#faf9f6] border border-[#1a1a1a]/5 rounded-2xl px-6 py-5 text-sm outline-none focus:ring-1 focus:ring-[#d4af37] transition-all font-bold tracking-widest uppercase text-[11px]"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-[#d4af37] uppercase">
                                            <Mail className="w-3 h-3" /> Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="advisors@globalpath.com"
                                            className="w-full bg-[#faf9f6] border border-[#1a1a1a]/5 rounded-2xl px-6 py-5 text-sm outline-none focus:ring-1 focus:ring-[#d4af37] transition-all font-bold tracking-widest uppercase text-[11px]"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Target Destination */}
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-[#d4af37] uppercase">
                                                <Compass className="w-3 h-3" /> Destination Focus
                                            </label>
                                            <select
                                                name="targetDestination"
                                                className="w-full bg-[#faf9f6] border border-[#1a1a1a]/5 rounded-2xl px-6 py-5 text-[11px] outline-none focus:ring-1 focus:ring-[#d4af37] transition-all font-bold tracking-widest uppercase appearance-none"
                                                value={formData.targetDestination}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Destination</option>
                                                <option value="uk">United Kingdom</option>
                                                <option value="us">United States</option>
                                                <option value="canada">Canada</option>
                                                <option value="australia">Australia</option>
                                                <option value="switzerland">Switzerland</option>
                                                <option value="singapore">Singapore</option>
                                                <option value="germany">Germany</option>
                                                <option value="netherlands">Netherlands</option>
                                            </select>
                                        </div>

                                        {/* Target Intake */}
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-[#d4af37] uppercase">
                                                <Calendar className="w-3 h-3" /> Target Intake
                                            </label>
                                            <input
                                                type="text"
                                                name="targetIntake"
                                                placeholder="e.g. Fall 2026 / Spring 2027"
                                                className="w-full bg-[#faf9f6] border border-[#1a1a1a]/5 rounded-2xl px-6 py-5 text-[11px] outline-none focus:ring-1 focus:ring-[#d4af37] transition-all font-bold tracking-widest uppercase"
                                                value={formData.targetIntake}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Target Degree */}
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-[#d4af37] uppercase">
                                            <Radio className="w-3 h-3" /> Target Degree Level
                                        </label>
                                        <select
                                            name="targetDegree"
                                            className="w-full bg-[#faf9f6] border border-[#1a1a1a]/5 rounded-2xl px-6 py-5 text-[11px] outline-none focus:ring-1 focus:ring-[#d4af37] transition-all font-bold tracking-widest uppercase appearance-none"
                                            value={formData.targetDegree}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Degree Level</option>
                                            <option value="undergraduate">Undergraduate (BA/BSc)</option>
                                            <option value="postgraduate">Postgraduate (MA/MSc/MBA)</option>
                                            <option value="doctorate">Doctorate (PhD/DBA)</option>
                                            <option value="other">Diplomas & Preparatory</option>
                                        </select>
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-[#d4af37] uppercase">
                                            <MessageSquare className="w-3 h-3" /> Academic Profile Brief
                                        </label>
                                        <textarea
                                            name="message"
                                            placeholder="Detail your GPA, SAT/IELTS, research interests, or target schools..."
                                            rows={5}
                                            className="w-full bg-[#faf9f6] border border-[#1a1a1a]/5 rounded-3xl px-8 py-6 text-sm outline-none focus:ring-1 focus:ring-[#d4af37] transition-all font-bold tracking-widest uppercase text-[11px] resize-none"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group relative w-full py-8 bg-[#1a1a1a] text-white rounded-[24px] font-bold tracking-[0.4em] uppercase text-[11px] overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-4">
                                            Transmit Portfolio <Send className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                        </span>
                                        <motion.div
                                            className="absolute inset-0 bg-[#d4af37]"
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: 0 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </motion.button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20"
                                >
                                    <div className="w-24 h-24 rounded-full border border-[#d4af37] flex items-center justify-center relative">
                                        <CheckCircle className="w-10 h-10 text-[#d4af37]" />
                                        <motion.div
                                            className="absolute inset-0 rounded-full border border-[#d4af37]"
                                            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-bold text-[#1a1a1a] tracking-tighter" style={{ fontFamily: '"Playfair Display", serif' }}>
                                            Transmission Successful.
                                        </h3>
                                        <p className="text-sm text-[#1a1a1a]/50 italic max-w-xs mx-auto">
                                            Your academic portfolio has been successfully archived. Protocol response initiated within 12 standard hours.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Interactive Scanline Overlay */}
                        <AnimatePresence>
                            {!submitted && (
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#d4af37]/5 to-transparent w-40 skew-x-12 opacity-50"
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
