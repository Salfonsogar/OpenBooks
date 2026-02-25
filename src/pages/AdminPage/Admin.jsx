import { useAdminStats } from './hooks/useAdminStats';
import { StatCard } from './components/StatCard';
import { MenuCard } from './components/MenuCard';
import { AlertBanner } from './components/AlertBanner';
import { SectionHeader } from './components/SectionHeader';
import { STAT_CARDS, MENU_ITEMS } from './constants/AdminConfig';
import styles from './Admin.module.css';

export default function AdminPage() {
  const { stats } = useAdminStats();

  const hasAlerts = stats.denuncias > 0 || stats.sugerencias > 0;

  return (
    <main className={styles.page}>
      <div className={styles.inner}>

        {/* ── Page Header ── */}
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Panel de <span>Administración</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Gestiona y controla todos los recursos del sistema
          </p>
        </header>

        {/* ── Stats ── */}
        <section className={styles.section}>
          <SectionHeader title="Resumen" />
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

        {/* ── Alerts (conditional) ── */}
        {hasAlerts && (
          <section className={styles.section}>
            <SectionHeader
              title="Alertas"
              subtitle="Elementos que requieren atención"
            />
            <div className={styles.alertsGrid}>
              <AlertBanner type="denuncias" count={stats.denuncias} />
              <AlertBanner type="sugerencias" count={stats.sugerencias} />
            </div>
          </section>
        )}

        {/* ── Quick Access ── */}
        <section className={styles.section}>
          <SectionHeader
            title="Gestión"
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