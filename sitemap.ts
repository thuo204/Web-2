import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://edustream.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/courses`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  let courseRoutes: MetadataRoute.Sitemap = [];
  let articleRoutes: MetadataRoute.Sitemap = [];

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [coursesRes, articlesRes] = await Promise.all([
      fetch(`${API_URL}/courses?limit=200`).then(r => r.json()).catch(() => ({ data: [] })),
      fetch(`${API_URL}/articles?limit=200`).then(r => r.json()).catch(() => ({ data: [] })),
    ]);

    courseRoutes = (coursesRes.data || []).map((c: any) => ({
      url: `${BASE_URL}/courses/${c.slug}`,
      lastModified: new Date(c.updated_at || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    articleRoutes = (articlesRes.data || []).map((a: any) => ({
      url: `${BASE_URL}/blog/${a.slug}`,
      lastModified: new Date(a.updated_at || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {}

  return [...staticRoutes, ...courseRoutes, ...articleRoutes];
}
