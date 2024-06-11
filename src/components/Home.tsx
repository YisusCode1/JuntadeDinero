import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import imagenCentro from '../assets/logo_JuntaChain.png'; // Ajusta la ruta según la ubicación de tu imagen

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <img src={imagenCentro} alt="Logo del proyecto" className="imagen-centrada" />
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


















