"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIdentity } from "@/components/identity-provider";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const { activeRole } = useIdentity();
  const isDev = activeRole === "developer";
  const [bootPhase, setBootPhase] = useState(0);

  useEffect(() => {
    // Boot sequence orchestration
    const timer1 = setTimeout(() => setBootPhase(1), 1200);
    const timer2 = setTimeout(() => setBootPhase(2), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const scrollToWork = () => {
    const element = document.getElementById("work");
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-background"
    >
      {/* Background Architecture Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] md:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${isDev ? "#38bdf8" : "#e879f9"} 1px, transparent 1px), linear-gradient(to bottom, ${isDev ? "#38bdf8" : "#e879f9"} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black 10%, transparent 80%)",
        }}
      />

      <AnimatePresence mode="wait">
        {bootPhase < 2 ? (
          <motion.div
            key="boot"
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center z-10 font-mono"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ duration: 1.5, ease: "linear" }}
              className="h-[1px] bg-accent mb-4"
            />
            <p className="text-neutral-500 text-sm tracking-widest uppercase mb-2">
              {bootPhase === 0
                ? "Mounting System..."
                : "Initializing Architecture..."}
            </p>
            <div className="flex gap-1 text-xs text-accent opacity-50">
              <span>[OK]</span>
              <span>SYS_CORE</span>
              {bootPhase === 1 && <span>/ VERIFIED</span>}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10 w-full max-w-6xl px-6 md:px-8 mt-16"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 w-full">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4 mb-8"
                >
                  <div className="h-[1px] w-12 bg-accent" />
                  <span className="font-mono text-xs uppercase tracking-widest text-accent">
                    System Online
                  </span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-heading font-extrabold tracking-tighter text-foreground leading-[0.95] mb-6 drop-shadow-2xl">
                  <span className="block mb-2">
                    {isDev ? "Dipen Magdani." : "Vajra The Astra"}
                  </span>
                  <span
                    className={`block text-transparent leading-none h-52 bg-clip-text bg-gradient-to-r ${isDev ? "from-cyan-400 to-blue-600" : "from-fuchsia-400 to-pink-600"}`}
                  >
                    {isDev
                      ? "Frontend Systems Engineer."
                      : "Visual System Designer."}
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl leading-relaxed mt-8">
                  {isDev
                    ? "Constructing high-performance architecture and interactive interfaces with uncompromised engineering precision."
                    : "Crafting immersive visual topologies and intuitive experiences focused on systematic motion and aesthetic clarity."}
                </p>
              </div>

              {/* Telemetry Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="hidden lg:flex flex-col gap-4 font-mono text-xs bg-neutral-900/40 p-4 border border-white/5 backdrop-blur rounded shrink-0 w-64 shadow-2xl"
              >
                <div className="text-neutral-500 uppercase flex justify-between border-b border-white/5 pb-2">
                  <span>Status</span>
                  <span className="text-green-400">Operational</span>
                </div>
                <div className="text-neutral-500 uppercase flex justify-between border-b border-white/5 pb-2">
                  <span>Core Engine</span>
                  <span className="text-foreground">React 19 / Next.js</span>
                </div>
                <div className="text-neutral-500 uppercase flex justify-between border-b border-white/5 pb-2">
                  <span>Rendering</span>
                  <span className="text-foreground">60 FPS Locked</span>
                </div>
                <div className="text-neutral-500 uppercase flex justify-between">
                  <span>Current Mode</span>
                  <span className="text-accent">
                    {isDev ? "ENG_MODE" : "DSN_MODE"}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator */}
      {bootPhase === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 group"
          onClick={scrollToWork}
        >
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest group-hover:text-accent transition-colors">
            Access Modules
          </span>
          <ArrowDown
            size={16}
            className="text-neutral-600 group-hover:text-accent animate-bounce transition-colors"
          />
        </motion.div>
      )}
    </section>
  );
}
