import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Ensure config trims any accidental spaces/quotes from Render dashboard
cloudinary.config({
  cloud_name: (process.env.CLOUDINARY_CLOUD_NAME || 'nytwathq').trim(),
  api_key: (process.env.CLOUDINARY_API_KEY || '437881219689841').trim(),
  api_secret: (process.env.CLOUDINARY_API_SECRET || '').trim(),
  secure: true,
});

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. Verify credentials exist before processing
    if (!process.env.CLOUDINARY_API_SECRET) {
      console.error('CLOUDINARY_API_SECRET is missing from server environment!');
      return NextResponse.json(
        { error: 'Server misconfiguration: Cloudinary API secret not set.' },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided in form data' }, { status: 400 });
    }

    // 2. Read arrayBuffer and convert safely to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Pipe using a standard Node.js Readable stream
    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'menen-engineering',
          resource_type: 'image',
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary Stream Error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Create stream and pipe into Cloudinary
      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null); // End of stream
      readableStream.pipe(uploadStream);
    });

    console.log('Upload successful! URL:', uploadResult.secure_url);

    // Return both keys so any client frontend works seamlessly
    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });
  } catch (error: any) {
    console.error('Upload Endpoint Failure:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Image upload failed',
        details: error.http_code || error.name || 'Unknown error'
      },
      { status: 500 }
    );
  }
}