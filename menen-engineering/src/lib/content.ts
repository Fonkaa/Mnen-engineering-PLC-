import { unstable_cache } from 'next/cache';
import { prisma } from './prisma';

export const getSiteContent = unstable_cache(
  async (key: string, fallback: string = '') => {
    try {
      const client = prisma as any;
      if (client.siteContent) {
        const entry = await client.siteContent.findUnique({ where: { key } });
        return entry ? entry.value : fallback;
      }
      if (client.contentBlock) {
        const entry = await client.contentBlock.findUnique({ where: { key } });
        return entry ? entry.value : fallback;
      }
      return fallback;
    } catch {
      return fallback;
    }
  },
  ['site-content'],
  { revalidate: 60 }
);
