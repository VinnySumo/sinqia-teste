import React, { useEffect, useState } from "react";
import { FaUserCircle } from 'react-icons/fa'; // Importando o ícone de usuário
import styles from "./navBar.module.css";

const Navbar = () => {
  const [usuario, setUsuario] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    // Recupera os dados do usuário do localStorage
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user) {
      setUsuario(user); // Atualiza o estado com os dados do usuário
    }
  }, []); // O useEffect roda uma vez quando o componente é montado

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
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
        <div 
          className={styles.avatar} 
          onClick={() => setDropdownVisible(!dropdownVisible)} // Alterna a visibilidade do dropdown
        >
          <FaUserCircle size={30} color="white" />
        </div>
        {usuario ? (
          <span>{usuario.nome}</span> // Exibe o nome do usuário
        ) : null}

        {/* Dropdown menu */}
        {dropdownVisible && (
          <div className={styles.dropdownMenu}>
            {usuario ? (
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
