import algosdk from 'algosdk';
import { PeraWalletConnect } from '@perawallet/connect';

const algodToken = 'YOUR_ALGOD_TOKEN';
const algodServer = 'https://testnet-algorand.api.purestake.io/ps2';
const algodPort = '';
const client = new algosdk.Algodv2(algodToken, algodServer, algodPort);

const peraWallet = new PeraWalletConnect();

// Conectar la billetera
export const connectWallet = async (): Promise<string | null> => {
  try {
    const accounts = await peraWallet.connect();
    if (accounts.length > 0) {
      const accountAddress = accounts[0];
      // @ts-ignore
      peraWallet.reconnectSession(); // Ignorar error
      return accountAddress;
    } else {
      console.error("No se encontraron cuentas conectadas.");
      return null;
    }
  } catch (error) {
    console.error("Error al conectar la billetera:", error);
    return null;
  }
};

// Verificar si la billetera está conectada
export const isWalletConnected = (): boolean => {
  // @ts-ignore
  peraWallet.reconnectSession(); // Ignorar error
  // @ts-ignore
  const connectedAccounts = peraWallet.getAccounts(); // Ignorar error
  return connectedAccounts.length > 0;
};

// Enviar una transacción
export const sendTransaction = async (fromAddress: string, toAddress: string, amount: number): Promise<boolean> => {
  try {
    const params = await client.getTransactionParams().do();

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: fromAddress,
      to: 'HPKJSL5JOCWPNQKJSPHT2HT52DTT7QVQKTX3GYMYTDVI7RWJZT6KMBHJD4',
      amount: algosdk.algosToMicroalgos(amount),
      suggestedParams: params
    });

    // @ts-ignore
    const signedTxn = await peraWallet.signTransaction([txn.toByte()]); // Ignorar error

    const { txId } = await client.sendRawTransaction(signedTxn).do();

    await waitForConfirmation(txId);

    console.log("Transacción enviada con éxito:", txId);
    return true;
  } catch (error) {
    console.error("Error al enviar la transacción:", error);
    return false;
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


