import base64 from 'base-64';
import { Actions } from 'react-native-router-flux';
import {
  AUTHENTICATE_USER_SUCCESS_MULTIFACTOR,
  AUTHENTICATE_USER_SUCCESS_WELCOME,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAILED,
  AUTHENTICATE_REGISTER_APP,
  AUTHENTICATE_REGISTER_USER,
  AUTHENTICATE_PASSWORD_CHANGE,
  AUTHENTICATE_LOGOUT,
  PASSWORD_CHANGED,
  USERNAME_CHANGED,
  PIN_SEND_SUCCESS,
  PIN_SEND_FAIL,
  PIN_RESET_SUCCESS,
  PIN_RESET_FAIL,
  EMAIL_CHANGED,
  NAME_CHANGED,
  PIN_CHANGED,
  PIN_NEW_CHANGED,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_PROCESS,
  USER_UPDATE_FAIL,
  CLEAR_MESSAGE,
  USER_UPDATE,
  ONBOARDING,
  LOADING,
} from './types';

import { config } from '../secure/config';

const baseUrl = config.development.auth;
const apiUrl = config.development.api;

export const onloading = (load) => {
  return {
    type: LOADING,
    payload: load
  };
};

export const onboarding = () => {
  return {
    type: ONBOARDING,
    payload: 'please change password'
  };
};

export const userUpdate = ({ prop, value }) => {
  return {
    type: USER_UPDATE,
    payload: { prop, value }
  };
};

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGE,
    payload: null
  };
};

export const pinChanged = (text) => {
  return {
    type: PIN_CHANGED,
    payload: text
  };
};

export const pinNewChanged = (text) => {
  return {
    type: PIN_NEW_CHANGED,
    payload: text
  };
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const usernameChanged = (text) => {
  return {
    type: USERNAME_CHANGED,
    payload: text
  };
};

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};

export const userUpdatePassword = (props) => {
  const {
    password,
    passwordNew,
    user
  } = props;

  const userData = JSON.parse(user);

  if (passwordNew && userData) {
    return (dispatch) => {
      const url = `${baseUrl}/user/password/change/`;
      const auth = `${userData.email}:${password}`;
      const base64Str = base64.encode(auth);
      const headers = {
        Authorization: `Basic ${base64Str}`,
        'Content-Type': 'application/json'
      };
      const body = JSON.stringify({
        oldpassword: password,
        newpassword: passwordNew
      });
      fetch(url, {
        method: 'POST',
        headers,
        body
      })
        .then((response) => {
          if (response.status !== 200) {
            userUpdateError(dispatch, 'password was incorrect');
          } else {
            response.json().then(() => {
              dispatch({
                type: AUTHENTICATE_PASSWORD_CHANGE,
                payload: 'password has been changed'
              });
            });
          }
          return response;
        })
        .catch((e) => {
          console.log(e);
          userUpdateError(dispatch, 'password was not changed');
        });
    };
  } else {
    //console.log(body);
    return (dispatch) => {
      dispatch({ type: USER_UPDATE_PROCESS });
      //Actions.home({ type: 'reset' });
    };
  }
};

export const userUpdateProcess = (props) => {

  const {
    username,
    phone,
    name,
    password,
    user
  } = props;

  const { token, public_key } = JSON.parse(user);

  if (password && user) {
    return (dispatch) => {
      const body = new FormData();
      const url = `${apiUrl}/person/profile`;
      const auth = `${token}:`;
      const base64Str = base64.encode(auth);
      const headers = {
        Authorization: `Bearer ${base64Str}`,
        key: public_key,
        'Content-Type': 'multipart/form-data'
      };
      // body vars are optional
      if (username) { body.append('username', username); }
      if (phone) { body.append('phone', phone); }
      if (name) { body.append('name', name); }

      body.append('password', password); // required for username change

      fetch(url, {
        method: 'PUT',
        headers,
        body
      })
        .then((response) => {
          if (response.status !== 200) {
            userUpdateError(dispatch, 'profile was not updated');
          }
          return response.json();
        })
        .then((data) => {
          const result = data.result;

          const userData = JSON.parse(user);
          if (result) {
            // update stored user vars
            if (username) { userData.username = result.data.username; }
            if (phone) { userData.phone = result.data.phone; }
            if (name) { userData.name = result.data.name; }

            console.log(userData);

            dispatch({
              type: USER_UPDATE_SUCCESS,
              payload: JSON.stringify(userData)
            });
          } else {
            userUpdateError(dispatch, 'profile was not updated');
          }
        })
        .catch((e) => {
          console.log(e);
          userUpdateError(dispatch, 'profile was not updated');
        });
    };
  }

  return (dispatch) => {
    userUpdateError(dispatch, 'profile was not updated');
  };
};

