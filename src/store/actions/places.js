import * as actionTypes from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch('https://us-central1-social-places-1534271849784.cloudfunctions.net/storeImage', {
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => {
            console.log(err);
            alert('Error: Something went wrong')
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            return fetch('https://social-places-1534271849784.firebaseio.com/places.json', {
                method: "POST",
                body: JSON.stringify(placeData)
            })
        })
        .catch(err => {
            console.log(err);
            alert('Error: Something went wrong')
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
        });
    };
};

export const getPlaces = () => {
    return dispatch => {
        fetch('https://social-places-1534271849784.firebaseio.com/places/.json')
        .catch(err => {
            alert('Error: Something went wrong');
            console.log(err)
        })
        .then(res => console.log(res.json()))
        .then(parsedRes => {
            const places = [];
            for (let key in parsedRes) {
                places.push({
                    ...parsedRes[key],
                    image: {
                        uri: parsedRes[key].image
                    },
                    key: key
                })
            }
            dispatch(setPlaces(places))
        })
    }
}

export const setPlaces = places => {
    return {
        type: actionTypes.SET_PLACES,
        places: places
    }
}

export const deletePlace = (key) => {
    return dispatch => {
        dispatch(removePlace(key))
        fetch('https://social-places-1534271849784.firebaseio.com/places/' + key + '.json', {
            method: "DELETE",
        })
        .catch(err => {
            alert('Error: Something went wrong');
            console.log(err)
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log('Deleted')
        })
    };
};

export const removePlace = key => {
    return {
        type: actionTypes.REMOVE_PLACE,
        key: key
    }
}