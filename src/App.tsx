import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateJunta from './components/CreateJunta';
import Resultados from './components/Resultados';
import UnirseJunta from './components/UnirseJunta';
import Home from './components/Home'; // Asegúrate de tener un componente Home
import ConnectWallet from './components/ConnectWallet'; // Importa ConnectWallet
import './styles/styles.css'; // Importa tus estilos globales

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header className="App">
          <nav className="header-nav">
            <Link to="/">Home</Link> |
            <Link to="/create">Crear Junta</Link> |
            <Link to="/resultados">Resultados</Link> |
            <Link to="/unirse">Unirse a Junta</Link>
            {/* Agregar el botón de la billetera aquí */}
            <ConnectWallet />
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateJunta />} />
            <Route path="/resultados" element={<Resultados />} />
            <Route path="/unirse" element={<UnirseJunta />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;



















