import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const movies = await prisma.movie.findMany();
    return NextResponse.json(movies);
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);
    const movie = await prisma.movie.create({ 
      data: {
        ...data,
        rating: data.rating ? parseFloat(data.rating) : null,
      }
    });
    console.log('Created movie:', movie);
    return NextResponse.json(movie);
  } catch (error) {
    console.error('Failed to create movie:', error);
    return NextResponse.json({ error: 'Failed to create movie', details: error.message }, { status: 500 });
  }
}