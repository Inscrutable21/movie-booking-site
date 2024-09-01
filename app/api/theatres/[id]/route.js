import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const theatre = await prisma.theatre.findUnique({
      where: { id: params.id },
      include: { showtimes: true }
    });
    if (!theatre) {
      return NextResponse.json({ error: 'Theatre not found' }, { status: 404 });
    }
    return NextResponse.json(theatre);
  } catch (error) {
    console.error('Failed to fetch theatre:', error);
    return NextResponse.json({ error: 'Failed to fetch theatre' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    console.log('Received data:', data);
    console.log('Theatre ID:', params.id);

    const { name, location, capacity, image } = data;

    const theatre = await prisma.theatre.update({
      where: { id: params.id },
      data: { 
        name, 
        location, 
        capacity: parseInt(capacity, 10), // Convert to integer
        image 
      }
    });

    console.log('Updated theatre:', theatre);
    return NextResponse.json(theatre);
  } catch (error) {
    console.error('Failed to update theatre:', error);
    return NextResponse.json({ error: 'Failed to update theatre', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.theatre.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ message: 'Theatre deleted successfully' });
  } catch (error) {
    console.error('Failed to delete theatre:', error);
    return NextResponse.json({ error: 'Failed to delete theatre' }, { status: 500 });
  }
}