import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFetch from "../../components/hooks/hookFetch";
import { userLogin } from "../../redux/usuario/action"; // Importa a ação do Redux
import styles from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request, loading, error } = useFetch();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Chamando a API para verificar o login
    const response = await request("http://localhost:3333/loginUsuario", "POST", {
      usu_email: email,
      usu_senha: senha,
    });

    if (response && response.sucesso) {
      const { usu_id, usu_nome, usu_email } = response.dados;

      // Salva no Redux
      dispatch(userLogin({ usu_id, usu_nome, usu_email }));

      // Salva no localStorage
      localStorage.setItem("usu_id", usu_id);

      navigate("/home"); // Redireciona para a home após login
    } else {
      alert(error || "Ocorreu um erro ao tentar fazer o login. Tente novamente.");
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
