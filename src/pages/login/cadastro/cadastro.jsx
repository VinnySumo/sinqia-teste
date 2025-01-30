import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useFetch from "../../../components/hooks/hookFetch"; //importação do hook para uso da api
import styles from "./cadastro.module.css";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para esconder/mostrar a senha
  const navigate = useNavigate();

  const { data, loading, error } = useFetch("http://localhost:3333/usuarioscadastro", "POST");

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (email !== confirmarEmail) {
      alert("Os emails não coincidem!");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const userData = { usu_nome: nome, usu_email: email, usu_senha: senha };

    try {
      const response = await fetch("http://localhost:3333/usuarioscadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      } else {
        alert(result.mensagem || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      alert("Erro ao conectar com a API.");
    }
  };

  return (
    <div className={styles.cadastro_container}>
      <form className={styles.cadastro_form} onSubmit={handleCadastro}>
        <div className={styles.voltar}>
          <AiOutlineArrowLeft size={30} onClick={() => navigate("/")} className={styles.voltar_icone} />
        </div>
        <h2>Cadastro</h2>
        <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="email" placeholder="Confirmar e-mail" value={confirmarEmail} onChange={(e) => setConfirmarEmail(e.target.value)} required />

        <div className={styles.senha_container}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.toggle_senha}>
            {showPassword ? "👁️" : "🙈"}
          </button>
        </div>

        <div className={styles.senha_container}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.toggle_senha}>
            {showPassword ? "👁️" : "🙈"}
          </button>
        </div>

        <button type="submit" disabled={loading}>{loading ? "Cadastrando..." : "Cadastrar"}</button>
      </form>
      {error && <p className={styles.error_message}>{error}</p>}
    </div>
  );
};

export default Cadastro;
