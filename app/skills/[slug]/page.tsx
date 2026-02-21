import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SKILLS_DEV, SKILLS_DESIGN, BASE_URL } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

function getAllSkills() {
  const devSkills = SKILLS_DEV.flatMap((c) =>
    c.items.map((i) => ({ ...i, category: c.category, role: "Developer" })),
  );
  const designSkills = SKILLS_DESIGN.flatMap((c) =>
    c.items.map((i) => ({ ...i, category: c.category, role: "Designer" })),
  );

  // Deduplicate by name
  const all = [...devSkills, ...designSkills];
  const unique = new Map();
  all.forEach((s) => {
    const slug = s.name.toLowerCase().replace(/[\s\.]+/g, "-");
    if (!unique.has(slug)) {
      unique.set(slug, { ...s, slug });
    }
  });

  return Array.from(unique.values());
}

export async function generateStaticParams() {
  const skills = getAllSkills();
  return skills.map((skill) => ({
    slug: skill.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const skills = getAllSkills();
  const skill = skills.find((s) => s.slug === params.slug);

  if (!skill) return { title: "Not Found" };

  return {
    title: `${skill.name} Developer & Designer | Dipen Magdani Portfolio`,
    description: `Expert in ${skill.name}. Explore my capabilities and projects related to ${skill.name}, showcasing ${skill.category} skills.`,
    openGraph: {
      title: `${skill.name} Expertise | Dipen Magdani`,
      description: `Frontend Engineering and Design expertise using ${skill.name}.`,
      url: `${BASE_URL}/skills/${skill.slug}`,
    },
  };
}

export default function SkillPage({ params }: Props) {
  const skills = getAllSkills();
  const skill = skills.find((s) => s.slug === params.slug);

  if (!skill) return notFound();

  return (
    <main className="min-h-screen bg-background text-foreground py-24 px-6 md:px-8 max-w-4xl mx-auto">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@type": "Person",
              name: "Dipen Magdani",
              knowsAbout: skill.name,
            },
            description: `Frontend Engineering and Design expertise using ${skill.name}.`,
          }),
        }}
      />

      <Link
        href="/#skills"
        className="inline-flex items-center gap-2 text-neutral-500 hover:text-foreground font-mono text-sm mb-16 transition-colors group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />{" "}
        Back to System
      </Link>

      <article>
        <div className="flex flex-col gap-4 mb-4">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold tracking-tight text-foreground leading-[1.1]">
            {skill.name}
          </h1>
        </div>

        <div className="font-mono text-sm text-accent mb-12 uppercase tracking-wider">
          {skill.role} / {skill.category}
        </div>

        <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light mb-12">
          I leverage{" "}
          <span className="text-foreground font-medium">{skill.name}</span> as
          part of my {skill.role.toLowerCase()} toolset to build
          production-grade, high-performance interfaces and visual systems. With
          a structured approach to {skill.category.toLowerCase()}, I ensure
          scalable and maintainable solutions.
        </p>

        {skill.level && (
          <div className="mb-12">
            <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-500 mb-4">
              Proficiency Metric
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-heading font-bold text-foreground">
                {skill.level}%
              </span>
              <div className="flex-1 max-w-xs h-1 bg-neutral-900 overflow-hidden">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
