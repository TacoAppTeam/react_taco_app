import * as locationActions from './actions';

const initialState = {locationsPending: false};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case locationActions.GET_LOCATIONS_DATA:
      return {
        ...state,
        locations: [],
        locationsPending: true
      };
    case locationActions.LOCATIONS_RETRIEVED:
      return {
        ...state,
        locations: action.locations,
        locationsPending: false
      };
    case locationActions.DELETE_LOCATION:
      return {};
    case locationActions.LOCATION_DELETED:
      return {};
    default:
      return state;
  }
};

export default reducer;
