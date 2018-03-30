import * as eventActions from './actions';
import {NotificationActions} from 'material-ui-notifications';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case eventActions.ADD_ERROR:
      NotificationActions.addNotification({
        headerLabel: 'ERROR',
        timestamp: 'Now',
        primaryColor: 'red',
        title: 'Error',
        text: action.error
      });
      return state;
    default:
      return state;
  }
};

export default reducer;
