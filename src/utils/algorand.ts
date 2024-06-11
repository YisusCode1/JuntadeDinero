import algosdk from 'algosdk';

// Configurar cliente Algodv2 para Algonode
const algodServer = 'https://testnet-idx.algonode.cloud';
const algodToken = '';
const algodPort = '';
const client = new algosdk.Algodv2(algodToken, algodServer, algodPort);

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



