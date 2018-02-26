import axios from 'axios';
import {config} from '../../config';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGIN_PENDING = 'LOGIN_PENDING';

export const GET_USERS_DATA = 'GET_USERS_DATA';
export const USERS_RETRIEVED = 'USERS_RETRIEVED';

export const fetchUsers = () => {
  const users_url = config.api_hostname + ':' + config.api_port + '/v1/users';

  function getUsersFromAPI() {
    return axios.get(users_url).then(res => {
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

export const signIn = (username, password) => {
  const login_url = config.api_hostname + ':' + config.api_port + '/token_generation';

  function callSignIn(username, password) {
    return axios.post(login_url, {username: username, password: password}).then(res => {
      return res.data;
    });
  }

  return function(dispatch) {
    dispatch({
      type: LOGIN_PENDING
    });

    return callSignIn(username, password).then(user =>
      dispatch({
        type: SET_CURRENT_USER,
        user: user
      })
    );
  };
};
