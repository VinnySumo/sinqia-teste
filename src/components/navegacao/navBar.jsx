import React, { useState } from "react";
import { FaUserCircle } from 'react-icons/fa'; // Ícone do avatar
import { useDispatch, useSelector } from "react-redux";
import styles from "./navBar.module.css";
import { userLogout } from "../../redux/usuario/action";

const Navbar = () => {
  const { user } = useSelector((state) => state.user); // Dados do usuário no Redux
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    dispatch(userLogout()); // Desloga o usuário
    setDropdownVisible(false); // Fecha o dropdown
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo no lado esquerdo */}
      <div className={styles.logo}>
        <img src="/imagens/brasil.jpeg" alt="" />
      </div>

      {/* Home no centro */}
      <div className={styles.menu}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/home">Locais</a></li>
        </ul>
      </div>

      {/* Avatar no canto direito com dropdown */}
      <div className={styles.profile}>
        {user && user.usu_nome && <span>{user.usu_nome}</span>}
        <div 
          className={styles.avatar} 
          onClick={() => setDropdownVisible(!dropdownVisible)} // Alterna o dropdown
        >
          <FaUserCircle size={30} color="white" />
        </div>

        {/* Dropdown Menu */}
        {dropdownVisible && (
          <div className={styles.dropdownMenu}>
            {user ? (
              <div>
                <a href="#" onClick={handleLogout}>Sair</a>
              </div>
            ) : (
              <a href="/login">Logar</a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
