import { Link } from 'react-router-dom';
import styles from '../Home.module.css';

export function StatCard({ icon, label, value, to, accent, index }) {
    return (
        <Link
            to={to}
            className={styles.statCard}
            style={{ '--accent': accent, animationDelay: `${index * 80}ms` }}
        >
            <div className={styles.statIconWrap} style={{ background: `${accent}12` }}>
                <i className={`fas ${icon}`} style={{ color: accent }} />
            </div>
            <div className={styles.statBody}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
            </div>
            <i className={`fas fa-arrow-right ${styles.statArrow}`} />
        </Link>
    );
}
