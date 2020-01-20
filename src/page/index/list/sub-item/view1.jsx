import React from 'react'
import {
    BrowserRouter as Router, Route, Link, Switch
}from 'react-router-dom'
import {hot} from 'react-hot-loader'

import {SubHeader} from '@/component/index'
import { RouterGuard } from '@/component/index'
import { rootRouters } from '@/router/index/router'


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



class View1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        const { url } = this.props.match
        const routes = rootRouters.find((v) => v.path == url)
        this.setState({
            match_url: url,
            rt: routes.children
        });
    }
    render() {
        const { path } = this.props.match
        return(
            <Router>
                <div className='router'>
                <Switch>
                    {
                        <RouterGuard config={this.state.rt}/>
                    }
                </Switch>
                    <SubHeader title='1、React-Router基本匹配 => npm i react-router-dom 模块 /2、路由的动态配置（模糊匹配）'/>
                    <div className='container-rotuer'>
                        <div className='container'>
                            {/* <pre>
                                <div>&emsp;&emsp;使用路由，需要安装react 依赖的路由模块:react-router. 当然在React 4.0 版本中，我们推荐安装得是react-router-dom 模块。相比react-router，react-router-dom 增加了浏览器运行的一些环境以及新增的其他标签，如Link 标签......</div><br/>
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
                                <li><Link to='/home' replace>Home</Link></li>
                                <li><Link to='/about' replace>About</Link></li>
                                <li><Link to='/topics' replace>Topics</Link></li>
                            </ul>
                            {console.log(this.state.rt)}
                            
                            {/* <Route exact path='/' component={Home}></Route>
                            <Route path='/about' component={About}></Route>
                            <Route path='/topics' component={Topics}></Route> */}
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default hot(module)(View1);
