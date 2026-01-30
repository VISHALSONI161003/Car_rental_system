'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './Button';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20; // 20px movement
        const y = (clientY / window.innerHeight - 0.5) * 20;
        setOffset({ x, y });
    };

    return (
        <section className={styles.hero} onMouseMove={handleMouseMove}>
            <div className={styles.content} style={{ transform: `translate(${offset.x * 0.5}px, ${offset.y * 0.5}px)` }}>
                <h1 className={styles.title}>Drive the Extraordinary</h1>
                <p className={styles.subtitle}>
                    Experience the world's most exclusive fleet of luxury and sports cars.
                    Your journey begins here.
                </p>
                <div className={styles.buttons}>
                    <Button size="lg" onClick={() => window.location.href = '/rent'}>View Fleet</Button>
                    <Button variant="outline" size="lg" style={{ color: 'white', borderColor: 'white' }}>Learn More</Button>
                </div>
            </div>
            <div className={styles.imageWrapper} style={{ transform: `translate(${-offset.x}px, ${-offset.y}px)` }}>
                {/* Using the generated image */}
                <Image
                    src="/hero.png"
                    alt="Luxury Car"
                    width={800}
                    height={500}
                    className={styles.image}
                    priority
                />
            </div>
        </section>
    );
};
