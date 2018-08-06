import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../hoc/utility';
import placeImage from './src/assets/social-place.jpg';

const initialState = {
  places: [],
  selectedPlace: null
};

const addPlace = (state, action) => {
  return updateObject(state, {
    places: prevState.places.concat({
      key: (Math.random() + 1).toString(36).substring(7),
      name: action.placeName,
      image: placeImage
    })
  });
};

const deletePlace = (state, action) => {
  return updateObject(state, {
    places: prevState.places.filter(place => {
        return place.key !== prevState.selectedPlace.key;
    }),
    selectedPlace: null
  });
};

const selectPlace = (state, action) => {
  return updateObject(state, {
    selectedPlace:prevState.places.find(place => {
          return place.key === key;
    })
  });
};

const unselectPlace = (state, action) => {
  return updateObject(state, {
    selectedPlace: null
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLACE: return addPlace(state, action);
    case actionTypes.DELETE_PLACE: return deletePlace(state, action);
    case actionTypes.SELECT_PLACE: return selectPlace(state, action);
    case actionTypes.DELETE_PLACE: return unselectPlace(state, action);
    default: return state;
  }
};

export default reducer;