// src/utils/api.ts

// Define el tipo de datos que esperas recibir
interface Datos {
  id: number;
  name: string;
  participants: number;
  monthlyAmount: number;
}

// Función para obtener los datos de las juntas desde la API del backend
export const getJuntas = async (): Promise<Datos[]> => {
  try {
    const response = await fetch('/api/juntas');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Datos[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching juntas:', error);
    throw error;
  }
};

// Función para realizar otras solicitudes de datos mediante fetch
export const fetchData = async (): Promise<any> => {
  // Lógica para realizar otras solicitudes de datos
};




