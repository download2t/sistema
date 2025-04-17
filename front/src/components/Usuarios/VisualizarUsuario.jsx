import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/usuarios/VisualizarUsuario.css";

const VisualizarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchUsuario = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/usuarios/${id}/`
        );
        setUsuario(response.data);
      } catch (error) {
        setMensagem("Erro ao carregar os detalhes do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  if (loading) return <p className="loading">Carregando...</p>;

  if (!usuario)
    return (
      <p className="error-message">{mensagem || "Usuário não encontrado."}</p>
    );

  return (
    <div className="visualizar-container">
      <div className="user-card">
        <h1>{usuario.username}</h1>

        <div className="info-group">
          <p>
            <strong>ID:</strong> {usuario.id}
          </p>
          <p>
            <strong>Nome:</strong> {usuario.first_name} {usuario.last_name}
          </p>
          <p>
            <strong>Email:</strong> {usuario.email}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                usuario.is_active ? "status-active" : "status-inactive"
              }
            >
              {usuario.is_active ? "Ativo" : "Inativo"}
            </span>
          </p>
          <p>
            <strong>Admin:</strong> {usuario.is_staff ? "Sim" : "Não"}
          </p>
          <p>
            <strong>Superusuário:</strong>{" "}
            {usuario.is_superuser ? "Sim" : "Não"}
          </p>
        </div>
      </div>

      <button
        className="btn-voltar"
        onClick={() => navigate("/listar-usuarios")}
      >
        Voltar para a Lista
      </button>
    </div>
  );
};

export default VisualizarUsuario;
