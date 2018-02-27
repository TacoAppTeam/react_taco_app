import axios from 'axios';
import {config} from '../../config';

export const FETCH_INGREDIENTS_PENDING = 'FETCH_INGREDIENTS_PENDING';
export const INGREDIENTS_RECEIVED = 'INGREDIENTS_RECEIVED';

export const fetchIngredients = () => {
  function getIngredients() {
    const url = config.api_hostname + ':' + config.api_port + '/v1/ingredients';
    return axios.get(url, null, {Authorization: localStorage.getItem('user')}).then(res => {
      return res.data;
    });
  }

  return function(dispatch) {
    dispatch({type: FETCH_INGREDIENTS_PENDING});
    return getIngredients().then(res =>
      dispatch({
        type: INGREDIENTS_RECEIVED,
        ingredients: res
      })
    );
  };
};
