import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'motion/react';
import { MapPin, Users, ChevronRight, Star, ShieldCheck, Globe, Zap, ArrowUpRight, Compass, GraduationCap } from 'lucide-react';

interface Venue {
    id: number;
    name: string;
    location: string;
    capacity: string;
    description: string;
    image: string;
    rating: number;
    amenities: string[];
    priceRange: string;
    refCode: string;
    coordinates: string;
}

const venues: Venue[] = [
    {
        id: 1,
        name: 'Rhodes Scholarship',
        location: 'Oxford, UK',
        capacity: 'Full Fees + Stipend',
        description: 'The world\'s oldest and perhaps most prestigious international fellowship, supporting exceptional postgraduate scholars at the University of Oxford.',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1080',
        rating: 4.9,
        amenities: ['Oxford Tuition', 'Living Stipend', 'Global Network', 'Oxford Cohort'],
        priceRange: '100% Waiver',
        refCode: 'SCH-RHD-01',
        coordinates: '51.7548° N, 1.2544° W'
    },
    {
        id: 2,
        name: 'Fulbright Program',
        location: 'Global Hubs, US',
        capacity: 'Tuition + Airfare + Living',
        description: 'The US government\'s flagship international educational exchange program, promoting mutual understanding and academic excellence across all disciplines.',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1080',
        rating: 4.8,
        amenities: ['US Placement', 'Cultural Exchange', 'Travel Allowance', 'Fulbright Alumni'],
        priceRange: 'Fully Funded',
        refCode: 'SCH-FUL-02',
        coordinates: '38.9072° N, 77.0369° W'
    },
    {
        id: 3,
        name: 'Gates Cambridge Scholarship',
        location: 'Cambridge, UK',
        capacity: 'Full Cost of Study',
        description: 'Established by the Bill & Melinda Gates Foundation, funding outstanding postgraduate applicants to study at the University of Cambridge.',
        image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=1080',
        rating: 4.8,
        amenities: ['Cambridge Tuition', 'Academic Allowances', 'Gates Alumni', 'Postgrad Funding'],
        priceRange: '100% Waiver',
        refCode: 'SCH-GAT-03',
        coordinates: '52.2053° N, 0.1218° E'
    },
    {
        id: 4,
        name: 'Schwarzman Scholars',
        location: 'Beijing, China',
        capacity: 'Full Fees + Travel + Stipend',
        description: 'Designed to prepare the next generation of global leaders, offering a fully-funded Master\'s in Global Affairs at Tsinghua University.',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1080',
        rating: 4.7,
        amenities: ['Leadership Seminars', 'Tsinghua University', 'Study Tours', 'Global Mentors'],
        priceRange: 'Fully Funded',
        refCode: 'SCH-SHW-04',
        coordinates: '39.9042° N, 116.4074° E'
    },
    {
        id: 5,
        name: 'Erasmus Mundus Joint Masters',
        location: 'Europe Rotation',
        capacity: 'Full Fees + Travel + Allowance',
        description: 'Prestigious, integrated international study programs, jointly delivered by an international consortium of European higher education institutions.',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1080',
        rating: 4.9,
        amenities: ['Multi-Country Rotation', 'Joint Degrees', 'Language Immersion', 'Schengen Coverage'],
        priceRange: 'Fully Funded',
        refCode: 'SCH-ERA-05',
        coordinates: '50.8503° N, 4.3517° E'
    },
    {
        id: 6,
        name: 'Commonwealth Scholarships',
        location: 'United Kingdom',
        capacity: 'Full Fees + Airfare + Living',
        description: 'Funded by the UK Foreign, Commonwealth & Development Office, supporting exceptional students from Commonwealth nations.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1080',
        rating: 4.8,
        amenities: ['UK Placement', 'FCDO Network', 'Career Placement Links', 'Monthly Stipend'],
        priceRange: 'Fully Funded',
        refCode: 'SCH-COM-06',
        coordinates: '51.5074° N, 0.1278° W'
    }
];

