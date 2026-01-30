import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const initialCars = [
    { brand: 'Toyota', model: 'Camry', basePricePerDay: 50.0, isAvailable: true, imageUrl: '/cars/camry.png' },
    { brand: 'Honda', model: 'Civic', basePricePerDay: 45.0, isAvailable: true, imageUrl: '/cars/civic.png' },
    { brand: 'Ford', model: 'Mustang', basePricePerDay: 80.0, isAvailable: true, imageUrl: '/cars/mustang.png' },
    { brand: 'Chevrolet', model: 'Malibu', basePricePerDay: 55.0, isAvailable: true, imageUrl: '/cars/malibu.png' },
    { brand: 'Nissan', model: 'Altima', basePricePerDay: 48.0, isAvailable: true, imageUrl: '/cars/altima.png' },
    { brand: 'BMW', model: '3 Series', basePricePerDay: 100.0, isAvailable: true, imageUrl: '/cars/bmw3.png' },
    { brand: 'Audi', model: 'A4', basePricePerDay: 110.0, isAvailable: true, imageUrl: '/cars/audia4.png' },
    { brand: 'Lamborghini', model: 'Huracan', basePricePerDay: 500.0, isAvailable: true, imageUrl: '/cars/lambo.png' },
    { brand: 'Ferrari', model: 'F8 Tributo', basePricePerDay: 550.0, isAvailable: true, imageUrl: '/cars/ferrari.png' },
    { brand: 'Porsche', model: '911 Carrera', basePricePerDay: 300.0, isAvailable: true, imageUrl: '/cars/porsche.png' },
];

export async function GET() {
    try {
        const count = await prisma.car.count();
        if (count > 0) {
            return NextResponse.json({ message: 'Database already seeded', count });
        }

        for (const car of initialCars) {
            await prisma.car.create({ data: car });
        }

        return NextResponse.json({ message: 'Seeding successful', count: initialCars.length });
    } catch (e) {
        return NextResponse.json({ message: 'Seeding failed', error: String(e) }, { status: 500 });
    }
}
