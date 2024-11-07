import React from 'react';
import ReactDOM from 'react-dom/client';

import StoreProvider from '@/providers/store/StoreProvider';
import BrowserRouterProvider from '@/providers/router/BrowserRouterProvider';
import MuiThemeProvider from '@/providers/theme/MuiThemeProvider';
import { ConfirmDialogProvider } from '@/contexts/ConfirmDialogContext';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <MuiThemeProvider>
        <ConfirmDialogProvider>
          <BrowserRouterProvider>
            <App />
          </BrowserRouterProvider>
        </ConfirmDialogProvider>
      </MuiThemeProvider>
    </StoreProvider>
  </React.StrictMode>
);
