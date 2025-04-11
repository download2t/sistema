import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Menu.css";

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remover o token do localStorage
    alert("Você saiu da sua conta.");
    navigate("/login"); // Redirecionar para a tela de login
  };

  return (
    <nav className="menu">
      <ul>
        <li>
          <Link to="/">Página Inicial</Link>
        </li>
        <li>
          <Link to="/cadastro-pais">Cadastro de País</Link>
        </li>
        <li>
          <Link to="/sobre">Sobre</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-btn">
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