export const userUpdateFailed = (text) => {
  return (dispatch) => {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: text
    });
  };
};

export const userUpdateAvatar = (props) => {
  const { user, uri, type, name } = props;
  const { token, public_key } = JSON.parse(user);

  return (dispatch) => {
    const body = new FormData();
    const url = `${apiUrl}/person/profile`;
    const auth = `${token}:`;
    const base64Str = base64.encode(auth);
    const headers = {
      Authorization: `Bearer ${base64Str}`,
      key: public_key,
      'Content-Type': 'multipart/form-data'
    };
    const file = { uri, type, name };
    body.append('file', file);

    fetch(url, {
      method: 'PUT',
      headers,
      body
    })
      .then((response) => {
        if (response.status !== 200) {
          userUpdateError(dispatch, 'profile image was not changed');
        }
        return response.json();
      })
      .then((data) => {
        const result = data.result;
        const userData = JSON.parse(user);
        userData.avatar = result.avatar;
        dispatch({
          type: AUTHENTICATE_USER_SUCCESS,
          payload: userData
        });
      })
      .catch(() => {
        userUpdateError(dispatch, 'profile image was not changed');
      });
  };
};

export const forgotPassword = (props) => {
  const { app, email } = props;

  const credentials = JSON.parse(app);
  const url = `${baseUrl}/user/password/reset/`;
  const auth = `${credentials.client_key}:${credentials.client_secret}`;

  const base64Str = base64.encode(auth);
  const headers = {
    Authorization: `Basic ${base64Str}`,
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify({ email });

  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers,
      body
    })
      .then((response) => {
        if (response.status !== 200) {
          dispatch({
            type: AUTHENTICATE_USER_FAILED,
            payload: 'Bad Email Address'
          });
        } else {
          dispatch({
            type: AUTHENTICATE_REGISTER_USER,
            payload: 'Check email for temp password'
          });
          Actions.login();
        }
        response.json();
      })
      .catch(() => {
        dispatch({
          type: AUTHENTICATE_USER_FAILED,
          payload: 'Bad Email Address'
        });
      });
  };
};

export const logout = (props) => {
  const { user } = props;

  return (dispatch) => {

    if (!user) {
      dispatch({
        type: AUTHENTICATE_LOGOUT,
        payload: ''
      });
      Actions.login();
      return;
    }
    const credentials = JSON.parse(user);
    const url = `${baseUrl}/user/logout/`;
    const auth = `${credentials.token}: `;

    const base64Str = base64.encode(auth);
    const headers = {
      Authorization: `Basic ${base64Str}`,
      key: credentials.public_key,
      'Content-Type': 'application/json'
    };

    fetch(url, {
      method: 'POST',
      headers
    })
      .then((response) => {
        if (response.status !== 200) {
          dispatch({
            type: AUTHENTICATE_LOGOUT,
            payload: 'Logout Failed'
          });
        } else {
          dispatch({
            type: AUTHENTICATE_LOGOUT,
            payload: 'Logout Successful'
          });
          cleanseApp();
        }
        return response.json();
      })
      .then(() => {
        Actions.login(); // go to login
      })
      .catch(() => {
        dispatch({
          type: AUTHENTICATE_LOGOUT,
          payload: 'Logout Failed'
        });
        Actions.login();
      });
  };
};

export const requestPin = (props) => {
  const { user, phone, password } = props;

  return (dispatch) => {
    const credentials = JSON.parse(user);
    const url = `${baseUrl}/pin/request`;
    const auth = `${credentials.email}:${password}`;
    const body = JSON.stringify({
      phone
    });
    const base64Str = base64.encode(auth);
    const headers = {
      Authorization: `Basic ${base64Str}`,
      key: credentials.public_key,
      'Content-Type': 'application/json'
    };

    fetch(url, {
      method: 'POST',
      headers,
      body
    })
      .then((response) => {
        if (response.status !== 200) {
          dispatch({
            type: PIN_SEND_FAIL,
            payload: 'pin send error'
          });
        }
        return response.json();
      })
      .then(() => {
        dispatch({
          type: PIN_SEND_SUCCESS,
          payload: 'check phone for pin'
        });
      })
      .catch(() => {
        dispatch({
          type: PIN_SEND_FAIL,
          payload: 'pin send error'
        });
      });
  };
};

