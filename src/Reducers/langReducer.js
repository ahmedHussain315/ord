import Types from '../Actions/Types';

var init_language = window.localStorage.getItem("lang")? window.localStorage.getItem("lang") : "rtl"

const langReducer = (state={lang : init_language},action) => {
    if(action.type === Types.CHANGE_LANG) {
        return {...state,lang:action.payload.lang};
        
    }
  else {
      return state
  }

};

export default langReducer;