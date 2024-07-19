import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot de react-dom/client
import './styles/tailwind.css';
import App from './App';

// Crea el root usando createRoot
const container = document.getElementById('root');
const root = createRoot(container);

// Usa el método render del root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
