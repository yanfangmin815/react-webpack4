import React from 'react'
import {
    BrowserRouter as Router, Route, Link, Switch
}from 'react-router-dom'
import {hot} from 'react-hot-loader'

import { SubHeader } from '@/component/index'

//Home
class Home extends React.Component {
    render() {
        return(
            <div>
                <strong>Home</strong>
            </div>
        )
    }
}

//About
class About extends React.Component{
    render() {
        return(
            <div>
                <strong>About</strong>
            </div>
        )
    }
}

//Topics
class Topics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            match_url:'',
        }
    }
    componentDidMount() {
        this.setState({
            match_url:this.props.match.url
        });
    }
    componentDidUpdate() {
        console.log(this.state.match_url);
    }
    render() {
        return(
            <div>
                <strong>Topics</strong>
                <ul>
                    <li><Link to={`${this.state.match_url}/booList`}>嵌套路由-1</Link></li>
                    <li><Link to={`${this.state.match_url}/bookManage`}>嵌套路由-2</Link></li>
                </ul>
                <Route path={`${this.state.match_url}/:routerId`} component={Topic}></Route>
            </div>
        )
    }
}

//Topic
class Topic extends React.Component {
    render() {
        return(
            <div>
                <strong>嵌套路由的路径：{JSON.stringify(this.props.match.params.routerId)}</strong>
            </div>
        )
    }
}

class ChildRouter extends React.Component {
    render () {
        return (
            [
                {
                    path: '/react-router-example/view1/home',
                    loader: Home
                },
                {
                    path: '/react-router-example/view1/about',
                    loader: About
                },
                {
                    path: '/react-router-example/view1/topics',
                    loader: Topics
                }].map((item, index) => {
                    return  <Route key={index} path={item.path} component={item.loader}></Route>
            }) 
        )
    } 
}

class View1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        const { url } = this.props.match
        this.setState({
            match_url: url
        });
    }
    render() {
        const { path } = this.props.match
        return(
            <Router>
                <div className='router'>
                    <SubHeader title='1、React-Router基本匹配 => npm i react-router-dom 模块 /2、路由的动态配置（模糊匹配）'/>
                    <div className='container-rotuer'>
                        <div className='container'>
                            {/* <pre>
                                <div>
                                    &emsp;&emsp;使用路由，需要安装react 依赖的路由模块:react-router. 当然在React 4.0 版本中，
                                    我们推荐安装得是react-router-dom 模块。相比react-router，
                                    react-router-dom 增加了浏览器运行的一些环境以及新增的其他标签，如Link 标签......
                                </div>
                                <br/>
                                <code>
                                    <div className='color-green'>路由的匹配模式：</div>
                                    <div>&emsp;&emsp;&lt;Link to='/user'&gt;Home&lt;/Link&gt;</div>
                                    <div>&emsp;&emsp;&lt;Route exact path='/user' component=Home&gt;&lt;/Route&gt;</div>
                                    <hr/>
                                    <div className='color-green'>路由的动态匹配（模糊匹配）：</div>
                                    <div>&emsp;&emsp;&lt;Link to='/user'&gt;Home&lt;/Link&gt;</div>
                                    <div>&emsp;&emsp;&lt;Link to='/manage'&gt;Home&lt;/Link&gt;</div>
                                    <div>&emsp;&emsp;&lt;Route exact path='/:user' component=Page&gt;&lt;/Route&gt;</div>
                                    <br/>
                                    <div>如上router pathname 为 “/user” ， “/manage” 都将匹配到&lt;Router&gt; 组件为Page 上</div>
                                </code>
                            </pre> */}
                            <ul>
                                <li><Link to='/react-router-example/view1/home' replace>Home</Link></li>
                                <li><Link to='/react-router-example/view1/about' replace>About</Link></li>
                                <li><Link to='/react-router-example/view1/topics' replace>Topics</Link></li>
                            </ul>
                            <ChildRouter />
                            {/* <Route exact path='/react-router-example/view1/home' component={Home}></Route> */}
                            {/* <Route path='/react-router-example/view1/about' component={About}></Route> */}
                            {/* <Route path='/topics' component={Topics}></Route> */}
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default hot(module)(View1);
