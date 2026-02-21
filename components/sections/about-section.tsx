"use client";

import { EXPERIENCE, EDUCATION, AWARDS } from "@/lib/constants";
import { motion } from "framer-motion";
import { User, Activity, ShieldCheck } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 md:px-8 max-w-7xl mx-auto relative z-10 border-t border-neutral-900/50"
    >
      {/* About Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-24 md:mb-32 grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        <div>
          <div className="flex items-center gap-2 mb-4 font-mono text-sm uppercase tracking-wider text-neutral-500">
            <User size={16} />
            <span>System Operator Profile</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-foreground">
            The Architect.
          </h2>
        </div>

        <div className="flex items-end">
          <p className="text-xl text-neutral-400 leading-relaxed font-light border-l-2 border-accent/30 pl-6">
            I am a frontend professional with a deep appreciation for systems
            thinking, performance mindsets, and clean architecture. Integrating
            engineering rigor with design sensibilities ensures that every
            interface built is not just functional, but exceptional. <br />
            <br />
            <span className="font-mono text-sm text-accent uppercase tracking-widest">
              Restraint and precision are the highest forms of technical
              confidence.
            </span>
          </p>
        </div>
      </motion.div>

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-24 border border-neutral-800 bg-neutral-900/20 backdrop-blur rounded p-6 md:p-12"
      >
        <div className="flex items-center gap-2 mb-12 font-mono text-sm uppercase tracking-wider text-accent border-b border-white/5 pb-4">
          <Activity size={16} />
          <span>Operational History</span>
        </div>

        <div className="flex flex-col gap-12">
          {EXPERIENCE.map((exp, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row gap-6 md:gap-12 relative group"
            >
              {/* Vertical connecting line */}
              {idx !== EXPERIENCE.length - 1 && (
                <div className="hidden md:block absolute left-16 top-10 bottom-[-3rem] w-[1px] bg-neutral-800 group-hover:bg-accent/30 transition-colors" />
              )}

              <div className="w-full md:w-32 shrink-0 font-mono text-xs text-neutral-500 pt-1">
                {exp.period}
              </div>

              <div className="flex-1">
                <h4 className="text-2xl font-heading font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                  {exp.role}
                </h4>
                {exp.company && (
                  <p className="text-neutral-400 text-sm font-mono mb-6 uppercase tracking-wider">
                    {exp.company}
                  </p>
                )}
                <ul className="space-y-3 text-neutral-400 font-light text-base">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-accent/50 mt-1">▹</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Education & Awards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="border border-neutral-800 bg-neutral-900/20 p-8 rounded hover:border-neutral-700 transition-colors">
          <div className="flex items-center gap-2 mb-8 font-mono text-sm uppercase tracking-wider text-neutral-500 border-b border-white/5 pb-4">
            <ShieldCheck size={16} />
            <span>Academic Base</span>
          </div>
          <div>
            <h4 className="text-xl font-heading font-semibold text-foreground mb-2">
              {EDUCATION.degree}
            </h4>
            <p className="text-neutral-400 mb-4 font-light">
              {EDUCATION.institution}
            </p>
            <span className="inline-block px-3 py-1 font-mono text-xs text-accent bg-accent/10 border border-accent/20 rounded uppercase tracking-widest">
              {EDUCATION.details}
            </span>
          </div>
        </div>

        <div className="border border-neutral-800 bg-neutral-900/20 p-8 rounded hover:border-neutral-700 transition-colors">
          <div className="flex items-center gap-2 mb-8 font-mono text-sm uppercase tracking-wider text-neutral-500 border-b border-white/5 pb-4">
            <ShieldCheck size={16} />
            <span>Verifications</span>
          </div>
          <div className="space-y-6">
            {AWARDS.map((award, idx) => (
              <div key={idx} className="flex justify-between items-start group">
                <div>
                  <h4 className="text-lg font-heading font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                    {award.title}
                  </h4>
                  <p className="text-neutral-500 font-light text-sm">
                    {award.event}
                  </p>
                </div>
                <span className="font-mono text-xs text-neutral-600 bg-neutral-900 px-2 py-1 rounded">
                  {award.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
