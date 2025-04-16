import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/localizacao/ListarEstados.css";

const ListarEstados = () => {
  const [estados, setEstados] = useState([]);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEstados = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/estados/");
        setEstados(response.data);
      } catch (error) {
        setMensagem({ texto: "Erro ao carregar estados.", tipo: "erro" });
      } finally {
        setLoading(false);
        setTimeout(() => setMensagem({ texto: "", tipo: "" }), 5000);
      }
    };
    fetchEstados();
  }, []);

  return (
    <div className="listagem-container">
      <h1 className="listagem-titulo">Gerenciamento de Estados</h1>
      <button
        className="btn btn-cadastrar"
        onClick={() => navigate("/cadastro-estados")}
      >
        + Cadastrar Estado
      </button>
      {mensagem.texto && (
        <div className={`alert ${mensagem.tipo}`}>{mensagem.texto}</div>
      )}
      {loading && <p className="loading">Carregando...</p>}
      {!loading && estados.length > 0 ? (
        <table className="tabela-estados">
          <thead>
            <tr>
              <th>ID</th>
              <th>País</th>
              <th>Estado</th>
              <th>UF</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {estados.map((estado) => (
              <tr key={estado.id}>
                <td>{estado.id}</td>
                <td>{estado.pais_nome}</td>
                <td>{estado.nome}</td>
                <td>{estado.uf}</td>
                <td>{estado.status_estado === "A" ? "Ativo" : "Inativo"}</td>
                <td>
                  <button
                    className="btn btn-visualizar"
                    onClick={() => navigate(`/visualizar-estado/${estado.id}`)}
                  >
                    Visualizar
                  </button>
                  <button
                    className="btn btn-editar"
                    onClick={() => navigate(`/editar-estado/${estado.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-excluir"
                    onClick={() => navigate(`/excluir-estado/${estado.id}`)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="nenhum-dado">Nenhum estado cadastrado.</p>
      )}
    </div>
  );
};

export default ListarEstados;
