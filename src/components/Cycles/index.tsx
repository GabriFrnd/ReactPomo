import styles from './styles.module.css';

export function Cycles() {
  return (
    <div className={styles.cycles}>
      <span>Ciclos</span>

      <div className={styles.dots}>
        <span className={`${styles.dot} ${styles.work}`}></span>
        <span className={`${styles.dot} ${styles.short}`}></span>

        <span className={`${styles.dot} ${styles.work}`}></span>
        <span className={`${styles.dot} ${styles.short}`}></span>

        <span className={`${styles.dot} ${styles.work}`}></span>
        <span className={`${styles.dot} ${styles.short}`}></span>

        <span className={`${styles.dot} ${styles.work}`}></span>
        <span className={`${styles.dot} ${styles.long}`}></span>
      </div>
    </div>
  );
}
