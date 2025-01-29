import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import Login from './pages/login/login' //login
import Cadastro from './pages/login/cadastro/cadastro'; //cadastro
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