export const setPin = (props) => {
  const { user, password, pin, pinNew } = props;

  return (dispatch) => {
    const credentials = JSON.parse(user);
    const url = `${baseUrl}/pin/set`;
    const auth = `${credentials.email}:${password}`;
    const body = JSON.stringify({
      pinNew,
      pin
    });
    const base64Str = base64.encode(auth);
    const headers = {
      Authorization: `Basic ${base64Str}`,
      key: credentials.public_key,
      'Content-Type': 'application/json'
    };

    fetch(url, {
      method: 'POST',
      headers,
      body
    })
      .then((response) => {
        if (response.status !== 200) {
          dispatch({
            type: PIN_RESET_FAIL,
            payload: 'multi-factor set error'
          });
        } else {
          dispatch({
            type: PIN_RESET_SUCCESS,
            payload: credentials.public_key,
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        dispatch({
          type: PIN_RESET_FAIL,
          payload: 'multi-factor set error'
        });
      });
  };
};

export const registerApp = () => {
  const url = `${baseUrl}/client/register`;
  const body = JSON.stringify({
    name: config.development.client.name,
    email: config.development.client.email
  });
  const headers = {
    'Content-Type': 'application/json'
  };

  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers,
      body
    })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: AUTHENTICATE_REGISTER_APP,
          payload: JSON.stringify(responseJson)
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const registerUser = (props) => {
  const { app, name, username, email } = props;

  return (dispatch) => {
    const credentials = JSON.parse(app);
    const url = `${baseUrl}/user/register`;
    const auth = `${credentials.client_key}:${credentials.client_secret}`;

    const base64Str = base64.encode(auth);
    const headers = {
      Authorization: `Basic ${base64Str}`,
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({ username, email, name });

    fetch(url, {
      method: 'POST',
      headers,
      body
    })
      .then((response) => {
        //console.log(response);
        if (response.status !== 201) {
          dispatch({
            type: AUTHENTICATE_USER_FAILED,
            payload: 'Registration Failed'
          });
        } else {
          dispatch({
            type: AUTHENTICATE_REGISTER_USER,
            payload: 'Check email for temp password'
          });
          Actions.login();
        }
        return response.json();
      })
      .catch(() => {
        dispatch({
          type: AUTHENTICATE_USER_FAILED,
          payload: 'Registration Failed'
        });
      });
  };
};

export const authenticateUser = (props) => {
  const { app, email, password, pin, multiFactor } = props;

  return (dispatch) => {
    if (!app) {
      dispatch({
        type: AUTHENTICATE_USER_FAILED,
        payload: 'App Registration Failed'
      });
      return;
    }

    let credentials = JSON.parse(app);
    let url = `${baseUrl}/grant`;
    let auth = `${credentials.client_key}:${credentials.client_secret}`;

    let base64Str = base64.encode(auth);
    let headers = {
      Authorization: `Basic ${base64Str}`,
      'Content-Type': 'application/json'
    };

    fetch(url, {
      method: 'POST',
      headers
    })
      .then((grantResponse) => {
        if (grantResponse.status !== 200) {
          dispatch({
            type: AUTHENTICATE_USER_FAILED,
            payload: 'Login Failed'
          });
        }

        return grantResponse.json();
      })
      .then((grantData) => {
        return grantData;
      })
      .then((loginData) => {
        // == [ MAIN REQUEST ] == //

        credentials = loginData;
        url = credentials.url;

        const passInfo = !password ? pin : password;
        const userInfo = !email ? multiFactor : email;
        auth = `${userInfo}:${passInfo}`;

        base64Str = base64.encode(auth);
        headers = {
          Authorization: `Basic ${base64Str}`,
          Grant: credentials.grant,
          'Content-Type': 'application/json'
        };

        fetch(url, {
          method: 'POST',
          headers
        })
          .then((loginResponse) => {
            //console.log(loginResponse);
            if (loginResponse.status !== 200) {
              dispatch({
                type: AUTHENTICATE_USER_FAILED,
                payload: 'Login Failed'
              });
            }
            return loginResponse.json();
          })
          .then((loginResponseData) => {
            const enabled = loginResponseData.enabled;
            //console.log(enabled);
            if (enabled === 0) {
              dispatch({
                type: AUTHENTICATE_USER_SUCCESS_WELCOME,
                payload: loginResponseData
              });
              Actions.changePassword();
            } else if (enabled === 1) {
              dispatch({
                type: AUTHENTICATE_USER_SUCCESS,
                payload: loginResponseData
              });
              Actions.home();
            } else if (enabled === 2) {
              dispatch({
                type: AUTHENTICATE_USER_SUCCESS_MULTIFACTOR,
                payload: loginResponseData,
              });
              Actions.home();
            }
          })
          .catch(() => {
            dispatch({
              type: AUTHENTICATE_USER_FAILED,
              payload: 'Login Failed'
            });
          });
        // == [ MAIN REQUEST ] == //
      })
      .catch(() => {
        dispatch({
          type: AUTHENTICATE_USER_FAILED,
          payload: 'Login Failed'
        });
      });
  };
};

// == [ UTILITIES ] == //
const userUpdateError = (dispatch, txt = 'Authentication Error') => {
  dispatch({
    type: USER_UPDATE_FAIL,
    payload: txt
  });
  Actions.profile();
};
