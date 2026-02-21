import { MetadataRoute } from "next";
import { BASE_URL, PROJECTS, SKILLS_DEV, SKILLS_DESIGN } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const baseUrl = BASE_URL || "https://dipen.live";

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const allSkills = [
    ...SKILLS_DEV.flatMap((c) => c.items),
    ...SKILLS_DESIGN.flatMap((c) => c.items),
  ];

  // Distinct by name and slugify
  const uniqueSkillsSet = new Set(
    allSkills.map((s) => s.name.toLowerCase().replace(/[\s\.]+/g, "-")),
  );

  const skillRoutes = Array.from(uniqueSkillsSet).map((skillSlug) => ({
    url: `${baseUrl}/skills/${skillSlug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectRoutes,
    ...skillRoutes,
  ];
}
