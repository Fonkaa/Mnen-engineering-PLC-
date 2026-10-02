import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST create project
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const slug = (data.title || 'project')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const created = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug || slug,
        client: data.client,
        associatedFirms: data.associatedFirms || 'MENEN Engineering PLC',
        location: data.location || 'Addis Ababa',
        category: data.category || 'MXD',
        status: data.status || 'UNDER_CONSTRUCTION',
        scopeOfWork: data.scopeOfWork,
        awards: data.awards || null,
        description: data.description || null,
        featuredImage: data.featuredImage || null,
        featuredVideo: data.featuredVideo || null,
        audioNarrative: data.audioNarrative || null,
        isFeatured: Boolean(data.isFeatured),
        order: Number(data.order) || 0,
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

// PUT update project
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    if (!data.id) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    const updated = await prisma.project.update({
      where: { id: data.id },
      data: {
        title: data.title,
        client: data.client,
        associatedFirms: data.associatedFirms,
        location: data.location,
        category: data.category,
        status: data.status,
        scopeOfWork: data.scopeOfWork,
        awards: data.awards || null,
        description: data.description || null,
        featuredImage: data.featuredImage || null,
        featuredVideo: data.featuredVideo || null,
        audioNarrative: data.audioNarrative || null,
        isFeatured: Boolean(data.isFeatured),
        order: Number(data.order) || 0,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE project
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    await prisma.project.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}