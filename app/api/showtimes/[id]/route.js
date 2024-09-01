import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const showtime = await prisma.showtime.findUnique({
      where: { id: params.id },
      include: {
        movie: true,
        theatre: true,
      },
    });
    if (!showtime) {
      return NextResponse.json({ error: 'Showtime not found' }, { status: 404 });
    }
    return NextResponse.json(showtime);
  } catch (error) {
    console.error('Failed to fetch showtime:', error);
    return NextResponse.json({ error: 'Failed to fetch showtime' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    console.log('Received data:', data);
    console.log('Showtime ID:', params.id);

    const showtime = await prisma.showtime.update({
      where: { id: params.id },
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

    console.log('Updated showtime:', showtime);
    return NextResponse.json(showtime);
  } catch (error) {
    console.error('Failed to update showtime:', error);
    return NextResponse.json({ error: 'Failed to update showtime', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.showtime.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ message: 'Showtime deleted successfully' });
  } catch (error) {
    console.error('Failed to delete showtime:', error);
    return NextResponse.json({ error: 'Failed to delete showtime' }, { status: 500 });
  }
}