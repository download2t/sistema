import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importação do hook useNavigate
import axios from "axios";
import "../styles/ListarPaises.css";


const ListarPaises = () => {
  const [paises, setPaises] = useState([]); // Lista de países
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" }); // Mensagem de sucesso/erro
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Inicialização do hook dentro do componente

  // Buscar lista de países ao carregar o componente
  useEffect(() => {
    const fetchPaises = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/pais/");
        setPaises(response.data);
        setMensagem({
          texto: "Países carregados com sucesso.",
          tipo: "sucesso",
        });
      } catch (error) {
        console.error("Erro ao buscar países:", error);
        setMensagem({ texto: "Falha ao carregar países.", tipo: "erro" });
      } finally {
        setLoading(false);

        // Limpar mensagem após 5 segundos
        setTimeout(() => setMensagem({ texto: "", tipo: "" }), 5000);
      }
    };

    fetchPaises();
  }, []);

  const excluirPais = async (id) => {
    const confirmed = window.confirm(
      "Você tem certeza que deseja excluir este país?"
    );
    if (confirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8000/pais/${id}/`);
        setMensagem({ texto: "País excluído com sucesso.", tipo: "sucesso" });
        // Atualizar a lista de países
        setPaises(paises.filter((pais) => pais.id !== id));
      } catch (error) {
        console.error("Erro ao excluir país:", error);
        setMensagem({
          texto: "Falha ao excluir país. Tente novamente.",
          tipo: "erro",
        });
      } finally {
        setTimeout(() => setMensagem({ texto: "", tipo: "" }), 5000);
      }
    }
  };

  return (
    <div className="listagem-container">
      <h2>Listagem de Países</h2>

      {/* Exibição de Mensagem */}
      {mensagem.texto && (
        <div className={`alert ${mensagem.tipo}`}>{mensagem.texto}</div>
      )}

      {loading && <p className="loading">Carregando...</p>}

      {!loading && paises.length > 0 ? (
        <table className="tabela-paises">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Sigla</th>
              <th>DDI</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paises.map((pais) => (
              <tr key={pais.id}>
                <td>{pais.id}</td>
                <td>{pais.nome}</td>
                <td>{pais.sigla}</td>
                <td>{pais.DDI}</td>
                <td>{pais.status_pais === "A" ? "Ativo" : "Inativo"}</td>
                <td>
                  <button
                    className="btn-editar"
                    onClick={() => navigate(`/editar-pais/${pais.id}`)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-excluir"
                    onClick={() => excluirPais(pais.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>Nenhum país cadastrado.</p>
      )}

      <a href="/cadastro-pais" className="btn-cadastrar">
        Cadastrar País
      </a>
    </div>
  );
};

export default ListarPaises;
