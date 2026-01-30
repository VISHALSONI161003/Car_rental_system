'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThreeDCard } from '@/components/ThreeDCard';
import { Button } from '@/components/Button';
import styles from '../login/page.module.css'; // Reuse login styles

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/login');
            } else {
                const data = await res.json();
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <main className={styles.container}>
            <ThreeDCard className={styles.cardContainer}>
                <div className={styles.cardContent}>
                    <h1 className={styles.title}>Join the Elite</h1>
                    <p className={styles.subtitle}>Create your account for exclusive access.</p>

                    {error && <div className={styles.error}>{error}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.field}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                required
                                className={styles.input}
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Email</label>
                            <input
                                type="email"
                                required
                                className={styles.input}
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Password</label>
                            <input
                                type="password"
                                required
                                className={styles.input}
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <Button type="submit" className={styles.submitBtn}>Create Account</Button>
                    </form>

                    <p className={styles.footer}>
                        Already a member? <Link href="/login">Sign In</Link>
                    </p>
                </div>
            </ThreeDCard>
        </main>
    );
}
