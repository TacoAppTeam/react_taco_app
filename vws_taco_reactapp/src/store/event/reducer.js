import * as eventActions from './actions';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case eventActions.GET_EVENT_DATA:
      // Get Event Data
      let eventData = [];

      return {
        ...state,
        eventData: eventData
      };
    case eventActions.EVENTS_RETRIEVED:
      return {
        ...state,
        eventData: action.events
      };
    default:
      return state;
  }
};

export default reducer;
