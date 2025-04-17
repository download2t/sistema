import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/usuarios/ListarUsuarios.css";

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/usuarios/");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setMensagem({ texto: "Erro ao carregar usuários.", tipo: "erro" });
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  // Função para alternar entre ativo/inativo
  const toggleStatus = async (id, isActive) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/usuarios/${id}/`, {
        is_active: !isActive,
      });

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === id ? { ...usuario, is_active: !isActive } : usuario
        )
      );
    } catch (error) {
      console.error("Erro ao alterar status:", error);
      setMensagem({
        texto: "Erro ao alterar status do usuário.",
        tipo: "erro",
      });
    }
  };

  return (
    <div className="listagem-container">
      <h1 className="listagem-titulo">Gerenciamento de Usuários</h1>
      <button
        className="btn btn-cadastrar"
        onClick={() => navigate("/cadastro-usuario")}
      >
        + Cadastrar Usuário
      </button>

      {mensagem.texto && (
        <div className={`alert ${mensagem.tipo}`}>{mensagem.texto}</div>
      )}
      {loading && <p className="loading">Carregando...</p>}

      {!loading && usuarios.length > 0 ? (
        <table className="tabela-usuarios">
          <thead>
            <tr>
              <th>Status</th>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Email</th>
              <th className="acoes"></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>
                  <button
                    className={`btn-toggle ${
                      usuario.is_active ? "ativo" : "inativo"
                    }`}
                    onClick={() => toggleStatus(usuario.id, usuario.is_active)}
                  >
                    {usuario.is_active ? "✅ Ativo" : "❌ Inativo"}
                  </button>
                </td>
                <td>
                  {usuario.first_name} {usuario.last_name}
                </td>
                <td>{usuario.username}</td>
                <td>{usuario.email}</td>
                <td className="acoes">
                  <button
                    className="btn btn-visualizar"
                    onClick={() =>
                      navigate(`/visualizar-usuario/${usuario.id}`)
                    }
                  >
                    Visualizar
                  </button>
                  <button
                    className="btn btn-editar"
                    onClick={() => navigate(`/editar-usuario/${usuario.id}`)}
                  >
                    Editar
                  </button>
                  <button className="btn btn-excluir" disabled>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="nenhum-dado">Nenhum usuário cadastrado.</p>
      )}
    </div>
  );
};

export default ListarUsuarios;
