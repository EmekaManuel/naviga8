import styles from './UiField.module.scss';
interface Props {
  error?: string;
  label?: string;
  children: React.ReactNode;
}
export default function UiField({ error, label, children }: Props) {
  return (
    <div className={styles.ui_field}>
      <label>{label}</label>
      {children}
      <div className={styles.error_message}>{error}</div>
    </div>
  );
}