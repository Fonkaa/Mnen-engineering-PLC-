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

    // 1. Process and append PDF document details into scope for database persistence
    let finalScope = String(data.scope);
    const pdfUrl = data.documentPdfUrl || data.pdfUrl || null;
    const pdfName = data.documentPdfName || data.pdfName || 'Attached_Document.pdf';

    if (pdfUrl && !finalScope.includes('[ATTACHED_PDF_DOCUMENT]')) {
      finalScope += `\n\n[ATTACHED_PDF_DOCUMENT]\nFile: ${pdfName}\nURL: ${pdfUrl}`;
    }

    // 2. Persist directly to Prisma database
    const created = await prisma.projectInquiry.create({
      data: {
        fullName: String(data.fullName),
        organization: data.organization ? String(data.organization) : null,
        email: String(data.email),
        phone: String(data.phone),
        projectType: String(data.projectType || 'GENERAL'),
        location: data.location ? String(data.location) : null,
        plotSize: data.plotSize ? String(data.plotSize) : null,
        scope: finalScope,
        referenceVideo: data.referenceVideo ? String(data.referenceVideo) : null,
        referenceAudio: data.referenceAudio ? String(data.referenceAudio) : null,
        status: 'PENDING',
      },
    });

    // 3. Read dynamic site config email
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

    // 4. Resolve the website's public domain dynamically
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'menen-engineering.onrender.com';
    const proto = req.headers.get('x-forwarded-proto') || 'https';
    const origin = `${proto}://${host}`;

    // Route download through /api/download proxy to force local file save
    const emailDownloadUrl = pdfUrl
      ? `${origin}/api/download?url=${encodeURIComponent(pdfUrl)}&name=${encodeURIComponent(pdfName)}`
      : null;

    const pdfEmailSection = emailDownloadUrl
      ? `
        <div style="margin: 22px 0; padding: 18px; background-color: #0f172a; border-radius: 10px; border: 1px solid #eab308;">
          <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; color: #eab308; text-transform: uppercase; letter-spacing: 0.5px;">
            📎 Attached Project Document / CV (PDF):
          </p>
          <p style="margin: 0 0 14px 0; color: #f8fafc; font-size: 13px;">
            <strong>${pdfName}</strong>
          </p>
          <a href="${emailDownloadUrl}" style="display: inline-block; background-color: #eab308; color: #000000; padding: 12px 24px; border-radius: 6px; font-weight: bold; text-decoration: none; font-size: 12px; text-transform: uppercase; font-family: monospace;">
            📥 Download Attached PDF Directly
          </a>
        </div>
      `
      : '';

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; background-color: #f4efe6; padding: 24px; color: #1c1917;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dcd1be; border-radius: 12px; padding: 32px;">
          <h2 style="color: #f59e0b; margin-top: 0; border-bottom: 2px solid #eab308; padding-bottom: 8px;">${subjectPrefix} MENEN Engineering PLC</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px;">
            <tr><td style="padding: 6px 0; font-weight: bold; width: 150px; color: #57534e;">Applicant / Client:</td><td><strong>${data.fullName}</strong></td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #57534e;">Organization / University:</td><td>${data.organization || 'Not specified'}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #57534e;">Email:</td><td><a href="mailto:${data.email}" style="color: #0284c7;">${data.email}</a></td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #57534e;">Phone:</td><td><a href="tel:${data.phone}" style="color: #0284c7;">${data.phone}</a></td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #57534e;">Typology / Program:</td><td><strong>${data.projectType}</strong></td></tr>
            ${data.location ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #57534e;">Location:</td><td>${data.location}</td></tr>` : ''}
            ${data.plotSize ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #57534e;">Plot Size:</td><td>${data.plotSize} m²</td></tr>` : ''}
          </table>

          ${pdfEmailSection}

          <h4 style="margin: 20px 0 8px 0; color: #1c1917;">Scope of Work / Statement:</h4>
          <div style="background-color: #f9f9f9; padding: 14px; border-radius: 8px; font-size: 13px; line-height: 1.6; white-space: pre-wrap; border: 1px solid #e7e5e4;">${finalScope}</div>

          <div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid #e7e5e4; font-size: 11px; color: #a8a29e; text-align: center;">
            MENEN Engineering PLC &bull; Automated Intake Dispatch Engine &bull; Addis Ababa, Ethiopia
          </div>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        to: adminRecipient,
        subject: `${subjectPrefix} from ${data.fullName}`,
        html: htmlBody,
      });
      console.log('Intake notification email dispatched to:', adminRecipient);
    } catch (mailErr) {
      console.error('Email dispatch failed via sendEmail helper:', mailErr);
    }

    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error('Error recording inquiry:', error);
    return NextResponse.json({ error: error?.message || 'Failed to submit inquiry' }, { status: 500 });
  }
}