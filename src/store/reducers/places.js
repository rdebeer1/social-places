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

const deletePlace = (state, action) => {
  return updateObject(state, {
    places: state.places.filter(place => {
        return place.key !== action.placeKey;
    }),
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PLACES: return setPlaces(state, action);
    case actionTypes.DELETE_PLACE: return deletePlace(state, action);
    default: return state;
  }
};

export default reducer;