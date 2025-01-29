import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai"; // Importando ícone de seta
import styles from "./cadastro.module.css"; // Estilos para a tela de cadastro

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();

    // Verifica se os emails são iguais
    if (email !== confirmarEmail) {
      alert("Os emails não coincidem!");
      return;
    }

    // Simulando cadastro (aqui você chamaria a API do backend)
    console.log("Cadastro realizado com sucesso:", { nome, email });

    // Após cadastro, redireciona para o login
    navigate("/");
  };

  return (
    <div className={styles.cadastro_container}>
      <form className={styles.cadastro_form} onSubmit={handleCadastro}>
        <div className={styles.voltar}>
          <AiOutlineArrowLeft 
            size={30} 
            onClick={() => navigate("/")} 
            className={styles.voltar_icone} 
          />
        </div>
        <h2>Cadastro</h2>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Confirmar e-mail"
          value={confirmarEmail}
          onChange={(e) => setConfirmarEmail(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
