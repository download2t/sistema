import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/localizacao/VisualizarCidade.css";

const VisualizarCidade = () => {
  const { id } = useParams(); // Obtém o ID da cidade da URL
  const navigate = useNavigate(); // Navegação programática
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

  if (loading) return <p>Carregando...</p>;

  if (!cidade) return <p>{mensagem || "Cidade não encontrada."}</p>;

  return (
    <div className="visualizar-container">
      <h1>{cidade.nome}</h1>
      <div className="info-cidade">
        <p>
          <strong>ID:</strong> {cidade.id}
        </p>
        <p>
          <strong>Estado:</strong> {cidade.estado_nome}
        </p>
        <p>
          <strong>Cidade:</strong> {cidade.nome}
        </p>
        <p>
          <strong>DDD:</strong> {cidade.DDD}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {cidade.status_cidade === "A" ? "Ativo" : "Inativo"}
        </p>
      </div>
      <button
        className="btn-voltar"
        onClick={() => navigate("/listar-cidades")}
      >
        Voltar
      </button>
    </div>
  );
};

export default VisualizarCidade;
