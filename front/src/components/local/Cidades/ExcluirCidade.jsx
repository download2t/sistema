import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/localizacao/Excluir.css";

const ExcluirCidade = () => {
  const { id } = useParams(); // Obtém o ID da cidade
  const navigate = useNavigate(); // Para redirecionamento
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/cidades/${id}/`);
      setMensagem({ texto: "Cidade excluída com sucesso!", tipo: "sucesso" });

      setTimeout(() => {
        navigate("/listar-cidades");
      }, 3000); // Redireciona após 3 segundos
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Erro ao excluir a cidade.";
      setMensagem({ texto: errorMessage, tipo: "erro" });

      setTimeout(() => {
        setMensagem({ texto: "", tipo: "" });
      }, 5000); // Remove a mensagem após 5 segundos
    }
  };

  return (
    <div className="excluir-container">
      <h2>Excluir Cidade</h2>

      {/* Exibição de Mensagem */}
      {mensagem.texto && (
        <div className={`alert ${mensagem.tipo}`}>{mensagem.texto}</div>
      )}

      <p>Tem certeza que deseja excluir esta cidade?</p>
      <button onClick={handleDelete} className="btn btn-excluir">
        Excluir
      </button>
      <button
        onClick={() => navigate("/listar-cidades")}
        className="btn btn-cancelar"
      >
        Cancelar
      </button>
    </div>
  );
};

export default ExcluirCidade;
