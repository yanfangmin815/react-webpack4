import React from 'react'
import {
    BrowserRouter as Router, Route, Link
}from 'react-router-dom'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            withRouter:require('@/image/withRouter.png'),
        }
    }
    render() {
        return(
            <div>
                <strong>Home</strong>
            </div>
        )
    }
}

export default Home;

