import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Login from './containers/login/Login';
import Register from './containers/login/Register';
import MainLayout from './layout/MainLayout';
import * as serviceWorker from './serviceWorker';
import './App.css';
import Switch from 'react-bootstrap/esm/Switch';
import Logout from './containers/login/Logout';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path = "/" component={() => <Redirect to="/trips"/>} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/logout" component={Logout} exact />
      <Route path="*" component={MainLayout} exact />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