const VenueExhibitionCard = ({ venue, index, onSelect }: { venue: Venue, index: number, onSelect: (v: Venue) => void }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Tilt Physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
    const imageScale = useTransform(mouseX, [-0.5, 0.5], [1.1, 1.15]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
            onClick={() => onSelect(venue)}
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="group relative bg-white rounded-[40px] overflow-hidden cursor-pointer shadow-[0_30px_60px_-25px_rgba(0,0,0,0.05)] transition-all duration-700 hover:shadow-[0_60px_100px_-30px_rgba(212,175,55,0.15)] h-[600px]"
        >
            {/* Image Layer with Parallax */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.img 
                    src={venue.image} 
                    alt={venue.name}
                    style={{ scale: imageScale }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60" />
            </div>

            {/* Top HUD Telemetry */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-10">
                <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-bold tracking-[0.5em] text-white/50 uppercase italic">Scholarship ID</span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">{venue.refCode}</span>
                </div>
                <div className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all duration-700 ${isHovered ? 'bg-[#d4af37] border-[#d4af37]' : ''}`}>
                    <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
            </div>

            {/* Bottom Content Exhibition */}
            <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
                <div className="space-y-6">
                    <motion.div 
                        animate={{ x: isHovered ? 10 : 0 }}
                        className="flex items-center gap-4 text-[#d4af37]"
                    >
                        <div className="w-8 h-[1px] bg-[#d4af37]" />
                        <span className="text-[8px] font-bold tracking-[0.4em] uppercase italic">Regional Coordinates</span>
                    </motion.div>

                    <h3 
                        className="text-4xl font-bold text-white tracking-tighter leading-none animate-shimmer"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        {venue.name}
                    </h3>

                    <div className="flex items-center gap-6 text-white/60">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-[#d4af37]" />
                            <span className="text-[10px] font-bold tracking-widest uppercase">{venue.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <GraduationCap className="w-3 h-3 text-[#d4af37]" />
                            <span className="text-[10px] font-bold tracking-widest uppercase">{venue.capacity}</span>
                        </div>
                    </div>

                    <p className="text-sm text-white/40 font-light leading-relaxed max-w-xs group-hover:text-white/80 transition-colors duration-700">
                        {venue.description}
                    </p>
                </div>
            </div>

            {/* Hover Scanline */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: "100%" }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 pointer-events-none opacity-[0.1] bg-gradient-to-b from-transparent via-white to-transparent h-20 z-20"
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export const VenueCardsGrid = () => {
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

    return (
        <section className="relative w-full py-32 md:py-48 bg-[#faf9f6] overflow-hidden">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="venueGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a1a1a" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#venueGrid)" />
                </svg>
            </div>

            <div className="container mx-auto px-8 relative z-10">
                {/* Section Header */}
                <div className="max-w-4xl mx-auto text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-6 mb-8"
                    >
                        <div className="w-12 h-[1px] bg-[#d4af37]" />
                        <span className="text-[10px] font-bold tracking-[1em] text-[#d4af37] uppercase italic">Scholarship Exhibition</span>
                        <div className="w-12 h-[1px] bg-[#d4af37]" />
                    </motion.div>

                    <h2 
                        className="text-6xl md:text-8xl font-bold text-[#1a1a1a] tracking-tighter leading-none mb-12"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        {"Elite Scholarships".split(' ').map((word, i) => (
                            <span key={i} className="inline-block overflow-hidden mr-4">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="inline-block"
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </h2>

                    <p className="text-xl text-[#1a1a1a]/50 font-light leading-relaxed max-w-2xl mx-auto italic" style={{ fontFamily: '"Playfair Display", serif' }}>
                        "Curating selective fellowship frameworks and financial waivers to secure uncompromised prestige studies globally."
                    </p>
                </div>

                {/* Exhibition Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {venues.map((venue, index) => (
                        <VenueExhibitionCard 
                            key={venue.id} 
                            venue={venue} 
                            index={index} 
                            onSelect={setSelectedVenue}
                        />
                    ))}
                </div>
            </div>

            {/* Venue Portal Modal */}
            <AnimatePresence>
                {selectedVenue && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-8 backdrop-blur-2xl bg-[#1a1a1a]/80"
                        onClick={() => setSelectedVenue(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-6xl bg-white rounded-[60px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Image Section */}
                            <div className="w-full md:w-1/2 relative">
                                <img 
                                    src={selectedVenue.image} 
                                    alt={selectedVenue.name} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white" />
                                <div className="absolute top-12 left-12 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                                        <Compass className="w-6 h-6 text-white animate-spin-slow" />
                                    </div>
                                    <span className="text-[10px] font-bold text-white tracking-[0.5em] uppercase italic">Regional Coordinates</span>
                                </div>
                            </div>

                            {/* Modal Content Section */}
                            <div className="w-full md:w-1/2 p-16 flex flex-col justify-between bg-white">
                                <div className="space-y-12">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-bold text-[#d4af37] tracking-[0.4em] uppercase">{selectedVenue.refCode}</span>
                                            <h3 
                                                className="text-5xl font-bold text-[#1a1a1a] tracking-tighter"
                                                style={{ fontFamily: '"Playfair Display", serif' }}
                                            >
                                                {selectedVenue.name}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-[#faf9f6] rounded-full border border-[#1a1a1a]/5">
                                            <Star className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
                                            <span className="text-sm font-bold text-[#1a1a1a]">{selectedVenue.rating} Academic Match</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 py-8 border-y border-[#1a1a1a]/5">
                                        <div className="space-y-1">
                                            <span className="text-[8px] font-bold text-[#1a1a1a]/30 uppercase tracking-widest">Scholarship Location</span>
                                            <p className="text-sm font-bold text-[#1a1a1a] uppercase tracking-tighter">{selectedVenue.location}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[8px] font-bold text-[#1a1a1a]/30 uppercase tracking-widest">Award Value Limit</span>
                                            <p className="text-sm font-bold text-[#1a1a1a] uppercase tracking-tighter">{selectedVenue.capacity}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <span className="text-[8px] font-bold text-[#1a1a1a]/30 uppercase tracking-widest">Waiver Pillars Sheet</span>
                                        <div className="flex flex-wrap gap-4">
                                            {selectedVenue.amenities.map((amenity, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs font-bold text-[#1a1a1a] italic">
                                                    <div className="w-1 h-1 rounded-full bg-[#d4af37]" />
                                                    {amenity}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-8 bg-[#1a1a1a] text-white rounded-full font-bold tracking-[0.3em] uppercase text-[12px] flex items-center justify-center gap-4 transition-all hover:bg-[#d4af37]"
                                >
                                    Initiate Strategy Protocol <ArrowUpRight className="w-5 h-5" />
                                </motion.button>
                            </div>

                            {/* Close Button */}
                            <button 
                                onClick={() => setSelectedVenue(null)}
                                className="absolute top-12 right-12 text-[#1a1a1a] hover:rotate-90 transition-transform duration-500 text-4xl font-light"
                            >
                                ×
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};
