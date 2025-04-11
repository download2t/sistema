import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Menu from "./components/Menu";
import CadastroPais from "./components/CadastroPais";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Login from "./pages/Login";

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
        <Route path="/login" element={<Login />} />
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
      </Routes>
    </Router>
  );
}

const MenuWrapper = ({ children }) => (
  <>
    <Menu />
    {children}
  </>
);

export default App;
