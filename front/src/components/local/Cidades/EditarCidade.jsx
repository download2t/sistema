import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Para acessar os parâmetros da rota e redirecionar
import axios from "axios";
import "../../../styles/localizacao/CadastroPaisEstadoCidade.css";

const EditarCidade = () => {
  const { id } = useParams(); // Obtém o ID da cidade a ser editada da URL
  const navigate = useNavigate(); // Para redirecionar após a edição

  const [formData, setFormData] = useState({
    nome: "",
    DDD: "",
    status_cidade: "A",
    id_estado: "", // ID do estado associado à cidade
  });

  const [estados, setEstados] = useState([]); // Lista de estados para o dropdown
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" }); // Mensagem de sucesso/erro
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carregar dados da cidade selecionada
    const fetchCidade = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/cidades/${id}/`
        );
        setFormData(response.data); // Preenche os dados do formulário com os dados da cidade
      } catch (error) {
        console.error("Erro ao carregar cidade:", error);
        setMensagem({
          texto: "Erro ao carregar os dados da cidade.",
          tipo: "erro",
        });
      } finally {
        setLoading(false);
      }
    };

    // Carregar lista de estados para o dropdown
    const fetchEstados = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/estados/");
        setEstados(response.data);
      } catch (error) {
        console.error("Erro ao carregar estados:", error);
        setMensagem({
          texto: "Erro ao carregar a lista de estados.",
          tipo: "erro",
        });
      }
    };

    fetchCidade();
    fetchEstados();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Converter para maiúsculas apenas para os campos relevantes
    const updatedValue =
      name === "nome" || name === "DDD" ? value.toUpperCase() : value;

    setFormData({ ...formData, [name]: updatedValue });
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
        texto: "DDD deve ter exatamente 3 números.",
        tipo: "erro",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/cidades/${id}/`, formData);
      setMensagem({ texto: "Cidade atualizada com sucesso!", tipo: "sucesso" });

      // Redirecionar para a página de listagem de cidades após a edição
      setTimeout(() => {
        navigate("/listar-cidades");
      }, 1000);
    } catch (error) {
      console.error("Erro ao atualizar cidade:", error.response || error);
      setMensagem({
        texto: "Falha ao atualizar a cidade. Tente novamente.",
        tipo: "erro",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Editar Cidade</h2>

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
          {loading ? "Enviando..." : "Salvar Alterações"}
        </button>
      </form>
      <a href="/listar-cidades" className="back-link">
        Voltar para a listagem de cidades
      </a>
    </div>
  );
};

export default EditarCidade;
