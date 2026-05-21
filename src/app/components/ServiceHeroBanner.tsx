'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDown, Cpu, Terminal, Activity, ShieldCheck, ArrowRight, Play, Pause, Volume2, VolumeX, Award, TrendingUp, Maximize2, Minimize2 } from 'lucide-react';

export function ServiceHeroBanner() {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [videoTime, setVideoTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 2000);
    };

    useEffect(() => {
        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, [isPlaying]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    const toggleFullscreen = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!playerContainerRef.current) return;
        
        if (!document.fullscreenElement) {
            playerContainerRef.current.requestFullscreen().then(() => {
                setIsFullscreen(true);
            }).catch((err) => {
                console.error("Error attempting to enable fullscreen:", err);
            });
        } else {
            document.exitFullscreen().then(() => {
                setIsFullscreen(false);
            }).catch((err) => {
                console.error("Error attempting to exit fullscreen:", err);
            });
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const newTime = (clickX / width) * videoRef.current.duration;
        videoRef.current.currentTime = newTime;
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const springY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    
    // Parallax Transforms
    const yText = useTransform(springY, [0, 1], [0, 200]);
    const opacityText = useTransform(springY, [0, 0.5], [1, 0]);
    const scaleImage = useTransform(springY, [0, 1], [1, 1.2]);
    const yImage = useTransform(springY, [0, 1], [0, 100]);

    return (
        <section 
            ref={containerRef}
            className="relative w-full min-h-[110vh] lg:h-[110vh] py-24 lg:py-0 flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
        >
            {/* Background Atmosphere & High-Fidelity Imagery */}
            <div className="absolute inset-0 z-0">
                <motion.div 
                    style={{ scale: scaleImage, y: yImage }}
                    className="relative w-full h-full"
                >
                    <div className="absolute inset-0 bg-[#0a0a0a]/50 z-10" />
                    <img 
                        src="/studyabroads/ivy_league_network.png?v=2" 
                        alt="Service Environment 3D Animation" 
                        className="w-full h-full object-cover opacity-80 scale-110"
                    />
                    <div className="absolute inset-0 bg-[#0a0a0a]/30 z-10" />
                    {/* Real-time 3D Particle Network Video Simulation */}
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

                            // Initialize random network coordinates
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
                                ctx.fillStyle = 'rgba(212, 175, 55, 0.45)';
                                ctx.strokeStyle = 'rgba(212, 175, 55, 0.12)';
                                ctx.lineWidth = 0.8;

                                // Update and render points
                                points.forEach((p, idx) => {
                                    p.x += p.vx;
                                    p.y += p.vy;

                                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                                    ctx.beginPath();
                                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                                    ctx.fill();

                                    // Render connecting lines
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
                        className="absolute inset-0 w-full h-full object-cover z-15 opacity-65 pointer-events-none mix-blend-screen"
                    />
                </motion.div>
                


                {/* Atmospheric Noise */}
                <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <filter id="noiseHero">
                            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseHero)" />
                    </svg>
                </div>
            </div>

            {/* Cinematic Content Sequence */}
            <motion.div 
                style={{ y: yText, opacity: opacityText }}
                className="relative z-30 container mx-auto px-6 md:px-12 max-w-7xl w-full"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
                    {/* Left Column: Typography & Action Buttons */}
                    <div className="lg:col-span-6 text-left flex flex-col items-start">
                        <h1 
                            className="text-5xl md:text-7xl xl:text-8xl font-bold text-white tracking-tighter leading-[0.9] mb-8"
                            style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                            <motion.span 
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="block"
                            >
                                Admissions
                            </motion.span>
                            <motion.span 
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="block text-[#d4af37] italic"
                            >
                                Strategy
                            </motion.span>
                        </h1>

                        <div className="text-base md:text-lg text-white/80 max-w-xl font-light leading-relaxed mb-10 overflow-hidden">
                            {"From tailored Ivy League essays to complete visa and relocation portfolios, we engineer every milestone of your global admissions journey with uncompromised strategic integrity.".split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.6 + (i * 0.03),
                                        ease: [0.33, 1, 0.68, 1]
                                    }}
                                    className="inline-block mr-[0.3em]"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="flex flex-col sm:flex-row items-center gap-6"
                        >
                            <button className="group relative px-8 py-4 bg-white text-[#1a1a1a] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl">
                                <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <span className="relative z-10 flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase">
                                    Explore Services <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </span>
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Column: Premium Video Player Card Console */}
                    <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
                        <motion.div 
                            ref={playerContainerRef}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setShowControls(true)}
                            onMouseLeave={() => { if (isPlaying) setShowControls(false); }}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className={`relative overflow-hidden group/video transition-all duration-300 ${
                                isFullscreen 
                                    ? 'w-screen h-screen max-w-none rounded-none border-none p-0 bg-black flex items-center justify-center' 
                                    : 'w-full max-w-lg aspect-[16/10] rounded-2xl border border-white/10 bg-[#121212]/80 backdrop-blur-md shadow-2xl p-1'
                            }`}
                        >
                            {/* Ambient Glow behind card */}
                            {!isFullscreen && (
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/15 via-transparent to-white/5 opacity-50 pointer-events-none" />
                            )}

                            {/* Video Player Frame */}
                            <div className={`relative w-full h-full overflow-hidden bg-black transition-all duration-300 ${
                                isFullscreen ? 'rounded-none' : 'rounded-xl'
                            }`}>
                                <video 
                                    ref={videoRef}
                                    src="/studyabroads/academic_strategy.mp4"
                                    className="w-full h-full object-cover opacity-85 transition-opacity duration-300 group-hover/video:opacity-100"
                                    loop
                                    muted={isMuted}
                                    playsInline
                                    autoPlay
                                    onLoadedMetadata={() => {
                                        if (videoRef.current) {
                                            setVideoDuration(videoRef.current.duration || 0);
                                        }
                                    }}
                                    onTimeUpdate={() => {
                                        if (videoRef.current) {
                                            const current = videoRef.current.currentTime;
                                            const dur = videoRef.current.duration;
                                            setVideoTime(current || 0);
                                            if (dur) {
                                                setVideoDuration(dur);
                                                setProgress((current / dur) * 100);
                                            }
                                        }
                                    }}
                                />

                                {/* Video Overlay Darkener */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

                                {/* TOP FLOATING TAGS */}
                                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none select-none">
                                    {/* Live Model simulation tag */}
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        <span className="text-[9px] font-bold tracking-widest text-emerald-400 uppercase">Live Strategy</span>
                                    </div>

                                    {/* Target Ivy tag */}
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
                                        <Award className="w-3.5 h-3.5 text-[#d4af37]" />
                                        <span className="text-[9px] font-bold tracking-wider text-[#d4af37] uppercase">Ivy League Target</span>
                                    </div>
                                </div>

                                {/* BOTTOM METRICS OVERLAY (Acceptance Rate) */}
                                <div className="absolute bottom-16 left-4 pointer-events-none select-none">
                                    <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black/75 border border-[#d4af37]/30 backdrop-blur-md shadow-lg">
                                        <TrendingUp className="w-4 h-4 text-[#d4af37]" />
                                        <div>
                                            <div className="text-[8px] font-bold tracking-wider text-white/50 uppercase">Strategic Success</div>
                                            <div className="text-xs font-bold text-white font-mono leading-none">98.4% Admission Rate</div>
                                        </div>
                                    </div>
                                </div>

                                {/* VIDEO CONTROLLER BAR */}
                                <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 flex flex-col gap-3 ${
                                    (showControls || !isPlaying) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                                }`}>
                                    {/* Custom Progress Bar */}
                                    <div 
                                        className="w-full h-1 bg-white/20 rounded-full cursor-pointer relative overflow-hidden group/bar"
                                        onClick={handleProgressClick}
                                    >
                                        <div 
                                            style={{ width: `${progress}%` }} 
                                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#d4af37] to-amber-400 rounded-full group-hover/bar:bg-amber-300 transition-all duration-75"
                                        />
                                    </div>

                                    {/* Play/Mute Actions */}
                                    <div className="flex items-center justify-between">
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
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="text-[10px] font-mono text-white/70">
                                                {formatTime(videoTime)} / {formatTime(videoDuration)}
                                            </div>
                                            <button 
                                                onClick={toggleFullscreen}
                                                className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
                                                aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                                            >
                                                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Scroll Interaction Node */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-40"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#d4af37] to-transparent" />
                <span className="text-[8px] font-bold tracking-[0.6em] text-[#d4af37] uppercase animate-pulse">Discover Services</span>
                <ArrowDown className="w-4 h-4 text-[#d4af37] animate-bounce" />
            </motion.div>
        </section>
    );
}