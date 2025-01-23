import styles from './UiList.module.scss';

export interface Data {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}
interface Props {
  data: Data[];
  withVerticalLine?: boolean
}
export default function ListComponent({ data, withVerticalLine }: Props) {
  return (
    <ul className={`${styles.ui_list} ${withVerticalLine ? styles.with_vertical_line : styles.without_vertical_line}`}>
      {data.map((item, index) => (
        <li key={index}>
          {item.icon && (
            <div className={styles.indicator}>
              <div className={styles.icon_container}>{item.icon}</div>
              {withVerticalLine && <div className={styles.horizontal_line} />}
            </div>
          )}
          <div className={styles.content_container}>
            <h5>{item.title}</h5>
            <p>{item.subtitle}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
