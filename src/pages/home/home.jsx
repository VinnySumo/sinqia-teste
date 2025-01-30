import React, { useState, useEffect } from "react";
import Navbar from "../../components/navegacao/navBar"; // Importando o menu
import styles from './home.module.css';
import { useNavigate } from "react-router-dom"; // Para redirecionamento

const Home = () => {
  const [pontosTuristicos, setPontosTuristicos] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const dados = [
      { id: 1, nome: "Cristo Redentor", categoria: "Turismo", localizacao: "Rio de Janeiro, RJ" },
      { id: 2, nome: "Praia de Copacabana", categoria: "Praias", localizacao: "Rio de Janeiro, RJ" },
      { id: 3, nome: "Floresta Amazônica", categoria: "Florestas", localizacao: "Amazônia, BR" },
      { id: 4, nome: "Baladas de São Paulo", categoria: "Vida Noturna", localizacao: "São Paulo, SP" },
      { id: 5, nome: "Parque de Diversões Beto Carrero", categoria: "Diversão", localizacao: "Santa Catarina, SC" },
      { id: 5, nome: "Parque de Diversões Beto Carrero", categoria: "Diversão", localizacao: "Santa Catarina, SC" },
      { id: 5, nome: "Parque de Diversões Beto Carrero", categoria: "Diversão", localizacao: "Santa Catarina, SC" },
    ];

    setPontosTuristicos(dados);
  }, []);

  const pontosFiltrados = pontosTuristicos.filter((ponto) =>
    ponto.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    ponto.localizacao.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const indexInicial = (paginaAtual - 1) * itensPorPagina;
  const indexFinal = indexInicial + itensPorPagina;
  const pontosPaginados = pontosFiltrados.slice(indexInicial, indexFinal);
  const totalPaginas = Math.ceil(pontosFiltrados.length / itensPorPagina);

  return (
    <div className={styles.container}>
      <Navbar /> {/* Adicionando o menu de navegação */}

      {/* Cabeçalho atualizado */}
      <div className={styles.header}>
        <h1 className={styles.titulo}>Pontos Turísticos</h1>
        
        {/* Barra de pesquisa e botão no mesmo container */}
        <div className={styles.buscaContainer}>
          <input
            type="text"
            placeholder="Buscar por nome ou localização..."
            className={styles.inputBusca}
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          <button className={styles.botaoCadastro} onClick={() => navigate("/cadastroturismo")}>
            Adicionar Ponto Turistico
          </button>
        </div>
      </div>

      <div className={styles.gridContainer}>
        {pontosPaginados.length > 0 ? (
          pontosPaginados.map((ponto) => (
            <div key={ponto.id} className={styles.card}>
              {/* Aqui vai a imagem no futuro */}
              <div className={styles.cardImage}></div> 
              <div className={styles.cardContent}>
                <h2>{ponto.nome}</h2>
                <p>{ponto.localizacao}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.mensagem}>Nenhum ponto encontrado.</p>
        )}
      </div>

      {totalPaginas > 1 && (
        <div className={styles.paginacao}>
          <button onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))} disabled={paginaAtual === 1}>
            {"<"} Anterior
          </button>
          <span>Página {paginaAtual} de {totalPaginas}</span>
          <button onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))} disabled={paginaAtual === totalPaginas}>
            Próximo {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
