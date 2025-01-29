import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css"; // Corrigido para usar o styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulando autenticação (aqui você chamaria a API do backend)
    if (email === "admin@teste.com" && senha === "123456") {
      localStorage.setItem("usuario", JSON.stringify({ email }));
      navigate("/home"); // Redireciona para a Home após login
    } else {
      alert("Email ou senha incorretos!");
    }
  };

  return (
    <div className={styles.login_container}>
      <form className={styles.login_form} onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <div className={styles.options}>
          <p>
            <a href="/recuperar-senha">Esqueceu a senha?</a>
          </p>
          <p>
            <a href="/cadastro">Cadastrar-se</a>
          </p>
        </div>
        <button type="submit">Entrar</button>
        
      </form>
    </div>
  );
};

export default Login;
