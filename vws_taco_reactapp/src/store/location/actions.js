import axios from 'axios';
import {config} from '../../config';
import * as errorActions from '../errors/actions';

export const GET_LOCATIONS_DATA = 'GET_LOCATIONS_DATA';
export const LOCATIONS_RETRIEVED = 'LOCATIONS_RETRIEVED';
export const DELETE_LOCATION = 'DELETE_LOCATION';
export const LOCATION_DELETED = 'LOCATION_DELETED';
export const CREATE_LOCATION = 'CREATE_LOCATION';
export const LOCATION_CREATED = 'LOCATION_CREATED';

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
  const location_post_url = `${config.api_hostname}:${config.api_port}/v1/delete_location`;

  function deleteLocationPost() {
    return axios
      .post(location_post_url, locationData, {
        Authorization: localStorage.getItem('user')
      })
      .then(res => {
        return res.data;
      });
  }

  return function(dispatch) {
    dispatch({
      type: DELETE_LOCATION
    });

    return deleteLocationPost().then(data => {
      if (data.success) {
        dispatch({
          type: LOCATION_DELETED
        });
      } else {
        dispatch({type: errorActions.ADD_ERROR, error: data.message});
      }
    });
  };
};

export const createLocation = locationData => {
  const location_post_url = `${config.api_hostname}:${config.api_port}/v1/location`;

  function createLocationPost() {
    return axios
      .post(location_post_url, locationData, {
        Authorization: localStorage.getItem('user')
      })
      .then(res => {
        return res;
      });
  }

  return function(dispatch) {
    dispatch({
      type: CREATE_LOCATION
    });

    return createLocationPost().then(res => {
      dispatch({type: LOCATION_CREATED});
      fetchLocations()(dispatch);
    });
  };
};
