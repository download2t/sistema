import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/usuarios/CadastroUsuario.css";

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    is_staff: false,
    is_superuser: false,
    is_active: true,
    password: "",
    confirmPassword: "",
  });

  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/usuarios/${id}/`
        );
        setFormData({
          username: response.data.username,
          email: response.data.email,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          is_staff: response.data.is_staff,
          is_superuser: response.data.is_superuser,
          is_active: response.data.is_active,
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        setMensagem({ texto: "Erro ao carregar usuário.", tipo: "erro" });
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.first_name ||
      !formData.last_name
    ) {
      setMensagem({
        texto: "Preencha todos os campos obrigatórios.",
        tipo: "erro",
      });
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMensagem({ texto: "As senhas não coincidem.", tipo: "erro" });
      return;
    }

    const dataToSend = { ...formData };
    if (!formData.password.trim()) {
      delete dataToSend.password;
    }

    setLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/usuarios/${id}/`, dataToSend);
      setMensagem({
        texto: "Usuário atualizado com sucesso!",
        tipo: "sucesso",
      });

      setTimeout(() => navigate("/listar-usuarios"), 1000);
    } catch (error) {
      setMensagem({ texto: "Falha ao atualizar usuário.", tipo: "erro" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Editar Usuário</h2>

      {mensagem.texto && (
        <div className={`alert ${mensagem.tipo}`}>{mensagem.texto}</div>
      )}
      {loading && <p className="loading">Salvando...</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Usuário:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Primeiro Nome:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Sobrenome:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Senha (opcional):</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            <button
              type="button"
              className="btn-toggle-password"
              onClick={toggleShowPassword}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <div className="form-group">
            <label>Confirmar Senha:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Status do Usuário:</label>
            <select
              name="is_active"
              value={formData.is_active}
              onChange={handleChange}
              disabled={loading}
            >
              <option value={true}>Ativo</option>
              <option value={false}>Inativo</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Usuário Admin?</label>
            <select
              name="is_staff"
              value={formData.is_staff}
              onChange={handleChange}
              disabled={loading}
            >
              <option value={true}>Sim</option>
              <option value={false}>Não</option>
            </select>
          </div>
          <div className="form-group">
            <label>Superusuário?</label>
            <select
              name="is_superuser"
              value={formData.is_superuser}
              onChange={handleChange}
              disabled={loading}
            >
              <option value={true}>Sim</option>
              <option value={false}>Não</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>

      <button
        className="btn-voltar"
        onClick={() => navigate("/listar-usuarios")}
        disabled={loading}
      >
        Voltar
      </button>
    </div>
  );
};

export default EditarUsuario;
