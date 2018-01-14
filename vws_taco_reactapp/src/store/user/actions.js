import axios from 'axios';
import {config} from '../../config';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const GET_USERS_DATA = 'GET_USERS_DATA';
export const USERS_RETRIEVED = 'USERS_RETRIEVED';

export const fetchUsers = () => {
    const users_url = config.api_hostname + ':' + config.api_port + '/v1/users';

    function getUsersFromAPI() {
      return axios.get(users_url).then(res => {
        return res.data;
      })
    }

    return function(dispatch) {
      dispatch({
        type: GET_USERS_DATA,
      })

      return getUsersFromAPI().then(users =>
        dispatch({
          type: USERS_RETRIEVED,
          users: users
        })
      )
    }
};
