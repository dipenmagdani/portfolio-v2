"use client";

import { useIdentity } from "@/components/identity-provider";
import { SKILLS_DEV, SKILLS_DESIGN } from "@/lib/constants";
import { motion } from "framer-motion";
import { Cpu, LayoutTemplate } from "lucide-react";

export default function SkillsSection() {
  const { activeRole } = useIdentity();
  const isDev = activeRole === "developer";
  const skillsToDisplay = isDev ? SKILLS_DEV : SKILLS_DESIGN;

  return (
    <section
      id="skills"
      className="py-24 md:py-32 px-6 md:px-8 max-w-7xl mx-auto relative z-10 border-t border-neutral-900/50"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16 md:mb-24"
      >
        <div className="flex items-center gap-2 mb-4 font-mono text-sm uppercase tracking-wider text-neutral-500">
          {isDev ? <Cpu size={16} /> : <LayoutTemplate size={16} />}
          <span>{isDev ? "System Capabilities" : "Design Instruments"}</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-foreground">
          Capability Matrix.
        </h2>
      </motion.div>

      <div className="flex flex-col gap-12">
        {skillsToDisplay.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
          >
            <h3 className="font-mono text-xs md:text-sm uppercase tracking-widest text-accent mb-6 flex items-center gap-4">
              <span>[{category.category}]</span>
              <div className="h-[1px] flex-1 bg-neutral-800/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-24 h-full bg-accent/50 -translate-x-full group-hover:translate-x-[1000%] transition-transform duration-[2s] ease-linear" />
              </div>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {category.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  className="bg-neutral-900/30 border border-neutral-800 hover:border-accent hover:bg-neutral-900/60 transition-all p-4 rounded flex flex-col justify-center items-center text-center group/item h-24 relative overflow-hidden"
                >
                  <span className="font-mono text-xs md:text-sm font-medium text-neutral-300 group-hover/item:text-foreground transition-colors z-10">
                    {item.name}
                  </span>
                  {item.level && (
                    <div className="absolute bottom-0 left-0 h-1 bg-neutral-800 w-full">
                      <div
                        className="h-full bg-accent/40 group-hover/item:bg-accent transition-colors duration-300"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  )}
                  {/* Scanline effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent -translate-y-full group-hover/item:animate-scanline pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
