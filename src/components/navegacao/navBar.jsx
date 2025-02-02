import React, { useState } from "react";
import { FaUserCircle } from 'react-icons/fa'; // Importando o ícone de usuário
import { useDispatch, useSelector } from "react-redux";
import styles from "./navBar.module.css";
import { userLogout } from "../../redux/usuario/action";

const Navbar = () => {
  const { user } = useSelector((state) => state.user); // Obtendo os dados do usuário do Redux
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    dispatch(userLogout()); // Chama a ação de logout para limpar o estado do Redux
    setDropdownVisible(false); // Fecha o dropdown
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.menu}>
        <li><a href="/home">Home</a></li>
        <li><a href="#">Praias</a></li>
        <li><a href="#">Florestas</a></li>
        <li><a href="#">Vida Noturna</a></li>
        <li><a href="#">Diversão</a></li>
      </ul>

      {/* Perfil e dropdown */}
      <div className={styles.profile}>
      {user && user.usu_nome ? ( // Verifica se o usuário está logado
          <span>{user.usu_nome}</span> // Exibe o nome do usuário
        ) : null}
        <div 
          className={styles.avatar} 
          onClick={() => setDropdownVisible(!dropdownVisible)} // Alterna a visibilidade do dropdown
        >
          <FaUserCircle size={30} color="white" />
        </div>
        
        {/* Dropdown menu */}
        {dropdownVisible && (
          <div className={styles.dropdownMenu}>
            {user ? (
              <div>
                <a href="#" onClick={handleLogout}>Sair</a>
              </div>
            ) : (
              <a href="/login">Logar</a> // Exibe link de login quando não estiver logado
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
