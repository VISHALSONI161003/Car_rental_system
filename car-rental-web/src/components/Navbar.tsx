'use client';
import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

import { useRental } from '@/context/RentalContext';

export const Navbar: React.FC = () => {
    const { user, logout } = useRental();

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">LuxeRent</Link>
            </div>
            <div className={styles.links}>
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/rent" className={styles.link}>Rent a Car</Link>

                {user ? (
                    <>
                        <Link href="/dashboard" className={styles.link}>Dashboard</Link>
                        <span className={styles.welcome}>Hello, {user.name}</span>
                        <button onClick={logout} className={styles.logoutBtn}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className={styles.link}>Login</Link>
                        <Link href="/register" className={styles.cta}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};
