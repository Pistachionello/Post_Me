import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {ToastProvider} from 'react-toast-notifications'
import {Provider} from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";

import App from './App';
import {rootReducer} from "./redux/rootReducer";
import "./styles/css/index.css";

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware()
});

const app = (
    <Provider store={store}>
        <ToastProvider autoDismiss={true} autoDismissTimeout={4000} placement={"bottom-left"}>
            <App/>
        </ToastProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
