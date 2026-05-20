import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Globe, Cpu } from 'lucide-react';
import * as THREE from 'three';

// Interface for service item (preserved for integrity)
interface ServiceItem {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  refCode: string;
  stats: string;
  acceptance: string;
}

const serviceItems: ServiceItem[] = [
  {
    id: 1,
    title: 'University Admissions',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1080&auto=format&fit=crop',
    description: 'Elite application strategy and narrative building for Ivy League & top global universities.',
    refCode: 'EXE-ADM-26',
    stats: '98.4% Success',
    acceptance: 'Ivy League / Top 20'
  },
  {
    id: 2,
    title: 'Scholarship Strategy',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1080&auto=format&fit=crop',
    description: 'Securing prestigious financial fellowships, research grants, and fully-funded opportunities.',
    refCode: 'EXE-SCH-26',
    stats: '$12M+ Secured',
    acceptance: 'Merit & Need-Based'
  },
  {
    id: 3,
    title: 'Visa & Relocation',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1080&auto=format&fit=crop',
    description: 'Bespoke advisory managing travel, visa documentation, and global transition logistics.',
    refCode: 'EXE-VIS-26',
    stats: '100% Approval',
    acceptance: 'Global Pathways'
  },
  {
    id: 4,
    title: 'Test Preparation',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1080&auto=format&fit=crop',
    description: 'High-caliber coaching for GMAT, GRE, SAT, and IELTS with personalized premium mentorship.',
    refCode: 'EXE-TST-26',
    stats: 'Top 1% Scorers',
    acceptance: 'Target Preparation'
  }
];

// Helper to generate glowing round canvas textures programmatically
const createParticleTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(255, 230, 180, 0.85)'); // Soft warm starlight
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 16, 16);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// --- WebGL 3D Interactive Night Earth Component with Glowing City Lights ---
const WebGLCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    // --- Camera ---
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 24;

    // --- WebGL Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Lights (Cinematic Bright Blue Celestial Setup) ---
    // Vibrant blue-sky fill light to simulate bright daylight scatter
    const ambientLight = new THREE.AmbientLight(0x2b7cfc, 0.8);
    scene.add(ambientLight);

    // High-prestige warm light representing the sun coming from the top-left
    const sunLight = new THREE.DirectionalLight(0xffdfa8, 2.8); // Golden crescent glow
    sunLight.position.set(-18, 12, 6);
    scene.add(sunLight);

    // Soft backlight to outline the night side of the Earth beautifully
    const backLight = new THREE.DirectionalLight(0x427aff, 0.6);
    backLight.position.set(15, -10, -5);
    scene.add(backLight);

    // --- 1. Shimmering Starfield (Cosmic Space Context) ---
    const particlesCount = 280;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 45;
      positions[i + 1] = (Math.random() - 0.5) * 45;
      positions[i + 2] = (Math.random() - 0.5) * 20 - 6;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pTex = createParticleTexture();
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.32,
      map: pTex || undefined,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xffeacc,
      opacity: 0.65
    });

    const starfield = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(starfield);

    // --- 2. Hyper-Realistic Night Earth Globe ---
    const textureLoader = new THREE.TextureLoader();
    
    const earthTexture = textureLoader.load(
      'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_atmos_2048.jpg',
      () => renderer.render(scene, camera)
    );
    const bumpTexture = textureLoader.load(
      'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_bump_2048.jpg',
      () => renderer.render(scene, camera)
    );
    const specularTexture = textureLoader.load(
      'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_specular_2048.jpg',
      () => renderer.render(scene, camera)
    );
    
    // Glowing Night City Lights texture map
    const nightLightsTexture = textureLoader.load(
      'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_lights_2048.png',
      () => renderer.render(scene, camera)
    );

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const R = 8.0; // Radius of rotating globe

    // Detailed Real Earth Sphere Core
    const globeBackingGeo = new THREE.SphereGeometry(R, 44, 44);
    const globeBackingMat = new THREE.MeshPhongMaterial({
      color: 0xffffff, // Real Earth natural colors (multiplied by texture)
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.14,
      specularMap: specularTexture,
      specular: new THREE.Color(0x444444), // Highly realistic specular glint on water
      shininess: 15,
      emissiveMap: nightLightsTexture, // Render golden city lights at night!
      emissive: new THREE.Color(0xffe2b3), // Warm golden city lights glow
      emissiveIntensity: 2.8,
      transparent: true,
      opacity: 0.98
    });
    
    const globeBacking = new THREE.Mesh(globeBackingGeo, globeBackingMat);
    globeGroup.add(globeBacking);

    // --- Mouse Event Listeners for Parallax Interaction ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      mouseRef.current.targetX = x * 2.2;
      mouseRef.current.targetY = y * 2.2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- Scroll Detection for Performance Optimization ---
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // --- Resize handler ---
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      // Keep Earth perfectly centered inside its absolute square container
      globeGroup.position.set(0, 0, 0);
    };
    
    handleResize(); // Trigger immediately
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let time = 0;
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      time += 0.0035;

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Slow drift for background stars
      starfield.rotation.y = time * 0.008;

      // Continuous Earth rotation with mouse parallax adjustments
      globeGroup.rotation.y = time * 0.04 + mouse.x * 0.025;
      globeGroup.rotation.x = mouse.y * 0.025;

      // Dynamic soft camera tilt matching mouse movements
      camera.position.x += (mouse.x * 0.18 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.18 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup Resources ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(frameId);
      
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      if (pTex) pTex.dispose();
      if (earthTexture) earthTexture.dispose();
      if (bumpTexture) bumpTexture.dispose();
      if (specularTexture) specularTexture.dispose();
      if (nightLightsTexture) nightLightsTexture.dispose();
      
      globeBackingGeo.dispose();
      globeBackingMat.dispose();
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
    />
  );
};

