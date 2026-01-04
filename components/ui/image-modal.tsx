'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMaximize2 } from 'react-icons/fi';
import Image from 'next/image';
import { Project } from '@/lib/types';

interface ImageModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function ImageModal({ project, onClose }: ImageModalProps) {
    const [isLoading, setIsLoading] = useState(true);

    if (!project) return null;

    const isFigma = !!project.figmaUrl;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-xl p-2 md:p-8"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full bg-white/5 text-white hover:bg-fuchsia-600 transition-all z-[120] border border-white/10"
                >
                    <FiX className="w-6 h-6" />
                </button>

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-6xl max-h-[95vh] flex flex-col items-center bg-neutral-900/50 rounded-2xl border border-white/5 overflow-hidden shadow-2xl"
                >
                    {isFigma ? (
                        <div className="relative w-full aspect-video min-h-[300px] h-[50vh] md:h-[70vh] bg-black">
                            {isLoading && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-neutral-950 z-10">
                                    <div className="w-12 h-12 border-4 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin" />
                                    <p className="text-fuchsia-200/50 font-mono text-[10px] tracking-widest uppercase px-4 text-center">Initializing Figma Prototype...</p>
                                </div>
                            )}
                            <iframe
                                src={project.figmaUrl}
                                className="w-full h-full border-0 relative z-0"
                                allowFullScreen
                                onLoad={() => setIsLoading(false)}
                                sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
                            />
                        </div>
                    ) : (
                        <div className="relative w-full aspect-video max-h-[70vh]">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-contain p-4"
                                sizes="90vw"
                                priority
                            />
                        </div>
                    )}

                    <div className="w-full p-6 md:p-8 bg-linear-to-t from-black to-neutral-900/90 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 shrink-0">
                        <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                                {project.title}
                            </h3>
                            <p className="text-neutral-400 text-sm md:text-base max-w-2xl leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 md:justify-end shrink-0">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-[10px] md:text-xs font-mono text-fuchsia-300 uppercase tracking-wider border border-fuchsia-500/20 px-3 py-1.5 rounded-full bg-fuchsia-500/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
