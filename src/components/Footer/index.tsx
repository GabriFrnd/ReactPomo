import { Link } from 'react-router';
import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to='/about-pomodoro/'>Entenda sobre a Técnica Pomodoro</Link>
      <Link to='/'>Feito por Gabriel F. Feitosa</Link>
    </footer>
  );
}
