import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Para acessar os parâmetros da rota e redirecionar
import axios from "axios";
import "../../../styles/localizacao/CadastroPaisEstadoCidade.css";

const EditarEstado = () => {
  const { id } = useParams(); // Obtém o ID do estado a ser editado da URL
  const navigate = useNavigate(); // Para redirecionar após a edição

  const [formData, setFormData] = useState({
    nome: "",
    uf: "",
    status_estado: "A",
    id_pais: "", // ID do país associado ao estado
  });

  const [paises, setPaises] = useState([]); // Lista de países para o dropdown
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" }); // Mensagem de sucesso/erro
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carregar dados do estado selecionado
    const fetchEstado = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/estados/${id}/`
        );
        setFormData(response.data); // Preenche os dados do formulário com os dados do estado
      } catch (error) {
        console.error("Erro ao carregar estado:", error);
        setMensagem({
          texto: "Erro ao carregar os dados do estado.",
          tipo: "erro",
        });
      } finally {
        setLoading(false);
      }
    };

    // Carregar lista de países para o dropdown
    const fetchPaises = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/pais/");
        setPaises(response.data);
      } catch (error) {
        console.error("Erro ao carregar países:", error);
        setMensagem({
          texto: "Erro ao carregar a lista de países.",
          tipo: "erro",
        });
      }
    };

    fetchEstado();
    fetchPaises();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Converter o valor digitado para maiúsculas nos campos relevantes
    const updatedValue =
      name === "nome" || name === "uf" ? value.toUpperCase() : value;

    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { nome, uf, id_pais } = formData;

    if (!nome || !uf || !id_pais) {
      setMensagem({
        texto: "Por favor, preencha todos os campos obrigatórios.",
        tipo: "erro",
      });
      return;
    }

    if (uf.length !== 2) {
      setMensagem({
        texto: "UF deve ter exatamente 2 letras.",
        tipo: "erro",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/estados/${id}/`, formData);
      setMensagem({ texto: "Estado atualizado com sucesso!", tipo: "sucesso" });

      // Redirecionar para a página de listagem de estados após a edição
      setTimeout(() => {
        navigate("/listar-estados");
      }, 1000);
    } catch (error) {
      console.error("Erro ao atualizar estado:", error.response || error);
      setMensagem({
        texto: "Falha ao atualizar o estado. Tente novamente.",
        tipo: "erro",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Editar Estado</h2>

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
                {pais.nome.toUpperCase()}
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
            disabled={loading} // Desativa enquanto carrega
          >
            <option value="A">Ativo</option>
            <option value="I">Inativo</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">
          {loading ? "Enviando..." : "Salvar Alterações"}
        </button>
        
      </form>
      <button
        onClick={() => navigate("/listar-estados")}
        className="btn btn-cancelar"
        disabled={loading} // Bloqueia interação até a ação ser concluída
      >
        Cancelar
      </button>
    </div>
  );
};

export default EditarEstado;
