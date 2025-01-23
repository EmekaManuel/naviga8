import styles from "./Footer.module.scss";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      {/* <div className={styles.footer_inner}>
        <p className={styles.copyright}>
          COPYRIGHT © {year}. Naviga8. ALL RIGHTS RESERVED
        </p>
      </div> */}
    </div>
  );
}
