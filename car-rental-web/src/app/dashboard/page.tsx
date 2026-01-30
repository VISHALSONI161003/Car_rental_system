'use client';
import React from 'react';
import { useRental } from '@/context/RentalContext';
import { Button } from '@/components/Button';
import { ThreeDCard } from '@/components/ThreeDCard';
import styles from './page.module.css';

export default function DashboardPage() {
    const { user, rentals, returnCar } = useRental();

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>My Garage</h1>
                <p className={styles.subtitle}>Manage your active rentals</p>
            </div>

            {rentals.length === 0 ? (
                <ThreeDCard className={styles.emptyCard}>
                    <div className={styles.emptyState}>
                        <p>You have no active rentals.</p>
                        <Button onClick={() => window.location.href = '/rent'}>Browse Fleet</Button>
                    </div>
                </ThreeDCard>
            ) : (
                <div className={styles.grid}>
                    {rentals.map((rental) => (
                        <ThreeDCard key={rental.id} className={styles.cardWrapper}>
                            <div className={styles.rentalCard}>
                                <div className={styles.cardHeader}>
                                    <div>
                                        <h3>{rental.car.brand} {rental.car.model}</h3>
                                        <span className={styles.date}>Rented on {new Date(rental.startDate).toLocaleDateString()}</span>
                                    </div>
                                    <span className={styles.badge}>Active</span>
                                </div>

                                <div className={styles.details}>
                                    <div className={styles.detailRow}>
                                        <span>Duration</span>
                                        <strong>{rental.rentalDays} Days</strong>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span>Total Cost</span>
                                        <strong className={styles.cost}>${rental.totalCost.toFixed(2)}</strong>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className={styles.returnBtn}
                                    onClick={() => returnCar(rental.car.id)}
                                >
                                    Return Vehicle
                                </Button>
                            </div>
                        </ThreeDCard>
                    ))}
                </div>
            )}
        </main>
    );
}
