import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/localizacao/VisualizarEstado.css";

const VisualizarEstado = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estado, setEstado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchEstado = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/estados/${id}/`
        );
        setEstado(response.data);
      } catch (error) {
        setMensagem("Erro ao carregar os detalhes do estado.");
      } finally {
        setLoading(false);
      }
    };

    fetchEstado();
  }, [id]);

  if (loading) return <p className="loading">Carregando...</p>;

  if (!estado)
    return (
      <p className="error-message">{mensagem || "Estado não encontrado."}</p>
    );

  return (
    <div className="visualizar-container">
      <div className="estado-card">
        <h1>{estado.nome}</h1>
        <p className="estado-uf">UF: {estado.uf}</p>

        <div className="info-group">
          <p>
            <strong>ID:</strong> {estado.id}
          </p>
          <p>
            <strong>País:</strong> {estado.pais_nome}
          </p>
          <p>
            <strong>Nome do Estado:</strong> {estado.nome}
          </p>
          <p>
            <strong>UF:</strong> {estado.uf}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                estado.status_estado === "A"
                  ? "status-active"
                  : "status-inactive"
              }
            >
              {estado.status_estado === "A" ? "Ativo" : "Inativo"}
            </span>
          </p>
        </div>
      </div>

      <button
        className="btn-voltar"
        onClick={() => navigate("/listar-estados")}
      >
        Voltar para a Lista
      </button>
    </div>
  );
};

export default VisualizarEstado;