// --- Beautiful SVG Vector Designs for the Gold-Line Monuments ---
const EiffelTowerSVG = () => (
  <svg viewBox="0 0 100 150" className="w-full h-full select-none" fill="currentColor">
    <defs>
      <linearGradient id="luxuryGold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#ffe4b3" />
        <stop offset="100%" stopColor="#dca853" />
      </linearGradient>
    </defs>
    {/* Spire */}
    <line x1="50" y1="15" x2="50" y2="40" stroke="url(#luxuryGold)" strokeWidth="1.8" />
    <circle cx="50" cy="15" r="1.5" fill="#fff" />
    
    {/* Top platform */}
    <rect x="47" y="40" width="6" height="15" fill="url(#luxuryGold)" rx="0.5" />
    <rect x="45" y="55" width="10" height="3" fill="url(#luxuryGold)" />
    
    {/* Middle tower section */}
    <polygon points="46,58 44,95 56,95 54,58" fill="url(#luxuryGold)" />
    <rect x="41" y="95" width="18" height="4" fill="url(#luxuryGold)" />
    
    {/* Base structure columns */}
    <polygon points="43,99 35,145 44,145 47,99" fill="url(#luxuryGold)" />
    <polygon points="57,99 65,145 56,145 53,99" fill="url(#luxuryGold)" />
    
    {/* Archway at bottom */}
    <path d="M 44 145 C 44 122, 56 122, 56 145 Z" fill="#080e1b" opacity="0.92" />
    
    {/* Detailed horizontal structural bars */}
    <line x1="45" y1="70" x2="55" y2="70" stroke="#875c1d" strokeWidth="0.8" opacity="0.35" />
    <line x1="44.5" y1="82" x2="55.5" y2="82" stroke="#875c1d" strokeWidth="0.8" opacity="0.35" />
  </svg>
);

const TajMahalSVG = () => (
  <svg viewBox="0 0 120 100" className="w-full h-full select-none" fill="currentColor">
    <rect x="15" y="85" width="90" height="7" fill="url(#luxuryGold)" rx="0.5" />
    
    {/* Main temple building block */}
    <rect x="25" y="46" width="70" height="39" fill="url(#luxuryGold)" />
    
    {/* Central main arch panel */}
    <rect x="43" y="40" width="34" height="45" fill="url(#luxuryGold)" />
    <path d="M 48 85 L 48 55 C 48 49, 72 49, 72 55 L 72 85 Z" fill="#000" opacity="0.15" />
    
    {/* Symmetrical side arches cutouts */}
    <path d="M 30 85 L 30 67 C 30 63, 38 63, 38 67 L 38 85 Z" fill="#000" opacity="0.15" />
    <path d="M 82 85 L 82 67 C 82 63, 90 63, 90 67 L 90 85 Z" fill="#000" opacity="0.15" />
    
    {/* Majestic onion dome */}
    <path d="M 45 46 C 45 23, 75 23, 75 46 Z" fill="url(#luxuryGold)" />
    <line x1="60" y1="26" x2="60" y2="16" stroke="url(#luxuryGold)" strokeWidth="1.2" />
    <circle cx="60" cy="16" r="0.8" fill="#fff" />
    
    {/* Accompanying side domes */}
    <path d="M 31 46 C 31 36, 41 36, 41 46 Z" fill="url(#luxuryGold)" />
    <path d="M 79 46 C 79 36, 89 36, 89 46 Z" fill="url(#luxuryGold)" />
    
    {/* Four surrounding tall minarets */}
    <rect x="10" y="25" width="3.5" height="60" fill="url(#luxuryGold)" />
    <rect x="9" y="82" width="5.5" height="3" fill="url(#luxuryGold)" />
    <path d="M 9 25 L 9 20 L 14.5 20 L 14.5 25 Z" fill="url(#luxuryGold)" />
    
    <rect x="106.5" y="25" width="3.5" height="60" fill="url(#luxuryGold)" />
    <rect x="105.5" y="82" width="5.5" height="3" fill="url(#luxuryGold)" />
    <path d="M 105.5 25 L 105.5 20 L 111 20 L 111 25 Z" fill="url(#luxuryGold)" />
  </svg>
);

