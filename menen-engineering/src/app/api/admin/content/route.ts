import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const items = await prisma.dynamicContent.findMany();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { key, value, label, section } = await req.json();
    const updated = await prisma.dynamicContent.upsert({
      where: { key },
      update: { value },
      create: {
        key,
        value,
        label: label || key,
        section: section || 'general',
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}