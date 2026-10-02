import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(members);
  } catch (error: any) {
    console.error('Prisma GET Team Error:', error);
    return NextResponse.json({ error: error?.message || 'Database query failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const memberData: any = {
      name: String(data.name || 'Unnamed Specialist'),
      roleTitle: String(data.roleTitle || data.role || 'Senior Specialist'),
      department: String(data.department || 'Executive & Structural'),
      credentials: String(data.credentials || 'BSc / MSc'),
      bio: String(data.bio || ''),
      avatarUrl: data.avatarUrl ? String(data.avatarUrl) : null,
      linkedinUrl: data.linkedinUrl ? String(data.linkedinUrl) : null,
      email: data.email ? String(data.email) : null,
      phone: data.phone ? String(data.phone) : null,
      // Default to true so newly added members always appear on main pages
      isExecutive: data.isExecutive !== undefined ? Boolean(data.isExecutive) : true,
      order: typeof data.order === 'number' ? data.order : 0,
    };

    const created = await prisma.teamMember.create({
      data: memberData,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error('---------------- PRISMA ERROR ----------------');
    console.error('Failed to create team member:', error);
    console.error('----------------------------------------------');
    return NextResponse.json(
      { error: error?.message || String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();

    if (!data.id || data.id === '' || data.id === 'undefined') {
      return NextResponse.json({ error: 'Valid Member ID is required for update' }, { status: 400 });
    }

    // 1. Fetch current database record to avoid wiping out flags
    const existing = await prisma.teamMember.findUnique({
      where: { id: String(data.id) },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Specialist record not found' }, { status: 404 });
    }

    // 2. Safe merge: retain isExecutive and order unless explicitly provided
    const isExecutiveResolved =
      data.isExecutive !== undefined ? Boolean(data.isExecutive) : existing.isExecutive;

    const orderResolved =
      data.order !== undefined && !isNaN(Number(data.order))
        ? Number(data.order)
        : existing.order;

    const memberData: any = {
      name: String(data.name ?? existing.name),
      roleTitle: String(data.roleTitle || data.role || existing.roleTitle),
      department: String(data.department ?? existing.department),
      credentials: String(data.credentials ?? existing.credentials),
      bio: String(data.bio ?? existing.bio),
      avatarUrl: data.avatarUrl !== undefined ? data.avatarUrl : existing.avatarUrl,
      linkedinUrl: data.linkedinUrl !== undefined ? data.linkedinUrl : existing.linkedinUrl,
      email: data.email !== undefined ? data.email : existing.email,
      phone: data.phone !== undefined ? data.phone : existing.phone,
      isExecutive: isExecutiveResolved,
      order: orderResolved,
    };

    const updated = await prisma.teamMember.update({
      where: { id: String(data.id) },
      data: memberData,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('---------------- PRISMA ERROR ----------------');
    console.error('Failed to update team member:', error);
    console.error('----------------------------------------------');
    return NextResponse.json(
      { error: error?.message || String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Member ID required' }, { status: 400 });
    }

    await prisma.teamMember.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Prisma Delete Error:', error);
    return NextResponse.json(
      { error: error?.message || String(error) },
      { status: 500 }
    );
  }
}