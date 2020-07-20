import Types from '../Actions/Types';

const init_state = {
    cart : null      
};

 const cart = (state=init_state,action) => {
    if(action.type === Types.GET_CART_ITEMS) {
        console.log("from cart reducer >> starting fetching cart items");
        return {...state, cart : action.payload.catdItems};
    }
   else {
    return state
    }
 }

export default cart;