// app/api/colleges/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CollegeFilterSchema } from '@/lib/validation';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filters = {
      city: searchParams.get('city') || undefined,
      minFees: searchParams.get('minFees') ? parseInt(searchParams.get('minFees')!) : undefined,
      maxFees: searchParams.get('maxFees') ? parseInt(searchParams.get('maxFees')!) : undefined,
      minRating: searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10
    };

    CollegeFilterSchema.parse(filters);

    const where: any = {};
    
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { overview: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    if (filters.city) {
      where.city = { contains: filters.city, mode: 'insensitive' };
    }

    if (filters.minFees || filters.maxFees) {
      where.fees = {};
      if (filters.minFees) where.fees.gte = filters.minFees;
      if (filters.maxFees) where.fees.lte = filters.maxFees;
    }

    if (filters.minRating) {
      where.rating = { gte: filters.minRating };
    }

    const skip = (filters.page - 1) * filters.limit;

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip,
        take: filters.limit,
        orderBy: { rating: 'desc' }
      }),
      prisma.college.count({ where })
    ]);

    const pages = Math.ceil(total / filters.limit);

    return NextResponse.json({
      colleges,
      pagination: {
        total,
        pages,
        current: filters.page,
        limit: filters.limit
      }
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
