import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { reducer } from './store/reducer';
import { createAPI } from './services/api';
import { fetchFilmsAction, checkAuthorizationAction, fetchPromoAction } from './store/actions-api';
import { configureStore } from '@reduxjs/toolkit';
import { redirect } from './store/redirect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const api = createAPI(() => undefined);

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

(store.dispatch)(checkAuthorizationAction());
(store.dispatch)(fetchFilmsAction());
(store.dispatch)(fetchPromoAction());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
