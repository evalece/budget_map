import React from "react";
import styles from "./Banner.module.css";


interface BannerProps {
  title?: string;
  subtitle?: string;
  rightSlot?: React.ReactNode; // e.g., buttons, avatar, search, etc.
  fixed?: boolean;             // true = fixed at very top; false = sticky
}

const Banner: React.FC<BannerProps> = ({
  title = "My App",
  subtitle,
  rightSlot,
  fixed = false,
}) => {
  return (    <header
      className={`89 ${fixed ? styles.fixed : styles.sticky}`}
      role="banner"
    >
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.logo} aria-hidden>◎</span>
          <div className={styles.text}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>

        <div className={styles.right}>
          {rightSlot}
        </div>
      </div>
    </header>
  );
};

export default Banner;