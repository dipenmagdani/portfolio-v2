'use client';

import { motion } from 'framer-motion';
import { FaCode, FaPaintBrush } from 'react-icons/fa';
import { Role } from '@/lib/types';

interface RoleToggleProps {
    activeRole: Role;
    onChange: (role: Role) => void;
}

export default function RoleToggle({ activeRole, onChange }: RoleToggleProps) {
    return (
        <div className="inline-flex bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-full relative shadow-2xl overflow-hidden w-[320px] h-[60px]">
            {/* Developer Button */}
            <button
                onClick={() => onChange('developer')}
                className={`relative z-10 flex-1 h-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${activeRole === 'developer' ? 'text-neutral-950' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                    }`}
            >
                <FaCode className={`w-4 h-4 transition-transform duration-300 ${activeRole === 'developer' ? 'scale-110' : 'scale-100'}`} />
                <span className="relative">Developer</span>
                {activeRole === 'developer' && (
                    <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-full -z-10 m-1"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}
            </button>

            {/* Designer Button */}
            <button
                onClick={() => onChange('designer')}
                className={`relative z-10 flex-1 h-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${activeRole === 'designer' ? 'text-neutral-950' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                    }`}
            >
                <FaPaintBrush className={`w-4 h-4 transition-transform duration-300 ${activeRole === 'designer' ? 'scale-110' : 'scale-100'}`} />
                <span className="relative">Designer</span>
                {activeRole === 'designer' && (
                    <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-full -z-10 m-1"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}
            </button>
        </div>
    );
}
