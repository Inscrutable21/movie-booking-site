import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const theatres = await prisma.theatre.findMany();
    return NextResponse.json(theatres);
  } catch (error) {
    console.error('Failed to fetch theatres:', error);
    return NextResponse.json({ error: 'Failed to fetch theatres' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);
    const theatreData = {
      ...data,
      capacity: parseInt(data.capacity, 10)
    };
    const theatre = await prisma.theatre.create({ data });
    console.log('Created theatre:', theatre);
    return NextResponse.json(theatre);
  } catch (error) {
    console.error('Failed to create theatre:', error);
    return NextResponse.json({ error: 'Failed to create theatre', details: error.message }, { status: 500 });
  }
}