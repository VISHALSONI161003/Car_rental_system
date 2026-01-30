'use client';
import React, { useState } from 'react';
import { useRental } from '@/context/RentalContext';
import { CarCard } from '@/components/CarCard';
import { Button } from '@/components/Button';
import { Car } from '@/types';
import styles from './page.module.css';

export default function RentPage() {
    const { cars, rentCar } = useRental();
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [formData, setFormData] = useState({ name: '', days: 1 });
    const [message, setMessage] = useState('');

    const handleRentClick = (car: Car) => {
        setSelectedCar(car);
        setMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCar) return;

        // Simplified logic since we have auth now
        const success = await rentCar(selectedCar.id, formData.days);
        if (success) {
            setMessage(`Successfully rented ${selectedCar.brand} ${selectedCar.model}!`);
            setSelectedCar(null);
            setFormData({ name: '', days: 1 });
        } else {
            setMessage('Failed to rent car. It might be unavailable or you need to login.');
        }
    };

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Rent a Premium Vehicle</h1>

            {message && <div className={styles.alert}>{message}</div>}

            <div className={styles.grid}>
                {cars.filter(c => c.isAvailable).map(car => (
                    <CarCard key={car.id} car={car} onRent={handleRentClick} />
                ))}
                {cars.filter(c => c.isAvailable).length === 0 && (
                    <p className={styles.empty}>No cars available at the moment. Check back later.</p>
                )}
            </div>

            {selectedCar && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Rent {selectedCar.brand} {selectedCar.model}</h2>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.field}>
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Rental Days</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.days || ''}
                                    onChange={e => {
                                        const val = parseInt(e.target.value);
                                        setFormData({ ...formData, days: isNaN(val) ? 0 : val })
                                    }}
                                    required
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.cost}>
                                Total: ${(selectedCar.basePricePerDay * formData.days).toFixed(2)}
                            </div>
                            <div className={styles.actions}>
                                <Button type="button" variant="outline" onClick={() => setSelectedCar(null)}>Cancel</Button>
                                <Button type="submit">Confirm Rental</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}
