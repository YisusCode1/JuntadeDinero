// src/utils/api.js

// Definimos fetchData
export const fetchData = async () => {
  // Tu lógica para fetch
};

// Definimos getJuntas
export const getJuntas = async () => {
  // Lógica para obtener las juntas
  const response = await fetch('/api/juntas');
  const data = await response.json();
  return data;
};

// O si usas `module.exports` en lugar de `export` (no se recomienda mezclar)
// module.exports = {
//   fetchData,
//   getJuntas,
// };





