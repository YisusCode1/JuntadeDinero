// src/utils/peraWalletAuth.ts

import peraWallet from './peraWallet'; // Importar la instancia de PeraWalletConnect
import algosdk from 'algosdk';

// Configurar cliente Algodv2 para Algonode
const algodServer = 'https://testnet-idx.algonode.cloud';
const algodToken = '';
const algodPort = '';
const client = new algosdk.Algodv2(algodToken, algodServer, algodPort);

export const peraWalletAuth = {
  // Otras funciones de autenticación...

  connectWallet: async (): Promise<string[]> => {
    try {
      // Implementación para conectar la billetera
      // Por ejemplo:
      const connectedAccounts = await peraWallet.connect(); // Suponiendo que 'connect' es el método correcto para conectar la billetera
      return connectedAccounts;
    } catch (error) {
      console.error("Error al conectar la billetera:", error);
      throw error; // Propaga el error para que pueda ser manejado por el componente que llama a esta función
    }
  },

  sendTransaction: async (fromAddress: string, toAddress: string, amount: number): Promise<boolean> => {
    try {
      const params = await client.getTransactionParams().do();

      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: fromAddress,
        to: toAddress,
        amount: algosdk.algosToMicroalgos(amount),
        suggestedParams: params
      });

      // Firmar la transacción con la instancia de PeraWalletConnect
      const signedTxn = await peraWallet.signTransaction(txn.toByte());

      const { txId } = await client.sendRawTransaction(signedTxn).do();

      await waitForConfirmation(txId);

      console.log("Transacción enviada con éxito:", txId);
      return true;
    } catch (error) {
      console.error("Error al enviar la transacción:", error);
      return false;
    }
  }
};

const waitForConfirmation = async (txId: string) => {
  let status = await client.status().do();
  let lastRound = status["last-round"];
  while (true) {
    const pendingInfo = await client.pendingTransactionInformation(txId).do();
    if (pendingInfo["confirmed-round"] && pendingInfo["confirmed-round"] > 0) {
      console.log(`Transacción confirmada en la ronda ${pendingInfo["confirmed-round"]}.`);
      break;
    }
    lastRound++;
    await client.statusAfterBlock(lastRound).do();
  }
};







