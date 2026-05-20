"use client";

import React, { useState, useRef } from 'react';
import {
    Calendar,
    MessageSquare,
    User,
    Mail,
    Phone,
    ArrowRight,
    CheckCircle2,
    Clock,
    Globe,
    ShieldCheck,
    GraduationCap
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export const MultiStepQuoteForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        targetDestination: '',
        targetDegree: '',
        targetIntake: '',
        gpa: '',
        message: ''
    });

    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // 3D Motion Physics springs for form tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

    const springConfig = { stiffness: 120, damping: 20 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
        setMousePos({ x: mouseX, y: mouseY });
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl mx-auto px-8 py-24 bg-white/80 backdrop-blur-3xl border border-[#c5a56d]/20 rounded-[40px] shadow-2xl text-center space-y-12 relative overflow-hidden"
            >
                {/* Verification Scanning sweeps */}
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="submittedGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a1a1a" strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#submittedGrid)" />
                    </svg>
                </div>

                <div className="w-24 h-24 rounded-full border border-[#c5a56d] mx-auto flex items-center justify-center relative z-10">
                    <CheckCircle2 className="w-10 h-10 text-[#c5a56d]" />
                    <motion.div
                        className="absolute inset-0 rounded-full border border-[#c5a56d]"
                        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
                <div className="space-y-6 relative z-10">
                    <h2 
                        className="text-5xl md:text-7xl font-serif italic text-[#1a1a1a] tracking-tighter"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Profile <span className="not-italic text-[#c5a56d]">Archived.</span>
                    </h2>
                    <p 
                        className="text-lg md:text-xl text-[#1a1a1a]/60 italic max-w-xl mx-auto leading-relaxed"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Your academic credentials have been successfully transmitted to our admissions advisory board. Expect an executive evaluation within 4 business hours.
                    </p>
                </div>
                <div className="relative z-10">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-12 py-5 bg-[#1a1a1a] text-[#fdfaf3] rounded-full font-bold tracking-[0.4em] uppercase text-[10px] hover:bg-[#c5a56d] hover:text-[#1a1a1a] transition-colors duration-500 shadow-xl"
                    >
                        Return to Navigation
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <section className="relative w-full overflow-hidden bg-[#faf9f6] pb-16 md:pb-24">
            {/* 3D Floating Geometric Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ perspective: 1000 }}>
                {/* Large Gold Sphere */}
                <motion.div 
                    animate={{ 
                        y: [0, -50, 0],
                        rotateX: [0, 10, 0],
                        rotateY: [0, 20, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, rgba(197, 165, 109, 0.15), rgba(197, 165, 109, 0.02) 60%, transparent 80%)',
                        boxShadow: 'inset -20px -20px 60px rgba(0,0,0,0.05)',
                        filter: 'blur(10px)'
                    }}
                />
                {/* Right Side Floating Orb */}
                <motion.div 
                    animate={{ 
                        y: [0, 60, 0],
                        x: [0, -30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[30%] -right-[5%] w-[400px] h-[400px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle at 40% 40%, rgba(197, 165, 109, 0.1), transparent 70%)',
                        filter: 'blur(20px)'
                    }}
                />
                {/* Bottom Center Depth Ring */}
                <motion.div 
                    animate={{ 
                        rotateZ: [0, 360],
                        rotateX: [60, 75, 60]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[20%] left-[20%] w-[800px] h-[800px] rounded-full border border-[#c5a56d]/30"
                    style={{ transformStyle: 'preserve-3d' }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Side: Editorial Manifesto */}
                    <div className="space-y-12 text-left">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4 text-[#c5a56d]"
                            >
                                <span className="w-12 h-[1px] bg-[#c5a56d]/50"></span>
                                <span className="text-[10px] font-bold tracking-[0.5em] uppercase font-mono">Inquiry Terminal</span>
                            </motion.div>
                            <h1 
                                className="text-6xl md:text-8xl lg:text-[7rem] font-serif italic text-[#1a1a1a] leading-[0.85] tracking-tighter"
                                style={{ fontFamily: '"Playfair Display", serif', perspective: 1000 }}
                            >
                                {["Securing", "Your Academic", "destiny."].map((word, i) => (
                                    <React.Fragment key={i}>
                                        <motion.span
                                            initial={{ opacity: 0, rotateX: -90, y: 50 }}
                                            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={{ 
                                                type: "spring", 
                                                stiffness: 100, 
                                                damping: 12, 
                                                delay: i * 0.2
                                            }}
                                            style={{ transformOrigin: "bottom", display: "inline-block" }}
                                            className={i === 2 ? "not-italic text-[#c5a56d]" : ""}
                                        >
                                            {word}
                                        </motion.span>
                                        <br />
                                    </React.Fragment>
                                ))}
                            </h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                                className="text-xl text-[#1a1a1a]/50 font-light italic leading-relaxed max-w-md"
                                style={{ fontFamily: '"Playfair Display", serif' }}
                            >
                                "Commence your elite study abroad application. Transmit your academic aspirations to our global admissions advisory board."
                            </motion.p>
                        </div>

                        {/* Operational lines styled as Luxury Dossier Node Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                            <motion.div 
                                initial={{ opacity: 0, x: -50, rotateY: 45 }}
                                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10, z: 20 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.8 }}
                                style={{ perspective: 1000, transformStyle: "preserve-3d" }}
                                className="p-6 bg-white/40 border border-[#c5a56d]/20 rounded-2xl relative group hover:shadow-xl hover:bg-white/60 transition-colors"
                            >
                                <span className="text-[8px] font-bold tracking-[0.3em] text-[#c5a56d] uppercase font-mono" style={{ transform: 'translateZ(20px)', display: 'block' }}>Operational Line</span>
                                <p className="text-[#1a1a1a] font-serif italic text-lg mt-1" style={{ transform: 'translateZ(30px)' }}>+44 (20) 7946 0192</p>
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, x: -50, rotateY: 45 }}
                                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10, z: 20 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.95 }}
                                style={{ perspective: 1000, transformStyle: "preserve-3d" }}
                                className="p-6 bg-white/40 border border-[#c5a56d]/20 rounded-2xl relative group hover:shadow-xl hover:bg-white/60 transition-colors"
                            >
                                <span className="text-[8px] font-bold tracking-[0.3em] text-[#c5a56d] uppercase font-mono" style={{ transform: 'translateZ(20px)', display: 'block' }}>Direct Dispatch</span>
                                <p className="text-[#1a1a1a] font-serif italic text-lg mt-1" style={{ transform: 'translateZ(30px)' }}>advisors@globalpath.com</p>
                            </motion.div>
                        </div>

                        {/* Technical Integrity Marker with Scanning Radars */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50, rotateY: 45 }}
                            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                            whileHover={{ scale: 1.05, rotateX: -5, rotateY: -5, z: 20 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 1.1 }}
                            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
                            className="p-8 bg-white/50 backdrop-blur-xl border border-[#c5a56d]/20 rounded-3xl flex items-center gap-6 group relative hover:shadow-xl hover:bg-white/80 transition-colors overflow-hidden"
                        >
                            <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center transition-transform duration-700 group-hover:rotate-[360deg] relative z-10 shadow-md">
                                <ShieldCheck className="w-6 h-6 text-[#c5a56d]" />
                            </div>
                            <div className="relative z-10">
                                <span className="text-[9px] font-bold tracking-[0.2em] text-[#c5a56d] uppercase font-mono">Secure Sync</span>
                                <p className="text-xs text-[#1a1a1a]/60 mt-1">End-to-end encrypted student database protocol.</p>
                            </div>
                            {/* Scanning radar accent line */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c5a56d]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                        </motion.div>
                    </div>

                    {/* Right Side: The Premium Form Console */}
                    <div className="w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 150, scale: 0.8, rotateX: 15, rotateY: -15 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ 
                                duration: 1.5, 
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{ perspective: 1500 }}
                        >
                            <motion.div
                                ref={cardRef}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    rotateX: rotateXSpring,
                                    rotateY: rotateYSpring,
                                    transformStyle: 'preserve-3d',
                                    perspective: 2000
                                }}
                                className="bg-white p-10 md:p-16 rounded-[48px] shadow-[0_45px_100px_-25px_rgba(0,0,0,0.06)] hover:shadow-[0_60px_120px_-20px_rgba(197,165,109,0.18)] transition-all duration-700 border border-black/5 relative group"
                            >
                            {/* Custom Mouse Spotlight Highlight */}
                            <div 
                                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                style={{
                                    background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, rgba(197, 165, 109, 0.04), transparent 80%)`
                                }}
                            />

                            {/* Custom Mouse-Tracking Border Ray */}
                            <div 
                                className="absolute inset-0 rounded-[48px] pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    padding: '1.5px',
                                    background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, #c5a56d, transparent 75%)`,
                                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    maskComposite: 'exclude',
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor'
                                }}
                            />

                            <form onSubmit={handleSubmit} className="relative z-10 space-y-10" style={{ transformStyle: 'preserve-3d' }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10" style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}>
                                    <FormField label="Full Name" name="name" icon={User} placeholder="Sarah Mitchell" value={formData.name} onChange={handleChange} required />
                                    <FormField label="Email Link" name="email" type="email" icon={Mail} placeholder="sarah@vision.com" value={formData.email} onChange={handleChange} required />
                                    <FormField label="Voice Link" name="phone" type="tel" icon={Phone} placeholder="+1 555 000 0000" value={formData.phone} onChange={handleChange} required />
                                    
                                    <FormSelectField 
                                        label="Target Destination" 
                                        name="targetDestination" 
                                        icon={Globe} 
                                        value={formData.targetDestination} 
                                        onChange={handleChange} 
                                        required
                                        options={[
                                            { value: "", label: "SELECT DESTINATION..." },
                                            { value: "uk", label: "UNITED KINGDOM" },
                                            { value: "us", label: "UNITED STATES" },
                                            { value: "canada", label: "CANADA" },
                                            { value: "australia", label: "AUSTRALIA" },
                                            { value: "switzerland", label: "SWITZERLAND" },
                                            { value: "singapore", label: "SINGAPORE" },
                                            { value: "germany", label: "GERMANY" },
                                            { value: "netherlands", label: "NETHERLANDS" }
                                        ]}
                                    />

                                    <FormSelectField 
                                        label="Degree Typology" 
                                        name="targetDegree" 
                                        icon={GraduationCap} 
                                        value={formData.targetDegree} 
                                        onChange={handleChange} 
                                        required
                                        options={[
                                            { value: "", label: "SELECT DEGREE LEVEL..." },
                                            { value: "undergraduate", label: "UNDERGRADUATE (BA/BSC)" },
                                            { value: "postgraduate", label: "POSTGRADUATE (MA/MSC/MBA)" },
                                            { value: "doctorate", label: "DOCTORATE (PHD/DBA)" },
                                            { value: "preparatory", label: "DIPLOMAS & PREPARATORY" }
                                        ]}
                                    />

                                    <FormField label="Temporal Target" name="targetIntake" type="text" icon={Calendar} placeholder="e.g. FALL 2026 / SPRING 2027" value={formData.targetIntake} onChange={handleChange} required />
                                    <FormField label="Academic Stand" name="gpa" type="text" icon={Clock} placeholder="e.g. 3.8 GPA or 85%" value={formData.gpa} onChange={handleChange} required />
                                </div>

                                <div className="space-y-4" style={{ transform: 'translateZ(90px)' }}>
                                    <FormTextareaField 
                                        label="Academic Profile Brief" 
                                        name="message" 
                                        icon={MessageSquare} 
                                        placeholder="OUTLINE YOUR GPA, SAT/IELTS SCORES, RESEARCH INTERESTS, AND TARGET UNIVERSITIES..." 
                                        value={formData.message} 
                                        onChange={handleChange} 
                                    />
                                </div>

                                <div className="pt-4" style={{ transform: 'translateZ(120px)' }}>
                                    <button
                                        type="submit"
                                        className="group w-full bg-[#1e201b] text-[#fdfaf3] py-6 rounded-full font-bold tracking-[0.5em] uppercase text-[11px] flex items-center justify-center gap-6 transition-all duration-700 hover:bg-[#c5a56d] hover:text-[#1a1a1a] shadow-[0_20px_40px_-10px_rgba(197,165,109,0.4)] hover:shadow-[0_20px_50px_-5px_rgba(197,165,109,0.6)] relative overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center gap-3">
                                            BEGIN YOUR JOURNEY
                                            <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-3" />
                                        </span>
                                        {/* Cinematic shimmer shine on button */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
};

const FormField = ({ label, icon: Icon, value, name, onChange, placeholder, required = false, type = "text" }: any) => {
    const [focused, setFocused] = useState(false);
    return (
        <div className="space-y-3 group relative text-left">
            <label className={`text-[11px] font-bold tracking-[0.4em] uppercase ml-2 transition-colors duration-500 ${focused ? 'text-[#c5a56d]' : 'text-[#1a1a1a]/80'}`}>{label}</label>
            <div className="relative">
                <Icon className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-500 ${focused ? 'text-[#c5a56d] scale-110' : 'text-[#1a1a1a]/50'}`} />
                <input 
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`w-full border rounded-2xl pl-16 pr-6 py-5 text-[15px] focus:outline-none transition-all duration-500 font-serif italic text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 shadow-sm
                        ${focused ? 'bg-white border-[#c5a56d] shadow-[0_10px_40px_-10px_rgba(197,165,109,0.3)]' : 'bg-[#faf9f6] border-[#1a1a1a]/15 hover:border-[#1a1a1a]/30'}`}
                />
            </div>
        </div>
    );
};

const FormSelectField = ({ label, icon: Icon, value, name, onChange, options, required = false }: any) => {
    const [focused, setFocused] = useState(false);
    return (
        <div className="space-y-3 group relative text-left">
            <label className={`text-[11px] font-bold tracking-[0.4em] uppercase ml-2 transition-colors duration-500 ${focused ? 'text-[#c5a56d]' : 'text-[#1a1a1a]/80'}`}>{label}</label>
            <div className="relative">
                <Icon className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-500 ${focused ? 'text-[#c5a56d] scale-110' : 'text-[#1a1a1a]/50'}`} />
                <select 
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`w-full border rounded-2xl pl-16 pr-6 py-5 text-[13px] focus:outline-none transition-all duration-500 appearance-none font-serif italic uppercase text-[#1a1a1a] shadow-sm
                        ${focused ? 'bg-white border-[#c5a56d] shadow-[0_10px_40px_-10px_rgba(197,165,109,0.3)]' : 'bg-[#faf9f6] border-[#1a1a1a]/15 hover:border-[#1a1a1a]/30'}
                        ${value === "" ? 'text-[#1a1a1a]/40' : 'text-[#1a1a1a]'}`}
                >
                    {options.map((opt: any) => (
                        <option key={opt.value} value={opt.value} className="text-[#1a1a1a] font-sans non-italic">{opt.label}</option>
                    ))}
                </select>
                {/* Custom Chevron Indicator */}
                <div className={`absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none font-mono text-[10px] tracking-widest font-bold transition-colors duration-500 ${focused ? 'text-[#c5a56d]' : 'text-[#1a1a1a]/50'}`}>▼</div>
            </div>
        </div>
    );
};

const FormTextareaField = ({ label, icon: Icon, value, name, onChange, placeholder, required = false, rows = 4 }: any) => {
    const [focused, setFocused] = useState(false);
    return (
        <div className="space-y-3 group relative text-left">
            <label className={`text-[11px] font-bold tracking-[0.4em] uppercase ml-2 transition-colors duration-500 ${focused ? 'text-[#c5a56d]' : 'text-[#1a1a1a]/80'}`}>{label}</label>
            <div className="relative">
                <Icon className={`absolute left-6 top-6 w-5 h-5 transition-all duration-500 ${focused ? 'text-[#c5a56d] scale-110' : 'text-[#1a1a1a]/50'}`} />
                <textarea 
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    rows={rows}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`w-full border rounded-[24px] pl-16 pr-8 py-6 text-[15px] focus:outline-none transition-all duration-500 resize-none font-serif italic leading-relaxed text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 shadow-sm
                        ${focused ? 'bg-white border-[#c5a56d] shadow-[0_10px_40px_-10px_rgba(197,165,109,0.3)]' : 'bg-[#faf9f6] border-[#1a1a1a]/15 hover:border-[#1a1a1a]/30'}`}
                />
            </div>
        </div>
    );
};
