import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../hoc/updateObject';

const initialState = {
  places: []
};

const addPlace = (state, action) => {
  return updateObject(state, {
    places: state.places.concat({
      key: Math.random(),
      name: action.placeName,
      image: {
        uri: action.image.uri
      },
      location: action.location
    })
  });
};

const deletePlace = (state, action) => {
  return updateObject(state, {
    places: state.places.filter(place => {
        return place.key !== action.placeKey;
    }),
  });
};



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLACE: return addPlace(state, action);
    case actionTypes.DELETE_PLACE: return deletePlace(state, action);
    default: return state;
  }
};

export default reducer;