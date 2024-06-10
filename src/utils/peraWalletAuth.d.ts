// src/utils/peraWallet.d.ts

declare module '@/utils/peraWallet' {
  import { PeraWalletConnect } from '@perawallet/connect';

  // Define las funciones exportadas
  export const connectWallet: () => Promise<string[]>;
  export const disconnectWallet: () => void;
  export const isWalletConnected: () => boolean;

  // Exporta la instancia de PeraWalletConnect
  const peraWallet: PeraWalletConnect;
  export default peraWallet;
}


