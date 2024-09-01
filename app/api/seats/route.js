import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const seats = await prisma.seat.findMany({
      include: {
        theatre: true,
      },
    });
    return NextResponse.json(seats);
  } catch (error) {
    console.error('Failed to fetch seats:', error);
    return NextResponse.json({ error: 'Failed to fetch seats' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      theatreId,
      standardRows, standardColumns, standardPrice,
      premiumRows, premiumColumns, premiumPrice,
      vipRows, vipColumns, vipPrice
    } = data;

    const seats = [];

    // Generate Standard seats
    for (let row = 1; row <= standardRows; row++) {
      for (let col = 1; col <= standardColumns; col++) {
        seats.push({
          theatreId,
          row: String.fromCharCode(64 + row),
          number: col,
          type: 'Standard',
          price: parseFloat(standardPrice),
          isAvailable: true,
          isAccessible: false,
          isAisle: col === 1 || col === standardColumns,
          isWindow: row === 1 || row === standardRows,
        });
      }
    }

    // Generate Premium seats
    for (let row = 1; row <= premiumRows; row++) {
      for (let col = 1; col <= premiumColumns; col++) {
        seats.push({
          theatreId,
          row: `P${row}`,
          number: col,
          type: 'Premium',
          price: parseFloat(premiumPrice),
          isAvailable: true,
          isAccessible: false,
          isAisle: col === 1 || col === premiumColumns,
          isWindow: row === 1 || row === premiumRows,
        });
      }
    }

    // Generate VIP seats
    for (let row = 1; row <= vipRows; row++) {
      for (let col = 1; col <= vipColumns; col++) {
        seats.push({
          theatreId,
          row: `V${row}`,
          number: col,
          type: 'VIP',
          price: parseFloat(vipPrice),
          isAvailable: true,
          isAccessible: false,
          isAisle: col === 1 || col === vipColumns,
          isWindow: row === 1 || row === vipRows,
        });
      }
    }

    // Create all seats in a single transaction
    const createdSeats = await prisma.seat.createMany({
      data: seats,
    });

    return NextResponse.json(createdSeats, { status: 201 });
  } catch (error) {
    console.error('Error creating seats:', error);
    return NextResponse.json({ error: 'Failed to create seats' }, { status: 500 });
  }
}