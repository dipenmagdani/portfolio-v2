'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiMaximize2 } from 'react-icons/fi';
import Image from 'next/image';
import { Project } from '@/lib/types';

// Simple blur placeholder for images
const shimmerBlur = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+';

interface TiltCardProps {
    project: Project;
    onOpen: (p: Project) => void;
}

export default function TiltCard({ project, onOpen }: TiltCardProps) {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect touch device
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 200, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 200, damping: 30 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice) return; // Disable on touch devices
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;
        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX: isTouchDevice ? 0 : rotateX,
                rotateY: isTouchDevice ? 0 : rotateY,
                transformStyle: isTouchDevice ? "flat" : "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="snap-center shrink-0 w-[280px] md:w-[340px] aspect-[3/4] rounded-md relative group cursor-pointer perspective-1000"
        >
            <div
                onClick={() => onOpen(project)}
                style={{ transform: isTouchDevice ? "none" : "translateZ(30px)" }}
                className="absolute inset-0 overflow-hidden shadow-2xl bg-neutral-900 border border-white/10 group-hover:border-fuchsia-500/50 transition-colors duration-500 rounded-md"
            >
                <div className="w-full h-full bg-black flex items-center justify-center relative">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 280px, 340px"
                        placeholder="blur"
                        blurDataURL={shimmerBlur}
                        quality={80}
                    />

                    {/* Preview Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105">
                            <FiMaximize2 className="w-4 h-4" />
                            <span>Preview</span>
                        </button>
                    </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                    <p className="text-white text-sm font-medium truncate">{project.title}</p>
                </div>
            </div>
        </motion.div>
    );
}

