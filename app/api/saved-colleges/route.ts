// app/api/saved-colleges/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get('authorization'));
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const savedColleges = await prisma.savedCollege.findMany({
      where: { userId: payload.userId },
      include: { college: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(savedColleges);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get('authorization'));
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { collegeId } = await request.json();
    if (!collegeId) {
      return NextResponse.json({ error: 'College ID is required' }, { status: 400 });
    }

    const college = await prisma.college.findUnique({ where: { id: collegeId } });
    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }

    const existing = await prisma.savedCollege.findUnique({
      where: { userId_collegeId: { userId: payload.userId, collegeId } }
    });

    if (existing) {
      return NextResponse.json({ error: 'Already saved' }, { status: 400 });
    }

    const saved = await prisma.savedCollege.create({
      data: { userId: payload.userId, collegeId },
      include: { college: true }
    });

    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get('authorization'));
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { collegeId } = await request.json();
    if (!collegeId) {
      return NextResponse.json({ error: 'College ID is required' }, { status: 400 });
    }

    await prisma.savedCollege.deleteMany({
      where: { userId: payload.userId, collegeId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
