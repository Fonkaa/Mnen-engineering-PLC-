import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const config = await prisma.siteConfig.findUnique({
      where: { id: 'global_config' },
    });
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const updated = await prisma.siteConfig.upsert({
      where: { id: 'global_config' },
      update: {
        companyName: data.companyName,
        legalCategory: data.legalCategory,
        motto: data.motto,
        primaryPhone: data.primaryPhone,
        secondaryPhone: data.secondaryPhone,
        primaryEmail: data.primaryEmail,
        officeAddress: data.officeAddress,
      },
      create: {
        id: 'global_config',
        companyName: data.companyName || 'MENEN Engineering PLC',
        legalCategory: data.legalCategory || 'Category One Architectural & Engineering Firm',
        motto: data.motto || "It's all about commitment!",
        primaryPhone: data.primaryPhone || '+251 920 517 606',
        secondaryPhone: data.secondaryPhone || '+251 913 034 623',
        primaryEmail: data.primaryEmail || 'habtamuengr@gmail.com',
        officeAddress: data.officeAddress || 'Wello Sefer, behind Garad Mall, GS Building, 2nd Floor Office, Addis Ababa',
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}