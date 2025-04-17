import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando o hook useNavigate
import axios from "axios";
import "../../../styles/localizacao/CadastroPaisEstadoCidade.css";

const CadastroPais = () => {
  const [formData, setFormData] = useState({
    nome: "",
    sigla: "",
    DDI: "",
    status_pais: "A",
  });

  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" }); // Mensagem de sucesso/erro
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Inicializando o hook para redirecionamento

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Conversão para maiúsculas nos campos de texto
    const updatedValue =
      name === "nome" || name === "sigla" || name === "DDI"
        ? value.toUpperCase()
        : value;

    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { nome, sigla, DDI } = formData;

    if (!nome || !sigla || !DDI) {
      setMensagem({
        texto: "Por favor, preencha todos os campos obrigatórios.",
        tipo: "erro",
      });
      return;
    }

    if (sigla.length !== 3 || DDI.length !== 2) {
      setMensagem({
        texto: "Sigla deve ter 3 letras e DDI deve ter 2 números.",
        tipo: "erro",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/pais/", formData);
      setMensagem({ texto: "País cadastrado com sucesso!", tipo: "sucesso" });

      // Redirecionar para a página de listagem de países após o cadastro
      setTimeout(() => {
        navigate("/listar-paises"); // Redireciona após um pequeno delay para exibir a mensagem
      }, 1000);
    } catch (error) {
      console.error("Erro ao cadastrar país:", error.response || error);
      setMensagem({
        texto: "Falha ao cadastrar o país. Tente novamente.",
        tipo: "erro",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de País</h2>

      {/* Exibição de Mensagem */}
      {mensagem.texto && (
        <div className={`alert ${mensagem.tipo}`}>{mensagem.texto}</div>
      )}

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
            disabled={loading} // Desativa enquanto carrega
          >
            <option value="A">Ativo</option>
            <option value="I">Inativo</option>
          </select>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Enviando..." : "Cadastrar"}
        </button>
        
        <button
          onClick={() => navigate("/listar-paises")}
          className="btn btn-cancelar"
          disabled={loading}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default CadastroPais;
