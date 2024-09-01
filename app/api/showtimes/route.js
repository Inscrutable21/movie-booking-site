import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const showtimes = await prisma.showtime.findMany({
      include: {
        movie: true,
        theatre: true,
      },
    });
    return NextResponse.json(showtimes);
  } catch (error) {
    console.error('Failed to fetch showtimes:', error);
    return NextResponse.json({ error: 'Failed to fetch showtimes' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);
    
    const showtime = await prisma.showtime.create({
      data: {
        movieId: data.movieId,
        theatreId: data.theatreId,
        datetime: new Date(data.datetime),
      },
      include: {
        movie: true,
        theatre: true,
      },
    });
    
    console.log('Created showtime:', showtime);
    return NextResponse.json(showtime);
  } catch (error) {
    console.error('Failed to create showtime:', error);
    return NextResponse.json({ error: 'Failed to create showtime', details: error.message }, { status: 500 });
  }
}