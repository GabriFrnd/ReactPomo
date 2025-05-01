import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

import styles from './styles.module.css';
type AvaliableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvaliableThemes>(() => {
    const storageTheme =
      (localStorage.getItem('theme') as AvaliableThemes) || 'dark';
    return storageTheme;
  });

  const nextIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />
  };

  function handleTheme(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme,
    ); /* Mudança de tema c/ alteração no DOM */
    localStorage.setItem(
      'theme',
      theme,
    ); /* Salvar tema no local storage do navegador */
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <Link
        className={styles.link}
        to='/' /* Não existe 'href' com 'Link' do React Router, apenas 'to' (path da rota) */
        aria-label='Página principal'
        title='Página principal'
      >
        <HouseIcon />
      </Link>

      <Link
        className={styles.link}
        to='#'
        aria-label='Histórico'
        title='Histórico'
      >
        <HistoryIcon />
      </Link>

      <Link
        className={styles.link}
        to='#'
        aria-label='Configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </Link>

      <Link
        className={styles.link}
        to='#'
        aria-label='Mudar tema'
        title='Mudar tema'
        onClick={handleTheme}
      >
        {nextIcon[theme]}
      </Link>
    </nav>
  );
}