const StatueOfLibertySVG = () => (
  <svg viewBox="0 0 100 150" className="w-full h-full select-none" fill="currentColor">
    {/* Structured concrete base */}
    <polygon points="34,145 66,145 61,110 39,110" fill="url(#luxuryGold)" />
    <rect x="41" y="110" width="18" height="5" fill="url(#luxuryGold)" opacity="0.9" />
    
    {/* Lady Liberty silhouette draped robe */}
    <path d="M 42 110 L 46 58 L 57 58 L 55 110 Z" fill="url(#luxuryGold)" />
    
    {/* Left arm holding the law tablet */}
    <path d="M 44 63 L 36 74 L 39 79 L 46 66 Z" fill="url(#luxuryGold)" />
    <rect x="33" y="73" width="5" height="8" fill="url(#luxuryGold)" transform="rotate(-15, 35, 76)" />
    
    {/* Right arm raised high supporting the torch */}
    <path d="M 53 58 L 61 27 L 66 29 L 57 60 Z" fill="url(#luxuryGold)" />
    {/* Torch flame with high contrast bright glow */}
    <path d="M 60 27 C 60 21, 68 19, 64 12 C 61 18, 63 22, 60 27 Z" fill="#ffb84d" className="animate-pulse" />
    
    {/* Head crown details */}
    <circle cx="49.5" cy="48" r="4.5" fill="url(#luxuryGold)" />
    <polygon points="49.5,43 49.5,38 50.5,43" fill="url(#luxuryGold)" />
    <polygon points="46,44 42,39 47,44" fill="url(#luxuryGold)" />
    <polygon points="53,44 57,39 52,44" fill="url(#luxuryGold)" />
    <polygon points="44,47 38,45 44,48" fill="url(#luxuryGold)" />
    <polygon points="55,47 61,45 55,48" fill="url(#luxuryGold)" />
  </svg>
);

const BigBenSVG = () => (
  <svg viewBox="0 0 80 180" className="w-full h-full select-none" fill="currentColor">
    {/* Tall main brick tower body */}
    <rect x="25" y="55" width="30" height="125" fill="url(#luxuryGold)" />
    
    {/* Fine gothic lines vertically running down the tower */}
    <line x1="31" y1="55" x2="31" y2="180" stroke="#875c1d" strokeWidth="0.8" opacity="0.4" />
    <line x1="37" y1="55" x2="37" y2="180" stroke="#875c1d" strokeWidth="0.8" opacity="0.4" />
    <line x1="43" y1="55" x2="43" y2="180" stroke="#875c1d" strokeWidth="0.8" opacity="0.4" />
    <line x1="49" y1="55" x2="49" y2="180" stroke="#875c1d" strokeWidth="0.8" opacity="0.4" />
    
    {/* Upper clock house housing */}
    <rect x="22" y="32" width="36" height="23" fill="url(#luxuryGold)" />
    {/* Clock face ring */}
    <circle cx="40" cy="43.5" r="7.5" fill="#fff" stroke="#875c1d" strokeWidth="1.2" />
    <line x1="40" y1="43.5" x2="40" y2="39" stroke="#111" strokeWidth="1" />
    <line x1="40" y1="43.5" x2="43.5" y2="45" stroke="#111" strokeWidth="1" />
    
    {/* Elaborate spired top crown roof */}
    <polygon points="22,32 40,12 58,32" fill="url(#luxuryGold)" />
    <line x1="40" y1="12" x2="40" y2="1" stroke="url(#luxuryGold)" strokeWidth="1.5" />
    <circle cx="40" cy="1" r="1.0" fill="#fff" />
  </svg>
);

const PisaTowerSVG = () => (
  <svg viewBox="0 0 80 150" className="w-full h-full select-none" fill="currentColor">
    {/* Ground base segment */}
    <rect x="23" y="130" width="34" height="15" fill="url(#luxuryGold)" rx="0.5" />
    
    {/* Elegant tiered columned rings */}
    <rect x="25" y="113" width="30" height="17" fill="url(#luxuryGold)" />
    <rect x="25" y="96" width="30" height="17" fill="url(#luxuryGold)" />
    <rect x="25" y="79" width="30" height="17" fill="url(#luxuryGold)" />
    <rect x="25" y="62" width="30" height="17" fill="url(#luxuryGold)" />
    <rect x="25" y="45" width="30" height="17" fill="url(#luxuryGold)" />
    
    {/* Belfry top archway room */}
    <rect x="27" y="27" width="26" height="18" fill="url(#luxuryGold)" />
    <path d="M 27 27 C 27 16, 53 16, 53 27 Z" fill="url(#luxuryGold)" />
    
    {/* Dark vertical slit window cutouts representing detailed column arcades */}
    <rect x="29" y="117" width="2.5" height="9" fill="#000" opacity="0.15" />
    <rect x="36" y="117" width="2.5" height="9" fill="#000" opacity="0.15" />
    <rect x="43" y="117" width="2.5" height="9" fill="#000" opacity="0.15" />
    <rect x="50" y="117" width="2.5" height="9" fill="#000" opacity="0.15" />
    
    <rect x="29" y="100" width="2.5" height="9" fill="#000" opacity="0.15" />
    <rect x="36" y="100" width="2.5" height="9" fill="#000" opacity="0.15" />
    <rect x="43" y="100" width="2.5" height="9" fill="#000" opacity="0.15" />
    <rect x="50" y="100" width="2.5" height="9" fill="#000" opacity="0.15" />

    <rect x="29" y="83" width="2.5" height="9" fill="#000" opacity="0.15" />
    <rect x="36" y="83" width="2.5" height="9" fill="#000" opacity="0.15" />
    <rect x="43" y="83" width="2.5" height="9" fill="#000" opacity="0.15" />
    <rect x="50" y="83" width="2.5" height="9" fill="#000" opacity="0.15" />
  </svg>
);

