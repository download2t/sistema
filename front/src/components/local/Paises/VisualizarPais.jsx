import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/localizacao/VisualizarPais.css";

const VisualizarPais = () => {
  const { id } = useParams(); // Obtém o ID do país da URL
  const navigate = useNavigate(); // Navegação programática
  const [pais, setPais] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchPais = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/pais/${id}/`);
        setPais(response.data);
      } catch (error) {
        setMensagem("Erro ao carregar os detalhes do país.");
      } finally {
        setLoading(false);
      }
    };

    fetchPais();
  }, [id]);

  if (loading) return <p>Carregando...</p>;

  if (!pais) return <p>{mensagem || "País não encontrado."}</p>;

  return (
    <div className="visualizar-container">
      <h1>{pais.nome}</h1>
      <div className="info-pais">
        <p>
          <strong>ID:</strong> {pais.id}
        </p>
        <p>
          <strong>Nome:</strong> {pais.nome}
        </p>
        <p>
          <strong>Sigla:</strong> {pais.sigla}
        </p>
        <p>
          <strong>DDI:</strong> {pais.DDI}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {pais.status_pais === "A" ? "Ativo" : "Inativo"}
        </p>
      </div>
      <button className="btn-voltar" onClick={() => navigate("/listar-paises")}>
        Voltar
      </button>
    </div>
  );
};

export default VisualizarPais;
