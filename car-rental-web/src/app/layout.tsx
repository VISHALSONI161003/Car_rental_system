import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { RentalProvider } from '@/context/RentalContext';

export const metadata: Metadata = {
    title: 'Luxury Car Rental',
    description: 'Premium car rental service for your journey.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <RentalProvider>
                    <Navbar />
                    {children}
                </RentalProvider>
            </body>
        </html>
    );
}
