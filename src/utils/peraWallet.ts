// src/utils/peraWallet.js
import { PeraWalletConnect } from "@perawallet/connect";

const peraWallet = new PeraWalletConnect();

export const connectWallet = async () => {
  try {
    const accounts = await peraWallet.connect();
    // Manejar el inicio de sesión exitoso
    return accounts;
  } catch (error) {
    // Manejar errores de inicio de sesión
    console.error("Error al iniciar sesión con Pera Wallet:", error);
    throw error;
  }
};

export const disconnectWallet = () => {
  peraWallet.disconnect();
  // Manejar el cierre de sesión
};

export const isWalletConnected = () => {
  return peraWallet.isConnected;
  // Verificar si el usuario está autenticado
};

export default peraWallet;


