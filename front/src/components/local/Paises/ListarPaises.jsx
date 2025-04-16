import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/localizacao/ListarPaises.css";

const ListarPaises = () => {
  const [paises, setPaises] = useState([]);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaises = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/pais/");
        setPaises(response.data);
      } catch (error) {
        setMensagem({ texto: "Erro ao carregar países.", tipo: "erro" });
      } finally {
        setLoading(false);
        setTimeout(() => setMensagem({ texto: "", tipo: "" }), 5000);
      }
    };
    fetchPaises();
  }, []);

  return (
    <div className="listagem-container">
      <h1 className="listagem-titulo">Gerenciamento de Países</h1>
      <button
        className="btn btn-cadastrar"
        onClick={() => navigate("/cadastro-pais")}
      >
        + Cadastrar País
      </button>
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
              <th></th>
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
                    className="btn btn-visualizar"
                    onClick={() => navigate(`/visualizar-pais/${pais.id}`)}
                  >
                    Visualizar
                  </button>
                  <button
                    className="btn btn-editar"
                    onClick={() => navigate(`/editar-pais/${pais.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-excluir"
                    onClick={() => navigate(`/excluir-pais/${pais.id}`)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="nenhum-dado">Nenhum país cadastrado.</p>
      )}
    </div>
  );
};

export default ListarPaises;
