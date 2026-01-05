'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/header';
import HeroSection from '@/components/sections/hero-section';
import { Role } from '@/lib/types';

// Dynamic imports for below-fold sections to reduce initial bundle size
// These components are loaded after the hero section is rendered
const ProjectsSection = dynamic(() => import('@/components/sections/projects-section'), {
  loading: () => <div className="min-h-screen bg-neutral-950" aria-label="Loading projects..." />,
  ssr: true,
});

const SkillsSection = dynamic(() => import('@/components/sections/skills-section'), {
  loading: () => <div className="min-h-[400px] bg-neutral-950" aria-label="Loading skills..." />,
  ssr: true,
});

const AboutSection = dynamic(() => import('@/components/sections/about-section'), {
  ssr: true,
});

const Footer = dynamic(() => import('@/components/footer'), {
  ssr: true,
});

export default function Home() {
  const [activeRole, setActiveRole] = useState<Role>('developer');

  return (
    <main className="bg-neutral-950 min-h-screen text-neutral-50 font-sans">
      <Header />
      <HeroSection activeRole={activeRole} setActiveRole={setActiveRole} />
      <ProjectsSection activeRole={activeRole} />
      <SkillsSection activeRole={activeRole} />
      <AboutSection />
      <Footer />
    </main>
  );
}

