import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './detalhesT.module.css'; // Seus estilos
import Navbar from '../../../components/navegacao/navBar';

const DetalhesTurismo = () => {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();
  
  const [ponto, setPonto] = useState(null); // Estado para o ponto turístico
  const [carregando, setCarregando] = useState(true); // Estado de carregamento
  const [erro, setErro] = useState(null); // Estado de erro

  useEffect(() => {
    const carregarPonto = async () => {
      setCarregando(true);
      try {
        const resposta = await fetch(`http://localhost:3333/pturistico/${id}`); // Corrigido a interpolação da URL
        if (!resposta.ok) {
          throw new Error("Erro ao buscar dados da API.");
        }
        const dados = await resposta.json();
  
        console.log(dados);  // Verifique o que está sendo retornado pela API
  
        // Agora vamos acessar 'dados' para obter o ponto turístico
        if (dados.sucesso) {
          setPonto(dados.dados); // Atualiza o estado com o ponto turístico
        } else {
          console.error("Erro na resposta da API:", dados.mensagem);
          setPonto(null); // Caso haja algum problema na resposta, definimos null
        }
      } catch (erro) {
        console.error(erro); // Exibe o erro no console
        setErro(erro.message);
        setPonto(null); // Caso haja erro, definimos null
      } finally {
        setCarregando(false);
      }
    };
  
    carregarPonto();
  }, [id]);

  // Exibe mensagens de carregamento e erro
  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro ao carregar os dados: {erro}</p>;
  if (!ponto) return <p>Ponto turístico não encontrado.</p>;

  return (
    <div className={styles.container}>
      <Navbar></Navbar>
      <h2 className={styles.titulo}>{ponto.pont_nome}</h2>
      <p><strong>Descrição:</strong> {ponto.pont_descricao}</p>
      <p><strong>Localização:</strong> {ponto.pont_localizacao}</p>
      <p><strong>Cidade:</strong> {ponto.pont_cidade}</p>
      <p><strong>Estado:</strong> {ponto.pont_estado}</p>
      <button onClick={() => navigate('/home')} className={styles.botaoVoltar}>
        Voltar
      </button>
    </div>
  );
};

export default DetalhesTurismo;