const ColosseumSVG = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full select-none" fill="currentColor">
    {/* Oval curved stone base representing Rome's amphitheater */}
    <path d="M 10 75 Q 60 60 110 75 L 110 40 Q 60 25 10 40 Z" fill="url(#luxuryGold)" />
    
    {/* Ruined damaged left top wall edge */}
    <path d="M 10 40 Q 32 30 50 32 L 50 16 Q 30 18 10 30 Z" fill="url(#luxuryGold)" />
    
    {/* Archetypal dark arched door cavities (Top level) */}
    <path d="M 22 47 Q 22 42 25 42 Q 28 42 28 47" stroke="#000" strokeWidth="2.5" fill="none" opacity="0.32" />
    <path d="M 39 45 Q 39 40 42 40 Q 45 40 45 45" stroke="#000" strokeWidth="2.5" fill="none" opacity="0.32" />
    <path d="M 56 45 Q 56 40 59 40 Q 62 40 62 45" stroke="#000" strokeWidth="2.5" fill="none" opacity="0.32" />
    <path d="M 73 46 Q 73 41 76 41 Q 79 41 79 46" stroke="#000" strokeWidth="2.5" fill="none" opacity="0.32" />
    
    {/* Large arched entries (Base level) */}
    <path d="M 18 64 Q 18 57 22 57 Q 26 57 26 64" stroke="#000" strokeWidth="3" fill="none" opacity="0.38" />
    <path d="M 36 62 Q 36 55 40 55 Q 44 55 44 62" stroke="#000" strokeWidth="3" fill="none" opacity="0.38" />
    <path d="M 54 62 Q 54 55 58 55 Q 62 55 62 62" stroke="#000" strokeWidth="3" fill="none" opacity="0.38" />
  </svg>
);

const ChristTheRedeemerSVG = () => (
  <svg viewBox="0 0 100 120" className="w-full h-full select-none" fill="currentColor">
    {/* Corcovado stone mountain base mount */}
    <polygon points="35,120 65,120 57,85 43,85" fill="#5c492e" opacity="0.75" />
    <polygon points="39,85 61,85 57,65 43,65" fill="url(#luxuryGold)" />
    
    {/* Standing figure body */}
    <path d="M 46 65 L 47 30 L 53 30 L 54 65 Z" fill="url(#luxuryGold)" />
    
    {/* Famous horizontal outstretched welcoming arms */}
    <path d="M 18 38 L 82 38 L 82 34 L 53 30 L 47 30 L 18 34 Z" fill="url(#luxuryGold)" />
    
    {/* Head */}
    <circle cx="50" cy="24" r="4.2" fill="url(#luxuryGold)" />
  </svg>
);

const MayanPyramidSVG = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full select-none" fill="currentColor">
    {/* Layered steps of Chichen Itza temple */}
    <polygon points="10,75 110,75 100,63 20,63" fill="url(#luxuryGold)" />
    <polygon points="20,63 100,63 90,52 30,52" fill="url(#luxuryGold)" />
    <polygon points="30,52 90,52 80,41 40,41" fill="url(#luxuryGold)" />
    <polygon points="40,41 80,41 72,31 48,31" fill="url(#luxuryGold)" />
    
    {/* Center tall temple shrine on top */}
    <rect x="50" y="19" width="20" height="12" fill="url(#luxuryGold)" stroke="#8e7855" strokeWidth="0.5" />
    <polygon points="48,19 72,19 60,11" fill="url(#luxuryGold)" />
    
    {/* Famous center stairway */}
    <polygon points="53,75 67,75 63,19 57,19" fill="#998358" opacity="0.8" />
    <line x1="54" y1="67" x2="66" y2="67" stroke="#5c4b28" strokeWidth="0.8" />
    <line x1="55" y1="58" x2="65" y2="58" stroke="#5c4b28" strokeWidth="0.8" />
    <line x1="56" y1="49" x2="64" y2="49" stroke="#5c4b28" strokeWidth="0.8" />
  </svg>
);

