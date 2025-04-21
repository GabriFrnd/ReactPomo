import styles from './styles.module.css';

type HeadingProps = {
  children: React.ReactNode /* Tudo que o React aceita como children está em 'React.ReactNode' */;
};

export function Heading({ children }: HeadingProps) {
  return <h1 className={styles.heading}>{children}</h1>;
}
