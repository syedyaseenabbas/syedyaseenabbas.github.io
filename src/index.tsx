import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./Provider/AuthProvider";
import { Provider } from "react-redux"
import { store } from './store'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
      <PersistGate loading={null} persistor={persistor}>
          <App />
      </PersistGate>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