// Airplane Vector (Hyper-Realistic Shaded Commercial Airliner facing right)
const AirplaneSVG = () => (
  <svg viewBox="0 0 240 100" fill="none" className="w-full h-full select-none text-white/95 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Soft silver-white fuselage gradient for 3D metallic feel */}
      <linearGradient id="planeBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#f8fafc" />
        <stop offset="70%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
      
      {/* Engine cowling metallic gradient */}
      <linearGradient id="engineBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f1f5f9" />
        <stop offset="50%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      
      {/* Wing shine gradient */}
      <linearGradient id="wingShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>

    {/* Far Wing */}
    <path d="M125 38 L70 20 L65 20 L78 35 Z" fill="#475569" opacity="0.8" />
    
    {/* Far Engine */}
    <path d="M102 32 C102 28, 118 28, 118 32 C118 36, 102 36, 102 32 Z" fill="#334155" />
    <path d="M112 32 C112 30, 118 30, 118 32 C118 34, 112 34, 112 32 Z" fill="#0f172a" />

    {/* Fuselage (Sleek body facing right) */}
    <path d="M25 46 C25 46, 50 34, 110 34 C170 34, 210 40, 222 46 C210 52, 170 58, 110 58 C50 58, 25 46, 25 46 Z" fill="url(#planeBody)" />
    
    {/* Vertical Stabilizer Tail Fin */}
    <path d="M48 37 L20 10 L8 10 L30 44 Z" fill="url(#planeBody)" />
    <path d="M8 10 L20 10 L32 44 L28 44 Z" fill="#cbd5e1" opacity="0.5" />

    {/* Horizontal Stabilizer Tail Fin */}
    <path d="M36 45 L15 36 L12 36 L24 46 Z" fill="#cbd5e1" />

    {/* Cockpit Window Shield */}
    <path d="M202 43 C198 42, 206 39, 212 42 C209 44, 204 44, 202 43 Z" fill="#0f172a" />
    <path d="M211 42.5 C209 41.5, 214 41, 216 43 C214 43.5, 212 43.5, 211 42.5 Z" fill="#0f172a" />

    {/* Passenger Windows Line (Realistic detail dots!) */}
    <path d="M52 46 H54 M58 46 H60 M64 46 H66 M70 46 H72 M76 46 H78 M82 46 H84 M88 46 H90 M94 46 H96 M100 46 H102 M106 46 H108 M112 46 H114 M118 46 H120 M124 46 H126 M130 46 H132 M136 46 H138 M142 46 H144 M148 46 H150 M154 46 H156 M160 46 H162 M166 46 H168 M172 46 H174 M178 46 H180" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

    {/* Near Wing (Sweeping down & back dynamically) */}
    <polygon points="120,49 62,82 54,82 102,54" fill="url(#wingShine)" />
    <path d="M54 82 L62 82 L120 49 L116 49 Z" fill="#334155" opacity="0.4" />

    {/* Near Engine (Under Near Wing) */}
    <path d="M86 64 C86 58, 106 58, 106 64 C106 70, 86 70, 86 64 Z" fill="url(#engineBody)" />
    <path d="M100 64 C100 60, 106 60, 106 64 C106 68, 100 68, 100 64 Z" fill="#0f172a" />
    <path d="M102 64 C102 62, 104 62, 104 64 C104 66, 102 66, 102 64 Z" fill="#f8fafc" />
    <path d="M98 52 L94 60 H102 Z" fill="#475569" />
  </svg>
);

// --- Sleek SVG Vector for the Header Hot Air Balloon ---
const HotAirBalloonSVG = () => (
  <svg viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
    <defs>
      <linearGradient id="balloonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff5e62" />
        <stop offset="100%" stopColor="#ff9966" />
      </linearGradient>
      <linearGradient id="stripGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#ffe2b3" />
      </linearGradient>
    </defs>
    {/* Balloon Body */}
    <path d="M20 2C10 2 2 10 2 20C2 28 8 36 14 42C16 44 17 48 17 50H23C23 48 24 44 26 42C32 36 38 28 38 20C38 10 30 2 20 2Z" fill="url(#balloonGrad)" />
    {/* Stripes */}
    <path d="M20 2C16 2 12 10 14 25C15 32 17 42 20 50C23 42 25 32 26 25C28 10 24 2 20 2Z" fill="url(#stripGrad)" opacity="0.85" />
    {/* Basket ropes */}
    <line x1="18.5" y1="50" x2="18.5" y2="54" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
    <line x1="21.5" y1="50" x2="21.5" y2="54" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
    {/* Basket */}
    <rect x="17" y="54" width="6" height="4" fill="#dca853" rx="0.5" />
  </svg>
);

