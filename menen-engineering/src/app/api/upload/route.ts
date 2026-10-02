import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    // Convert file to Node buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Target upload folder in public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Clean filename to prevent filesystem conflicts
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFileName = `${Date.now()}-${sanitizedFileName}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    // Write file to disk
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;
    return NextResponse.json({ url: publicUrl }, { status: 201 });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file to server' }, { status: 500 });
  }
}