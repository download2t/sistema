import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CadastroPaisEstadoCidade.css";




const CadastroEstado = () => {
  const [formData, setFormData] = useState({
    nome: "",
    uf: "",
    status_estado: "A",
    id_pais: "", // ID do país selecionado
  });

  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" }); // Estado para mensagem de sucesso/erro
  const [paises, setPaises] = useState([]); // Lista de países
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/pais/");
        setPaises(response.data); // Definir a lista de países recebida
      } catch (error) {
        console.error("Erro ao buscar países:", error);
        setMensagem({ texto: "Erro ao carregar países.", tipo: "erro" });
      }
    };
    fetchPaises();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { nome, uf, id_pais } = formData;

    if (!nome || !uf || !id_pais) {
      setMensagem({
        texto: "Preencha todos os campos obrigatórios.",
        tipo: "erro",
      });
      return;
    }

    if (uf.length !== 2) {
      setMensagem({ texto: "UF deve ter exatamente 2 letras.", tipo: "erro" });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/estados/", formData);
      setMensagem({ texto: "Estado cadastrado com sucesso!", tipo: "sucesso" });
      setFormData({ nome: "", uf: "", status_estado: "A", id_pais: "" });
    } catch (error) {
      console.error("Erro ao cadastrar estado:", error.response || error);
      setMensagem({
        texto: "Falha ao cadastrar o estado. Tente novamente.",
        tipo: "erro",
      });
    } finally {
      setLoading(false);

      // Limpar mensagem após 5 segundos
      setTimeout(() => setMensagem({ texto: "", tipo: "" }), 5000);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Estado</h2>

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
            placeholder="Digite o nome do estado"
            required
          />
        </div>
        <div className="form-group">
          <label>UF:</label>
          <input
            type="text"
            name="uf"
            value={formData.uf}
            onChange={handleChange}
            placeholder="Exemplo: SP"
            required
          />
        </div>
        <div className="form-group">
          <label>País:</label>
          <select
            name="id_pais"
            value={formData.id_pais}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecione um país
            </option>
            {paises.map((pais) => (
              <option key={pais.id} value={pais.id}>
                {pais.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            name="status_estado"
            value={formData.status_estado}
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

export default CadastroEstado;
