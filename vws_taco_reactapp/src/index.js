import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import { Router, browserHistory } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import '../node_modules/react-datagrid/index.css';
import { Provider } from "react-redux";
import { createStore } from "redux";

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
