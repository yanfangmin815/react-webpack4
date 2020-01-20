import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    withRouter,
}from 'react-router-dom'
import {TransitionGroup,CSSTransition} from 'react-transition-group'

import {SubHeader} from '@/component/index'

const sidebarPng = require('@/image/sidebar.png');

// 组件样式
const styles = {
    main_style:{
        background: '#FFEFD5',
        position: 'relative',
    },
    content:{
        position: 'absolute',
        top: '8px',
        left: '8px',
    }
}

// Home
const Home = () => {
    return(
        <div style={styles.content}>Home</div>
    )
}

// Hall
const Hall = () => {
    return(
        <div style={styles.content}>Hall</div>
    )
}

// Manage
const Manage = () => {
    return(
        <div style={styles.content}>Manage</div>
    )
}

// 路由匹配对象
const routers = [
    {
        path:'/home',
        exact:true,
        component:Home,
    },
    {
        path:'/hall',
        component:Hall,
    },
    {
        path:'/manage',
        component:Manage,
    }
];


const Content =  withRouter(({location,match,history,title})  => {
    return(
        <Router>
            <Route
                render = {({location}) => (
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => <Redirect to="/home" />}
                        />
                        <SubHeader title='Router 侧栏 / 页面过渡 /'/>
                        <div className='container-rotuer'>
                            <div className='container'>
                                <div className='navigation-main'>
                                    <aside>
                                        <p><Link to='/' replace>首页</Link></p>
                                        <p><Link to='/hall' replace>大厅</Link></p>
                                        <p><Link to='/manage' replace>管理</Link></p>
                                    </aside>

                                    <main style={styles.main_style}>
                                    {/* <p>{JSON.stringify(location)}</p> */}
                                        <TransitionGroup>
                                            <CSSTransition key={location.key} classNames='fade' timeout={300}>
                                                <Switch location={location}>
                                                    {
                                                        routers.map((route,index) => {
                                                            return(
                                                                <Route
                                                                key={index}
                                                                path={route.path}
                                                                exact={route.exact}
                                                                component={route.component}/>
                                                            )
                                                        })
                                                    }
                                                </Switch>
                                            </CSSTransition>
                                        </TransitionGroup>
                                    </main>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            />

        </Router>
    )
})

class Sidebar extends React.Component {
    render() {
        return(
            <div>
                <Content />
                <pre>
                    <div>&emsp;&emsp;开发在单页面应用程序中，页面关注组件之间的依赖，视图更新触发对组件之间的显示状态.路由的核心就是处理组件的之间的状态来进行对视图的更新。</div><br/>
                    <div>&emsp;&emsp;当前在匹配侧栏路由对象时，建立统一的数组来包含路由对象，使得代码更加精简:</div>
                    <img src={sidebarPng} alt=""/>
                    <hr/>

                    <div>
                        <h4>页面过渡配置：</h4>
                        <div>模块依赖 => react-transition-group 。因此当我们想让路由切换动态过渡时，需要安装改模块，并引入 TransitionGroup 以及 CSSTransition 组件：</div>
                        <p>npm i react-transition-group --save-dev</p>
                    </div>
                </pre>
            </div>
        )
    }
}

export default Sidebar;
