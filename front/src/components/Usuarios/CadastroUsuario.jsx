import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/usuarios/CadastroUsuario.css";

const CadastroUsuario = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "", // Primeiro nome
    last_name: "", // Sobrenome
    is_staff: false, // Indica se o usuário tem permissões administrativas
    is_superuser: false, // Indica se o usuário tem superpoderes no sistema
    is_active: true, // Status do usuário compatível com Django
    password: "",
    confirmPassword: "",
  });

  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMensagem({
        texto: "Preencha todos os campos obrigatórios.",
        tipo: "erro",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMensagem({ texto: "As senhas não coincidem.", tipo: "erro" });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/usuarios/", formData);

      setMensagem({
        texto: "Usuário cadastrado com sucesso!",
        tipo: "sucesso",
      });

      setTimeout(() => navigate("/listar-usuarios"), 1000);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.response?.data);

      const errorMessage = error.response?.data
        ? Object.values(error.response.data).join(" | ")
        : "Falha ao cadastrar usuário. Tente novamente.";

      setMensagem({ texto: `Erro: ${errorMessage}`, tipo: "erro" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Usuário</h2>

      {mensagem.texto && (
        <div className={`alert ${mensagem.tipo}`}>{mensagem.texto}</div>
      )}
      {loading && <p className="loading">Enviando dados...</p>}

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
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Senha:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
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
              required
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
          {loading ? "Enviando..." : "Cadastrar"}
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

export default CadastroUsuario;
