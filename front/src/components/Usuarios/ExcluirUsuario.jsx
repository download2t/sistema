import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/usuarios/ExcluirUsuario.css";

const ExcluirUsuario = () => {
  const { id } = useParams(); // Obtém o ID do usuário
  const navigate = useNavigate(); // Para redirecionamento
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const handleDelete = async () => {
    setLoading(true); // Desativa os botões durante o carregamento
    try {
      await axios.delete(`http://127.0.0.1:8000/usuarios/${id}/`);
      setMensagem({ texto: "Usuário excluído com sucesso!", tipo: "sucesso" });

      // Aguarda um curto tempo antes de redirecionar para evitar interações adicionais
      setTimeout(() => {
        navigate("/listar-usuarios");
      }, 2000); // Redireciona após 2 segundos
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Erro ao excluir o usuário.";
      setMensagem({ texto: errorMessage, tipo: "erro" });

      setTimeout(() => {
        setMensagem({ texto: "", tipo: "" });
      }, 5000); // Remove a mensagem após 5 segundos
    }
  };

  return (
    <div className="excluir-container">
      <h2>Excluir Usuário</h2>

      {/* Exibição de Mensagem */}
      {mensagem.texto && (
        <div className={`alert ${mensagem.tipo}`}>{mensagem.texto}</div>
      )}

      <p>Tem certeza que deseja excluir este usuário?</p>
      <button
        onClick={handleDelete}
        className="btn btn-excluir"
        disabled={loading}
      >
        {loading ? "Excluindo..." : "Excluir"}
      </button>
      <button
        onClick={() => navigate("/listar-usuarios")}
        className="btn btn-cancelar"
        disabled={loading}
      >
        Cancelar
      </button>
    </div>
  );
};

export default ExcluirUsuario;
