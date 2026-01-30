import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const cars = await prisma.car.findMany();
    return NextResponse.json(cars);
}
