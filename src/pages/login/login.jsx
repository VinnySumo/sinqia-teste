import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.module.css"; //css do login

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
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
