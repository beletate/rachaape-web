import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../Home';
import PreviousLogin from '../PreviousLogin';
import Profile from '../Profile';
import Login from '../Login';

let id;

export default function Routes() {
    return (
        <Router>
            {/* <div className="App">
                <Link to="/">Login</Link>
            </div> */}
            <Switch>
                <Route exact path="/" component={PreviousLogin} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/profile" render={() => (<Profile id={id}/>)} />
            </Switch>
        </Router>
    )
}