import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { carId, days } = await request.json();

    const car = await prisma.car.findUnique({ where: { id: carId } });
    if (!car || !car.isAvailable) {
        return NextResponse.json({ message: 'Car unavailable' }, { status: 400 });
    }

    const totalCost = car.basePricePerDay * days;

    try {
        // Transaction to rent car
        const result = await prisma.$transaction([
            prisma.car.update({
                where: { id: carId },
                data: { isAvailable: false },
            }),
            prisma.rental.create({
                data: {
                    userId: session.userId,
                    carId: car.id,
                    rentalDays: days,
                    totalCost: totalCost,
                },
            }),
        ]);

        return NextResponse.json(result[1]);
    } catch (e) {
        return NextResponse.json({ message: 'Rental failed' }, { status: 500 });
    }
}

export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json([]);
    }

    const rentals = await prisma.rental.findMany({
        where: { userId: session.userId, status: 'ACTIVE' },
        include: { car: true, user: true },
    });

    // Map to match frontend Token type if needed, or update frontend type
    return NextResponse.json(rentals);
}
