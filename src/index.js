import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import CartProvider from './store/CartProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import store from './redux-store/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Router>
        <CartProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </CartProvider>
    </Router>);
