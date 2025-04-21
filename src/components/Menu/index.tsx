import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';

export function Menu() {
  return (
    <nav className={styles.menu}>
      <a className={styles.link} href='#'>
        <HouseIcon />
      </a>

      <a className={styles.link} href='#'>
        <HistoryIcon />
      </a>

      <a className={styles.link} href='#'>
        <SettingsIcon />
      </a>

      <a className={styles.link} href='#'>
        <SunIcon />
      </a>
    </nav>
  );
}
