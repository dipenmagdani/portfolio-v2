'use client';

import { useState } from 'react';
import Header from '@/components/header';
import HeroSection from '@/components/sections/hero-section';
import ProjectsSection from '@/components/sections/projects-section';
import SkillsSection from '@/components/sections/skills-section';
import AboutSection from '@/components/sections/about-section';
import Footer from '@/components/footer';
import { Role } from '@/lib/types';

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
