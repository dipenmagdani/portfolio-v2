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
    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full bg-neutral-800 text-white hover:bg-white hover:text-black transition-all z-50"
                >
                    <FiX className="w-6 h-6" />
                </button>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative max-w-full max-h-full flex flex-col items-center"
                >
                    <div className="relative max-w-full max-h-[85vh] w-full aspect-[3/4] md:aspect-video">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-contain rounded-sm shadow-2xl border border-white/10"
                            sizes="(max-width: 768px) 100vw, 80vw"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
                        <div className="flex gap-2 justify-center mt-2 flex-wrap">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs text-neutral-400 uppercase tracking-wider border border-neutral-800 px-2 py-1 rounded-full">
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
