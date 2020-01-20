import React, {Component, PropTypes} from 'react';
import {
    BrowserRouter as Router,
    Route,
    withRouter,
    Link,
    Switch,
    Prompt,
    Redirect
}from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
    class Guard extends Component {
        constructor(props) {
            super(props)
            console.error(...rest)
        }

        componentDidMount() {
            //向服务器发送认证请求，result表示认证是否成功
            console.log('componentDidMount');
        }

        render() {
            // 初始渲染时，尚未向服务器发送认证请求，因此不渲染元素
            /*if (!this.state.hasAuthed) {
                return null;
            }else{*/
                return <Route {...rest} render={props => (
                    // this.state.auth ? (
                        <Component {...props}/>
                    /*) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }} />
                    )*/
                )} />
            // }
        }
    }
)

export default PrivateRoute
