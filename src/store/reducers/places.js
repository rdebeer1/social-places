import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../hoc/updateObject';

const initialState = {
  places: [],
  placeAdded: false
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

const placeAdded = (state, action) => {
  return updateObject(state, {
    placeAdded: true
  })
}

const startAddPlace = (state, action) => {
  return updateObject(state, {
    placeAdded: false
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PLACES: return setPlaces(state, action);
    case actionTypes.REMOVE_PLACE: return removePlace(state, action);
    case actionTypes.PLACE_ADDED: return placeAdded(state, action);
    case actionTypes.START_ADD_PLACE: return startAddPlace(state, action);
    default: return state;
  }
};

export default reducer;