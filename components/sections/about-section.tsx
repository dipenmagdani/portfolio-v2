import { EXPERIENCE, EDUCATION, AWARDS } from '@/lib/constants';
import { FaTrophy, FaGraduationCap, FaBriefcase } from 'react-icons/fa';

export default function AboutSection() {
    return (
        <section id="about" className="py-32 px-6 bg-neutral-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-900/30 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto space-y-32 relative z-10">

                {/* Intro */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tighter leading-tight">
                            Beyond the<br />code.
                        </h2>
                    </div>
                    <div>
                        <p className="text-xl text-neutral-400 leading-relaxed font-light">
                            I am a Front-End Developer leveraging expertise in React, Next.js, and modern CSS to build beautiful, responsive web applications.
                            My work bridges the gap between engineering and design, ensuring every pixel serves a purpose.
                        </p>
                    </div>
                </div>

                {/* Timeline Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

                    {/* Experience */}
                    <div>
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 rounded-full bg-neutral-900 text-white border border-neutral-800">
                                <FaBriefcase className="w-5 h-5" />
                            </div>
                            <h3 className="text-2xl font-bold text-white tracking-tight">Experience</h3>
                        </div>
                        <div className="space-y-16 border-l border-neutral-800 pl-8 ml-4">
                            {EXPERIENCE.map((exp) => (
                                <div key={exp.id} className="relative group">
                                    <span className="absolute -left-[39px] top-2 w-5 h-5 bg-neutral-950 rounded-full border-2 border-neutral-700 group-hover:border-white transition-colors duration-300" />
                                    <h4 className="text-2xl text-white font-semibold mb-2 tracking-tight">{exp.role}</h4>
                                    {exp.company && <p className="text-neutral-400 text-sm mb-1">{exp.company}</p>}
                                    <p className="text-sm text-neutral-500 mb-6 font-mono tracking-wide uppercase">{exp.period}</p>
                                    <ul className="text-neutral-400 space-y-3 text-base leading-relaxed font-light">
                                        {exp.description.map((desc, i) => (
                                            <li key={i}>• {desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education & Awards */}
                    <div className="space-y-20">

                        {/* Education */}
                        <div>
                            <div className="flex items-center gap-4 mb-12">
                                <div className="p-3 rounded-full bg-neutral-900 text-white border border-neutral-800">
                                    <FaGraduationCap className="w-5 h-5" />
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Education</h3>
                            </div>
                            <div className="bg-neutral-900/30 border border-neutral-800 p-8 rounded-sm hover:border-neutral-600 transition-colors duration-500">
                                <h4 className="text-white font-semibold mb-2 text-xl tracking-tight">{EDUCATION.degree}</h4>
                                <p className="text-neutral-400 mb-6 font-light">{EDUCATION.institution}</p>
                                <div className="inline-block bg-white/5 text-neutral-300 text-xs px-4 py-1.5 rounded-full font-mono uppercase tracking-wider">
                                    {EDUCATION.details}
                                </div>
                            </div>
                        </div>

                        {/* Awards */}
                        <div>
                            <div className="flex items-center gap-4 mb-12">
                                <div className="p-3 rounded-full bg-neutral-900 text-white border border-neutral-800">
                                    <FaTrophy className="w-5 h-5" />
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Recognition</h3>
                            </div>
                            <div className="space-y-4">
                                {AWARDS.map((award, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-neutral-900/30 p-5 rounded-sm border border-white/5 hover:border-white/20 transition-all">
                                        <div>
                                            <h4 className="text-white text-base font-medium tracking-tight">{award.title}</h4>
                                            <p className="text-neutral-500 text-sm mt-1">{award.event}</p>
                                        </div>
                                        <span className="text-neutral-600 text-xs font-mono">{award.year}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
