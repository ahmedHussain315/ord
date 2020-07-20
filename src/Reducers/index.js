import {combineReducers}      from 'redux';
import feedProdsReducer       from './feedProdsReducer';
import currentProdReducer     from './currentProdReducer';
import cart                   from './cart';
import langReducer            from "./langReducer";





export default combineReducers({
  
    cart            : cart,
    feedProds       : feedProdsReducer,
    currentProd     : currentProdReducer,
    langReducer     : langReducer
});

