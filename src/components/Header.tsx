import styles from "./Header.module.css"

import igniteLogo from "../assets/ignite-logo.svg"

export function Header() {
  return (
    <header className={styles.header}>
      <img src={igniteLogo} alt="Ignite logo" />
      <strong>Ignite Feed</strong>
    </header>
  );
}