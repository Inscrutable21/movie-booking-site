// lib/reservationUtils.js
import prisma from './prisma';

export async function createReservation(userId, showtimeId, seatIds, totalAmount) {
  return prisma.reservation.create({
    data: {
      userId,
      showtimeId,
      seats: {
        connect: seatIds.map(id => ({ id }))
      },
      totalAmount,
      status: 'CONFIRMED'
    },
    include: {
      seats: true,
      showtime: {
        include: {
          movie: true,
          theatre: true
        }
      }
    }
  });
}

export async function getReservationById(id) {
  return prisma.reservation.findUnique({
    where: { id },
    include: {
      seats: true,
      showtime: {
        include: {
          movie: true,
          theatre: true
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
}

export async function getAllReservations(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const [reservations, total] = await Promise.all([
    prisma.reservation.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        seats: true,
        showtime: {
          include: {
            movie: true,
            theatre: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    }),
    prisma.reservation.count()
  ]);

  return {
    reservations,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  };
}

export async function updateReservationStatus(id, status) {
  return prisma.reservation.update({
    where: { id },
    data: { status },
    include: {
      seats: true,
      showtime: {
        include: {
          movie: true,
          theatre: true
        }
      }
    }
  });
}
export async function fetchShowtimeDetails(showtimeId) {
    return prisma.showtime.findUnique({
      where: { id: showtimeId },
      include: {
        movie: true,
        theatre: true,
        seats: {
          orderBy: [
            { row: 'asc' },
            { number: 'asc' }
          ]
        }
      }
    });
  }
export async function deleteReservation(id) {
  return prisma.reservation.delete({
    where: { id }
  });
}

export async function updateSeatStatus(seatId, isReserved) {
  return prisma.seat.update({
    where: { id: seatId },
    data: { isReserved }
  });
}