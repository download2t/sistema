import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Menu from "./pages/Menu";

import ListarPaises from "./components/local/Paises/ListarPaises";
import CadastroPais from "./components/local/Paises/CadastroPais";
import EditarPais from "./components/local/Paises/EditarPais";
import VisualizarPais from "./components/local/Paises/VisualizarPais";
import ExcluirPais from "./components/local/Paises/ExcluirPais";

import ListarEstados from "./components/local/Estados/ListarEstados";
import CadastroEstado from "./components/local/Estados/CadastroEstado";
import EditarEstado from "./components/local/Estados/EditarEstado";
import VisualizarEstado from "./components/local/Estados/VisualizarEstado";
import ExcluirEstado from "./components/local/Estados/ExcluirEstado";

import ListarCidades from "./components/local/Cidades/ListarCidades";
import CadastroCidade from "./components/local/Cidades/CadastroCidade";
import EditarCidade from "./components/local/Cidades/EditarCidade";
import VisualizarCidade from "./components/local/Cidades/VisualizarCidade";
import ExcluirCidade from "./components/local/Cidades/ExcluirCidade";

import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Login from "./pages/Login";

// Redirecionamento para Admin do Django
const AdminRedirect = () => {
  window.location.href = "/admin/";
  return null;
};

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  function PrivateRoute({ children }) {
    return isAuthenticated() ? children : <Navigate to="/login" />;
  }

  return (
    <Router>
      <Routes>
        {/* Rota para Login */}
        <Route path="/login" element={<Login />} />
        {/* Rota Protegida para Página Inicial */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <Home />
              </MenuWrapper>
            </PrivateRoute>
          }
        />
        {/* Rota Protegida para Sobre */}
        <Route
          path="/sobre"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <Sobre />
              </MenuWrapper>
            </PrivateRoute>
          }
        />
        {/* Rota Protegida para Listar Paises */}
        <Route
          path="/listar-paises"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <ListarPaises />
              </MenuWrapper>
            </PrivateRoute>
          }
        />
        {/* Rota Protegida para Cadastros */}
        <Route
          path="/cadastro-pais"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <CadastroPais />
              </MenuWrapper>
            </PrivateRoute>
          }
        />
        {/* Rota Protegida para Editar */}
        <Route
          path="/editar-pais/:id"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <EditarPais />
              </MenuWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/visualizar-pais/:id"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <VisualizarPais />
              </MenuWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/excluir-pais/:id"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <ExcluirPais />
              </MenuWrapper>
            </PrivateRoute>
          }
        />

        <Route
          path="/listar-estados"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <ListarEstados />
              </MenuWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/cadastro-estados"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <CadastroEstado />
              </MenuWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/editar-estado/:id"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <EditarEstado />
              </MenuWrapper>
            </PrivateRoute>
          }
        />

        <Route
          path="/visualizar-estado/:id"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <VisualizarEstado />
              </MenuWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/excluir-estado/:id"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <ExcluirEstado />
              </MenuWrapper>
            </PrivateRoute>
          }
        />

        <Route
          path="/listar-cidades"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <ListarCidades />
              </MenuWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/cadastro-cidades"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <CadastroCidade />
              </MenuWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/editar-cidade/:id"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <EditarCidade />
              </MenuWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/visualizar-cidade/:id"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <VisualizarCidade />
              </MenuWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/excluir-cidade/:id"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <ExcluirCidade />
              </MenuWrapper>
            </PrivateRoute>
          }
        />

        {/* Rota para Admin */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminRedirect />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

// Componente que engloba o Menu e o conteúdo da página
const MenuWrapper = ({ children }) => (
  <>
    <Menu />
    {children}
  </>
);

export default App;
