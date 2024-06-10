import React from 'react';
import '../styles/styles.css';
import { useLocation } from 'react-router-dom';

interface LocationState {
  ganadores: string[];
}

const Resultados: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  const fechaActual = new Date();
  const ganadoresConFechas: { ganador: string; fecha: Date }[] = [];

  // Agregar el primer ganador con la fecha actual
  ganadoresConFechas.push({ ganador: state.ganadores[0], fecha: fechaActual });

  // Calcular las fechas para los siguientes ganadores
  for (let i = 1; i < state.ganadores.length; i++) {
    const fechaSiguiente = new Date(fechaActual);
    fechaSiguiente.setDate(fechaSiguiente.getDate() + i * 30); // Sumar 30 días por cada ganador
    ganadoresConFechas.push({ ganador: state.ganadores[i], fecha: fechaSiguiente });
  }

  return (
    <div className="resultados">
      <main>
        <h1>Ganadores del Sorteo</h1>
        <p>A continuación se muestran los ganadores:</p>
        <ul>
          {ganadoresConFechas.map((item, index) => (
            <li key={index}>
              {`Ganador ${index + 1} del sorteo (${item.fecha.toLocaleDateString()}): ${item.ganador}`}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Resultados;






