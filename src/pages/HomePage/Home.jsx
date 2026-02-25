import { useUserStats } from './hooks/useUserStats';
import { StatCard } from './components/StatCard';
import { MenuCard } from './components/MenuCard';
import { SectionHeader } from './components/SectionHeader';
import { STAT_CARDS, MENU_ITEMS } from './constants/HomeConfig';
import styles from './Home.module.css';

export default function HomePage() {
    const { stats } = useUserStats();

    return (
        <main className={styles.page}>
            <div className={styles.inner}>

                {/* ── Page Header ── */}
                <header className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>
                        Bienvenido de <span>vuelta</span>
                    </h1>
                    <p className={styles.pageSubtitle}>
                        Aquí están tus estadísticas y acceso rápido
                    </p>
                </header>

                {/* ── Stats ── */}
                <section className={styles.section}>
                    <SectionHeader title="Tu Actividad" />
                    <div className={styles.statsGrid}>
                        {STAT_CARDS.map((card, i) => (
                            <StatCard
                                key={card.key}
                                index={i}
                                value={stats[card.key]}
                                {...card}
                            />
                        ))}
                    </div>
                </section>

                {/* ── Quick Access ── */}
                <section className={styles.section}>
                    <SectionHeader
                        title="Navegación"
                        subtitle="Accede rápidamente a cada módulo"
                    />
                    <div className={styles.menuGrid}>
                        {MENU_ITEMS.map((item, i) => (
                            <MenuCard key={item.to} index={i} {...item} />
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
