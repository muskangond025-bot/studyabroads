import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play, Pause, Volume2, VolumeX, Award, TrendingUp, Maximize2, Minimize2, GraduationCap } from 'lucide-react';

interface InnerHeroBannerProps {
    title: string;
    subtitle: string;
    description?: string;
    backgroundImage?: string;
}

interface UniversityRegion {
    id: string;
    label: string;
    flag: string;
    videoUrl: string;
    tag: string;
    rate: string;
    metricLabel: string;
}

const REGIONS: UniversityRegion[] = [
    {
        id: 'us',
        label: 'US Ivy League',
        flag: '🇺🇸',
        videoUrl: '/studyabroads/academic_strategy.mp4',
        tag: 'Ivy League Target',
        rate: '98.4% Admission Rate',
        metricLabel: 'Strategic Success'
    },
    {
        id: 'uk',
        label: 'UK Oxbridge',
        flag: '🇬🇧',
        videoUrl: '/studyabroads/university_uk.mp4',
        tag: 'Oxbridge Pathway',
        rate: '97.1% Success Rate',
        metricLabel: 'Elite Placements'
    },
    {
        id: 'ca',
        label: 'Canada Elite',
        flag: '🇨🇦',
        videoUrl: '/studyabroads/university_ca.mp4',
        tag: 'U15 Research Hub',
        rate: '99.0% Visa Success',
        metricLabel: 'Visa & Relocation'
    },
    {
        id: 'au',
        label: 'Australia Go8',
        flag: '🇦🇺',
        videoUrl: '/studyabroads/university_au.mp4',
        tag: 'Go8 Group Target',
        rate: '98.6% Placement Rate',
        metricLabel: 'Academic Placement'
    }
];

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
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRefA = useRef<HTMLVideoElement>(null);
    const videoRefB = useRef<HTMLVideoElement>(null);

    const [selectedRegion, setSelectedRegion] = useState<UniversityRegion>(REGIONS[0]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [videoTime, setVideoTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);

    const [videoSrcA, setVideoSrcA] = useState<string>(
        title === "Elite Scholarships" ? '/studyabroads/graduation_ceremony.mp4' : REGIONS[0].videoUrl
    );
    const [videoSrcB, setVideoSrcB] = useState<string>('');
    const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A');

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const base = import.meta.env.BASE_URL || '/';
    const resolvedBg = backgroundImage 
        ? (backgroundImage.startsWith('http') || backgroundImage.startsWith('data:') 
            ? backgroundImage 
            : `${base}${backgroundImage.startsWith('/') ? backgroundImage.slice(1) : backgroundImage}`)
        : undefined;

    const isUniversitiesPage = title === "Global Universities";
    const isScholarshipsPage = title === "Elite Scholarships";

    useEffect(() => {
        const activeRef = isScholarshipsPage ? videoRefA : (activeSlot === 'A' ? videoRefA : videoRefB);
        const inactiveRef = isScholarshipsPage ? null : (activeSlot === 'A' ? videoRefB : videoRefA);

        if (activeRef && activeRef.current) {
            activeRef.current.muted = isMuted;
            if (isPlaying) {
                activeRef.current.play().catch(() => {});
            } else {
                activeRef.current.pause();
            }
        }

        if (inactiveRef && inactiveRef.current) {
            inactiveRef.current.muted = true;
            inactiveRef.current.pause();
        }
    }, [activeSlot, isPlaying, isMuted, isScholarshipsPage, videoSrcA, videoSrcB]);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPlaying(!isPlaying);
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMuted(!isMuted);
    };

    const updateProgress = (el: HTMLVideoElement) => {
        const current = el.currentTime;
        const dur = el.duration;
        setVideoTime(current || 0);
        if (dur) {
            setVideoDuration(dur);
            setProgress((current / dur) * 100);
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleRegionChange = (region: UniversityRegion) => {
        if (region.id === selectedRegion.id) return;
        
        setSelectedRegion(region);
        
        if (activeSlot === 'A') {
            setVideoSrcB(region.videoUrl);
            setActiveSlot('B');
        } else {
            setVideoSrcA(region.videoUrl);
            setActiveSlot('A');
        }
    };

    useEffect(() => {
        if (!isUniversitiesPage || !isPlaying) return;

        const interval = setInterval(() => {
            const currentIndex = REGIONS.findIndex(r => r.id === selectedRegion.id);
            const nextIndex = (currentIndex + 1) % REGIONS.length;
            const nextRegion = REGIONS[nextIndex];
            
            setSelectedRegion(nextRegion);
            
            if (activeSlot === 'A') {
                setVideoSrcB(nextRegion.videoUrl);
                setActiveSlot('B');
            } else {
                setVideoSrcA(nextRegion.videoUrl);
                setActiveSlot('A');
            }
        }, 10000); // Cycle every 10 seconds

        return () => clearInterval(interval);
    }, [isUniversitiesPage, selectedRegion.id, isPlaying, activeSlot]);

    if (isUniversitiesPage) {
        return (
            <section 
                ref={containerRef}
                className="relative w-full h-[100vh] min-h-[650px] flex items-center justify-center overflow-hidden bg-black"
            >
                {/* Fullscreen Video Background Slot A */}
                <video 
                    ref={videoRefA}
                    src={videoSrcA}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out z-0 ${
                        activeSlot === 'A' ? 'opacity-45 scale-105' : 'opacity-0 scale-100 pointer-events-none'
                    }`}
                    loop
                    muted={isMuted}
                    defaultMuted
                    playsInline
                    autoPlay
                    onTimeUpdate={() => {
                        if (activeSlot === 'A' && videoRefA.current) {
                            updateProgress(videoRefA.current);
                        }
                    }}
                    onLoadedMetadata={() => {
                        if (activeSlot === 'A' && videoRefA.current) {
                            setVideoDuration(videoRefA.current.duration || 0);
                        }
                    }}
                />

                {/* Fullscreen Video Background Slot B */}
                {videoSrcB && (
                    <video 
                        ref={videoRefB}
                        src={videoSrcB}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out z-0 ${
                            activeSlot === 'B' ? 'opacity-45 scale-105' : 'opacity-0 scale-100 pointer-events-none'
                        }`}
                        loop
                        muted={isMuted}
                        defaultMuted
                        playsInline
                        autoPlay
                        onTimeUpdate={() => {
                            if (activeSlot === 'B' && videoRefB.current) {
                                updateProgress(videoRefB.current);
                            }
                        }}
                        onLoadedMetadata={() => {
                            if (activeSlot === 'B' && videoRefB.current) {
                                setVideoDuration(videoRefB.current.duration || 0);
                            }
                        }}
                    />
                )}

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-5 pointer-events-none" />

                {/* Background Atmosphere & High-Fidelity Canvas Particles */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <motion.div 
                        style={{ y: y1 }}
                        className="relative w-full h-full"
                    >
                        <canvas 
                            ref={(canvas) => {
                                if (!canvas) return;
                                const ctx = canvas.getContext('2d');
                                if (!ctx) return;
                                let animationFrameId: number;
                                const points: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
                                
                                const resize = () => {
                                    canvas.width = window.innerWidth;
                                    canvas.height = window.innerHeight;
                                };
                                resize();
                                window.addEventListener('resize', resize);

                                for (let i = 0; i < 40; i++) {
                                    points.push({
                                        x: Math.random() * canvas.width,
                                        y: Math.random() * canvas.height,
                                        vx: (Math.random() - 0.5) * 0.35,
                                        vy: (Math.random() - 0.5) * 0.35,
                                        r: Math.random() * 2.5 + 1
                                    });
                                }

                                const animate = () => {
                                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                                    ctx.fillStyle = 'rgba(212, 175, 55, 0.35)';
                                    ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
                                    ctx.lineWidth = 0.8;

                                    points.forEach((p, idx) => {
                                        p.x += p.vx;
                                        p.y += p.vy;

                                        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                                        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                                        ctx.beginPath();
                                        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                                        ctx.fill();

                                        for (let j = idx + 1; j < points.length; j++) {
                                            const p2 = points[j];
                                            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                                            if (dist < 180) {
                                                ctx.beginPath();
                                                ctx.moveTo(p.x, p.y);
                                                ctx.lineTo(p2.x, p2.y);
                                                ctx.stroke();
                                            }
                                        }
                                    });

                                    animationFrameId = requestAnimationFrame(animate);
                                };
                                animate();

                                return () => {
                                    window.removeEventListener('resize', resize);
                                    cancelAnimationFrame(animationFrameId);
                                };
                            }}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
                        />
                    </motion.div>
                </div>

                {/* Content Sequence */}
                <motion.div 
                    style={{ opacity }}
                    className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center min-h-[50vh] space-y-6 md:space-y-8"
                >
                    {/* Glowing stats badge above the title */}
                    <motion.div
                        key={selectedRegion.id}
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-md shadow-lg"
                    >
                        <span className="text-base leading-none">{selectedRegion.flag}</span>
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[#d4af37] uppercase leading-none">
                            {selectedRegion.tag} • {selectedRegion.rate}
                        </span>
                    </motion.div>

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
                        <div className="max-w-2xl text-base md:text-lg text-white/80 font-light leading-relaxed">
                            <WritingText 
                                text={`"${description}"`} 
                                className="italic"
                                delay={0.8}
                            />
                        </div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                        className="pt-4 flex justify-center"
                    >
                        <button
                            className="group relative px-10 py-4.5 bg-white text-[#1a1a1a] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl"
                        >
                            <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <span className="relative z-10 flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase">
                                Explore Placements <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </span>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Floating Glassmorphic Control Dock */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col md:flex-row items-center gap-4 px-6 py-3.5 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                    {/* Scrubber overlay at the top edge of the dock */}
                    <div 
                        className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 cursor-pointer"
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const width = rect.width;
                            const activeRef = activeSlot === 'A' ? videoRefA : videoRefB;
                            if (activeRef.current) {
                                const newTime = (clickX / width) * activeRef.current.duration;
                                activeRef.current.currentTime = newTime;
                            }
                        }}
                    >
                        <div 
                            style={{ width: `${progress}%` }} 
                            className="h-full bg-gradient-to-r from-[#d4af37] to-amber-400"
                        />
                    </div>

                    {/* Region Selector Tabs */}
                    <div className="flex items-center gap-1.5">
                        {REGIONS.map((region) => (
                            <button
                                key={region.id}
                                onClick={() => handleRegionChange(region)}
                                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 ${
                                    selectedRegion.id === region.id
                                        ? 'bg-[#d4af37] text-[#0a0a0a] shadow-md shadow-[#d4af37]/20 scale-105'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <span>{region.flag}</span>
                                <span>{region.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Separator line on desktop */}
                    <div className="hidden md:block w-px h-6 bg-white/15" />

                    {/* Media Controls */}
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={togglePlay}
                            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                        <button 
                            onClick={toggleMute}
                            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-white/60" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                        
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] font-mono text-white/60 leading-none">
                                {formatTime(videoTime)}
                            </span>
                            <span className="relative flex h-1.5 w-1.5 ml-1">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? 'bg-emerald-400 opacity-75' : 'bg-amber-400 opacity-75'}`}></span>
                                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isPlaying ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (isScholarshipsPage) {
        return (
            <section 
                ref={containerRef}
                className="relative w-full h-[100vh] min-h-[650px] flex items-center justify-center overflow-hidden bg-black"
            >
                {/* Fullscreen Video Background */}
                <video 
                    ref={videoRefA}
                    src={videoSrcA}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out z-0 opacity-45 scale-105"
                    loop
                    muted={isMuted}
                    defaultMuted
                    playsInline
                    autoPlay
                    onTimeUpdate={() => {
                        if (videoRefA.current) {
                            updateProgress(videoRefA.current);
                        }
                    }}
                    onLoadedMetadata={() => {
                        if (videoRefA.current) {
                            setVideoDuration(videoRefA.current.duration || 0);
                        }
                    }}
                />

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black z-5 pointer-events-none" />

                {/* Background Atmosphere & High-Fidelity Canvas Particles */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <motion.div 
                        style={{ y: y1 }}
                        className="relative w-full h-full"
                    >
                        <canvas 
                            ref={(canvas) => {
                                if (!canvas) return;
                                const ctx = canvas.getContext('2d');
                                if (!ctx) return;
                                let animationFrameId: number;
                                const points: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
                                
                                const resize = () => {
                                    canvas.width = window.innerWidth;
                                    canvas.height = window.innerHeight;
                                };
                                resize();
                                window.addEventListener('resize', resize);

                                for (let i = 0; i < 40; i++) {
                                    points.push({
                                        x: Math.random() * canvas.width,
                                        y: Math.random() * canvas.height,
                                        vx: (Math.random() - 0.5) * 0.35,
                                        vy: (Math.random() - 0.5) * 0.35,
                                        r: Math.random() * 2.5 + 1
                                    });
                                }

                                const animate = () => {
                                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                                    ctx.fillStyle = 'rgba(212, 175, 55, 0.35)';
                                    ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
                                    ctx.lineWidth = 0.8;

                                    points.forEach((p, idx) => {
                                        p.x += p.vx;
                                        p.y += p.vy;

                                        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                                        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                                        ctx.beginPath();
                                        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                                        ctx.fill();

                                        for (let j = idx + 1; j < points.length; j++) {
                                            const p2 = points[j];
                                            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                                            if (dist < 180) {
                                                ctx.beginPath();
                                                ctx.moveTo(p.x, p.y);
                                                ctx.lineTo(p2.x, p2.y);
                                                ctx.stroke();
                                            }
                                        }
                                    });

                                    animationFrameId = requestAnimationFrame(animate);
                                };
                                animate();

                                return () => {
                                    window.removeEventListener('resize', resize);
                                    cancelAnimationFrame(animationFrameId);
                                };
                            }}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
                        />
                    </motion.div>
                </div>

                {/* Content Sequence */}
                <motion.div 
                    style={{ opacity }}
                    className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center min-h-[50vh] space-y-6 md:space-y-8"
                >
                    {/* Glowing stats badge above the title */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-md shadow-lg"
                    >
                        <GraduationCap className="w-4 h-4 text-[#d4af37]" />
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[#d4af37] uppercase leading-none">
                            Prestige Fellowships • 100% Fully-Funded Target
                        </span>
                    </motion.div>

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
                        <div className="max-w-2xl text-base md:text-lg text-white/80 font-light leading-relaxed">
                            <WritingText 
                                text={`"${description}"`} 
                                className="italic"
                                delay={0.8}
                            />
                        </div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                        className="pt-4 flex justify-center"
                    >
                        <button
                            className="group relative px-10 py-4.5 bg-white text-[#1a1a1a] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl"
                        >
                            <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <span className="relative z-10 flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase">
                                Explore Scholarships <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </span>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Floating Glassmorphic Control Dock */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 px-6 py-3.5 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                    {/* Scrubber overlay at the top edge of the dock */}
                    <div 
                        className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 cursor-pointer"
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const width = rect.width;
                            if (videoRefA.current) {
                                const newTime = (clickX / width) * videoRefA.current.duration;
                                videoRefA.current.currentTime = newTime;
                            }
                        }}
                    >
                        <div 
                            style={{ width: `${progress}%` }} 
                            className="h-full bg-gradient-to-r from-[#d4af37] to-amber-400"
                        />
                    </div>

                    {/* Title in Dock */}
                    <div className="flex items-center gap-2 pr-2">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-white/80 flex items-center gap-1.5 leading-none">
                            🎓 Graduation Ceremony Loop
                        </span>
                    </div>

                    {/* Separator line */}
                    <div className="w-px h-6 bg-white/15" />

                    {/* Media Controls */}
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={togglePlay}
                            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                        <button 
                            onClick={toggleMute}
                            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-white/60" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                        
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] font-mono text-white/60 leading-none">
                                {formatTime(videoTime)}
                            </span>
                            <span className="relative flex h-1.5 w-1.5 ml-1">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? 'bg-emerald-400 opacity-75' : 'bg-amber-400 opacity-75'}`}></span>
                                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isPlaying ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Default Render for other pages
    return (
        <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
            {/* Parallax Background Image */}
            {resolvedBg && (
                <motion.div 
                    style={{ y: y1 }}
                    className="absolute inset-0 z-0"
                >
                    <div 
                        className="absolute inset-0 bg-cover bg-center scale-110"
                        style={{ backgroundImage: `url(${resolvedBg})` }}
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
