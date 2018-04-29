import axios from 'axios';
import {config} from '../../config';

export const GET_LOCATIONS_DATA = 'GET_LOCATIONS_DATA';
export const LOCATIONS_RETRIEVED = 'LOCATIONS_RETRIEVED';
export const DELETE_LOCATION = 'DELETE_LOCATION';
export const LOCATION_DELETED = 'LOCATION_DELETED';

export const fetchLocations = () => {
  const locations_url = `${config.api_hostname}:${config.api_port}/v1/locations`;

  function getLocationsFromAPI() {
    return axios
      .get(locations_url, null, {Authorization: localStorage.getItem('user')})
      .then(res => {
        return res.data;
      });
  }

  return function(dispatch) {
    dispatch({
      type: GET_LOCATIONS_DATA
    });

    return getLocationsFromAPI().then(locations =>
      dispatch({
        type: LOCATIONS_RETRIEVED,
        locations: locations
      })
    );
  };
};

export const deleteLocation = locationData => {

}