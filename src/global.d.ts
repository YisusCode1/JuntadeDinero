// src/global.d.ts

// Declara el módulo de '@perawallet/connect'
declare module '@perawallet/connect' {
  export class PeraWalletConnect {
    connect(): Promise<string[]>;
    disconnect(): void;
    get isConnected(): boolean;
  }
}

