import React from "react";
import styles from "./navBar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.menu}>
        <li><a href="/home">Turismo</a></li>
        <li><a href="#">Praias</a></li>
        <li><a href="#">Florestas</a></li>
        <li><a href="#">Vida Noturna</a></li>
        <li><a href="#">Diversão</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
