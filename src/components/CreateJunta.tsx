import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connectWallet, isWalletConnected } from '@/utils/peraWallet';
import { sendTransaction } from '../utils/algorand';
import '../styles/styles.css';

const CreateJunta: React.FC = () => {
  const [participantes, setParticipantes] = useState<number | ''>('');
  const [monto, setMonto] = useState<number | ''>('');
  const [direcciones, setDirecciones] = useState<string[]>([]);
  const [direccionesValidadas, setDireccionesValidadas] = useState<boolean[]>([]);
  const [validated, setValidated] = useState<boolean>(false);
  const [showDirecciones, setShowDirecciones] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [colateralPagado, setColateralPagado] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof participantes === 'number') {
      setDirecciones(Array(participantes).fill(''));
      setDireccionesValidadas(Array(participantes).fill(false));
    } else {
      setDirecciones([]);
      setDireccionesValidadas([]);
    }
  }, [participantes]);

  const handleParticipantesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setParticipantes(isNaN(value) ? '' : value);
  };

  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setMonto(isNaN(value) ? '' : value);
  };

  const handleDireccionChange = (index: number, value: string) => {
    const newDirecciones = [...direcciones];
    newDirecciones[index] = value;
    setDirecciones(newDirecciones);
    const newDireccionesValidadas = [...direccionesValidadas];
    newDireccionesValidadas[index] = false;
    setDireccionesValidadas(newDireccionesValidadas);
  };

  const validarDireccionYPagarColateral = async (index: number) => {
    const direccion = direcciones[index];
    const esValida = direccion.length === 58; // Ejemplo de validación básica
    const newDireccionesValidadas = [...direccionesValidadas];
    newDireccionesValidadas[index] = esValida;
    setDireccionesValidadas(newDireccionesValidadas);

    if (esValida) {
      console.log(`Dirección ${direccion} válida`);
      // Conectar billetera si aún no está conectada
      if (!account) {
        const connectedAccounts = await connectWallet();
        if (connectedAccounts && connectedAccounts.length > 0) {
          setAccount(connectedAccounts[0]); // Solo establece la primera cuenta conectada
        } else {
          console.error("No se encontraron cuentas conectadas.");
          return; // Salir si no hay cuentas conectadas
        }
      }

      if (account && typeof monto === 'number') {
        const montoColateral = monto; // El monto a pagar como colateral (puedes ajustar esta lógica según lo que necesites)

        try {
          await sendTransaction(account, 'CONTRACT_ADDRESS', montoColateral);
          console.log(`Colateral pagado por la dirección ${direccion}`);
        } catch (error) {
          console.error('Error al pagar el colateral:', error);
          newDireccionesValidadas[index] = false; // Si hay error, marcar la dirección como no validada
          setDireccionesValidadas(newDireccionesValidadas);
        }
      }
    } else {
      console.error(`Dirección ${direccion} no válida`);
    }
  };

  const todasDireccionesValidadas = () => {
    return direccionesValidadas.every((valida) => valida === true);
  };

  const validarDatos = () => {
    if (
      typeof participantes === 'number' &&
      typeof monto === 'number' &&
      participantes >= 2 &&
      participantes <= 3 &&
      monto >= 1 &&
      monto <= 3
    ) {
      setValidated(true);
      setShowDirecciones(true);
      setDirecciones(Array(participantes).fill(''));
      setDireccionesValidadas(Array(participantes).fill(false));
    } else {
      setValidated(false);
      setShowDirecciones(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (todasDireccionesValidadas()) {
      const ganadores = seleccionarGanadoresAleatorios(direcciones);
      navigate('/resultados', { state: { ganadores } });
    } else {
      console.error('No todas las direcciones están validadas o el colateral no ha sido pagado.');
    }
  };

  const seleccionarGanadoresAleatorios = (direcciones: string[]): string[] => {
    const numeroDeGanadores = direcciones.length;
    const ganadoresAleatorios: string[] = [];

    // Clonamos el array direcciones para evitar modificar el array original
    const direccionesCopy = [...direcciones];

    for (let i = 0; i < numeroDeGanadores; i++) {
      const ganadorIndex = Math.floor(Math.random() * direccionesCopy.length);
      ganadoresAleatorios.push(direccionesCopy[ganadorIndex]);
      direccionesCopy.splice(ganadorIndex, 1);
    }

    return ganadoresAleatorios;
  };

  return (
    <div className="create-junta">
      <main>
        <form id="crear-junta-form" onSubmit={handleSubmit}>
          {!validated && (
            <div id="validacion-container">
              <label htmlFor="participantes">Número de Participantes:</label>
              <input
                type="number"
                id="participantes"
                name="participantes"
                min="2"
                max="3"
                required
                value={participantes}
                onChange={handleParticipantesChange}
              /><br />
              <label htmlFor="monto">Monto a Aportar cada Mes:</label>
              <input
                type="number"
                id="monto"
                name="monto"
                min="1"
                max="3"
                required
                value={monto}
                onChange={handleMontoChange}
              /><br />
              <button
                type="button"
                id="validar-datos-btn"
                className="validar-datos-btn"
                onClick={validarDatos}
              >
                Validar Datos
              </button>
            </div>
          )}

          {validated && (
            <>
              {showDirecciones && (
                <div id="direcciones-billetera">
                  {direcciones.map((direccion, index) => (
                    <div key={index}>
                      <label htmlFor={`direccion-${index}`}>
                        Dirección {index + 1}:
                      </label>
                      <input
                        type="text"
                        id={`direccion-${index}`}
                        value={direccion}
                        onChange={(e) => handleDireccionChange(index, e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => validarDireccionYPagarColateral(index)}
                        className="validar-direccion-btn"
                      >
                        Validar
                      </button>
                      {direccionesValidadas[index] ? (
                        <span className="valida">✔️</span>
                      ) : (
                        <span className="no-valida">❌</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div id="monto-a-sortear">
                <p>Monto total a sortear: {participantes && monto ? participantes * monto : 0}</p>
              </div>
            </>
          )}

          <div className='create-juntas-btn'>
            <button
              type="submit"
              id="crear-junta-btn"
              className="crear-junta-btn"
              style={{ display: validated ? 'block' : 'none' }}
              disabled={!todasDireccionesValidadas()}
            >
              Crear Junta
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateJunta;
























