import * as actionTypes from './actionTypes'

const config = require('../../config')
const authKey = config.AUTH_API_KEY

export const tryAuth = (authData) => {
  return dispatch => {
    dispatch(authSignup(authData));
  }
}

export const authSignup = (authData) => {
  return dispatch => {
    fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${authKey}`, {
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
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes)
    });
  }
}