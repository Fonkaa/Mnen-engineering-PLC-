import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { currentEmail, newEmail, newPassword } = await req.json();
    if (!newEmail || !newPassword) {
      return NextResponse.json({ error: 'New email and password required' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const admin = await prisma.adminUser.findFirst();
    if (admin) {
      await prisma.adminUser.update({
        where: { id: admin.id },
        data: {
          email: newEmail,
          password: hashedPassword,
        },
      });
    } else {
      await prisma.adminUser.create({
        data: {
          name: 'Primary Administrator',
          email: newEmail,
          password: hashedPassword,
        },
      });
    }

    return NextResponse.json({ success: true, email: newEmail });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json({ error: 'Failed to update credentials' }, { status: 500 });
  }
}