import Types from '../Actions/Types';

const init_state = {
    wishlist : null      
};

 const wishlist = (state=init_state,action) => {
    if(action.type === Types.GET_WISHLIST) {
        console.log("from reducer >> starting get client wishlist");
        return {...state, wishlist : action.payload.wishlist};
    }
    else if (action.type === Types.CLEAR_WISHLIST){
        console.log("from reducer >> starting sign out 'info reducer' ");
        return {...state, wishlist : null};
    }
   else {
    return state
    }
 }

export default wishlist;