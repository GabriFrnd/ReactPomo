import { RouterLink } from '../RouterLink';

import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href='/about-pomodoro/'>Entenda sobre a Técnica Pomodoro</RouterLink>
      <RouterLink href='/'>Feito por Gabriel F. Feitosa</RouterLink>
    </footer>
  );
}
