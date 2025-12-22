'use client';

import { useState } from 'react';
import { NAV_LINKS, CLOUDINARY_URL } from '@/lib/constants';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Header() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: -100 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6 pointer-events-none"
        >
            <nav className={`pointer-events-auto px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-8 md:gap-10 ${scrolled
                    ? 'bg-neutral-900/80 backdrop-blur-md border border-neutral-800 shadow-2xl'
                    : 'bg-transparent border border-transparent'
                }`}>
                <ul className="flex items-center gap-8 md:gap-10">
                    {NAV_LINKS.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                onClick={(e) => handleScroll(e, link.href)}
                                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors relative group py-2"
                            >
                                {link.name}
                                <span className="absolute -bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="hidden md:block h-6 w-px bg-neutral-700/50" />

                <a
                    href={`${CLOUDINARY_URL}dipen_resume_fullstack.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 px-5 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/10 hover:border-white/30 transition-all duration-300 tracking-wide uppercase"
                >
                    Resume
                </a>
            </nav>
        </motion.header>
    );
}
