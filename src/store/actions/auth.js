import * as actionTypes from './actionTypes'
import * as actions from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs'

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
        dispatch(authSetToken(parsedRes.idToken))
        startMainTabs();
      }
    });
  }
}

export const authSetToken = token => {
  return {
    type: actionTypes.AUTH_SET_TOKEN,
    token: token
  }
}
