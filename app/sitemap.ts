import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Note: Hash-based URLs (#projects, #skills, etc.) are not valid sitemap entries
    // as search engines treat them as the same page. Add actual routes here when available.
  ];
}

