import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { carId } = await request.json();

    // Find active rental for this car and user
    const rental = await prisma.rental.findFirst({
        where: {
            carId,
            userId: session.userId,
            status: 'ACTIVE'
        }
    });

    if (!rental) {
        return NextResponse.json({ message: 'Rental not found' }, { status: 404 });
    }

    try {
        await prisma.$transaction([
            prisma.car.update({
                where: { id: carId },
                data: { isAvailable: true },
            }),
            prisma.rental.update({
                where: { id: rental.id },
                data: {
                    status: 'COMPLETED',
                    endDate: new Date()
                },
            }),
        ]);

        return NextResponse.json({ message: 'Returned successfully' });
    } catch (e) {
        return NextResponse.json({ message: 'Return failed' }, { status: 500 });
    }
}
