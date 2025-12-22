import { Project, Skill, Experience, Education, Award, NavLink } from './types';

export const CLOUDINARY_URL = 'https://res.cloudinary.com/daunbe0fn/image/upload/v1754929632/';

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'Work', href: '#work' },
  { name: 'Skills', href: '#skills' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const POSTER_IMAGES = [
  {
    id: "rk_ram_1",
    name: "rk_ram_1.jpg",
    title: "Ramayana (2026) - Rama-01",
    tools: ["Photoshop", "AI"],
  },
  {
    id: "rk_ram_2",
    name: "rk_ram_2.jpg",
    title: "Ramayana (2026) - Rama-02",
    tools: ["Photoshop", "AI"],
  },
  {
    id: "yash_raavan_2",
    name: "yash_raavan_2.jpg",
    title: "Ramayana (2026) - Raavana-02",
    tools: ["Photoshop", "AI"],
  },
  {
    id: "yash_raavan_1",
    name: "yash_raavan_1.jpg",
    title: "Ramayana (2026) - Raavana-01",
    tools: ["Photoshop", "AI"],
  },
  {
    id: "sai_sita_1",
    name: "sai_sita_1.png",
    title: "Ramayana (2026) - Sita",
    tools: ["Photoshop", "AI"],
  },
  {
    id: "leo",
    name: "leo.jpg",
    title: "Leo (2023)",
    tools: ["Photoshop"],
  },
  {
    id: "animal_poster_1",
    name: "animal_poster_1.jpg",
    title: "Animal (2024)",
    tools: ["Photoshop"],
  },
  {
    id: "war2_1",
    name: "war2_1.jpg",
    title: "War 2 (2025) - Part 1",
    tools: ["Photoshop"],
  },
  {
    id: "saalar_1",
    name: "saalar_1.jpg",
    title: "Salaar: Part 1 – Ceasefire (2023)",
    tools: ["Photoshop"],
  },
  {
    id: "pushpa_1",
    name: "pushpa_1.png",
    title: "Pushpa 2: The Rule (2024)",
    tools: ["Photoshop"],
  },
  {
    id: "kalki_1",
    name: "kalki_1.jpg",
    title: "Kalki 2898AD (2024)",
    tools: ["Photoshop"],
  },
  {
    id: "kalki_2",
    name: "kalki_2.jpg",
    title: "Kalki 2898AD (2024)",
    tools: ["Photoshop"],
  },
  {
    id: "cricket_1",
    name: "cricket_1.jpg",
    title: "Virat Kohli - Run Machine",
    tools: ["Photoshop"],
  },
  {
    id: "animal_poster_2",
    name: "animal_poster_2.jpg",
    title: "Animal (2024)",
    tools: ["Photoshop"],
  },
  {
    id: "adipurushxbrahmastra",
    name: "adipurushxbrahmastra.png",
    title: "Adipurush x Brahmastra",
    tools: ["Photoshop"],
  },
  {
    id: "rama_1",
    name: "rama_1.jpg",
    title: "Rama Typography Poster",
    tools: ["Photoshop"],
  },
];

export const PROJECTS: Project[] = [
  // Developer Projects
  {
    id: 'magic-data',
    title: 'MagicData',
    description: 'Transforms complex data workflows into seamless experiences. Build, automate, and scale pipelines with an intuitive expression builder and no-code interface.',
    role: 'developer',
    tags: ['React', 'TanStack', 'Zod', 'Framer Motion'],
    image: 'https://placehold.co/800x600/050505/38bdf8?text=MagicData',
    category: 'web'
  },
  {
    id: 'riddhi-gsp',
    title: 'Riddhi GSP Admin',
    description: 'Enterprise-grade dashboard for GSP operations. Features real-time analytics, SDO management, and high-performance order processing.',
    role: 'developer',
    tags: ['React 18', 'Redux', 'AG Grid', 'SASS'],
    image: 'https://placehold.co/800x600/050505/38bdf8?text=Riddhi+GSP',
    category: 'web'
  },
  {
    id: 'fest-pass',
    title: 'Fest Pass Corporate',
    description: 'Modern career portal for a digital entertainment giant. Features interactive job search, real-time filtering, and a sophisticated design system.',
    role: 'developer',
    tags: ['Next.js 15', 'Tailwind', 'Husky'],
    image: 'https://placehold.co/800x600/050505/38bdf8?text=Fest+Pass',
    category: 'web'
  },
  {
    id: 'promobeacon',
    title: 'PromoBeacon',
    description: 'Comprehensive SaaS for promotional workflows. Automates order entry, artwork proofing, and vendor confirmation with multi-tenant support.',
    role: 'developer',
    tags: ['React 18', 'Hook Form', 'TanStack'],
    image: 'https://placehold.co/800x600/050505/38bdf8?text=PromoBeacon',
    category: 'web'
  },
  {
    id: 'pv-tool',
    title: 'PV Tool (Apcer)',
    description: 'Enterprise admin dashboard for Life Sciences. Features Azure AD security, automated API integration, and modular architecture.',
    role: 'developer',
    tags: ['React 19', 'MSAL', 'Docker', 'TanStack'],
    image: 'https://placehold.co/800x600/050505/38bdf8?text=PV+Tool',
    category: 'web'
  },
  {
    id: 'harmoniq',
    title: 'Harmoniq',
    description: 'A modern full-stack music streaming platform delivering a seamless audio experience. Features real-time playback, dynamic playlist management, and an immersive UI.',
    role: 'developer',
    tags: ['Next.js', 'Node.js', 'Redux', 'Tailwind'],
    image: 'https://placehold.co/800x600/050505/38bdf8?text=Harmoniq',
    category: 'web'
  },
  
  // Designer Projects (UI/UX)
  {
    id: 'behance-profile',
    title: 'Behance Portfolio',
    description: 'Explore my complete collection of case studies, branding projects, and visual experiments on Behance.',
    role: 'designer',
    tags: ['Behance', 'Portfolio', 'Case Studies'],
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop',
    category: 'web',
    link: 'https://www.behance.net/dipen_magdani'
  },
  {
    id: 'jeevansathi',
    title: 'JeevanSathi UI Redesign',
    description: 'Enhanced user engagement through a modern, intuitive mobile app interface design.',
    role: 'designer',
    tags: ['UI/UX', 'Mobile Design', 'Prototyping'],
    image: 'https://picsum.photos/seed/jeevan/1600/1000',
    category: 'mobile'
  },
  {
    id: 'padelcourt',
    title: 'Padelcourt Landing Page',
    description: 'High-conversion landing page design focusing on responsiveness and visual hierarchy.',
    role: 'designer',
    tags: ['Web Design', 'Layout', 'Visual Hierarchy'],
    metrics: '30% Improved Responsiveness',
    image: 'https://picsum.photos/seed/padel/1600/1000',
    category: 'web'
  },
  {
    id: 'client-branding',
    title: 'Freelance Branding Suite',
    description: 'Comprehensive identity systems created for various freelance clients to boost productivity and brand recognition.',
    role: 'designer',
    tags: ['Branding', 'Typography', 'Color Theory'],
    metrics: '20% Productivity Boost',
    image: 'https://picsum.photos/seed/brand/1600/1000',
    category: 'brand'
  },

  // Designer Projects (Art/Creative)
  ...POSTER_IMAGES.map((poster) => ({
    id: poster.id,
    title: poster.title,
    description: 'Visual Composition / Key Visual',
    role: 'designer' as const,
    tags: poster.tools,
    image: `${CLOUDINARY_URL}${poster.name}`,
    category: 'art' as const
  })),
];

export const SKILLS_DEV: Skill[] = [
  { 
    category: 'Core', 
    items: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 95 },
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'TypeScript', level: 85 }
    ] 
  },
  { 
    category: 'Frontend', 
    items: [
      { name: 'React.js', level: 92 },
      { name: 'Next.js 15', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Redux', level: 80 }
    ] 
  },
  { 
    category: 'Backend', 
    items: [
      { name: 'Node.js', level: 75 },
      { name: 'Express', level: 75 },
      { name: 'Django', level: 70 },
      { name: 'MongoDB', level: 72 }
    ] 
  },
  { 
    category: 'Tools', 
    items: [
      { name: 'Git', level: 85 },
      { name: 'Webpack', level: 60 },
      { name: 'Performance', level: 80 }
    ] 
  },
];

