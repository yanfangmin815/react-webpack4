import React from 'react'
import { hot } from 'react-hot-loader'

import { SubHeader, Commutation } from '@/component/index'

//About
class About extends React.Component {
    componentWillMount() {
        console.log('welcome to About component')
    }
    render() {
        return(
            <strong>About.</strong>
        )
    }
}

//Inbox
class Inbox extends React.Component {
    componentWillMount() {
        console.log('Inbox coming into...')
    }

    render() {
        return(
            <strong>Inbox.</strong>
        )
    }
}

//Home
class Home extends React.Component {
    render() {
        return(
            <strong>Home.</strong>
        )
    }
}

class View0 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: window.location.hash.substr(1),
            testProps: ''
        }
    }

    changeProps = val  => {
        this.setState({
            testProps: val
        },() => {
            console.log(this.state.testProps, 'test')
        })
    }
    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            })
        });
    }
    /**
     * 不使用React Router
     */
    render() {
        let Child = null;
        switch(this.state.route) {
            case '/about':
                Child = About;
                break;
            case '/inbox':
                Child = Inbox;
                break;
            default:
                Child = Home;
        }
        return(
            <div className='container-rotuer'>
                <SubHeader title='不使用React Rotuer的实现手段'/>
                <pre>
                    <div>在React 应用程序中，不使用React-Router，
                        使用react-dom 的实现视图更新的手段。</div><br/>
                    <div>这种方式非常简单，在组件中 hashchange 监听 URL hash 部分的内容，
                        内容改变时重新触发render 对视图的更新。但是随着应用组件之间的依赖性要求越来越高，
                        它会变得越来越复杂且不易维护！</div>
                </pre>
                <div className='container'>
                    <ul>
                        <li><a href="#/about">About</a></li>
                        <li><a href="#/inbox">inbox</a></li>
                    </ul>
                    <Child />
                </div>
                <Commutation changeProps = { this.changeProps }/>
            </div>
        )
    }
}

export default hot(module)(View0);
