import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Login from '../Login';
import Profile from '../Profile';

let id;

export default function Routes() {
    return (
        <Router>
            {/* <div className="App">
                <Link to="/">Login</Link>
            </div> */}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" render={() => (<Profile id={id}/>)} />
            </Switch>
        </Router>
    )
}