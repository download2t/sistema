import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/localizacao/VisualizarCidade.css";

const VisualizarCidade = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cidade, setCidade] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchCidade = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/cidades/${id}/`
        );
        setCidade(response.data);
      } catch (error) {
        setMensagem("Erro ao carregar os detalhes da cidade.");
      } finally {
        setLoading(false);
      }
    };

    fetchCidade();
  }, [id]);

  if (loading) return <p className="loading">Carregando...</p>;

  if (!cidade)
    return (
      <p className="error-message">{mensagem || "Cidade não encontrada."}</p>
    );

  return (
    <div className="visualizar-container">
      <div className="cidade-card">
        <h1>{cidade.nome}</h1>
        <p className="cidade-ddd">DDD: +{cidade.DDD}</p>

        <div className="info-group">
          <p>
            <strong>ID:</strong> {cidade.id}
          </p>
          <p>
            <strong>Estado:</strong> {cidade.estado_nome}
          </p>
          <p>
            <strong>Nome da Cidade:</strong> {cidade.nome}
          </p>
          <p>
            <strong>DDD:</strong> +{cidade.DDD}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                cidade.status_cidade === "A"
                  ? "status-active"
                  : "status-inactive"
              }
            >
              {cidade.status_cidade === "A" ? "Ativo" : "Inativo"}
            </span>
          </p>
        </div>
      </div>

      <button
        className="btn-voltar"
        onClick={() => navigate("/listar-cidades")}
      >
        Voltar para a Lista
      </button>
    </div>
  );
};

export default VisualizarCidade;
