import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// tijdelijk:
import Recipe from './Recipe.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/*<Recipe/>*/}

  </StrictMode>,
);
