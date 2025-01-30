import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Login from './pages/login/login' //login
import Cadastro from './pages/login/cadastro/cadastro'; //cadastro
import Home from './pages/home/home';
import CadastroTurismo from './pages/home/cadastroTurismo/cadastroT';
import DetalhesTurismo from './pages/home/detalhesTurismo/detalhesT';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastroturismo" element={<CadastroTurismo />} />
        <Route path="/detalheturismo/:id" element={<DetalhesTurismo />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
