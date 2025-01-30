import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navegacao/navBar'; // Importando o menu
import { useNavigate } from 'react-router-dom';
import styles from './cadastroT.module.css';

const CadastroTurismo = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [estados, setEstados] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Fetch dos estados
  useEffect(() => {
    const fetchEstados = async () => {
      const response = await fetch('/api/estados');
      const data = await response.json();
      setEstados(data);
    };
    fetchEstados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !descricao || !localizacao || !cidade || !estado) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const pontoTuristico = {
      nome,
      descricao,
      localizacao,
      cidade,
      estado,
    };

    // Enviar para a API (substitua o URL pela sua API real)
    const response = await fetch('/api/pontos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pontoTuristico),
    });

    if (response.ok) {
      alert('Ponto turístico cadastrado com sucesso!');
      navigate('/home');
    } else {
      alert('Erro ao cadastrar ponto turístico');
    }
  };

  return (
    <div className={styles.container}>
      <Navbar /> {/* Adicionando o menu de navegação */}

      <h2 className={styles.titulo}>Cadastro de Ponto Turístico</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={styles.input}
            placeholder="Nome do ponto turístico"
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className={styles.input}
          >
            <option value="">Selecione o estado</option>
            {estados.map((estado) => (
              <option key={estado.sigla} value={estado.sigla}>
                {estado.nome}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="cidade">Cidade</label>
          <input
            type="text"
            id="cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className={styles.input}
            placeholder="Cidade"
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="localizacao">Referência</label>
          <input
            type="text"
            id="localizacao"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            className={styles.input}
            placeholder="Localização do ponto turístico"
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className={styles.input}
            maxLength="100"
            placeholder="Descrição do ponto turístico"
          />
        </div>

        

       

        

        {error && <p className={styles.error}>{error}</p>} {/* Exibe erro se algum campo não for preenchido */}

        <button type="submit" className={styles.botaoCadastro}>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroTurismo;
