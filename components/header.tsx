'use client';

import { useState, useEffect } from 'react';
import { NAV_LINKS, CLOUDINARY_URL } from '@/lib/constants';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { HiOutlineMenuAlt4, HiX } from 'react-icons/hi';

export default function Header() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    // Close menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: -100 },
                }}
                animate={hidden && !isMenuOpen ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-60 flex justify-center pt-6 px-4 md:px-6 pointer-events-none"
            >
                <nav className={`pointer-events-auto px-4 md:px-8 py-2 md:py-2.5 rounded-full transition-all duration-300 flex items-center justify-between gap-4 md:min-w-[600px] ${scrolled || isMenuOpen
                    ? 'bg-neutral-900/80 backdrop-blur-md border border-neutral-800 shadow-2xl'
                    : 'bg-transparent border border-transparent'
                    }`}>

                    {/* Brand/Logo - Visible on all devices */}
                    <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="flex items-center group">
                        <span className="text-white font-bold tracking-tighter text-xl group-hover:text-neutral-200 transition-colors">D<span className="text-purple-500">.</span></span>
                    </a>

                    {/* Desktop Links - Centered */}
                    <div className="hidden md:flex items-center justify-center flex-1 px-8">
                        <ul className="flex items-center gap-8">
                            {NAV_LINKS.filter(link => link.name !== 'Home').map((link) => (
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
                    </div>

                    {/* Resume Button - Desktop */}
                    <div className="hidden md:block">
                        <a
                            href={`${CLOUDINARY_URL}dipen_resume_fullstack.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-white/15 px-5 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/10 hover:border-white/30 transition-all duration-300 tracking-wide uppercase"
                        >
                            Resume
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <HiX size={24} /> : <HiOutlineMenuAlt4 size={24} />}
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 md:hidden bg-neutral-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-8"
                    >
                        <ul className="flex flex-col items-center gap-8">
                            {NAV_LINKS.map((link, i) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                        delay: i * 0.1,
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 10
                                    }}
                                >
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleScroll(e, link.href)}
                                        className="text-4xl font-bold tracking-tight text-neutral-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </motion.li>
                            ))}
                            <motion.li
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: NAV_LINKS.length * 0.1 }}
                                className="mt-8"
                            >
                                <a
                                    href={`${CLOUDINARY_URL}dipen_resume_fullstack.pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full border border-white/20 px-10 py-4 text-sm font-bold text-white hover:bg-white hover:text-black transition-all duration-500 tracking-widest uppercase bg-white/5 backdrop-blur-sm"
                                >
                                    View Resume
                                </a>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
