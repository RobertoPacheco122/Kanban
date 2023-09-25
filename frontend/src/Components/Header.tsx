import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <section className={styles.headerContainer}>
        <div>
          <i className={`${styles.icon} ${styles.iconMessage}`}></i>
        </div>
        <div>
          <i className={`${styles.icon} ${styles.iconBell}`}></i>
        </div>
        <div className={styles.userContainer}>
          <span className={styles.username}>Login | Register</span>
          <i className={`${styles.icon} ${styles.iconUser}`}></i>
        </div>
      </section>
    </header>
  );
};

export default Header;
