import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
}from 'react-router-dom'

import {SubHeader} from '@/component/index'

// 1、Route Render component 渲染
const RenderComponent = () => {
    return(
        <Router>
            <div>
                <Link to='/about' replace>1、Route Render component 渲染</Link>
                <Route exact path='/about' component={() => <div>Route Render Component</div>}/>
            </div>
        </Router>
    )
}

// 2、Route Render render 渲染
const RenderRender = () => {
    return(
        <Router>
            <div>
                <Link to='/home' replace>2、Route Render render 渲染</Link>
                <Route exact path='/home' render={({location,match,history}) => {
                    return(
                        <div>{JSON.stringify(match)}</div>
                    )
                }}/>
            </div>
        </Router>
    )
}

class RenderMethod extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <SubHeader title='Route Render 渲染的方式，可选component、render、children'/>
                <pre>
                    <div>&lt;Rout&gt;组件渲染的方式有三种，在不同的情况之下都可能会用到，虽然大部分时候我们选择用route render component 组件渲染的方式：</div>

                    <p><span className='color-green'>Route component => </span>该从指定组件中进行视图渲染。</p>

                    <p><span className='color-green'>Route render => </span>使用render 渲染组件的方式，该允许包裹组件并进行内联渲染</p>

                    <p><span className='color-green'>Route children => </span>使用情形在路由匹配不到的情况之下，那么当前Routes Props Match 则为null. 用于当路由匹配为空时，，对UI 界面的动态调整。</p>
                </pre>

                <div>
                    <RenderComponent /><br/>

                    <RenderRender /><br/>
                </div>
            </div>
        )
    }
}

export default RenderMethod;
