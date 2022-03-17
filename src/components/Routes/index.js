import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PreviousLogin from '../PreviousLogin';
import Login from '../Login';
import AccountRegister from '../AccountRegister';
import Questions from '../Questions';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={PreviousLogin} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/account/register" component={AccountRegister} />
                <Route exact path="/account/register/questions" component={Questions} />
            </Switch>
        </Router>
    )
}