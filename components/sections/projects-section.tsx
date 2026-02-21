"use client";

import { useState, useRef, useEffect } from "react";
import { useIdentity } from "@/components/identity-provider";
import { PROJECTS } from "@/lib/constants";
import { Project } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Maximize2,
  Terminal,
  ChevronLeft,
  ChevronRight,
  Fingerprint,
} from "lucide-react";
import Image from "next/image";
import TiltCard from "@/components/ui/tilt-card";
import ImageModal from "@/components/ui/image-modal";

const shimmerBlur =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+";

export default function ProjectsSection() {
  const { activeRole } = useIdentity();
  const isDev = activeRole === "developer";

  // Split projects
  const devProjects = PROJECTS.filter((p) => p.role === "developer");
  const designProjects = PROJECTS.filter(
    (p) => p.role === "designer" && p.category !== "art",
  );
  const artProjects = PROJECTS.filter(
    (p) => p.role === "designer" && p.category === "art",
  );

  const displayProjects = isDev ? devProjects : designProjects;

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section
        id="work"
        className="py-24 md:py-32 px-6 md:px-8 max-w-7xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-4 font-mono text-sm uppercase tracking-wider text-neutral-500">
              {isDev ? <Terminal size={16} /> : <Fingerprint size={16} />}
              <span>{isDev ? "System Modules" : "Visual Gallery"}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground">
              {isDev ? "Engineered Solutions." : "Digital Experiences."}
            </h2>
          </div>
        </motion.div>

        {/* Developer Grid - Control Panel Bento Approach */}
        {isDev ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col bg-neutral-900/30 border border-neutral-800 hover:border-accent/50 rounded-xl overflow-hidden hover:shadow-[0_0_30px_-10px_rgba(79,140,255,0.15)] transition-all duration-500"
              >
                <div className="h-48 relative overflow-hidden bg-neutral-950 border-b border-neutral-800">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={shimmerBlur}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-90" />

                  {/* Control Panel Overlay element */}
                  <div className="absolute top-4 left-4 font-mono text-[10px] text-accent font-semibold tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur border border-accent/20">
                    MODULE_{index + 1}
                  </div>
                  <button
                    onClick={() => window.open(project.link, "_blank")}
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {project.metrics && (
                    <div className="mb-4 text-xs font-mono text-neutral-300 border-l-2 border-accent/50 pl-3">
                      {project.metrics}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-neutral-800/50">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 bg-neutral-800/50 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Designer Layout - Full Visuals with Modal */
          <div className="space-y-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {displayProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer relative"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-video bg-neutral-900 rounded-2xl overflow-hidden relative border border-white/5 group-hover:border-fuchsia-500/50 transition-colors duration-500 shadow-xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL={shimmerBlur}
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                    {/* Expand icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/50 backdrop-blur-md p-4 rounded-full text-white transform scale-50 group-hover:scale-100 transition-transform duration-300 border border-fuchsia-500/30">
                        <Maximize2 size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight group-hover:text-fuchsia-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
                        {project.tags.join(" • ")}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-fuchsia-500 group-hover:text-white transition-all transform group-hover:rotate-45 group-hover:border-fuchsia-500">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Art Projects Carousel */}
            {artProjects.length > 0 && (
              <div className="pt-16 border-t border-neutral-900">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                      Creative Lab
                    </h3>
                    <p className="text-neutral-500 font-light text-lg">
                      Explorations in light, form, and composition.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => scroll("left")}
                      className="p-3 rounded-full border border-neutral-800 hover:border-fuchsia-500 hover:text-fuchsia-500 transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => scroll("right")}
                      className="p-3 rounded-full border border-neutral-800 hover:border-fuchsia-500 hover:text-fuchsia-500 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                  <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-8 pb-12 px-4 no-scrollbar items-center snap-x"
                  >
                    {artProjects.map((art) => (
                      <TiltCard
                        key={art.id}
                        project={art}
                        onOpen={setSelectedProject}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedProject && (
        <ImageModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
