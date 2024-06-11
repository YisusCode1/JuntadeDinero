// src/utils/peraWalletAuth.d.ts

declare module '@/utils/peraWalletAuth' {
  // Importa el tipo adecuado de PeraWalletConnect
  import { PeraWalletConnect } from '@perawallet/connect';

  // Definir las funciones exportadas por PeraWalletConnect
  export const connectWallet: () => Promise<string[]>;
  export const disconnectWallet: () => void;
  export const isWalletConnected: () => boolean;
  export const sendTransaction: (
    fromAddress: string,
    toAddress: string,
    amount: number
  ) => Promise<boolean>;

  // Exportar la instancia de PeraWalletConnect
  const peraWallet: PeraWalletConnect;
  export default peraWallet;
}





