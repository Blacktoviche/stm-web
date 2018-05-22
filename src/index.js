import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home/Home';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from "./reducers";
import {IntlProvider } from 'react-intl';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale="en">
         <Home/>
        </IntlProvider>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
