import { Link } from 'react-router-dom';
import { ALERT_CONFIG } from '../constants/AdminConfig';
import styles from '../Admin.module.css';

export function AlertBanner({ type, count }) {
    if (!count || count === 0) return null;

    const cfg = ALERT_CONFIG[type];
    const noun = count === 1 ? cfg.label : cfg.plural;
    const verb = count === 1 ? 'pendiente' : 'pendientes';

    return (
        <Link
            to={cfg.to}
            className={styles.alertBanner}
            style={{
                '--alert-bg': cfg.bg,
                '--alert-border': cfg.border,
                '--alert-color': cfg.color,
            }}
        >
            <span className={styles.alertIconWrap}>
                <i className={`fas ${cfg.icon}`} />
            </span>
            <span className={styles.alertText}>
                <strong>{count}</strong> {noun} {verb}
            </span>
            <span className={styles.alertCta}>
                Ver ahora <i className="fas fa-arrow-right" />
            </span>
        </Link>
    );
}