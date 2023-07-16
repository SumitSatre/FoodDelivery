import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// is used to import the CSS file of Bootstrap into your project
import 'bootstrap/dist/css/bootstrap.min.css';

// redux 
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import searchSlice from './slices/searchSlice';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: {
    cart: cartSlice,
    search : searchSlice
  }
})

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

reportWebVitals();