// --- MAIN REDESIGNED 3D DARK LUXURY HERO COMPONENT ---
export function ThreeDHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  // List of elite world monuments positioned using exact trigonometric calculations
  const monumentsList = [
    {
      id: 'christ',
      name: 'Christ the Redeemer',
      angle: -48,
      scale: 0.9,
      delay: 1.8,
      className: 'w-[40px] h-[50px] md:w-[70px] md:h-[85px] lg:w-[95px] lg:h-[115px]',
      render: () => <ChristTheRedeemerSVG />
    },
    {
      id: 'bigben',
      name: 'Big Ben',
      angle: -36,
      scale: 0.95,
      delay: 1.6,
      className: 'w-[35px] h-[80px] md:w-[60px] md:h-[135px] lg:w-[80px] lg:h-[180px]',
      render: () => <BigBenSVG />
    },
    {
      id: 'taj',
      name: 'Taj Mahal',
      angle: -24,
      scale: 1.0,
      delay: 1.4,
      className: 'w-[50px] h-[45px] md:w-[90px] md:h-[75px] lg:w-[120px] lg:h-[100px]',
      render: () => <TajMahalSVG />
    },
    {
      id: 'pisa',
      name: 'Leaning Tower of Pisa',
      angle: -11,
      scale: 1.0,
      delay: 1.2,
      className: 'w-[40px] h-[75px] md:w-[65px] md:h-[120px] lg:w-[85px] lg:h-[155px] origin-bottom',
      render: () => <PisaTowerSVG />
    },
    {
      id: 'eiffel',
      name: 'Eiffel Tower',
      angle: 0,
      scale: 1.12,
      delay: 1.0, // Eiffel Tower emerges first
      className: 'w-[50px] h-[75px] md:w-[85px] md:h-[130px] lg:w-[110px] lg:h-[165px]',
      render: () => <EiffelTowerSVG />
    },
    {
      id: 'colosseum',
      name: 'Colosseum',
      angle: 12,
      scale: 1.0,
      delay: 1.3,
      className: 'w-[55px] h-[38px] md:w-[95px] md:h-[65px] lg:w-[120px] lg:h-[80px]',
      render: () => <ColosseumSVG />
    },
    {
      id: 'liberty',
      name: 'Statue of Liberty',
      angle: 25,
      scale: 1.0,
      delay: 1.5,
      className: 'w-[40px] h-[65px] md:w-[65px] md:h-[110px] lg:w-[85px] lg:h-[145px]',
      render: () => <StatueOfLibertySVG />
    },
    {
      id: 'pyramids',
      name: 'Mayan Pyramid',
      angle: 38,
      scale: 0.9,
      delay: 1.7,
      className: 'w-[55px] h-[38px] md:w-[95px] md:h-[65px] lg:w-[120px] lg:h-[80px]',
      render: () => <MayanPyramidSVG />
    }
  ];

  return (
    <section 
      ref={heroRef}
      className="relative w-full min-h-[680px] md:min-h-[750px] lg:min-h-[850px] text-white overflow-hidden flex items-center pt-24 pb-16 select-none"
      style={{
        background: 'linear-gradient(to bottom, #2b7cfc 0%, #468cfd 40%, #155bd5 100%)',
      }}
      id="hero-redesign-dark-luxury"
    >
      
      {/* Sunlight Scatter & Vignette Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(255,255,255,0.22)_0%,transparent_60%)] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,0,0,0.15)_0%,transparent_70%)] z-0 pointer-events-none" />

      {/* --- CINEMATIC LIGHTING LAYER: MASSIVE CELESTIAL SUN & CONIC RAYS --- */}
      <div className="absolute left-[-150px] md:left-[-250px] top-[5%] md:top-[8%] w-[380px] h-[380px] md:w-[580px] md:h-[580px] rounded-full z-0 pointer-events-none select-none overflow-visible flex items-center justify-center">
        {/* Giant White Sun Core */}
        <div className="absolute w-[85%] h-[85%] rounded-full bg-white opacity-98 filter blur-[2px] shadow-[0_0_120px_#fff,0_0_240px_rgba(255,255,255,0.8),0_0_480px_rgba(255,255,255,0.4)]" />
        
        {/* Rotating Sunbeams (Conic Rays) */}
        <div 
          style={{
            position: 'absolute',
            width: '180%',
            height: '180%',
            opacity: 0.1,
            backgroundImage: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg 15deg, rgba(255,255,255,0.8) 15deg 30deg, transparent 30deg 45deg, rgba(255,255,255,0.8) 45deg 60deg, transparent 60deg 75deg, rgba(255,255,255,0.8) 75deg 90deg, transparent 90deg 105deg, rgba(255,255,255,0.8) 105deg 120deg, transparent 120deg 135deg, rgba(255,255,255,0.8) 135deg 150deg, transparent 150deg 165deg, rgba(255,255,255,0.8) 165deg 180deg, transparent 180deg 195deg, rgba(255,255,255,0.8) 195deg 210deg, transparent 210deg 225deg, rgba(255,255,255,0.8) 225deg 240deg, transparent 240deg 255deg, rgba(255,255,255,0.8) 255deg 270deg, transparent 270deg 285deg, rgba(255,255,255,0.8) 285deg 300deg, transparent 300deg 315deg, rgba(255,255,255,0.8) 315deg 330deg, transparent 330deg 345deg, rgba(255,255,255,0.8) 345deg 360deg)',
            animation: 'slow-sunbeam-rotate 45s linear infinite',
          }}
          className="rounded-full"
        />
      </div>

      {/* Inject Keyframe Style block into the head for slow-sunbeam-rotate */}
      <style>{`
        @keyframes slow-sunbeam-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>


      {/* --- TYPOGRAPHY LAYER: PREMIUM MODERN WHITE TYPOGRAPHY --- */}
      <div className="container mx-auto px-6 relative z-35 w-full flex flex-col items-center justify-start text-center pt-6 pb-48 lg:pt-14 select-none">
        
        {/* Title */}
        <h1 
          className="text-4xl md:text-6xl lg:text-[80px] font-black text-white tracking-tighter leading-[1.0] uppercase max-w-5xl select-none"
          style={{ fontFamily: '"Outfit", sans-serif' }}
        >
          {/* Row 1: ARCHITECTING (Outline) ELITE (Gold) */}
          <div className="flex flex-wrap justify-center items-center gap-x-4">
            <span className="inline-block overflow-hidden pb-1.5 -mb-1.5">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-transparent"
                style={{ WebkitTextStroke: "2.2px rgba(255,255,255,0.95)", textShadow: "0 4px 18px rgba(0,0,0,0.3)" }}
              >
                ARCHITECTING
              </motion.span>
            </span>
            <span className="inline-block overflow-hidden pb-1.5 -mb-1.5">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-[#ffcb52] font-black drop-shadow-[0_4px_12px_rgba(255,203,82,0.3)]"
              >
                ELITE
              </motion.span>
            </span>
          </div>

          {/* Row 2: ACADEMIC (Solid) FUTURES (Outline) + Balloon */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 mt-2">
            <span className="inline-block overflow-hidden pb-1.5 -mb-1.5">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-white font-black"
              >
                ACADEMIC
              </motion.span>
            </span>
            <span className="inline-block overflow-hidden pb-1.5 -mb-1.5">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-transparent"
                style={{ WebkitTextStroke: "2.2px rgba(255,255,255,0.95)", textShadow: "0 4px 18px rgba(0,0,0,0.3)" }}
              >
                FUTURES
              </motion.span>
            </span>
            {/* Animated Hot Air Balloon */}
            <motion.div
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={{ 
                scale: 1, 
                rotate: [0, 4, -4, 0],
                y: [0, -8, 0]
              }}
              transition={{ 
                scale: { duration: 0.8, delay: 1.4 },
                opacity: { duration: 0.8, delay: 1.4 },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-10 h-14 md:w-12 md:h-16 flex-shrink-0"
            >
              <HotAirBalloonSVG />
            </motion.div>
          </div>
        </h1>

        {/* Luxury Gold Divider */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "96px" }}
          transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
          className="h-[2px] bg-[#ffcb52] mt-6"
        />

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 1.0, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-sm md:text-base lg:text-lg font-semibold leading-relaxed max-w-2xl font-sans mt-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
        >
          "Guiding exceptional minds toward world-class universities through precision portfolio strategy and bespoke global admissions storytelling."
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8 z-30"
        >
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(255, 203, 82, 0.35)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 bg-gradient-to-r from-[#ffe4b3] via-[#ffcb52] to-[#ffe4b3] text-[#02050b] rounded font-bold tracking-[0.2em] uppercase text-[10px] shadow-lg cursor-pointer transition-all duration-300 flex items-center gap-2"
          >
            Read More
            <ArrowRight className="w-4.5 h-4.5" />
          </motion.button>

          <div className="border border-white/20 px-6 py-3.5 font-mono text-[9px] text-white/90 tracking-[0.25em] font-bold uppercase rounded bg-white/[0.08] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] select-none">
            EST. 2026 // ADMISSIONS ACTIVE
          </div>
        </motion.div>
      </div>


      {/* --- TELEMETRY SUSPENDED GLASSMORPHISM DASHBOARD CARDS (ANTI-GRAVITY HOVER) --- */}
      
      {/* Left Frosted-Glass Card */}
      <motion.div 
        initial={{ opacity: 0, x: -45 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          y: [0, -14, 0] 
        }}
        transition={{ 
          opacity: { duration: 1.0, delay: 2.1 },
          x: { duration: 1.0, delay: 2.1 },
          y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.05 }}
        className="absolute left-[4%] top-[62%] hidden xl:flex p-5 bg-gradient-to-br from-slate-950/80 via-slate-900/65 to-slate-950/85 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55),_inset_0_1px_1px_rgba(255,255,255,0.15),_0_20px_50px_rgba(43,124,252,0.35)] items-center gap-4 group hover:bg-slate-900/90 transition-all duration-500 cursor-pointer z-30 select-none"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ffe4b3]/25 to-[#ffcb52]/10 flex items-center justify-center border border-[#ffcb52]/40 shadow-[0_0_15px_rgba(255,203,82,0.3)]">
          <Globe className="w-4.5 h-4.5 text-[#ffcb52] animate-pulse" />
        </div>
        <div>
          <span className="text-[9px] font-mono tracking-[0.2em] text-[#ffcb52] uppercase font-bold drop-shadow-md">Ivy League Success</span>
          <p className="text-white text-base font-serif italic mt-0.5 drop-shadow-sm">98.4% Strategic Placement</p>
        </div>
      </motion.div>

      {/* Right Frosted-Glass Card */}
      <motion.div 
        initial={{ opacity: 0, x: 45 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          y: [0, -18, 0]
        }}
        transition={{ 
          opacity: { duration: 1.0, delay: 2.3 },
          x: { duration: 1.0, delay: 2.3 },
          y: { duration: 7.8, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.05 }}
        className="absolute right-[4%] top-[58%] hidden xl:flex p-5 bg-gradient-to-br from-slate-950/80 via-slate-900/65 to-slate-950/85 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55),_inset_0_1px_1px_rgba(255,255,255,0.15),_0_20px_50px_rgba(43,124,252,0.35)] items-center gap-4 group hover:bg-slate-900/90 transition-all duration-500 cursor-pointer z-30 select-none"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ffe4b3]/25 to-[#ffcb52]/10 flex items-center justify-center border border-[#ffcb52]/40 shadow-[0_0_15px_rgba(255,203,82,0.3)]">
          <Cpu className="w-4.5 h-4.5 text-[#ffcb52]" />
        </div>
        <div>
          <span className="text-[9px] font-mono tracking-[0.2em] text-[#ffcb52] uppercase font-bold drop-shadow-md">Global Fellowships</span>
          <p className="text-white text-base font-serif italic mt-0.5 drop-shadow-sm">$12M+ Secured Funding</p>
        </div>
      </motion.div>


      {/* --- AIRPLANES & CONTRAILS UPPER ATMOSPHERE LAYER --- */}
      
      {/* Commercial Airplane: Gliding smoothly along the user's highlighted red ink path, repeating infinitely (flying higher in upper atmosphere) */}
      <motion.div
        initial={{ x: "-25%", y: "95%", opacity: 0 }}
        animate={{ 
          x: ["-25%", "15%", "45%", "75%", "115%"], 
          y: ["95%", "75%", "56%", "35%", "5%"],
          opacity: [0, 0.98, 0.98, 0.98, 0]
        }}
        transition={{ 
          duration: 16.0, 
          delay: 1.0, 
          repeat: Infinity,
          repeatDelay: 0,
          ease: "linear"
        }}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      >
        <motion.div 
          animate={{
            rotate: [-26, -32, -35, -37, -37]
          }}
          transition={{
            duration: 16.0,
            delay: 1.0,
            repeat: Infinity,
            repeatDelay: 0,
            ease: "linear"
          }}
          className="relative w-32 h-16 md:w-56 md:h-28 origin-center"
        >
          <AirplaneSVG />
          {/* Subtle white vapor trailing in upper atmosphere, anchored behind the tail (left side) */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ 
              duration: 16.0, 
              delay: 1.0, 
              repeat: Infinity,
              repeatDelay: 0,
              ease: "linear" 
            }}
            className="absolute right-[95%] top-[46%] w-[180px] md:w-[380px] h-[3.5px] md:h-[5.5px] origin-right bg-gradient-to-l from-white/75 via-white/35 to-transparent blur-[1.5px] rounded-full"
          />
        </motion.div>
      </motion.div>


      {/* --- GEOMETRIC HORIZON: 3D ROTATING NIGHT EARTH AND GOLDEN MONUMENTS --- */}

      {/* 3D Rotating Night Earth Sphere (Canvas Container) */}
      <motion.div
        initial={{ scale: 0.2, y: 220, opacity: 0 }}
        animate={{ scale: 1.0, y: 0, opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 -translate-x-1/2 bottom-[-60px] md:bottom-[-90px] lg:bottom-[-120px] w-[520px] h-[520px] md:w-[760px] md:h-[760px] lg:w-[1000px] lg:h-[1000px] pointer-events-none z-10 overflow-visible select-none"
      >
        <WebGLCanvas />
      </motion.div>

      {/* Premium Curved Bottom Horizon Divider (Blending with EventTypeSection) */}
      <div className="absolute bottom-[-2px] left-0 right-0 h-16 md:h-24 lg:h-32 z-12 pointer-events-none fill-[#F8F9FA]">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,120 L1440,120 L1440,50 Q720,-10 0,50 Z" />
        </svg>
      </div>

      {/* Golden Architectural Monuments Emergence Overlay */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 bottom-[-60px] md:bottom-[-90px] lg:bottom-[-120px] w-[520px] h-[520px] md:w-[760px] md:h-[760px] lg:w-[1000px] lg:h-[1000px] pointer-events-none z-20 overflow-visible select-none"
      >
        {monumentsList.map((m) => {
          // Circle trigonometry to map positioning exactly on the 3D horizon
          const angleRad = (m.angle * Math.PI) / 180;
          const leftPercent = 50 + Math.sin(angleRad) * 28.5;
          const topPercent = 50 - Math.cos(angleRad) * 28.5;

          return (
            <div
              key={m.id}
              style={{
                position: 'absolute',
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                transform: `translate(-50%, -100%) rotate(${m.angle}deg)`,
                transformOrigin: 'bottom center',
              }}
              className={`${m.className} pointer-events-none overflow-visible z-20`}
            >
              {/* Inner animated wrapper for radial slide-up and golden backlight glow */}
              <motion.div
                initial={{ scale: 0, y: 110, opacity: 0 }}
                animate={{ scale: m.scale, y: 0, opacity: 1 }}
                transition={{ 
                  duration: 1.3, 
                  delay: m.delay, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(255, 228, 179, 0.22))'
                }}
                className="w-full h-full text-white/90 pointer-events-none overflow-visible"
              >
                {m.render()}
              </motion.div>
            </div>
          );
        })}
      </div>
      
    </section>
  );
}
