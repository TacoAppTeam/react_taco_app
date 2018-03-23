import * as eventActions from './actions';

const initialState = {
  eventsPending: false,
  eventCreatePending: false,
  eventData: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case eventActions.GET_EVENT_DATA:
      return {
        ...state,
        eventData: [],
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
        eventCreatePending: true
      };
    case eventActions.EVENT_CREATED:
      return {
        ...state,
        eventCreatePending: false
      };
    default:
      return state;
  }
};

export default reducer;
