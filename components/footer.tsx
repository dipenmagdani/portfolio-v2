"use client";

import { useIdentity } from "@/components/identity-provider";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { activeRole } = useIdentity();
  const isDev = activeRole === "developer";

  return (
    <footer
      id="contact"
      className="py-32 px-6 flex flex-col items-center justify-center text-center relative max-w-4xl mx-auto border-t border-neutral-900 mt-24"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50">
          <span className="w-2 h-2 rounded-full bg-accent element-pulse" />
          <span className="text-xs font-mono text-neutral-400 font-medium uppercase tracking-wider">
            Available for {isDev ? "Engineering" : "Design"} Roles
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-foreground leading-[1.1]">
          Let&apos;s build something <br />
          <span className="text-neutral-500">meaningful.</span>
        </h2>

        <div className="pt-8">
          <a
            href="mailto:dipenmagdani@gmail.com"
            className="text-lg md:text-2xl font-mono text-foreground hover:text-accent transition-colors relative group inline-block"
          >
            dipenmagdani@gmail.com
            <span className="absolute -bottom-1 left-0 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>
        </div>
      </motion.div>

      <div className="mt-32 w-full flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-neutral-600 uppercase tracking-widest px-4">
        <span>&copy; {currentYear} Dipen Magdani</span>

        <div className="flex gap-6 mt-6 sm:mt-0">
          <a
            href="https://github.com/dipenmagdani"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/dipenmagdani"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.behance.net/dipen_magdani"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Behance
          </a>
        </div>
      </div>
    </footer>
  );
}
