import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const theatres = await prisma.theatre.findMany({
      where: {
        showtimes: {
          some: {
            movieId: params.id
          }
        }
      },
      include: {
        showtimes: {
          where: {
            movieId: params.id
          },
          orderBy: {
            datetime: 'asc'
          }
        }
      }
    });
    return NextResponse.json(theatres);
  } catch (error) {
    console.error('Failed to fetch theatres for movie:', error);
    return NextResponse.json({ error: 'Failed to fetch theatres for movie' }, { status: 500 });
  }
}