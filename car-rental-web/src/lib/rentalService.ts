import { Car, Customer, Rental } from '../types';

export class RentalService {
    private cars: Car[];
    private rentals: Rental[];

    constructor(initialCars: Car[]) {
        this.cars = [...initialCars];
        this.rentals = [];
    }

    getCars(): Car[] {
        return this.cars;
    }

    getAvailableCars(): Car[] {
        return this.cars.filter((car) => car.isAvailable);
    }

    getCarById(id: string): Car | undefined {
        return this.cars.find((car) => car.id === id);
    }

    calculateRentalCost(car: Car, days: number): number {
        return car.basePricePerDay * days;
    }

    rentCar(carId: string, customer: Customer, days: number): Rental | null {
        const carIndex = this.cars.findIndex((c) => c.id === carId);
        if (carIndex === -1) return null;

        const car = this.cars[carIndex];
        if (!car.isAvailable) return null;

        // Update car availability
        // In a real app, this would be an API call or immutable state update in React
        // For this service logic, we'll return the rental object 
        // and let the UI handle state updates via this service if it were a singleton, 
        // but better to use this as utility functions.

        // However, sticking to the Java Logic Class structure:
        car.isAvailable = false;
        const totalCost = this.calculateRentalCost(car, days);

        const rental: Rental = {
            rentedCar: car,
            customer,
            rentalDays: days,
            totalCost
        };

        this.rentals.push(rental);
        return rental;
    }

    returnCar(carId: string): boolean {
        const rentalIndex = this.rentals.findIndex((r) => r.rentedCar.id === carId);
        if (rentalIndex === -1) return false;

        const rental = this.rentals[rentalIndex];
        rental.rentedCar.isAvailable = true; // Update logic

        // Remove rental record
        this.rentals.splice(rentalIndex, 1);
        return true;
    }
}
