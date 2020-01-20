import React from 'react'
import {
    BrowserRouter as Router, Route, Link
}from 'react-router-dom'

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            withRouter:require('@/image/withRouter.png'),
        }
    }
    render() {
        return(
            <div>
                <img src={this.state.withRouter} alt=""/>
            </div>
        )
    }
}

export default Match;

