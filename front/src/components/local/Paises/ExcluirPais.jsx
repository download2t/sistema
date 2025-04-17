import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/localizacao/Excluir.css";

const ExcluirPais = () => {
  const { id } = useParams(); // Obtém o ID do país
  const navigate = useNavigate(); // Para redirecionamento
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const handleDelete = async () => {
    setLoading(true); // Desativa os botões durante o carregamento
    try {
      await axios.delete(`http://127.0.0.1:8000/pais/${id}/`);
      setMensagem({ texto: "País excluído com sucesso!", tipo: "sucesso" });

      // Aguarda curto tempo antes de redirecionar
      setTimeout(() => {
        navigate("/listar-paises");
      }, 2000); // Redireciona após 2 segundos
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "Erro ao excluir o país. Verifique se há estados associados.";
      setMensagem({ texto: errorMessage, tipo: "erro" });

      setTimeout(() => {
        setMensagem({ texto: "", tipo: "" });
      }, 5000); // Remove mensagem após 5 segundos
    } finally {
      setLoading(false); // Reativa os botões após a ação
    }
  };

  return (
    <div className="excluir-container">
      <h2>Excluir País</h2>

      {/* Exibição de Mensagem */}
      {mensagem.texto && (
        <div className={`alert ${mensagem.tipo}`}>{mensagem.texto}</div>
      )}

      <p>Tem certeza que deseja excluir este país?</p>
      <button
        onClick={handleDelete}
        className="btn btn-excluir"
        disabled={loading}
      >
        {loading ? "Excluindo..." : "Excluir"}
      </button>

      <button
        onClick={() => navigate("/listar-paises")}
        className="btn btn-cancelar"
        disabled={loading} // Impede que o usuário saia antes da conclusão
      >
        Cancelar
      </button>
    </div>
  );
};

export default ExcluirPais;