export const SKILLS_DESIGN: Skill[] = [
  { 
    category: 'Tools', 
    items: [
      { name: 'Adobe Photoshop', level: 90 },
      { name: 'Adobe Illustrator', level: 88 },
      { name: 'Figma', level: 95 }
    ] 
  },
  { 
    category: 'Principles', 
    items: [
      { name: 'User Research', level: 80 },
      { name: 'Wireframing', level: 92 },
      { name: 'Visual Hierarchy', level: 90 },
      { name: 'Typography', level: 85 }
    ] 
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'webelight',
    role: 'Frontend Developer',
    company: 'Webelight Solutions',
    period: 'Jan 2025 - Present',
    description: [
      'Building performant and scalable user interfaces using modern frontend technologies.',
      'Collaborating with design and backend teams to deliver seamless web experiences.',
      'Implementing best practices for code quality, accessibility, and responsiveness.'
    ]
  },
  {
    id: 'freelance',
    role: 'Freelance UI/UX Designer & Frontend Developer',
    period: 'May 2023 – Current',
    description: [
      'Delivered impactful customized designs using Adobe Suite and React.',
      'Increased client productivity by 20% through efficient user-centric designs.',
      'Built responsive landing pages and mobile app UIs.'
    ]
  }
];

export const EDUCATION: Education = {
  degree: 'Bachelor of Engineering in Computer Engineering',
  institution: 'Gujarat Technological University',
  details: 'CGPA: 8.54 | Sep 2022 - Pursuing'
};

export const AWARDS: Award[] = [
  { title: 'Winner', event: 'New India Vibrant Hackathon', year: '2023' },
  { title: 'Runner-Up', event: 'Smart India Hackathon', year: '2022' },
];
