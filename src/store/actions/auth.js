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
        dispatch(authStoreToken(parsedRes.idToken))
        startMainTabs();
      }
    });
  }
}

export const authStoreToken = token => {
  return dispatch => {
    dispatch(authSetToken(token));
    AsyncStorage.setItem('ap:auth:token', token);
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
        AsyncStorage.getItem('ap:auth:token')
        .catch(err => reject())
        .then(tokenFromStorage => {
          if (!tokenFromStorage) {
            reject();
            return;
          }
          dispatch(authSetToken(tokenFromStorage));
          resolve(tokenFromStorage);
        })
      } else {
        resolve(token)
      }
    });
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