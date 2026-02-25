import { Link } from 'react-router-dom';
import styles from '../Home.module.css';

export function MenuCard({ icon, title, description, to, accent, index }) {
    return (
        <Link
            to={to}
            className={styles.menuCard}
            style={{ '--accent': accent, animationDelay: `${index * 80}ms` }}
        >
            <div className={styles.menuIconWrap} style={{ background: `${accent}12` }}>
                <i className={`fas ${icon}`} style={{ color: accent }} />
            </div>
            <div className={styles.menuBody}>
                <span className={styles.menuTitle}>{title}</span>
                <p className={styles.menuDesc}>{description}</p>
            </div>
            <div className={styles.menuFooter}>
                <span className={styles.menuCta}>
                    Ir <i className="fas fa-arrow-right" />
                </span>
            </div>
        </Link>
    );
}
