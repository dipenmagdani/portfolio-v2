'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS_DEV, SKILLS_DESIGN } from '@/lib/constants';
import { Role } from '@/lib/types';
import {
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiFigma
} from 'react-icons/si';
import {
    FaGlobe,
    FaDesktop,
    FaServer,
    FaTools,
    FaSearch,
    FaLayerGroup,
    FaPaintBrush
} from 'react-icons/fa';
import { MdOutlineDesignServices } from 'react-icons/md';
import { IoText } from 'react-icons/io5';

interface SkillsSectionProps {
    activeRole: Role;
}

// Icon helper
const getSkillIcon = (name: string, activeRole: Role) => {
    const baseClass = "w-6 h-6 transition-colors duration-300";
    const colorClass = activeRole === 'developer' ? "text-cyan-400 group-hover:text-white" : "text-fuchsia-400 group-hover:text-white";
    const iconClass = `${baseClass} ${colorClass}`;

    switch (name) {
        case 'Adobe Photoshop': return <SiAdobephotoshop className={iconClass} />;
        case 'Adobe Illustrator': return <SiAdobeillustrator className={iconClass} />;
        case 'Figma': return <SiFigma className={iconClass} />;
        case 'Typography': return <IoText className={iconClass} />;
        case 'Wireframing': return <MdOutlineDesignServices className={iconClass} />;
        case 'User Research': return <FaSearch className={iconClass} />;
        case 'Visual Hierarchy': return <FaLayerGroup className={iconClass} />;
        default: return <FaPaintBrush className={iconClass} />;
    }
};

export default function SkillsSection({ activeRole }: SkillsSectionProps) {
    return (
        <section id="skills" className="py-24 md:py-32 px-6 md:px-8 bg-neutral-950 border-t border-neutral-900">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    key={activeRole}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-20"
                >
                    <h2 className={`text-xs font-bold tracking-[0.3em] uppercase mb-4 ${activeRole === 'developer' ? 'text-cyan-500' : 'text-fuchsia-500'
                        }`}>
                        {activeRole === 'developer' ? 'Tech Stack' : 'Creative Arsenal'}
                    </h2>
                    <p className="text-3xl md:text-4xl font-heading font-semibold text-white tracking-tight">
                        {activeRole === 'developer'
                            ? 'Tools that power performance.'
                            : 'Instruments of design.'}
                    </p>
                </motion.div>

                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {activeRole === 'developer' ? (
                            <motion.div
                                key="dev-skills"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20 gap-y-16"
                            >
                                {SKILLS_DEV.map((category, idx) => (
                                    <div key={category.category} className="space-y-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            {category.category === 'Core' && <FaGlobe className="w-5 h-5 text-cyan-600" />}
                                            {category.category === 'Frontend' && <FaDesktop className="w-5 h-5 text-cyan-600" />}
                                            {category.category === 'Backend' && <FaServer className="w-5 h-5 text-cyan-600" />}
                                            {category.category === 'Tools' && <FaTools className="w-5 h-5 text-cyan-600" />}
                                            <h3 className="text-xl font-heading font-medium text-white tracking-tight">{category.category}</h3>
                                        </div>
                                        <div className="space-y-6">
                                            {category.items.map((skill, sIdx) => (
                                                <div key={skill.name} className="group">
                                                    <div className="flex justify-between text-sm mb-3 text-neutral-400 group-hover:text-cyan-200 transition-colors">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium tracking-wide">{skill.name}</span>
                                                        </div>
                                                        <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity text-cyan-500">{skill.level}%</span>
                                                    </div>
                                                    <div className="h-[2px] w-full bg-neutral-800 overflow-hidden relative">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${skill.level}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1.2, delay: idx * 0.1 + sIdx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                                            className="h-full bg-cyan-500 group-hover:bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-colors"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="design-skills"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-12"
                            >
                                {SKILLS_DESIGN.map((category) => (
                                    <div key={category.category}>
                                        <h3 className="text-xl font-heading font-medium text-white mb-8 tracking-tight border-l-2 border-fuchsia-900/50 pl-4">{category.category}</h3>
                                        <div className="flex flex-wrap gap-4">
                                            {category.items.map((skill, sIdx) => (
                                                <motion.div
                                                    key={skill.name}
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    whileInView={{ scale: 1, opacity: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: sIdx * 0.05 }}
                                                    whileHover={{ y: -4 }}
                                                    className="relative group cursor-default"
                                                >
                                                    {/* Minimal Card */}
                                                    <div className="w-36 h-44 bg-neutral-900/40 backdrop-blur-sm rounded-sm p-5 flex flex-col justify-between border border-white/5 hover:border-fuchsia-500/40 hover:bg-neutral-900/80 transition-all duration-500 hover:shadow-[0_0_20px_-5px_rgba(232,121,249,0.2)]">
                                                        <div className="z-10 w-10 h-10 flex items-center justify-center">
                                                            {getSkillIcon(skill.name, activeRole)}
                                                        </div>

                                                        <div className="z-10">
                                                            <p className="text-sm font-medium text-neutral-300 group-hover:text-fuchsia-100 leading-tight tracking-wide transition-colors">{skill.name}</p>
                                                            <div className="w-8 h-[2px] bg-neutral-700 mt-4 group-hover:w-full group-hover:bg-fuchsia-500 transition-all duration-500" />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
