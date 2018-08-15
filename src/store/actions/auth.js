import { AsyncStorage } from 'react-native';
//screens
import startMainTabs from '../../screens/MainTabs/startMainTabs'
//actions
import * as actionTypes from './actionTypes'
import * as actions from './index';
//keys
const config = require('../../config')
const authKey = config.AUTH_API_KEY

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${authKey}`
    dispatch(actions.uiStartLoading())
    if (authMode === 'Sign Up') {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${authKey}`
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .catch(err => {
      console.log(err);
      alert('Authentication Failed - Try Again');
      dispatch(actions.uiStopLoading())
    })
    .then(res => res.json())
    .then(parsedRes => {
      dispatch(actions.uiStopLoading())
      if (!parsedRes.idToken) {
        alert('Authentication Failed - Try Again')
      } else {
        dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn))
        startMainTabs();
      }
    });
  }
}

export const authStoreToken = (token, expiresIn) => {
  return dispatch => {
    dispatch(authSetToken(token));
    const now = new Date();
    const expiresInDate = now.getTime() + expiresIn * 1000
    AsyncStorage.setItem('ap:auth:token', token);
    AsyncStorage.setItem('ap:auth:expiresInDate', expiresInDate.toString());
  }
}

export const authSetToken = token => {
  return {
    type: actionTypes.AUTH_SET_TOKEN,
    token: token
  }
}

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token
      if (!token) {
        let fetchedToken;
        AsyncStorage.getItem('ap:auth:token')
        .catch(err => reject())
        .then(tokenFromStorage => {
          fetchedToken = tokenFromStorage
          if (!tokenFromStorage) {
            reject();
            return;
          }
          return AsyncStorage.getItem('ap:auth:expiresInDate')
        })
        .then(expiresInDate => {
          const parsedExpiresInDate = new Date(parseInt(expiresInDate));
          const now = new Date();
          if (parsedExpiresInDate > now) {
            dispatch(authSetToken(fetchedToken));
            resolve(fetchedToken)
          } else {
            reject();
          }
        })
        .catch(err => reject())
      } else {
        resolve(token)
      }
    });
    promise.catch(err => {
      dispatch(authClearStorage)
    })
    return promise
  }
}

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
    .then(token => {
      startMainTabs()
    })
    .catch(err => console.log('Error: Auto Sign In Failed'))
  }
}

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem('ap:auth:token');
    AsyncStorage.removeItem('ap:auth:expiresInDate');
  }
}