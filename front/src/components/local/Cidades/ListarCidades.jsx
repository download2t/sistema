import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/localizacao/ListarCidades.css";

const ListarCidades = () => {
  const [cidades, setCidades] = useState([]);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" }); // Mensagem de sucesso/erro
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCidades = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/cidades/");
        setCidades(response.data); // Define a lista de cidades
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
        setMensagem({ texto: "Erro ao carregar cidades.", tipo: "erro" });
      } finally {
        setLoading(false);
        setTimeout(() => setMensagem({ texto: "", tipo: "" }), 5000);
      }
    };

    fetchCidades();
  }, []);

  return (
    <div className="listagem-container">
      <h1 className="listagem-titulo">Gerenciamento de Cidades</h1>
      <button
        className="btn btn-cadastrar"
        onClick={() => navigate("/cadastro-cidades")}
      >
        + Cadastrar Cidade
      </button>

      {/* Exibição de Mensagem */}
      {mensagem.texto && (
        <div className={`alert ${mensagem.tipo}`}>{mensagem.texto}</div>
      )}
      {loading && <p className="loading">Carregando...</p>}

      {!loading && cidades.length > 0 ? (
        <table className="tabela-cidades">
          <thead>
            <tr>
              <th>ID</th>
              <th>Estado</th>
              <th>Cidade</th>
              <th>DDD</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cidades.map((cidade) => (
              <tr key={cidade.id}>
                <td>{cidade.id}</td>
                <td>{cidade.estado_nome}</td>
                <td>{cidade.nome}</td>
                <td>{cidade.DDD}</td>
                <td>{cidade.status_cidade === "A" ? "Ativo" : "Inativo"}</td>
                <td>
                  <button
                    className="btn btn-visualizar"
                    onClick={() => navigate(`/visualizar-cidade/${cidade.id}`)}
                  >
                    Visualizar
                  </button>
                  <button
                    className="btn btn-editar"
                    onClick={() => navigate(`/editar-cidade/${cidade.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-excluir"
                    onClick={() => navigate(`/excluir-cidade/${cidade.id}`)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="nenhum-dado">Nenhuma cidade cadastrada.</p>
      )}
    </div>
  );
};

export default ListarCidades;
