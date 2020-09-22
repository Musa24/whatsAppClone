import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from './contexts/Auth';
import SettingContextProvider from './contexts/SettingContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SettingContextProvider>
        <Router>
          <App />
        </Router>
      </SettingContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
