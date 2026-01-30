'use client';

import React from 'react';
import { Car } from '@/types';
import { Button } from './Button';
import styles from './CarCard.module.css';
import { ThreeDCard } from './ThreeDCard';

interface CarCardProps {
    car: Car;
    onRent?: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onRent }) => {
    return (
        <ThreeDCard className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.imagePlaceholder}>
                    {car.imageUrl ? (
                        <img src={car.imageUrl} alt={car.brand} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div className={styles.placeholderText}>{car.brand}</div>
                    )}
                </div>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h3 className={styles.title}>{car.brand} {car.model}</h3>
                        <span className={styles.price}>${car.basePricePerDay}<span className={styles.perDay}>/day</span></span>
                    </div>
                    <div className={styles.features}>
                        <span className={styles.feature}>Automatic</span>
                        <span className={styles.feature}>Petrol</span>
                        <span className={styles.feature}>4 Seats</span>
                    </div>
                    <div className={styles.actions}>
                        <Button variant="outline" size="sm" onClick={() => onRent && onRent(car)}>Rent Now</Button>
                    </div>
                </div>
            </div>
        </ThreeDCard>
    );
};
