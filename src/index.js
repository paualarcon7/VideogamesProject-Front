import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; //Mide performance 
import { Provider } from 'react-redux';//habilita el store para todos los comps
import { store } from './store'; //estado
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
    <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root') //root, nodo que contiene todo lo manejado por React DOM. 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
