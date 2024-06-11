// src/utils/peraWallet.ts

import { PeraWalletConnect } from "@perawallet/connect";

class PeraWalletConnectExtended extends PeraWalletConnect {
  // Método para firmar una transacción
  async signTransaction(transactionBytes: Uint8Array): Promise<Uint8Array> {
    // Lógica para firmar la transacción utilizando la billetera
    // Por ahora, devolvemos el mismo objeto sin firmar
    return transactionBytes;
  }
}

// Instanciar la conexión con Pera Wallet
const peraWallet = new PeraWalletConnectExtended();

// Exportar la instancia de peraWallet
export default peraWallet;




