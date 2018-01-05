import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import { Router, browserHistory } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import '../node_modules/react-datagrid/index.css';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from './store';

console.log('STARTING UPPPP')


const store = createStore(rootReducer);

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
