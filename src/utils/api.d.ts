// src/utils/api.d.ts
declare module 'api' {
  export function getJuntas(): Promise<{ direcciones: string[] }[]>;
  // Agrega más exportaciones y tipos según sea necesario
}

