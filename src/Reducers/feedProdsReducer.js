import Types from '../Actions/Types';


const feedProdsReducer = (state={feedProds:[]},action) => {
    if(action.type === Types.GET_FEED_PRODS) {
        
        // i did concatinate the retrieved array of products from the request with
        // the existed array of products in state alraedy
        //because we load the feed in pages 
        // each page containg 10 products , that need to be rendered after the previous 10 products alreday rendered. 
                
            //if the last list fetched was not full list (10 items), then next time 
            // we request it again but slice the already fetched items from the last time 
            // so we dont have a repeated items 

          

        return {...state,feedProds: action.payload.prods}
        
    }
    else {
        return state;
    }

};

export default feedProdsReducer;