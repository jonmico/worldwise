import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (evt: React.FormEvent<HTMLButtonElement>) => void;
  type: string;
}

export default function Button({ children, onClick, type }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
