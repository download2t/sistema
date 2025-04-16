import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Para acessar os parâmetros da rota e redirecionar
import axios from "axios";
import "../../../styles/localizacao/CadastroPaisEstadoCidade.css";

const EditarPais = () => {
  const { id } = useParams(); // Obtém o ID do país a ser editado da URL
  const navigate = useNavigate(); // Para redirecionar após a edição

  const [formData, setFormData] = useState({
    nome: "",
    sigla: "",
    DDI: "",
    status_pais: "A",
  });

  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" }); // Mensagem de sucesso/erro
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPais = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/pais/${id}/`);
        setFormData(response.data); // Preenche os dados do formulário com os dados do país
      } catch (error) {
        console.error("Erro ao carregar país:", error);
        setMensagem({
          texto: "Erro ao carregar os dados do país.",
          tipo: "erro",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPais();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Converter os valores digitados para maiúsculas nos campos relevantes
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
      await axios.put(`http://127.0.0.1:8000/pais/${id}/`, formData);
      setMensagem({ texto: "País atualizado com sucesso!", tipo: "sucesso" });

      // Redirecionar para a página de listagem de países após a edição
      setTimeout(() => {
        navigate("/listar-paises");
      }, 1000);
    } catch (error) {
      console.error("Erro ao atualizar país:", error.response || error);
      setMensagem({
        texto: "Falha ao atualizar o país. Tente novamente.",
        tipo: "erro",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Editar País</h2>

      {/* Exibição de Mensagem */}
      {mensagem.texto && (
        <div className={`alert ${mensagem.tipo}`}>{mensagem.texto}</div>
      )}

      {loading && <p className="loading">Carregando...</p>}
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
          {loading ? "Enviando..." : "Salvar Alterações"}
        </button>
      </form>
      <a href="/listar-paises" className="back-link">
        Voltar para a listagem de países
      </a>
    </div>
  );
};

export default EditarPais;
