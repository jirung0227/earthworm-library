import logo from "../../assets/logo.jpeg";
import styles from "./Header.module.css";
export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <img src={logo} className={styles.header_logo} />
        지렁이의 서재
      </div>
    </header>
  );
};
