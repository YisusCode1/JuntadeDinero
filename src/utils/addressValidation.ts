// addressValidation.ts

import algosdk from 'algosdk';

export const isAddressValid = (address: string): boolean => {
  try {
    return algosdk.isValidAddress(address);
  } catch (error) {
    console.error('Error al validar la dirección:', error);
    return false;
  }
};
