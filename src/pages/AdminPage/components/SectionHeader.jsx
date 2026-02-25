import styles from '../Admin.module.css';

export function SectionHeader({ title, subtitle }) {
    return (
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            {subtitle && <p className={styles.sectionSub}>{subtitle}</p>}
        </div>
    );
}