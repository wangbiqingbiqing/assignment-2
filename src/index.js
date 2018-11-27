import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, createStore} from "redux";
import App from './App';
import shufflePlayerData from "./reducers/shufflePlayerData";
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import history from './history'
import thunk from "redux-thunk";
import {Router} from "react-router-dom";

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const store = createStore(shufflePlayerData, composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root'));
serviceWorker.unregister();
