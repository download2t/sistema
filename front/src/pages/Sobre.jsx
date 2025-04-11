import React from "react";

const Sobre = () => {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ color: "#2c3e50" }}>Sobre o Projeto</h1>
      <p>
        Este projeto é parte de um aprendizado prático das tecnologias{" "}
        <strong>React</strong> e <strong>Python</strong>. Ele integra o
        desenvolvimento de uma aplicação web utilizando o <strong>React</strong>{" "}
        no front-end e o<strong>Django</strong> no back-end, proporcionando uma
        experiência completa e dinâmica.
      </p>
      <p>
        Durante o desenvolvimento, exploramos conceitos como rotas protegidas,
        consumo de APIs, componentes reutilizáveis e gerenciamento de estado no
        front-end. No back-end, trabalhamos com a criação de APIs RESTful,
        modelos de dados, e autenticação.
      </p>
      <p>
        O objetivo é adquirir conhecimento sólido e aplicável para projetos
        futuros, enquanto experimentamos as melhores práticas no desenvolvimento
        moderno de software.
      </p>
      <footer style={{ marginTop: "20px", color: "#7f8c8d" }}>
        <small>© 2025 Projeto de Aprendizado React + Python</small>
      </footer>
    </div>
  );
};

export default Sobre;
