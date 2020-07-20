import Types from './Types';
import requester from '../Apis/requester';


export const GET_CART_ITEMS = (clientId) => {

    return async function(dispatch) {
        const params = {
            languageId:window.localStorage.getItem("languageId"),
            currencyId:window.localStorage.getItem("currencyId"),
            clientId : clientId
        };

        await requester.get("/cart/client", {params: params}).then((response)=>{
            dispatch({
                type:Types.GET_CART_ITEMS,
                payload:{catdItems : response.data}
            });
            console.log("GET_CART_ITEMS action : dispatched");
         })
        
       
    };

};

export const REMOVE_CART_ITEM = (cartProductId) => {

    return async function(dispatch) {
        const params = {
            cartProductId : cartProductId
        };

        await requester.delete("/cart/remove", {params: params}).then((response)=>{
            dispatch({
                type:Types.REMOVE_CART_ITEM,
            });
            console.log("REMOVE_CART_ITEM action : dispatched");
            window.location.reload(true);
         })
        
       
    };

};

export const ADD_CART_ITEM = (clientId, onrProductArray) => {
    return async function(dispatch) {
        const params = {
            clientId :clientId,
            products : onrProductArray
        };
        
        console.log(params);
        await requester.post("/cart/assign",params).then((response)=>{
            console.log(JSON.parse(response.config.data))
        })
    }
}



export const GET_FEED_PRODS = () => {

    return async function(dispatch) {
      

        await requester.get("/products/get").then((response)=>{
            dispatch({
                type:Types.GET_FEED_PRODS,
                payload:{prods: response.data}
            });
            return response.data
            console.log("GET_FEED_PRODS action : dispatched");
         })
        
       
    };

}

export const GET_PROD = (id) => {

    return async function(dispatch) {
        await requester.get(`/products/info?productId=${id}`).then((response)=>{
            console.log(response.dat);
            dispatch({
                type:Types.GET_PROD,
                payload:{Prod: response.data}
            });
            console.log("GET_PROD action : dispatched")
        })
        
       
    };

}

export const CLEAR_PROD = () => {
    console.log("CLEAR_PROD action : dispatched")
    return {
        type:Types.CLEAR_PROD
    }
}




export const CHANGE_LANG = (lang) => {

    return async function(dispatch) {
        console.log("CHANGE_LANG action : dispatched >> the payload is :  " + lang);

            dispatch({
                type:Types.CHANGE_LANG,
                payload:{lang: lang}
            });
         
   
        
       
    };

}