import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../components/hooks/hookFetch";
import styles from "./login.module.css"; // CSS login

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { request, loading, error } = useFetch(); // Usando o hook aqui

  const handleLogin = async (e) => {
    e.preventDefault();

    
    // Chamando a API para verificar o login
    const response = await request("http://localhost:3333/loginUsuario", "POST", { usu_email: email, usu_senha: senha });

    if (response && response.sucesso) {
      localStorage.setItem("usuario", JSON.stringify({ email }));
      navigate("/home"); // Redireciona para a Home após login
    } else {
      alert(error || "Ocorreu um erro ao tentar fazer o login. Tente novamente."); // Exibe um erro amigável
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
        <button type="submit" disabled={loading}>Entrar</button>

       
        {error && <p style={{ color: "red" }}>Erro: {error}</p>}
      </form>
    </div>
  );
};

export default Login;
