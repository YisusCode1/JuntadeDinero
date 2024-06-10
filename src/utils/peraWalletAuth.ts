import { PeraWalletConnect } from "@perawallet/connect";

// Instanciar la conexión con Pera Wallet
const peraWallet = new PeraWalletConnect();

export const peraWalletAuth = {
  login: async () => {
    try {
      // Solicitar conexión a la billetera
      const accounts = await peraWallet.connect();
      // Manejar el inicio de sesión exitoso
      return accounts;
    } catch (error) {
      // Manejar errores de inicio de sesión
      console.error("Error al iniciar sesión con Pera Wallet:", error);
      throw error;
    }
  },
  logout: () => {
    // Desconectar de la billetera
    peraWallet.disconnect();
    // Manejar el cierre de sesión
    console.log("Desconectado de Pera Wallet");
  },
  isAuthenticated: () => {
    // Verificar si el usuario está autenticado
    return peraWallet.isConnected;
  }
};




