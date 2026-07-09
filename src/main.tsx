import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '../context/ThemeProvider';
import { applyAppIcon, getSavedAppIcon } from '../utils/appIcon';

applyAppIcon(getSavedAppIcon());

const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches ||
  (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

const firstLaunch = !sessionStorage.getItem('appLaunched');
if (isStandalone && firstLaunch && window.location.pathname !== '/') {
  sessionStorage.setItem('appLaunched', 'true');
  window.location.replace('/');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
