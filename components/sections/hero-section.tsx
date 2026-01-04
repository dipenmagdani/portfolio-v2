'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate, AnimatePresence, Variants } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import RoleToggle from '@/components/ui/role-toggle';
import { Role } from '@/lib/types';

interface HeroSectionProps {
    activeRole: Role;
    setActiveRole: (role: Role) => void;
}

// Background Component
function HeroBackground({ activeRole }: { activeRole: Role }) {
    const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
        setMounted(true);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none transition-colors duration-1000">
            {/* Dynamic Gradient Background */}
            <div
                className={`absolute inset-0 opacity-20 transition-all duration-1000 ${activeRole === 'developer'
                    ? 'bg-[radial-gradient(circle_at_50%_0%,#00aaff_0%,#050505_70%)]'
                    : 'bg-[radial-gradient(circle_at_50%_0%,#d946ef_0%,#050505_70%)]'
                    }`}
            />

            {/* Perspective Grid */}
            <div
                className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] opacity-[0.1]"
                style={{
                    backgroundImage: `linear-gradient(to right, ${activeRole === 'developer' ? '#38bdf8' : '#e879f9'} 1px, transparent 1px), linear-gradient(to bottom, ${activeRole === 'developer' ? '#38bdf8' : '#e879f9'} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    transform: 'perspective(1000px) rotateX(60deg)',
                    maskImage: 'radial-gradient(circle at 50% 50%, black 10%, transparent 60%)'
                }}
            >
                <div className="w-full h-full animate-grid-flow"></div>
            </div>

            {/* Floating Particles - Only render on client to avoid hydration mismatch */}
            {mounted && [...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * dimensions.width,
                        y: Math.random() * dimensions.height,
                        opacity: 0
                    }}
                    animate={{
                        y: [null, Math.random() * -100],
                        opacity: [0, 0.4, 0],
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                    className={`absolute w-1 h-1 rounded-full blur-[1px] ${activeRole === 'developer' ? 'bg-cyan-400' : 'bg-fuchsia-400'}`}
                />
            ))}
        </div>
    );
}

// Glitch Animation Variants
const glitchVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 1.05,
        skewX: -10,
        filter: 'blur(10px) contrast(1.5)',
        x: -10,
    },
    visible: {
        opacity: 1,
        scale: 1,
        skewX: 0,
        filter: 'blur(0px) contrast(1)',
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.33, 1, 0.68, 1],
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        skewX: 10,
        filter: 'blur(10px) contrast(1.5)',
        x: 10,
        transition: { duration: 0.2 }
    }
};

export default function HeroSection({ activeRole, setActiveRole }: HeroSectionProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            animate(mouseX, e.clientX, { duration: 0, type: "tween" });
            animate(mouseY, e.clientY, { duration: 0, type: "tween" });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const spotlightBackground = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.03),
      transparent 80%
    )
  `;

    const innerSpotlight = useMotionTemplate`
    radial-gradient(
      300px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.3),
      transparent 80%
    )
  `;

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center items-center px-4 md:px-6 pt-20 relative overflow-hidden bg-neutral-950">

            {/* Background Layers */}
            <HeroBackground activeRole={activeRole} />

            {/* Spotlight Effect Background */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                style={{ background: spotlightBackground }}
            />

            {/* Static Ambient Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[150px] rounded-full pointer-events-none opacity-20 z-0 transition-colors duration-1000 ${activeRole === 'developer' ? 'bg-cyan-900/40' : 'bg-fuchsia-900/40'
                }`} />

            {/* Main Content */}
            <div className="w-full max-w-[95vw] 2xl:max-w-full text-center space-y-12 md:space-y-16 z-10 relative">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center relative z-50 scale-90 md:scale-100"
                >
                    <RoleToggle activeRole={activeRole} onChange={setActiveRole} />
                </motion.div>

                <div className="relative group cursor-default py-4 min-h-[250px] md:min-h-[450px] flex items-center justify-center">
                    {/* Spotlight follows mouse */}
                    <motion.div
                        className="absolute -inset-24 rounded-full opacity-10 blur-2xl bg-gradient-to-r from-neutral-800 via-white/10 to-neutral-800 group-hover:opacity-20 transition-opacity duration-500"
                        style={{
                            clipPath: "inset(0 0 0 0)",
                            background: innerSpotlight,
                        }}
                    />

                    <div className="flex flex-col items-center justify-center relative w-full">
                        <AnimatePresence mode="wait">
                            {activeRole === 'developer' ? (
                                <motion.div
                                    key="developer-name"
                                    variants={glitchVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="flex flex-col items-center relative w-full"
                                >
                                    {/* Flash effect */}
                                    <motion.div
                                        initial={{ opacity: 0.5 }}
                                        animate={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 bg-cyan-500 blur-3xl z-0 pointer-events-none mix-blend-overlay opacity-30"
                                    />

                                    <h1 className="text-5xl sm:text-7xl md:text-6xl lg:text-[7rem] xl:text-[7rem] 2xl:text-[9rem] font-heading font-extrabold tracking-tighter relative z-10 select-none leading-[1em] text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                        <span className="block glitch text-white" data-text="DIPEN">DIPEN</span>
                                        <span className="block glitch text-neutral-600 transition-colors duration-700 group-hover:text-cyan-700" data-text="MAGDANI">MAGDANI</span>
                                    </h1>

                                    <motion.div
                                        initial={{ opacity: 0, letterSpacing: "1em" }}
                                        animate={{ opacity: 1, letterSpacing: "0.4em" }}
                                        transition={{ delay: 0.2, duration: 0.8 }}
                                        className="mt-6 text-[10px] md:text-xs font-mono text-cyan-500 uppercase font-bold tracking-[0.2em] md:tracking-[0.4em] drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                                    >
                                        &lt; SYSTEM_ONLINE /&gt;
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="designer-name"
                                    variants={glitchVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="flex flex-col items-center relative w-full"
                                >
                                    {/* Flash effect */}
                                    <motion.div
                                        initial={{ opacity: 0.5 }}
                                        animate={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 bg-fuchsia-500 blur-3xl z-0 pointer-events-none mix-blend-overlay opacity-30"
                                    />

                                    <h1 className="text-5xl sm:text-7xl md:text-6xl lg:text-[7rem] xl:text-[7rem] 2xl:text-[9rem] font-heading font-extrabold tracking-tighter relative z-10 select-none leading-[1em] text-center drop-shadow-[0_0_15px_rgba(232,121,249,0.3)]">
                                        <span className="block glitch text-white" data-text="VAJRA">VAJRA</span>
                                        <span className="block glitch text-neutral-400 transition-colors duration-700 group-hover:text-fuchsia-600" data-text="THE ASTRA">
                                            <span className="opacity-80">THE</span> ASTRA
                                        </span>
                                    </h1>

                                    <motion.div
                                        initial={{ opacity: 0, letterSpacing: "1em" }}
                                        animate={{ opacity: 1, letterSpacing: "0.4em" }}
                                        transition={{ delay: 0.2, duration: 0.8 }}
                                        className="mt-4 md:mt-6 text-[10px] md:text-xs font-mono text-fuchsia-500 uppercase font-bold tracking-[0.2em] md:tracking-[0.4em] drop-shadow-[0_0_10px_rgba(232,121,249,0.5)]"
                                    >
                                        &lt; IDENTITY_DETECTED /&gt;
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="h-10 overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        <motion.h2
                            key={activeRole}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                            className={`text-base md:text-2xl font-medium tracking-[0.2em] h-10 uppercase absolute w-full left-0 right-0 flex items-center justify-center gap-4 ${activeRole === 'developer' ? 'text-cyan-100' : 'text-fuchsia-100'
                                }`}
                        >
                            <span className={`w-8 h-px ${activeRole === 'developer' ? 'bg-cyan-500' : 'bg-fuchsia-500'}`}></span>
                            {activeRole === 'developer' ? 'Frontend Developer' : 'Visual Designer'}
                            <span className={`w-8 h-px ${activeRole === 'developer' ? 'bg-cyan-500' : 'bg-fuchsia-500'}`}></span>
                        </motion.h2>
                    </AnimatePresence>
                </div>

                <motion.p
                    key={activeRole + "-desc"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="max-w-xl mx-auto text-base md:text-xl text-neutral-400 leading-relaxed font-light tracking-wide px-4"
                >
                    {activeRole === 'developer'
                        ? "Crafting scalable, high-performance web applications with precision engineering."
                        : "Designing visual systems and immersive digital experiences with purposeful aesthetics."}
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-neutral-600"
            >
                <FiArrowDown className="w-5 h-5 animate-bounce" />
            </motion.div>

        </section>
    );
}
