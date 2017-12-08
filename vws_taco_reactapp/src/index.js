import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import { Router, browserHistory } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import '../node_modules/react-datagrid/index.css';
import { Provider } from "react-redux";
import { createStore } from "redux";
import { config } from './config.js';
import axios from 'axios';


console.log('STARTING UPPPP')
const initialState = {
    currentUser: 'Please Login'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.user
            }

        case 'GET_EVENT_DATA':
            // Get Event Data
            let eventData = [];

            const event_url = config.api_hostname + ':' + config.api_port + '/v1/events';
            let events_promise = axios.get(event_url).then(res => {
              for (let data of res.data) {
                let event = {};
                event.date = data.event.event_date;
                event.locationName = data.location.name;
                event.firstName = data.user.first_name;
                event.lastName = data.user.last_name;
                event.id = data.event.id;
                eventData.push(event);
              }
            });

            return {
                ...state,
                eventData: eventData
            }

        default:
            return state;
    }
}

const store = createStore(reducer);

class App extends React.Component {
    render()  {
        return (
        <Provider store={store}>
            <Router history={browserHistory} routes={routes}/>
        </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
