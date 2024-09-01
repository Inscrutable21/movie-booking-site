import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  if (!params.id) {
    return NextResponse.json({ error: 'Showtime ID is required' }, { status: 400 });
  }

  try {
    const showtimeId = params.id;
    const showtime = await prisma.showtime.findUnique({
      where: { id: showtimeId },
      include: {
        movie: true,
        theatre: {
          include: {
            seats: true,
          },
        },
        reservations: {
          include: {
            seat: true,
          },
        },
      },
    });

    if (!showtime) {
      return NextResponse.json({ error: 'Showtime not found' }, { status: 404 });
    }

    const allSeats = showtime.theatre.seats;
    const reservedSeatIds = showtime.reservations.map(res => res.seat.id);

    const availableSeats = allSeats.map(seat => ({
      ...seat,
      isAvailable: !reservedSeatIds.includes(seat.id),
    }));

    return NextResponse.json({ seats: availableSeats, showtime });
  } catch (error) {
    console.error('Failed to fetch seats:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}