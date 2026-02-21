"use client";

import dynamic from "next/dynamic";
import Header from "@/components/header";
import HeroSection from "@/components/sections/hero-section";
import { useIdentity } from "@/components/identity-provider";

// Dynamic imports for below-fold sections to reduce initial bundle size
// These components are loaded after the hero section is rendered
const ProjectsSection = dynamic(
  () => import("@/components/sections/projects-section"),
  {
    loading: () => (
      <div
        className="min-h-screen bg-neutral-950"
        aria-label="Loading projects..."
      />
    ),
    ssr: true,
  },
);

const SkillsSection = dynamic(
  () => import("@/components/sections/skills-section"),
  {
    loading: () => (
      <div
        className="min-h-[400px] bg-neutral-950"
        aria-label="Loading skills..."
      />
    ),
    ssr: true,
  },
);

const AboutSection = dynamic(
  () => import("@/components/sections/about-section"),
  {
    ssr: true,
  },
);

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: true,
});

export default function Home() {
  const { activeRole } = useIdentity();

  return (
    <main className="bg-background min-h-screen text-foreground font-sans">
      <Header />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
