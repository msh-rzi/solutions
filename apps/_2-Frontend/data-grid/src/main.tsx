import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ShadcnThemeProvider } from '@repo/ui-shadcn';
import '@repo/ui-shadcn/globals.css';
import './styles/data-grid.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShadcnThemeProvider>
      <App />
    </ShadcnThemeProvider>
  </StrictMode>,
);

