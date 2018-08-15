import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../hoc/updateObject';

const initialState = {
  token: null
}

const authSetToken = (state, action) => {
    return updateObject(state, { 
      token: action.token 
    })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SET_TOKEN: return authSetToken(state, action);
    default: return state;
  }
};

export default reducer;