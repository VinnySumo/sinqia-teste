import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './cadastroT.module.css';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Navbar from '../../../components/navegacao/navBar';

const CadastroTurismo = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [estados, setEstados] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch dos estados
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await fetch('http://localhost:3333/estados');
        const result = await response.json();

        const estadosData = result.dados || [];

        if (Array.isArray(estadosData)) {
          setEstados(estadosData);
        } else {
          setError('Erro ao carregar estados');
        }
      } catch (error) {
        setError('Erro ao buscar estados');
      } finally {
        setLoading(false);
      }
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
      pont_nome: nome,
      pont_descricao: descricao,
      pont_localizacao: localizacao,
      pont_cidade: cidade,
      pont_estado: estado,
    };

    try {
      const response = await fetch('http://localhost:3333/pturistico/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pontoTuristico),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Ponto turístico cadastrado com sucesso!');
        navigate('/home');
      } else {
        alert(result.mensagem || 'Erro ao cadastrar ponto turístico');
      }
    } catch (error) {
      alert('Erro ao conectar com a API');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.voltar}>
        <AiOutlineArrowLeft size={30} onClick={() => navigate('/home')} className={styles.voltar_icone} />
      </div>
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
            disabled={loading}
          >
            <option value="">Selecione o estado</option>
            {loading ? (
              <option>Carregando estados...</option>
            ) : (
              estados.map((estado) => (
                <option key={estado.es_siglas} value={estado.es_siglas}>
                  {estado.es_nome} - {estado.es_siglas}
                </option>
              ))
            )}
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

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.botaoCadastro}>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroTurismo;
