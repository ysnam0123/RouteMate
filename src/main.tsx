import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// tailwind.css -> index.css -> main.tsx
import './css/index.css';
import App from './App.tsx';
// import NotFound from './pages/NotFound.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
