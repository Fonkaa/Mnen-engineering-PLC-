import { prisma } from './prisma';
import { unstable_cache } from 'next/cache';

export const getSiteContent = unstable_cache(
  async (key: string, fallback: string = '') => {
    const entry = await prisma.siteContent.findUnique({
      where: { key },
    });
    return entry ? entry.value : fallback;
  },
  ['site-content'],
  { tags: ['content'], revalidate: 60 }
);

export const getAllSiteContent = unstable_cache(
  async () => {
    const entries = await prisma.siteContent.findMany();
    return entries.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
  },
  ['all-site-content'],
  { tags: ['content'], revalidate: 60 }
);