import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './detalhesT.module.css'; // Seus estilos
import Navbar from '../../../components/navegacao/navBar';

const DetalhesTurismo = () => {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();

  const [ponto, setPonto] = useState(null); // Estado para o ponto turístico
  const [pontoOriginal, setPontoOriginal] = useState(null); // Estado para armazenar o ponto original
  const [carregando, setCarregando] = useState(true); // Estado de carregamento
  const [erro, setErro] = useState(null); // Estado de erro
  const [modoEdicao, setModoEdicao] = useState(false); // Estado para controlar o modo de edição

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
          setPontoOriginal(dados.dados); // Armazena os dados originais
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

  // Função para deletar o ponto turístico
  const deletarPonto = async () => {
    if (window.confirm("Tem certeza que deseja deletar este ponto turístico?")) {
      try {
        const resposta = await fetch(`http://localhost:3333/pturistico/${id}`, {
          method: 'DELETE',
        });
        if (!resposta.ok) {
          throw new Error("Erro ao excluir o ponto turístico.");
        }
        alert("Ponto turístico deletado com sucesso.");
        navigate('/home'); // Redireciona após excluir
      } catch (erro) {
        alert("Erro ao deletar ponto turístico: " + erro.message);
      }
    }
  };

  // Função para salvar as edições
  const salvarEdicao = async () => {
    try {
      const resposta = await fetch(`http://localhost:3333/pturistico/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pont_nome: ponto.pont_nome,
          pont_descricao: ponto.pont_descricao,
          pont_localizacao: ponto.pont_localizacao,
          pont_cidade: ponto.pont_cidade,
          pont_estado: ponto.pont_estado,
        }),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao salvar as edições.");
      }

      alert("Ponto turístico editado com sucesso.");
      setModoEdicao(false); // Sai do modo de edição após salvar
    } catch (erro) {
      alert("Erro ao salvar as edições: " + erro.message);
    }
  };

  // Função para atualizar o estado de cada campo
  const atualizarCampo = (campo, valor) => {
    setPonto((prevPonto) => ({
      ...prevPonto,
      [campo]: valor,
    }));
  };

  const limiteDescricao = (descricao) => {
    return descricao.length > 100 ? descricao.substring(0, 100) + '...' : descricao;
  };

  const handleDescricaoChange = (e) => {
    // Garante que a descrição não ultrapasse 100 caracteres
    const novaDescricao = e.target.value;
    if (novaDescricao.length <= 100) {
      atualizarCampo('pont_descricao', novaDescricao);
    }
  };

  // Função para cancelar a edição e restaurar os valores originais
  const cancelarEdicao = () => {
    setPonto(pontoOriginal); // Restaura os dados originais
    setModoEdicao(false); // Sai do modo de edição
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.cardContainer}>
        <div className={styles.infoContainer}>
          <h2 className={styles.titulo}>
            {modoEdicao ? (
              <input
                type="text"
                value={ponto.pont_nome}
                onChange={(e) => atualizarCampo('pont_nome', e.target.value)}
                className={styles.inputEditavel}
              />
            ) : (
              ponto.pont_nome
            )}
          </h2>

          <div className={styles.card}>
            <img src="/imagens/cristoredentor.jpeg" alt="Imagem do ponto turístico" className={styles.cardImage} />

            <div className={styles.infoText}>
              <p>
                <strong>Estado:</strong>
                {modoEdicao ? (
                  <input
                    type="text"
                    value={ponto.pont_estado}
                    onChange={(e) => atualizarCampo('pont_estado', e.target.value)}
                    className={styles.inputEditavel}
                  />
                ) : (
                  ponto.pont_estado
                )}
              </p>
              <p>
                <strong>Cidade:</strong>
                {modoEdicao ? (
                  <input
                    type="text"
                    value={ponto.pont_cidade}
                    onChange={(e) => atualizarCampo('pont_cidade', e.target.value)}
                    className={styles.inputEditavel}
                  />
                ) : (
                  ponto.pont_cidade
                )}
              </p>
              <p>
                <strong>Localização:</strong>
                {modoEdicao ? (
                  <input
                    type="text"
                    value={ponto.pont_localizacao}
                    onChange={(e) => atualizarCampo('pont_localizacao', e.target.value)}
                    className={styles.inputEditavel}
                  />
                ) : (
                  ponto.pont_localizacao
                )}
              </p>
              <p>
                <strong>Descrição:</strong>
                {modoEdicao ? (
                  <textarea
                    value={ponto.pont_descricao}
                    onChange={handleDescricaoChange} // Limita a descrição enquanto edita
                    className={styles.textareaEditavel}
                  />
                ) : (
                  limiteDescricao(ponto.pont_descricao) // Exibe a descrição limitada
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <button onClick={() => navigate('/home')} className={styles.botaoVoltar}>
        Voltar
      </button>

      <div className={styles.botoesAcoes}>
        {modoEdicao ? (
          <>
            <button onClick={salvarEdicao} className={styles.botaoSalvar}>
              Salvar
            </button>
            <button onClick={cancelarEdicao} className={styles.botaoCancelar}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setModoEdicao(true)} className={styles.botaoEditar}>
              Editar
            </button>
            <button onClick={deletarPonto} className={styles.botaoDeletar}>
              Apagar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DetalhesTurismo;
