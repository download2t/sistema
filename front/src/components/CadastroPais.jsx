import React, { useState } from "react";
import axios from "axios";
import "../styles/CadastroPais.css"; // Importando estilos

const CadastroPais = () => {
  const [formData, setFormData] = useState({
    nome: "",
    sigla: "",
    DDI: "",
    status_pais: "A",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { nome, sigla, DDI } = formData;

    if (!nome || !sigla || !DDI) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (sigla.length !== 3 || DDI.length !== 2) {
      alert("Sigla deve ter 3 letras e DDI deve ter 2 números.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/pais/",
        formData
      );
      alert("País cadastrado com sucesso!");
      setFormData({ nome: "", sigla: "", DDI: "", status_pais: "A" });
    } catch (error) {
      console.error("Erro ao cadastrar país:", error.response || error);
      alert("Falha ao cadastrar o país. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de País</h2>
      {loading && <p className="loading">Enviando dados...</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite o nome do país"
            required
          />
        </div>
        <div className="form-group">
          <label>Sigla:</label>
          <input
            type="text"
            name="sigla"
            value={formData.sigla}
            onChange={handleChange}
            placeholder="Exemplo: BRA"
            required
          />
        </div>
        <div className="form-group">
          <label>DDI:</label>
          <input
            type="text"
            name="DDI"
            value={formData.DDI}
            onChange={handleChange}
            placeholder="Exemplo: 55"
            required
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            name="status_pais"
            value={formData.status_pais}
            onChange={handleChange}
          >
            <option value="A">Ativo</option>
            <option value="I">Inativo</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">
          {loading ? "Enviando..." : "Cadastrar"}
        </button>
      </form>
      <a href="/" className="back-link">
        Voltar para a página inicial
      </a>
    </div>
  );
};

export default CadastroPais;
