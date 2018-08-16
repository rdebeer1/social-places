import { AsyncStorage } from 'react-native';
//app
import App from '../../../App';
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
        dispatch(authStoreToken(
          parsedRes.idToken, 
          parsedRes.expiresIn, 
          parsedRes.refreshToken
        ))
        startMainTabs();
      }
    });
  }
}

export const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    const now = new Date();
    const expiresInDate = now.getTime() + expiresIn * 1000
    dispatch(authSetToken(token, expiresInDate));
    AsyncStorage.setItem('ap:auth:token', token);
    AsyncStorage.setItem('ap:auth:expiresInDate', expiresInDate.toString());
    AsyncStorage.setItem('ap:auth:refreshToken', refreshToken);
  }
}

export const authSetToken = (token, expiresInDate) => {
  return {
    type: actionTypes.AUTH_SET_TOKEN,
    token: token,
    expiresInDate: expiresInDate
  }
}

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token
      const expiresInDate = getState().auth.expiresInDate
      if (!token || new Date(expiresInDate) <= new Date()) {
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
    return promise
    .catch(err => {
      return AsyncStorage.getItem('ap:auth:refreshToken')
      .then(refreshToken => {
        return fetch(`https://securetoken.googleapis.com/v1/token?key=${authKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'grant_type=refresh_token&refresh_token=' + refreshToken
        })
      })
      .then(res => res.json())
      .then(parsedRes => {
        if (parsedRes.id_token) {
          console.log('Refresh Token Valid')
          dispatch(authStoreToken(
            parsedRes.id_token,
            parsedRes.expire_in,
            parsedRes.refresh_token
          )
        )
        return parsedRes.id_token;
        } else {
          dispatch(authClearStorage())
        }
      })
    })
    .then(token => {
      if (!token) {
        throw(new Error());
      } else {
        return token;
      }
    })
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
    return AsyncStorage.removeItem('ap:auth:refreshToken');
  }
}

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage())
    .then(() => {
      App();
    });
    dispatch(authRemoveToken());
  }
}

export const authRemoveToken = () => {
  return {
    type: actionTypes.AUTH_REMOVE_TOKEN
  }
}