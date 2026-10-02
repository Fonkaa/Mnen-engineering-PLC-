import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { inquiryId, newStatus, feedbackNote } = await req.json();

    if (!inquiryId || !newStatus) {
      return NextResponse.json({ error: 'Inquiry ID and new status required' }, { status: 400 });
    }

    // 1. Update status in database using correct model name
    const inquiry = await prisma.projectInquiry.update({
      where: { id: inquiryId },
      data: { status: newStatus },
    });

    // 2. Fetch corporate branding info
    const siteConfig = await prisma.siteConfig.findUnique({
      where: { id: 'global_config' },
    });
    const companyName = siteConfig?.companyName || 'MENEN Engineering PLC';
    const primaryPhone = siteConfig?.primaryPhone || '+251 920 517 606';
    const officeAddress = siteConfig?.officeAddress || 'Wello Sefer, Addis Ababa';

    // 3. Draft tailored decision notice
    const isInternship = inquiry.projectType?.includes('INTERNSHIP') || inquiry.scope.includes('[STUDENT INTERNSHIP');
    const isApproved = newStatus === 'APPROVED';

    const decisionTitle = isApproved 
      ? (isInternship ? 'Internship Application Accepted' : 'Project Proposal Approved') 
      : (isInternship ? 'Internship Application Decision Notice' : 'Project Consultation Notice');

    const statusBannerColor = isApproved ? '#10b981' : '#ef4444';

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f4efe6; padding: 24px; color: #1c1917;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dcd1be; border-radius: 12px; padding: 32px;">
          <div style="border-bottom: 2px solid #f59e0b; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #1c1917; margin: 0;">${companyName}</h2>
            <span style="font-size: 11px; text-transform: uppercase; color: #857f72; letter-spacing: 1px;">Category One Architectural & Engineering Firm</span>
          </div>

          <div style="display: inline-block; background-color: ${statusBannerColor}; color: white; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 12px; margin-bottom: 16px;">
            Status: ${newStatus}
          </div>

          <h3 style="color: #1c1917; margin-top: 0;">Dear ${inquiry.fullName},</h3>

          <p style="font-size: 14px; line-height: 1.6; color: #333;">
            ${isApproved
              ? (isInternship 
                  ? `Congratulations! Your application for an internship placement at <strong>${companyName}</strong> has been <strong>Approved</strong>. Our board and senior engineers were impressed with your academic profile and technical interest.`
                  : `We are pleased to inform you that your commercial project brief regarding <strong>${inquiry.projectType}</strong> has been <strong>Approved</strong> for preliminary engineering consultation and technical evaluation.`)
              : (isInternship
                  ? `Thank you for your interest in interning with <strong>${companyName}</strong>. Following a review of our current capacity and board quotas, we regret to inform you that we cannot accommodate your application at this time.`
                  : `Thank you for submitting your project brief. At present, our board is unable to proceed with this engagement based on current pipeline constraints.`)}
          </p>

          ${feedbackNote ? `
            <div style="background-color: #faf6ee; border-left: 4px solid #f59e0b; padding: 12px 16px; margin: 20px 0; border-radius: 4px;">
              <strong style="font-size: 12px; color: #857f72; text-transform: uppercase;">Official Note from the Board:</strong>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #1c1917; line-height: 1.5;">${feedbackNote}</p>
            </div>
          ` : ''}

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #57534e;">
            <p style="margin: 4px 0;"><strong>Corporate Office:</strong> ${officeAddress}</p>
            <p style="margin: 4px 0;"><strong>Direct Lines:</strong> ${primaryPhone}</p>
          </div>
        </div>
      </div>
    `;

    // 4. Send email directly to the applicant
    await sendEmail({
      to: inquiry.email,
      subject: `${decisionTitle} - ${companyName}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (error: any) {
    console.error('Error changing inquiry decision status:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update status' }, { status: 500 });
  }
}