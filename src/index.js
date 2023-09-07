import React from 'react';
import './App.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store'
import { Provider } from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store)

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate persistor={persistor}>
      <App />
      </PersistGate>
    </React.StrictMode>
  </Provider>
);
