import Types from '../Actions/Types';


const currentProdReducer = (state={currentProd:{}},action) => {
    if(action.type === Types.GET_PROD) {
        return {...state,currentProd:action.payload.Prod};
    }
    else if (action.type === Types.CLEAR_PROD){
        return {...state,currentProd:{}};
    }
    else {
        return state;
    }

};

export default currentProdReducer;