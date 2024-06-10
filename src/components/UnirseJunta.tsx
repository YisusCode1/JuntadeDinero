// src/components/UnirseJunta.tsx
import React, { useEffect, useState } from 'react';
import '../styles/styles.css';

interface Junta {
  id: number;
  participantes: number;
  monto: number;
}

const UnirseJunta: React.FC = () => {
  const [juntas, setJuntas] = useState<Junta[]>([]);

  useEffect(() => {
    // Simula la llamada a una API para obtener las juntas
    const fetchJuntas = async () => {
      try {
        const response = await fetch('/api/juntas'); // Ajusta la ruta de la API según sea necesario
        const data = await response.json();
        setJuntas(data);
      } catch (error) {
        console.error('Error al obtener las juntas:', error);
      }
    };

    fetchJuntas();
  }, []);

  return (
    <div>
      <header>
        <a href="#" id="wallet-btn">Wallet</a>
      </header>
      <main>
        <h1>Unirse a una Junta</h1>
        <div className="juntas-container">
          {juntas.map(junta => (
            <div className="junta-card" key={junta.id}>
              <h2>Junta ID: {junta.id}</h2>
              <p>Participantes: {junta.participantes}</p>
              <p>Monto: {junta.monto}</p>
              <p>Monto a sortear: {junta.participantes * junta.monto}</p>
              <form method="POST" action="/api/unirse_junta">
                {Array.from({ length: junta.participantes }, (_, i) => (
                  <React.Fragment key={i}>
                    <label htmlFor={`direccion-${junta.id}-${i + 1}`}>
                      Dirección de Billetera {i + 1}:
                    </label>
                    <input
                      type="text"
                      id={`direccion-${junta.id}-${i + 1}`}
                      name={`direccion-${i + 1}`}
                      required
                    />
                    <button type="button" className="aporte-btn">
                      Aporte
                    </button>
                    <br />
                  </React.Fragment>
                ))}
                <input type="hidden" name="participantes" value={junta.participantes} />
                <input type="hidden" name="monto" value={junta.monto} />
                <button type="submit" className="crear-junta-btn">
                  Unirse a la Junta
                </button>
              </form>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UnirseJunta;
