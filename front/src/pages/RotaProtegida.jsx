import React from "react";
import { Navigate } from "react-router-dom";

const RotaProtegida = ({ isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to="/acesso-negado" />;
  }
  return children;
};

export default RotaProtegida;
