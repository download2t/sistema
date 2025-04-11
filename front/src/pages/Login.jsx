import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Enviar login para a API Django
      const response = await axios.post(
        "http://127.0.0.1:8000/login/",
        formData
      );
      const token = response.data.token;

      // Salvar o token no localStorage
      localStorage.setItem("token", token);

      alert("Login realizado com sucesso!");
      navigate("/"); // Redirecionar para a página inicial
    } catch (error) {
      console.error("Erro ao autenticar:", error.response || error);
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Usuário:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Digite seu usuário"
            required
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
