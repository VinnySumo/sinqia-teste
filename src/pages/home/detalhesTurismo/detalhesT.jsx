import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './detalhesT.module.css'; // Adicione seu estilo aqui

const DetalhesTurismo = () => {
  const { id } = useParams();  // Pega o ID da URL
  const [ponto, setPonto] = useState(null);
  const navigate = useNavigate();

  // Função para buscar os detalhes do ponto turístico
  useEffect(() => {
    const fetchPonto = async () => {
      const response = await fetch(`/api/pontos/${id}`);
      const data = await response.json();
      setPonto(data);
    };
    fetchPonto();
  }, [id]);

  const handleVoltar = () => {
    navigate('/home'); // Voltar para a página inicial de pontos turísticos
  };

  if (!ponto) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>{ponto.nome}</h2>
      <p><strong>Descrição:</strong> {ponto.descricao}</p>
      <p><strong>Localização:</strong> {ponto.localizacao}</p>
      <p><strong>Cidade:</strong> {ponto.cidade}</p>
      <p><strong>Estado:</strong> {ponto.estado}</p>
      <button onClick={handleVoltar} className={styles.botaoVoltar}>
        Voltar
      </button>
    </div>
  );
};

export default DetalhesTurismo;
