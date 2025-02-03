import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Login from './pages/login/login'; // login
import Cadastro from './pages/login/cadastro/cadastro'; // cadastro
import Home from './pages/home/home';
import CadastroTurismo from './pages/home/cadastroTurismo/cadastroT';
import DetalhesTurismo from './pages/home/detalhesTurismo/detalhesT';
import LandingPage from './pages/landingPage/lading';
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from './redux/usuario/action'; // Ação de login
import './App.css'

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((rootreducer) => rootreducer.user);
  const [count, setCount] = useState(0);

  // Recupera dados do localStorage e faz o login automaticamente se o usuário estiver logado
  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      dispatch(userLogin(JSON.parse(usuario))); // Dispara a ação para atualizar o Redux com os dados do usuário
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastroturismo" element={<CadastroTurismo />} />
          <Route path="/detalheturismo/:id" element={<DetalhesTurismo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
