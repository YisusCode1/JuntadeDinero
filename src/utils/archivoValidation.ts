// OtroArchivo.ts

import { isAddressValid } from './addressValidation';

const exampleAddress = 'YOUR_ALGORAND_ADDRESS';
const isValid = isAddressValid(exampleAddress);
console.log(`La dirección ${exampleAddress} es válida: ${isValid}`);
