import { Hero } from '@/components/Hero';
import { CarCard } from '@/components/CarCard';
import { initialCars } from '@/data/cars';
import styles from './page.module.css';

export default function Home() {
    const featuredCars = initialCars.slice(0, 3);

    return (
        <main>
            <Hero />
            <section className={styles.featured}>
                <h2 className={styles.sectionTitle}>Featured Fleet</h2>
                <div className={styles.carGrid}>
                    {featuredCars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            </section>
        </main>
    );
}
