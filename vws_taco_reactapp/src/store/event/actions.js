import axios from 'axios';
import {config} from '../../config';

export const GET_EVENT_DATA = 'GET_EVENT_DATA';
export const EVENTS_RETRIEVED = 'EVENTS_RETRIEVED';

export const fetchEvents = () => {
  // dispatch({
  //     type: 'EVENTS_PENDING'
  // });

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
    return getEventsFromAPI().then(events =>
      dispatch({
        type: EVENTS_RETRIEVED,
        events: events
      })
    );
  };
};
