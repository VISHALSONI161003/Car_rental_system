'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Car, Customer, Rental } from '@/types';

// Update Rental type to match DB response if needed, 
// strictly speaking DB returns `userId` not `customer` object structure exactly 
// but we include `user` in the Prisma query.
interface RentalContextType {
    user: any; // Add user type
    cars: Car[];
    rentals: any[]; // Using any for flexibility with Prisma return type
    rentCar: (carId: string, days: number) => Promise<boolean>;
    returnCar: (carId: string) => Promise<void>;
    refresh: () => void;
    logout: () => Promise<void>;
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export const RentalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [cars, setCars] = useState<Car[]>([]);
    const [rentals, setRentals] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            // Check auth
            const authRes = await fetch('/api/auth/me');
            if (authRes.ok) {
                const userData = await authRes.json();
                setUser(userData);
            } else {
                setUser(null);
            }

            const carsRes = await fetch('/api/cars');
            const carsData = await carsRes.json();
            setCars(carsData);

            if (authRes.ok) {
                const rentalsRes = await fetch('/api/rent');
                if (rentalsRes.ok) {
                    const rentalsData = await rentalsRes.json();
                    setRentals(rentalsData);
                } else {
                    setRentals([]); // Clear rentals if auth fails for rentals endpoint
                }
            } else {
                setRentals([]); // Clear rentals if user is not authenticated
            }
        } catch (e) {
            console.error("Failed to fetch data", e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
        setRentals([]);
        fetchData(); // Re-fetch data to update car availability and clear rentals
    };

    const rentCar = async (carId: string, days: number) => {
        try {
            const res = await fetch('/api/rent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ carId, days }),
            });

            if (res.ok) {
                fetchData();
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    };

    const returnCar = async (carId: string) => {
        try {
            const res = await fetch('/api/return', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ carId }),
            });

            if (res.ok) {
                fetchData();
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <RentalContext.Provider value={{ user, cars, rentals, rentCar, returnCar, refresh: fetchData, logout }}>
            {children}
        </RentalContext.Provider>
    );
};

export const useRental = () => {
    const context = useContext(RentalContext);
    if (context === undefined) {
        throw new Error('useRental must be used within a RentalProvider');
    }
    return context;
};
