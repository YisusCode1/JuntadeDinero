// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import polyfills
import { Buffer } from 'buffer';
import process from 'process';

// Assign to global variables to make them available in the whole app
globalThis.Buffer = Buffer;
globalThis.process = process;

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}


