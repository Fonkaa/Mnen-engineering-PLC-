import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: (process.env.CLOUDINARY_CLOUD_NAME || 'nytwathq').trim(),
  api_key: (process.env.CLOUDINARY_API_KEY || '437881219689841').trim(),
  api_secret: (process.env.CLOUDINARY_API_SECRET || '').trim(),
  secure: true,
});

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get('url');
    let fileName = searchParams.get('name') || 'Document.pdf';

    if (!fileUrl) {
      return NextResponse.json({ error: 'Missing file URL' }, { status: 400 });
    }

    if (!fileName.toLowerCase().endsWith('.pdf')) {
      fileName = `${fileName}.pdf`;
    }

    // 1. Extract public_id and resource_type from the Cloudinary URL
    // URL format: https://res.cloudinary.com/nytwathq/image/upload/v1791015766/menen-engineering/yjnxerdsgpl9jcsigh1y.pdf
    const urlPattern = /\/(image|raw|video)\/upload\/(?:v\d+\/)?(.+?)(?:\.pdf)?$/i;
    const match = fileUrl.match(urlPattern);

    let streamUrl = fileUrl;

    if (match) {
      const resourceType = match[1] as 'image' | 'raw' | 'video';
      const publicId = match[2]; // e.g. "menen-engineering/yjnxerdsgpl9jcsigh1y"

      // Generate a signed, authenticated download URL valid for 1 hour
      const expiresAt = Math.floor(Date.now() / 1000) + 3600;

      // Generate Cloudinary auth token / signed URL
      streamUrl = cloudinary.url(`${publicId}.pdf`, {
        resource_type: resourceType,
        type: 'upload',
        sign_url: true,
        expires_at: expiresAt,
        flags: 'attachment',
      });
    }

    // 2. Fetch binary stream using Basic Authentication with API Key & Secret
    const authCredentials = Buffer.from(
      `${cloudinary.config().api_key}:${cloudinary.config().api_secret}`
    ).toString('base64');

    let response = await fetch(streamUrl, {
      headers: {
        Authorization: `Basic ${authCredentials}`,
      },
    });

    // Fallback: If signed URL with auth header still didn't pass, attempt direct Cloudinary API download
    if (!response.ok && match) {
      const publicId = match[2];
      const directUrl = cloudinary.utils.private_download_url(
        publicId,
        'pdf',
        {
          resource_type: match[1] === 'raw' ? 'raw' : 'image',
          type: 'upload',
          attachment: true,
          expires_at: Math.floor(Date.now() / 1000) + 3600,
        }
      );

      response = await fetch(directUrl);
    }

    if (!response.ok) {
      console.error(`Cloudinary rejected request with status ${response.status}`);
      return NextResponse.json(
        { error: `Remote storage rejected download (${response.status})` },
        { status: response.status }
      );
    }

    const fileBuffer = await response.arrayBuffer();

    // 3. Return real binary buffer with PDF headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
        'Content-Length': fileBuffer.byteLength.toString(),
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Download proxy failure:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to download file' },
      { status: 500 }
    );
  }
}