'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiArrowRight, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdTouchApp } from 'react-icons/md';
import { FaBehance } from 'react-icons/fa';
import Image from 'next/image';
import { PROJECTS } from '@/lib/constants';
import { Role, Project } from '@/lib/types';
import TiltCard from '@/components/ui/tilt-card';
import ImageModal from '@/components/ui/image-modal';

// Simple blur placeholder for images
const shimmerBlur = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+';

interface ProjectsSectionProps {
    activeRole: Role;
}

export default function ProjectsSection({ activeRole }: ProjectsSectionProps) {
    const filteredProjects = PROJECTS.filter(p => p.role === activeRole && p.category !== 'art');
    const artProjects = PROJECTS.filter(p => p.role === activeRole && p.category === 'art');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);

    // Auto-scroll Logic
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer || activeRole !== 'designer' || artProjects.length === 0) return;

        let animationFrameId: number;

        const autoScroll = () => {
            if (!isHoveringCarousel) {
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 1) {
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += 0.8;
                }
            }
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        animationFrameId = requestAnimationFrame(autoScroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isHoveringCarousel, activeRole, artProjects.length]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <section id="work" className="py-24 md:py-32 px-4 md:px-6 bg-neutral-950 min-h-screen relative z-10">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeRole}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className={`mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8 ${activeRole === 'developer' ? 'border-cyan-900/30' : 'border-fuchsia-900/30'
                                }`}
                        >
                            <div>
                                <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white mb-4 tracking-tighter">
                                    {activeRole === 'developer' ? 'Selected Works' : 'Visual Gallery'}
                                </h2>
                                <p className="text-neutral-400 max-w-lg text-base md:text-lg font-light leading-relaxed">
                                    {activeRole === 'developer'
                                        ? 'A collection of high-performance applications and engineered solutions.'
                                        : 'Explorations in interface design, branding, and digital composition.'}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Grid Content */}
                    <AnimatePresence mode="wait">
                        {activeRole === 'developer' ? (
                            <motion.div
                                key="developer-grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                            >
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        className="group relative flex flex-col rounded-xl overflow-hidden bg-neutral-900/40 border border-white/5 hover:border-cyan-500/30 transition-all duration-500 h-[380px] sm:h-[400px] md:h-[500px] hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)]"
                                    >
                                        {/* Image Area */}
                                        <div className="h-[180px] sm:h-[180px] md:h-[240px] shrink-0 overflow-hidden relative">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105 relative z-10 grayscale group-hover:grayscale-0"
                                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                                placeholder="blur"
                                                blurDataURL={shimmerBlur}
                                                quality={85}
                                                priority={index < 3}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-90" />
                                        </div>

                                        {/* Content Area */}
                                        <div className="flex-1 flex flex-col p-4 sm:p-4 md:p-6 relative -mt-5 sm:-mt-6 md:-mt-8 z-20">
                                            <div className="backdrop-blur-xl bg-neutral-950/90 absolute inset-0 border-t border-white/5 rounded-t-xl" />
                                            <div className="relative z-10 flex flex-col h-full">
                                                <div className="flex justify-between items-start mb-2 md:mb-3">
                                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors tracking-tight leading-tight line-clamp-2 sm:line-clamp-1 md:line-clamp-none">{project.title}</h3>
                                                    <div className="p-1.5 md:p-2 shrink-0 rounded-full bg-white/5 text-neutral-400 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1">
                                                        <FiArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
                                                    </div>
                                                </div>
                                                <p className="text-neutral-400 text-xs sm:text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-3 sm:line-clamp-3 md:line-clamp-4">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                                                    {project.tags.slice(0, 3).map(tag => (
                                                        <span key={tag} className="text-[8px] md:text-[10px] uppercase tracking-wider font-medium text-cyan-400 border border-cyan-800/50 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full bg-cyan-950/40">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="designer-grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-32"
                            >
                                {/* Featured UI Projects */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                                    {filteredProjects.map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group cursor-pointer relative"
                                            onClick={() => setSelectedProject(project)}
                                        >
                                            {project.id === 'behance-profile' ? (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                                                    <div className="aspect-video bg-blue-400 hover:bg-white overflow-hidden rounded-xl mb-6 relative border border-fuchsia-900/50 group-hover:border-fuchsia-500 transition-colors duration-500 shadow-[0_0_15px_rgba(232,121,249,0.1)] group-hover:shadow-[0_0_30px_-5px_rgba(232,121,249,0.3)]">
                                                        <Image
                                                            src={project.image}
                                                            alt={project.title}
                                                            fill
                                                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                            placeholder="blur"
                                                            blurDataURL={shimmerBlur}
                                                            quality={85}
                                                        />
                                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <div className="bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-fuchsia-500/50 flex items-center gap-3 text-fuchsia-100 shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                                                                <FaBehance className="w-5 h-5" />
                                                                <span className="font-bold tracking-wide">View on Behance</span>
                                                                <FiExternalLink className="w-4 h-4" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-end border-b border-fuchsia-900/30 pb-4 group-hover:border-fuchsia-500 transition-colors duration-500">
                                                        <div className="flex-1 mr-4">
                                                            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-purple-400 mb-2 tracking-tight">{project.title}</h3>
                                                            <p className="text-fuchsia-300 font-mono text-xs md:text-sm uppercase tracking-wider line-clamp-1">{project.tags.join('  •  ')}</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            ) : (
                                                <>
                                                    <div className="aspect-video overflow-hidden rounded-xl mb-6 relative border border-white/5 group-hover:border-fuchsia-500/30 transition-colors duration-500 shadow-lg group-hover:shadow-fuchsia-900/20">
                                                        <Image
                                                            src={project.image}
                                                            alt={project.title}
                                                            fill
                                                            className="object-cover transition-transform duration-1000 group-hover:scale-105 brightness-100"
                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                            placeholder="blur"
                                                            blurDataURL={shimmerBlur}
                                                            quality={85}
                                                        />
                                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                                    </div>
                                                    <div className="flex justify-between items-end border-b border-neutral-800 pb-4 group-hover:border-fuchsia-500 transition-colors duration-500">
                                                        <div className="flex-1 mr-6">
                                                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-fuchsia-100 transition-colors">{project.title}</h3>
                                                            <p className="text-neutral-500 font-mono text-xs md:text-sm uppercase tracking-wider group-hover:text-fuchsia-800 transition-colors line-clamp-1">{project.tags.join('  •  ')}</p>
                                                        </div>
                                                        <div className="w-10 h-10 shrink-0 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-fuchsia-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                                                            <FiArrowRight className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Art Carousel */}
                                {artProjects.length > 0 && (
                                    <div className="pt-12 border-t border-neutral-900">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 px-2">
                                            <div>
                                                <h3 className="text-3xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-fuchsia-200 mb-4 tracking-tighter">
                                                    Creative Lab
                                                </h3>
                                                <p className="text-neutral-500 text-lg font-light">Experimental studies in light, form, and motion.</p>
                                            </div>

                                            {/* Carousel Controls */}
                                            <div className="flex items-center gap-4">
                                                <div className="hidden md:flex items-center gap-2 text-xs font-mono text-neutral-600 uppercase tracking-widest mr-4">
                                                    <MdTouchApp className="w-4 h-4" />
                                                    Drag or Auto-scroll
                                                </div>
                                                <button
                                                    onClick={() => scroll('left')}
                                                    className="w-12 h-12 rounded-full border border-neutral-800 bg-neutral-900/50 flex items-center justify-center text-white hover:bg-fuchsia-600 hover:border-fuchsia-600 hover:scale-110 transition-all duration-300"
                                                >
                                                    <FiChevronLeft className="w-6 h-6" />
                                                </button>
                                                <button
                                                    onClick={() => scroll('right')}
                                                    className="w-12 h-12 rounded-full border border-neutral-800 bg-neutral-900/50 flex items-center justify-center text-white hover:bg-fuchsia-600 hover:border-fuchsia-600 hover:scale-110 transition-all duration-300"
                                                >
                                                    <FiChevronRight className="w-6 h-6" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Slider */}
                                        <div
                                            className="relative -mx-4 md:mx-0"
                                            onMouseEnter={() => setIsHoveringCarousel(true)}
                                            onMouseLeave={() => setIsHoveringCarousel(false)}
                                        >
                                            {/* Gradient Masks */}
                                            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
                                            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

                                            <div
                                                ref={scrollContainerRef}
                                                className="flex overflow-x-auto gap-6 md:gap-8 pb-12 px-6 md:px-6 no-scrollbar perspective-1000 items-center"
                                                style={{ scrollBehavior: 'auto' }}
                                            >
                                                {artProjects.map((art) => (
                                                    <TiltCard
                                                        key={art.id}
                                                        project={art}
                                                        onOpen={setSelectedProject}
                                                    />
                                                ))}
                                                <div className="w-8 shrink-0" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </section>

            {/* Preview Modal */}
            {selectedProject && (
                <ImageModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </>
    );
}
