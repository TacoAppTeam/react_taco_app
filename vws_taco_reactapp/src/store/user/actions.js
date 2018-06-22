import axios from 'axios';
import {config} from '../../config';
import jwt_decode from 'jwt-decode';
import * as errorActions from '../errors/actions';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const CHECK_USER_LOGGED_IN = 'CHECK_USER_LOGGED_IN';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const CREATE_USER_PENDING = 'CREATE_USER_PENDING';
export const USER_CREATED = 'USER_CREATED';

export const GET_USERS_DATA = 'GET_USERS_DATA';
export const USERS_RETRIEVED = 'USERS_RETRIEVED';

export const fetchUsers = () => {
  const users_url = `${config.api_hostname}:${config.api_port}/v1/users`;

  function getUsersFromAPI() {
    return axios
      .get(users_url, null, {
        Authorization: localStorage.getItem('user')
      })
      .then(res => {
        return res.data;
      });
  }

  return function(dispatch) {
    dispatch({
      type: GET_USERS_DATA
    });

    return getUsersFromAPI().then(users =>
      dispatch({
        type: USERS_RETRIEVED,
        list: users
      })
    );
  };
};

export const checkUserLoggedIn = () => {
  return function(dispatch) {
    // TODO validate token
    const token = localStorage.getItem('token');
    const user = token && jwt_decode(token);
    if (token && user) {
      dispatch({
        type: SET_CURRENT_USER,
        user: user,
        token: token
      });
    }
  };
};

export const signIn = (username, password) => {
  const login_url = `${config.api_hostname}:${config.api_port}/token_generation`;

  function callSignIn(username, password) {
    return axios
      .post(
        login_url,
        {username: username, password: password},
        {'Access-Control-Allow-Origin': '*'}
      )
      .then(res => {
        if (res.data.success) {
          const user = jwt_decode(res.data.token);
          return {token: res.data.token, user: user};
        }
        return {token: null, user: null, errMessage: res.data.message};
      });
  }

  return function(dispatch) {
    dispatch({
      type: LOGIN_PENDING
    });

    return callSignIn(username, password)
      .then(result => {
        if (result.token) {
          dispatch({
            type: SET_CURRENT_USER,
            user: result.user,
            token: result.token
          });
          return result;
        }
        dispatch({type: errorActions.ADD_ERROR, error: result.errMessage});
        return result;
      })
      .catch(err => {
        dispatch({type: errorActions.ADD_ERROR, error: "Attempt to login failed."});
        return err;
      });
  };
};

export const createUser = (username, firstName, lastName, password) => {
  const addUserUrl = `${config.api_hostname}:${config.api_port}/create_user`;

  function callCreateUser(username, firstName, lastName, password) {
    return axios
      .post(
        addUserUrl,
        {email: username, first_name: firstName, last_name: lastName, password},
        {'Access-Control-Allow-Origin': '*'}
      )
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  return function(dispatch) {
    dispatch({
      type: CREATE_USER_PENDING
    });

    return callCreateUser(username, firstName, lastName, password).then(data => {
      if (data.success) {
        dispatch({
          type: USER_CREATED
        });
      } else {
        dispatch({type: errorActions.ADD_ERROR, error: data.message});
      }
    });
  };
};
