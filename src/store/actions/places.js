import * as actionTypes from './actionTypes';
import * as actions from './index';

const config = require('../../config')
const apiKey = config.API_KEY
const storeImageKey = config.STORE_IMAGE_KEY

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        let authToken;
        dispatch(actions.uiStartLoading());
        dispatch(actions.authGetToken())
        .catch(() => {
            alert('No Valid Token Found')
        })
        .then(token => {
            authToken = token;
            return fetch(`${storeImageKey}`, {
                method: 'POST',
                body: JSON.stringify({
                    image: image.base64
                }),
                headers: {
                    Authorization: 'Bearer ' + authToken
                }
            })
        })
        .catch(err => {
            console.log(err);
            alert('Error: Something went wrong')
            dispatch(actions.uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            return fetch(`${apiKey}places.json?auth=` + authToken, {
                method: "POST",
                body: JSON.stringify(placeData)
            })
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(actions.uiStopLoading());
        })
        .catch(err => {
            console.log(err);
            alert('Error: Something went wrong')
            dispatch(actions.uiStopLoading());
        });
    };
};

export const getPlaces = () => {
    return dispatch => {
        dispatch(actions.authGetToken())
        .then(token => {
            return fetch(`${apiKey}places.json?auth=` + token)
        })
        .catch(() => {
            alert('No Valid Token Found')
        })
        .then(res => (res.json()))
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
        .catch(err => {
            alert('Error: Something went wrong');
            console.log(err)
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
        dispatch(actions.authGetToken())
        .catch(() => {
            alert('No Valid Token Found')
        })
        .then(token => {
            dispatch(removePlace(key))
            return fetch(
                `${apiKey}places/` + 
                key + 
                '.json?auth=' + 
                token, {
                    method: "DELETE",
                }
            )
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log('Deleted')
        })
        .catch(err => {
            alert('Error: Something went wrong');
            console.log(err)
        })
    };
};

export const removePlace = key => {
    return {
        type: actionTypes.REMOVE_PLACE,
        key: key
    }
}