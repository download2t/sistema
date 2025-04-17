import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AcessoNegado.css";

const PaginaErro404 = () => {
  const navigate = useNavigate();

  return (
    <div className="erro-container">
      <h1 className="erro-titulo">404 - Página não encontrada</h1>
      <p className="erro-descricao">
        Ops! A página que você está tentando acessar não existe ou foi removida.
      </p>
      <button className="btn-voltar" onClick={() => navigate("/")}>
        Voltar ao Menu
      </button>
    </div>
  );
};

export default PaginaErro404;
