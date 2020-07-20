import React from 'react';
import ReactDOM from 'react-dom';
import { Router, BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk'; 
import combineReducers from './Reducers/index';

import App from './Components/App';

// import createHistory from 'history/createBrowserHistory';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const myStore = createStore(combineReducers, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
  
    <Provider store={myStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();


