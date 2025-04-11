import React from "react";
import { Link } from "react-router-dom";
import "../styles/AcessoNegado.css";

const AcessoNegado = () => {
  return (
    <div className="acesso-negado-container">
      <h1>Acesso Negado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <Link to="/" className="voltar-link">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default AcessoNegado;
