import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Navegação
import axios from "axios";
import "../../../styles/localizacao/CadastroPaisEstadoCidade.css";

const CadastroCidade = () => {
  const [formData, setFormData] = useState({
    nome: "",
    DDD: "",
    status_cidade: "A",
    id_estado: "", // ID do estado selecionado
  });

  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" }); // Estado para mensagem de sucesso/erro
  const [estados, setEstados] = useState([]); // Lista de estados
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Inicializando o hook de navegação

  // Buscar lista de estados ao carregar o componente
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/estados/");
        setEstados(response.data); // Definir a lista de estados recebida
      } catch (error) {
        console.error("Erro ao buscar estados:", error);
        setMensagem({ texto: "Erro ao carregar estados.", tipo: "erro" });
      }
    };

    fetchEstados();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Converter o valor digitado para maiúsculas
    setFormData({ ...formData, [name]: value.toUpperCase() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { nome, DDD, id_estado } = formData;

    if (!nome || !DDD || !id_estado) {
      setMensagem({
        texto: "Por favor, preencha todos os campos obrigatórios.",
        tipo: "erro",
      });
      return;
    }

    if (DDD.length !== 3) {
      setMensagem({
        texto: "O DDD deve ter exatamente 3 números.",
        tipo: "erro",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/cidades/", formData);
      setMensagem({ texto: "Cidade cadastrada com sucesso!", tipo: "sucesso" });
      setFormData({ nome: "", DDD: "", status_cidade: "A", id_estado: "" });

      // Redirecionar para a página de listagem de cidades após o cadastro
      setTimeout(() => {
        navigate("/listar-cidades"); // Redireciona após um pequeno delay
      }, 1000);
    } catch (error) {
      console.error("Erro ao cadastrar cidade:", error.response || error);
      setMensagem({
        texto: "Falha ao cadastrar a cidade. Tente novamente.",
        tipo: "erro",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Cidade</h2>

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
            placeholder="Digite o nome da cidade"
            required
          />
        </div>
        <div className="form-group">
          <label>DDD:</label>
          <input
            type="text"
            name="DDD"
            value={formData.DDD}
            onChange={handleChange}
            placeholder="Exemplo: 011"
            required
          />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <select
            name="id_estado"
            value={formData.id_estado}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecione um estado
            </option>
            {estados.map((estado) => (
              <option key={estado.id} value={estado.id}>
                {estado.nome.toUpperCase()} ({estado.uf.toUpperCase()})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            name="status_cidade"
            value={formData.status_cidade}
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
      <a href="/listar-cidades" className="back-link">
        Voltar para a listagem de cidades
      </a>
    </div>
  );
};

export default CadastroCidade;
