import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Menu from "./components/Menu";
/*  PAISES  */
import ListarPaises from "./components/ListarPaises";
import CadastroPais from "./components/CadastroPais";
import EditarPais from "./components/EditarPais";
/*  ESTADOS  */
import CadastroEstado from "./components/CadastroEstado";
/*  CIDADES  */
import CadastroCidade from "./components/CadastroCidade";

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
          path="/cadastro-cidades"
          element={
            <PrivateRoute>
              <MenuWrapper>
                <CadastroCidade />
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
