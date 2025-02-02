import React, { useState, useEffect } from "react";
import Navbar from "../../components/navegacao/navBar"; // Importando o menu
import styles from './home.module.css';
import { useNavigate } from "react-router-dom"; // Para redirecionamento

const Home = () => {
  const [pontosTuristicos, setPontosTuristicos] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const itensPorPagina = 14;
  const navigate = useNavigate();

  useEffect(() => {
    const carregarPontos = async () => {
      setCarregando(true);
      try {
        const resposta = await fetch("http://localhost:3333/pturistico");
        if (!resposta.ok) {
          throw new Error("Erro ao buscar dados da API.");
        }
        const dados = await resposta.json();
  
        console.log(dados);  // Verifique o que está sendo retornado pela API
  
        // Agora vamos acessar 'dados' para obter os pontos turísticos
        if (dados.sucesso) {
          setPontosTuristicos(dados.dados); // Atualiza o estado com os pontos turísticos
        } else {
          console.error("Erro na resposta da API:", dados.mensagem);
          setPontosTuristicos([]); // Caso haja algum problema na resposta, setamos um array vazio
        }
      } catch (erro) {
        console.error(erro); // Exibe o erro no console
        setErro(erro.message);
        setPontosTuristicos([]); // Caso haja erro, definimos um array vazio
      } finally {
        setCarregando(false);
      }
    };
  
    carregarPontos();
  }, []);

  const pontosFiltrados = pontosTuristicos.filter((ponto) =>
    (ponto.pont_nome?.toLowerCase().includes(termoBusca.toLowerCase()) || 
     ponto.pont_localizacao?.toLowerCase().includes(termoBusca.toLowerCase()) || 
     ponto.pont_cidade?.toLowerCase().includes(termoBusca.toLowerCase()))
  );
  

  const indexInicial = (paginaAtual - 1) * itensPorPagina;
  const indexFinal = indexInicial + itensPorPagina;
  const pontosPaginados = pontosFiltrados.slice(indexInicial, indexFinal);
  const totalPaginas = Math.ceil(pontosFiltrados.length / itensPorPagina);

  // Função para navegar para a página de detalhes
  const handleCardClick = (id) => {
    navigate(`/detalheturismo/${id}`); // Redireciona para a página de detalhes passando o ID
  };

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
            Adicionar Ponto Turístico
          </button>
        </div>
      </div>

      {/* Exibir carregamento ou erro */}
      {carregando && <p className={styles.mensagem}>Carregando...</p>}
      {erro && <p className={styles.mensagemErro}>{erro}</p>}

      {/* Exibir pontos turísticos */}
      {!carregando && !erro && (
        <div className={styles.gridContainer}>
         {pontosPaginados.length > 0 ? (
  pontosPaginados.map((ponto) => (
    <div key={ponto.pont_id} className={styles.card} onClick={() => handleCardClick(ponto.pont_id)}>
      <div className={styles.cardImage}></div> 
      <div className={styles.cardContent}>
        <h2>{ponto.pont_nome}</h2>
        <p>{ponto.pont_localizacao}</p>
      </div>
    </div>
  ))
) : (
  <p className={styles.mensagem}>Nenhum ponto encontrado.</p>
)}

        </div>
      )}

      {/* Paginação */}
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
