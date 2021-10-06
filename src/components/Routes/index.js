import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../Home';
import Login from '../Login';

export default function Routes() {
    return (
        <Router>
            {/* <div className="App">
                <Link to="/">Login</Link>
            </div> */}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </Router>
    )
}