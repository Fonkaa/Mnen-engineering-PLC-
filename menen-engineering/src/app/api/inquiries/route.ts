import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const inquiries = await prisma.projectInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(inquiries);
  } catch (error: any) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.fullName || !data.email || !data.phone || !data.scope) {
      return NextResponse.json(
        { error: 'Name, email, phone, and detailed scope are required.' },
        { status: 400 }
      );
    }

    const created = await prisma.projectInquiry.create({
      data: {
        fullName: String(data.fullName),
        organization: data.organization ? String(data.organization) : null,
        email: String(data.email),
        phone: String(data.phone),
        projectType: String(data.projectType || 'GENERAL'),
        location: data.location ? String(data.location) : null,
        plotSize: data.plotSize ? String(data.plotSize) : null,
        scope: String(data.scope),
        referenceVideo: data.referenceVideo ? String(data.referenceVideo) : null,
        referenceAudio: data.referenceAudio ? String(data.referenceAudio) : null,
        status: 'PENDING',
      },
    });

    // Read the dynamic notification email from DB
    let adminRecipient = 'habtamuengr@gmail.com';
    try {
      const siteConfig = await prisma.siteConfig.findUnique({
        where: { id: 'global_config' },
      });
      if (siteConfig?.primaryEmail) {
        adminRecipient = siteConfig.primaryEmail;
      }
    } catch (e) {
      console.warn('Could not read dynamic siteConfig email; using fallback.');
    }

    const isInternship = data.type === 'INTERNSHIP' || (data.projectType && data.projectType.startsWith('INTERNSHIP'));
    const subjectPrefix = isInternship ? '[NEW INTERNSHIP APPLICATION]' : '[NEW COMMERCIAL PROJECT BRIEF]';

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; background-color: #f4efe6; padding: 24px; color: #1c1917;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dcd1be; border-radius: 12px; padding: 32px;">
          <h2 style="color: #f59e0b; margin-top: 0;">${subjectPrefix} - MENEN Engineering PLC</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px;">
            <tr><td style="padding: 6px 0; font-weight: bold;">Applicant / Client:</td><td>${data.fullName}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Organization / University:</td><td>${data.organization || 'Not specified'}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td>${data.phone}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Typology / Program:</td><td>${data.projectType}</td></tr>
          </table>
          <div style="margin-top: 16px; background-color: #f9f9f9; padding: 12px; border-radius: 8px; font-size: 13px; white-space: pre-wrap;">${data.scope}</div>
        </div>
      </div>
    `;

    await sendEmail({
      to: adminRecipient,
      subject: `${subjectPrefix} from ${data.fullName}`,
      html: htmlBody,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error('Error recording inquiry:', error);
    return NextResponse.json({ error: error?.message || 'Failed to submit inquiry' }, { status: 500 });
  }
}