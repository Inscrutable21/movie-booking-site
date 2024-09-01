import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: params.id },
      include: { showtimes: true }
    });
    if (!movie) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
    return NextResponse.json(movie);
  } catch (error) {
    console.error('Failed to fetch movie:', error);
    return NextResponse.json({ error: 'Failed to fetch movie' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    console.log('Received data:', data);
    console.log('Movie ID:', params.id);

    const { title, genre, duration, description, poster, trailerLink, rating } = data;

    const movie = await prisma.movie.update({
      where: { id: params.id },
      data: { 
        title, 
        genre, 
        duration, 
        description, 
        poster, 
        trailerLink,
        rating: rating ? parseFloat(rating) : null
      }
    });

    console.log('Updated movie:', movie);
    return NextResponse.json(movie);
  } catch (error) {
    console.error('Failed to update movie:', error);
    return NextResponse.json({ error: 'Failed to update movie', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.movie.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Failed to delete movie:', error);
    return NextResponse.json({ error: 'Failed to delete movie' }, { status: 500 });
  }
}