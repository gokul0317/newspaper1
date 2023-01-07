import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppContextProvider } from "./ContextAPI/AppContext";
import { NewsContextProvider } from "./ContextAPI/NewsContext";
import { AlertContextProvider } from "./ContextAPI/AlertContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertContextProvider>
      <AppContextProvider>
        <NewsContextProvider>
          <App />
        </NewsContextProvider>
      </AppContextProvider>
    </AlertContextProvider>
  </React.StrictMode>
);