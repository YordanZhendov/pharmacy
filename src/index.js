import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from './core/context/User';
import pharmacyReducer from './core/context/Pharmacy';
import allPharmsReducer from './core/context/AllPharms';
import allProductsReducer from './core/context/AllProducts';
import ecartReducer from './core/context/Ecart';

export const store = configureStore({

    reducer:{ 
      user: userReducer,
      pharmacy: pharmacyReducer,
      allpharms: allPharmsReducer,
      allproducts: allProductsReducer,
      ecart: ecartReducer,
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
  </React.StrictMode>
);
reportWebVitals();
