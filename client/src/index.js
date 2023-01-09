import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppContextProvider } from "./ContextAPI/AppContext";
import { NewsContextProvider } from "./ContextAPI/NewsContext";
import { GlobalContextProvider } from "./ContextAPI/GlobalContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <AppContextProvider>
        <NewsContextProvider>
          <App />
        </NewsContextProvider>
      </AppContextProvider>
    </GlobalContextProvider>
  </React.StrictMode>
);