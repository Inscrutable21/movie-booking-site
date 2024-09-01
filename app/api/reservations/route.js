// app/api/reservations/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const { showtimeId, seatIds, userId, paymentDetails } = await req.json();

    const showtime = await prisma.showtime.findUnique({
      where: { id: showtimeId },
      include: {
        movie: true,
        theatre: true,
        seats: {
          where: {
            id: { in: seatIds }
          }
        }
      }
    });

    if (!showtime) {
      return NextResponse.json({ error: 'Showtime not found' }, { status: 404 });
    }

    const seats = await prisma.seat.findMany({
      where: {
        id: { in: seatIds },
      },
    });

    const totalAmount = seats.reduce((sum, seat) => sum + seat.price, 0);

    const reservation = await prisma.$transaction(async (prisma) => {
      // Check if seats are still available
      const availableSeats = await prisma.seat.findMany({
        where: {
          id: { in: seatIds },
          isAvailable: true
        }
      });

      if (availableSeats.length !== seatIds.length) {
        throw new Error('One or more selected seats are no longer available');
      }

      // Create the reservation
      const newReservation = await prisma.reservation.create({
        data: {
          showtime: { connect: { id: showtimeId } },
          user: { connect: { id: userId } },
          seats: { connect: seatIds.map(id => ({ id })) },
          status: 'confirmed',
          totalAmount,
        },
        include: {
          seats: true,
          showtime: {
            include: {
              movie: true,
              theatre: true,
            },
          },
          user: true,
        },
      });

      // Update the status of the selected seats
      await prisma.seat.updateMany({
        where: {
          id: {
            in: seatIds,
          },
        },
        data: {
          isAvailable: false,
        },
      });

      return newReservation;
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create reservation' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        seats: true,
        showtime: {
          include: {
            movie: true,
            theatre: true,
          },
        },
        user: true,
      },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}