import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaSignOutAlt,
  FaCaretDown,
  FaUserShield,
} from "react-icons/fa";
import "../styles/Menu.css";

const Menu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Controle do menu móvel
  const [isCadastrosOpen, setIsCadastrosOpen] = useState(false); // Controle do submenu Cadastros
  const [isLocalizacaoOpen, setIsLocalizacaoOpen] = useState(false); // Controle do submenu Localização
  const [isOutroGrupoOpen, setIsOutroGrupoOpen] = useState(false); // Outro grupo de submenus

  const navigate = useNavigate();

  // Alternar menus
  const handleToggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleToggleCadastros = () => setIsCadastrosOpen(!isCadastrosOpen);
  const handleToggleLocalizacao = () =>
    setIsLocalizacaoOpen(!isLocalizacaoOpen);
  const handleToggleOutroGrupo = () => setIsOutroGrupoOpen(!isOutroGrupoOpen);

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Você tem certeza que deseja fazer LogOut?"
    );
    if (confirmed) {
      localStorage.removeItem("token");
      alert("Você saiu da sua conta.");
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">Meu Sistema</Link>
        </div>
        <button className="menu-toggle" onClick={handleToggleMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={`nav ${isMobileMenuOpen ? "nav-open" : ""}`}>
          <ul className="menu-list">
            {/* Nível Primário */}
            <li>
              <Link to="/">
                <FaHome />
                <span>Página Inicial</span>
              </Link>
            </li>
            <li className="has-submenu">
              <button
                className="submenu-toggle"
                onClick={handleToggleCadastros}
              >
                Cadastros <FaCaretDown />
              </button>
              {isCadastrosOpen && (
                <ul className="submenu">
                  {/* Nível Secundário */}
                  <li className="has-submenu">
                    <button
                      className="submenu-toggle"
                      onClick={handleToggleLocalizacao}
                    >
                      Localização <FaCaretDown />
                    </button>
                    {isLocalizacaoOpen && (
                      <ul className="submenu">
                        {/* Nível Terciário */}
                        <li>
                          <Link to="/listar-paises">Países</Link>
                        </li>
                        <li>
                          <Link to="/listar-estados">Estados</Link>
                        </li>
                        <li>
                          <Link to="/listar-cidades">Cidades</Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="has-submenu">
                    <button
                      className="submenu-toggle"
                      onClick={handleToggleOutroGrupo}
                    >
                      Pessoa <FaCaretDown />
                    </button>
                    {isOutroGrupoOpen && (
                      <ul className="submenu">
                        <li>
                          <Link to="/listar-clientes">Clientes</Link>
                        </li>
                        <li>
                          <Link to="/listar-fornecedores">Fornecedores</Link>
                        </li>
                        <li>
                          <Link to="/listar-usuarios">Usuários</Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/sobre">
                <FaInfoCircle />
                <span>Sobre</span>
              </Link>
            </li>
            <li>
              <a
                href="http://localhost:8000/admin/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaUserShield />
                <span>Admin</span>
              </a>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                <FaSignOutAlt />
                <span>LogOut</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Menu;
