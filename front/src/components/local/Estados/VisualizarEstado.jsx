import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/localizacao/VisualizarCidade.css";

const VisualizarEstado = () => {
  const { id } = useParams(); // Obtém o ID do estado da URL
  const navigate = useNavigate(); // Navegação programática
  const [estado, setEstado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchEstado = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/estados/${id}/`);
        setEstado(response.data);
      } catch (error) {
        setMensagem("Erro ao carregar os detalhes do estado.");
      } finally {
        setLoading(false);
      }
    };

    fetchEstado();
  }, [id]);

  if (loading) return <p>Carregando...</p>;

  if (!estado) return <p>{mensagem || "Estado não encontrado."}</p>;

  return (
    <div className="visualizar-container">
      <h1>{estado.nome}</h1>
      <div className="info-estado">
        <p>
          <strong>ID:</strong> {estado.id}
        </p>
        <p>
          <strong>País:</strong> {estado.pais_nome}
        </p>
        <p>
          <strong>Estado:</strong> {estado.nome}
        </p>
        <p>
          <strong>UF:</strong> {estado.uf}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {estado.status_estado === "A" ? "Ativo" : "Inativo"}
        </p>
      </div>
      <button
        className="btn-voltar"
        onClick={() => navigate("/listar-estados")}
      >
        Voltar
      </button>
    </div>
  );
};

export default VisualizarEstado;
