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

    // 2. Detect whether file is a PDF/document or image
    const isPdfOrDoc = 
      file.type === 'application/pdf' || 
      file.name.toLowerCase().endsWith('.pdf') ||
      file.name.toLowerCase().endsWith('.dwg') ||
      file.name.toLowerCase().endsWith('.doc') ||
      file.name.toLowerCase().endsWith('.docx');

    // 3. Read arrayBuffer and convert safely to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Pipe using Node.js Readable stream with explicit public accessibility
    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadOptions: Record<string, any> = {
        folder: 'menen-engineering',
        resource_type: isPdfOrDoc ? 'auto' : 'image',
        type: 'upload',            // Explicit public upload
        access_mode: 'public',     // Prevents 401 Unauthorized download issues
        use_filename: true,        // Preserves original name structure
        unique_filename: true,     // Prevents overwriting duplicate filenames
      };

      // Apply image compression/formatting only to images, not PDF documents
      if (!isPdfOrDoc) {
        uploadOptions.transformation = [{ quality: 'auto', fetch_format: 'auto' }];
      } else if (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
        uploadOptions.format = 'pdf'; // Ensures Cloudinary attaches the .pdf extension
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error('Cloudinary Stream Error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });

    console.log('Upload successful! URL:', uploadResult.secure_url);

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      format: uploadResult.format,
      original_filename: file.name,
      resource_type: uploadResult.resource_type,
    });
  } catch (error: any) {
    console.error('Upload Endpoint Failure:', error);
    return NextResponse.json(
      { 
        error: error.message || 'File upload failed',
        details: error.http_code || error.name || 'Unknown error'
      },
      { status: 500 }
    );
  }
}