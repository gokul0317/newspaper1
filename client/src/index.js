import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppContextProvider } from "./ContextAPI/AppContext";
import { NewsContextProvider } from "./ContextAPI/NewsContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <NewsContextProvider>
        <App />
      </NewsContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);