import * as eventActions from './actions';

const initialState = {eventsPending: false, eventCreatePending: false};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case eventActions.GET_EVENT_DATA:
      // Get Event Data
      let eventData = [];

      return {
        ...state,
        eventData: eventData,
        eventsPending: true
      };
    case eventActions.EVENTS_RETRIEVED:
      return {
        ...state,
        eventData: action.events,
        eventsPending: false
      };
    case eventActions.CREATE_EVENT:
      return {
        ...state,
        eventCreatePending: true,
        eventCreateResponse: {}
      };
    case eventActions.EVENT_CREATED:
      return {
        ...state,
        eventCreatePending: false,
        eventCreateResponse: action.eventCreateResponse
      }
    default:
      return state;
  }
};

export default reducer;
