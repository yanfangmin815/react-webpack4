import React, {Component} from 'react';
import {connect} from 'react-redux'
import {hot} from 'react-hot-loader'

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    render() {
        return(
            <div>
                <p>欢迎您 这是mobile初始页面～</p>
            </div>
        )
    }
}

const hotLogin = hot(module)(Login);
export default connect(
    state => ({
        operateAuth: state.operateAuth
    })
)(hotLogin)
