import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../hoc/updateObject';

const initialState = {
  places: []
};

const setPlaces = (state, action) => {
  return updateObject(state, {
    places: action.places
  })
}

const removePlace = (state, action) => {
  return updateObject(state, {
    places: state.places.filter(place => {
        return place.key !== action.key;
    }),
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PLACES: return setPlaces(state, action);
    case actionTypes.REMOVE_PLACE: return removePlace(state, action);
    default: return state;
  }
};

export default reducer;