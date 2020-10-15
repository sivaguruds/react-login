import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// LAYOUT IMPORT
import LoginLayout from '../layouts/loginLayout'
import UserLayout from '../layouts/userLayout'

// PAGE IMPORT
import LoginPage from '../page/login'
import DashboardPage from '../components/dashboard/dashBoard'

// ROUTER FUNCTIONS
export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <LoginLayout>
                        <Switch>
                            <Route exact path='/' component={LoginPage}/>
                        </Switch>
                    </LoginLayout>
                </Route>
                <Route exact path='/admin/:path?'>
                    <UserLayout>
                        <Switch>
                            <Route exact path='/admin/dashboard' component={DashboardPage}/>
                        </Switch>
                    </UserLayout>
                </Route>
            </Switch>
        </Router>
    )
}