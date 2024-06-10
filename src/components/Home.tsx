import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a Junta de Dinero</h1>
      <p>Seleccione una opción:</p>
      <div className="button-container">
        <Link to="/create">
          <button className="create-junta-btn">Crear una junta</button>
        </Link>
        <Link to="/unirse">
          <button className="unirse-junta-btn">Unirse a una junta</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

















