import React, {Component, PropTypes} from 'react';
import {hot} from 'react-hot-loader'
import {connect} from 'react-redux'

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Link,
    Switch,
    withRouter,
} from 'react-router-dom'
import { rootRouters } from '@/router/mobile/router'
import { RouterGuardMulti } from '@/component/index'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        {
                            <RouterGuardMulti config={rootRouters} />
                        }
                    </Switch>
                </Router>
            </div>
        );
    }
}

const hotApp = hot(module)(App);
export default connect(
    state => ({
        operateAuth: state.operateAuth
    })
)(hotApp)
