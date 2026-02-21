import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, BASE_URL } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.id === params.slug);

  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} | Dipen Magdani Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${BASE_URL}/projects/${project.id}`,
      images: [
        {
          url: project.image.startsWith("http")
            ? project.image
            : `${BASE_URL}${project.image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = PROJECTS.find((p) => p.id === params.slug);

  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-background text-foreground py-24 px-6 md:px-8 max-w-4xl mx-auto">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            url: `${BASE_URL}/projects/${project.id}`,
            image: project.image.startsWith("http")
              ? project.image
              : `${BASE_URL}${project.image}`,
            author: {
              "@type": "Person",
              name: "Dipen Magdani",
            },
            keywords: project.tags.join(", "),
          }),
        }}
      />

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-neutral-500 hover:text-foreground font-mono text-sm mb-16 transition-colors group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />{" "}
        Back to System
      </Link>

      <article>
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-foreground leading-[1.1]">
            {project.title}
          </h1>
          <div className="font-mono text-sm text-neutral-500 whitespace-nowrap">
            {project.category?.toUpperCase() || project.role.toUpperCase()}
          </div>
        </div>

        <div className="font-mono text-sm text-accent mb-12">
          {project.tags.join(" / ")}
        </div>

        <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light mb-12">
          {project.description}
        </p>

        {project.metrics && (
          <div className="mb-12">
            <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-500 mb-4">
              Impact / Metrics
            </h2>
            <ul className="list-disc list-inside text-neutral-300 text-lg space-y-2">
              <li>{project.metrics}</li>
            </ul>
          </div>
        )}

        {(project.link || project.figmaUrl) && (
          <a
            href={(project.link || project.figmaUrl) as string}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-foreground text-background font-medium px-8 py-3 hover:bg-neutral-gray transition-colors"
          >
            View Live Source
          </a>
        )}
      </article>
    </main>
  );
}
