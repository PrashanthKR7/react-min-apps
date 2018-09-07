import React, { Component } from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from 'history/createBrowserHistory'

import About from "./About";
import Home from "./Home";
import Repos from "./Repos";
import { HashRouter, Route, NavLink, Switch } from "react-router-dom";
import ServerError from "./ServerError";

class RoutingApp extends Component {
  render() {
    return (
      <div>
        <header>App</header>
        <menu>
          <ul>
            <li>
              <NavLink activeClassName="active" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/repos">
                Repos
              </NavLink>
            </li>
          </ul>
        </menu>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
  <HashRouter history={createBrowserHistory()}>
    <div>
      <RoutingApp />
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/repos" component={Repos} />
        <Route path="/error" component={ServerError} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  </HashRouter>,
  document.getElementById("root")
);
