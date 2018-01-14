import axios from 'axios';
import {config} from '../../config';

export const GET_EVENT_DATA = 'GET_EVENT_DATA';
export const EVENTS_RETRIEVED = 'EVENTS_RETRIEVED';

export const CREATE_EVENT = 'CREATE_EVENT';
export const EVENT_CREATED = 'EVENT_CREATED';

export const fetchEvents = () => {
  const event_url = config.api_hostname + ':' + config.api_port + '/v1/events';

  function getEventsFromAPI() {
    return axios.get(event_url).then(res => {
      const eventData = [];

      for (let data of res.data) {
        let event = {};
        event.date = data.event.event_date;
        event.locationName = data.location.name;
        event.firstName = data.user.first_name;
        event.lastName = data.user.last_name;
        event.id = data.event.id;
        eventData.push(event);
      }

      return eventData;
    });
  }

  return function(dispatch) {
    dispatch({
      type: GET_EVENT_DATA,
    })

    return getEventsFromAPI().then(events =>
      dispatch({
        type: EVENTS_RETRIEVED,
        events: events
      })
    );
  };
};

export const createEvent = (formData) => {
  const event_post_url = config.api_hostname + ':' + config.api_port + '/v1/event';

  function createEventPost() {
    return axios.post(event_post_url, formData).then(res => {
      console.log(res);
      return res;
    });
  }

  return function(dispatch) {
    dispatch({
      type: CREATE_EVENT
    })

    return createEventPost().then(res =>
      dispatch({
        type: EVENT_CREATED,
        eventCreateResponse: res
      })
    )
  }
}