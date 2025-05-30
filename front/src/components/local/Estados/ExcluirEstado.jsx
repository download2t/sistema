import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/localizacao/Excluir.css";

const ExcluirEstado = () => {
  const { id } = useParams(); // Obtém o ID do estado
  const navigate = useNavigate(); // Para redirecionamento
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const handleDelete = async () => {
    setLoading(true); // Desativa os botões durante o carregamento
    try {
      await axios.delete(`http://127.0.0.1:8000/estados/${id}/`);
      setMensagem({ texto: "Estado excluído com sucesso!", tipo: "sucesso" });

      // Aguarda curto tempo antes de redirecionar
      setTimeout(() => {
        navigate("/listar-estados");
      }, 2000); // Redireciona após 2 segundos
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "Erro ao excluir o estado. Verifique se há cidades associadas.";
      setMensagem({ texto: errorMessage, tipo: "erro" });

      setTimeout(() => {
        setMensagem({ texto: "", tipo: "" });
      }, 5000); // Remove mensagem após 5 segundos
    }
  };

  return (
    <div className="excluir-container">
      <h2>Excluir Estado</h2>

      {/* Exibição de Mensagem */}
      {mensagem.texto && (
        <div className={`alert ${mensagem.tipo}`}>{mensagem.texto}</div>
      )}

      <p>Tem certeza que deseja excluir este estado?</p>
      <button
        onClick={handleDelete}
        className="btn btn-excluir"
        disabled={loading}
      >
        {loading ? "Excluindo..." : "Excluir"}
      </button>
      <button
        onClick={() => navigate("/listar-estados")}
        className="btn btn-cancelar"
        disabled={loading} // Bloqueia interação até a ação ser concluída
      >
        Cancelar
      </button>
    </div>
  );
};

export default ExcluirEstado;
