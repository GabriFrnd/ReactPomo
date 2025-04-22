import styles from './styles.module.css';

type InputProps = {
  id: string;
  label: string;
} & React.ComponentProps<'input'>; /* Propriedades do componente: 'input' */

export function Input({ id, type, label, ...rest }: InputProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input className={styles.input} id={id} type={type} {...rest} />
    </>
  );
}
