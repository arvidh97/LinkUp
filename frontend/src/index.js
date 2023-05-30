import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import { restoreSession } from './store/csrf';
import { createUser, loginUser, logoutUser } from './store/userReducer'; 
import { csrfFetch } from './store/csrf';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

window.csrfFetch = csrfFetch
window.createUser = createUser
window.loginUser = loginUser
window.logoutUser = logoutUser



const initializeApp = () => {
  ReactDOM.render(
      <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
      </React.StrictMode>,
      document.getElementById('root')
  );
}

let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
let initialState = {};

if (currentUser) {
    initialState = {
        users: {
        [currentUser.id]: currentUser
        }
    };
};

restoreSession().then(initializeApp)
