export type Role = 'developer' | 'designer';

export interface Project {
  id: string;
  title: string;
  description: string;
  role: Role;
  tags: string[];
  image: string;
  metrics?: string;
  link?: string;
  figmaUrl?: string;
  category?: 'web' | 'mobile' | 'brand' | 'art';
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface Skill {
  category: string;
  items: SkillItem[];
}

export interface Experience {
  id: string;
  role: string;
  company?: string;
  period: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  details: string;
}

export interface Award {
  title: string;
  event: string;
  year: string;
}

export interface NavLink {
  name: string;
  href: string;
}
