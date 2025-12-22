
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { ThemeProvider } from './hooks/useTheme';
import { supabase } from "./lib/supabase";

supabase.auth.onAuthStateChange((event) => {
  if (event === "SIGNED_IN") {
    window.location.href = "/";
  }
});
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
