export interface Car {
    id: string;
    brand: string;
    model: string;
    basePricePerDay: number;
    isAvailable: boolean;
    imageUrl?: string;
    image?: string; // Keeping for backward compatibility if needed
}

export interface Customer {
    customerId: string;
    name: string;
    contactInfo: string;
}

export interface Rental {
    rentedCar: Car;
    customer: Customer;
    rentalDays: number;
    totalCost: number;
}
