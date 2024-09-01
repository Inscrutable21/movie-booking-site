import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const seat = await prisma.seat.findUnique({
      where: { id: params.id },
      include: { theatre: true },
    });
    if (!seat) {
      return NextResponse.json({ error: 'Seat not found' }, { status: 404 });
    }
    return NextResponse.json(seat);
  } catch (error) {
    console.error('Failed to fetch seat:', error);
    return NextResponse.json({ error: 'Failed to fetch seat' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const updatedSeat = await prisma.seat.update({
      where: { id: params.id },
      data: {
        theatreId: data.theatreId,
        row: data.row,
        number: data.number,
        type: data.type,
        price: parseFloat(data.price),
        isAvailable: data.isAvailable,
      },
      include: { theatre: true },
    });
    return NextResponse.json(updatedSeat);
  } catch (error) {
    console.error('Failed to update seat:', error);
    return NextResponse.json({ error: 'Failed to update seat' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.seat.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Seat deleted successfully' });
  } catch (error) {
    console.error('Failed to delete seat:', error);
    return NextResponse.json({ error: 'Failed to delete seat' }, { status: 500 });
  }
}