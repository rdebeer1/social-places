import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../hoc/utility';

const initialState = {
  places: [],
  selectedPlace: null
};

const addPlace = (state, action) => {
  return updateObject(state, {
    places: state.places.concat({
      key: Math.random(),
      name: action.placeName,
      image: {
        uri: 'https://res.cloudinary.com/culturemap-com/image/upload/q_auto/ar_4:3,c_fill,g_faces:center,w_1200/v1508855968/photos/263214_original.jpg'
      }
    })
  });
};

const deletePlace = (state, action) => {
  return updateObject(state, {
    places: state.places.filter(place => {
        return place.key !== state.selectedPlace.key;
    }),
    selectedPlace: null
  });
};

const selectPlace = (state, action) => {
  return updateObject(state, {
    selectedPlace: state.places.find(place => {
          return place.key === action.placeKey;
    })
  });
};

const deselectPlace = (state, action) => {
  return updateObject(state, {
    selectedPlace: null
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLACE: return addPlace(state, action);
    case actionTypes.DELETE_PLACE: return deletePlace(state, action);
    case actionTypes.SELECT_PLACE: return selectPlace(state, action);
    case actionTypes.DESELECT_PLACE: return deselectPlace(state, action);
    default: return state;
  }
};

export default reducer;