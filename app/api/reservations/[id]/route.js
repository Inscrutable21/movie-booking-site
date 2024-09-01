// app/api/reservations/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { name: true, email: true } },
        showtime: {
          include: {
            movie: { select: { title: true } },
            theatre: { select: { name: true } }
          }
        },
        seats: true,
      }
    });
    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }
    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Failed to fetch reservation:', error);
    return NextResponse.json({ error: 'Failed to fetch reservation' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const data = await request.json();
    const reservation = await prisma.reservation.update({
      where: { id: params.id },
      data,
      include: {
        user: { select: { name: true, email: true } },
        showtime: {
          include: {
            movie: { select: { title: true } },
            theatre: { select: { name: true } }
          }
        },
        seats: true,
      }
    });
    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Failed to update reservation:', error);
    return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.reservation.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Failed to delete reservation:', error);
    return NextResponse.json({ error: 'Failed to delete reservation' }, { status: 500 });
  }
}