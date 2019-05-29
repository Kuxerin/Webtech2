import React, { Component } from "react";
import { Route, Redirect, NavLink, HashRouter } from "react-router-dom";
import { CustomerPage } from "./components/customer/customerPage"
import { WorkerPage } from "./components/worker/workerPage"
import { ManagerPage } from "./components/manager/managerPage"

class App extends Component {
        render() {
                return (
                    <div id="shutterIslandApp">
                        <HashRouter>
                                <div>
                                    <nav className="navbar navbar-inverse" id="my-navbar">
                                        <div className="container-fluid">
                                            <div className="navbar-header">
                                                <div className="navbar-brand">ShutterIsland</div>
                                            </div>
                                            <ul className="nav navbar-nav navbar-right">
                                                <li>
                                                    <NavLink to="/customer" activeClassName="active-nav-link">Costumer</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/worker" activeClassName="active-nav-link">Worker</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/manager" activeClassName="active-nav-link">Manager</NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>

                                <Route path="/" exact render={() => (<Redirect to="/customer" />)} />
                                <Route path="/customer" component={CustomerPage} />
                                <Route path="/worker" component={WorkerPage} />
                                <Route path="/manager" component={ManagerPage} />

                            </div>
                        </HashRouter>
                    </div>
        );
        }
}

export default App;
