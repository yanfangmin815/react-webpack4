import React from 'react'
import {
    BrowserRouter as Router, Route, Link
}from 'react-router-dom'

import {SubHeader} from '@/component/index'
class Components extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            match:this.props.match,
            location:this.props.location,
            history:this.props.history,
        }
    }
    render() {
        return(
            <div>ID => {this.props.match.params.applicationId}</div>
        )
    }
    componentDidMount() {
        console.log('match\n'+JSON.stringify(this.state.match));
        console.log('location\n'+JSON.stringify(this.state.location));
        console.log('history\n'+JSON.stringify(this.state.history));
    }
    componentDidUpdate() {
        this.componentDidMount();
    }
}

/**
 * 嵌套路由的使用
 */
class View2 extends React.Component {
    render() {
        return(
            <Router>
                <div>
                    <SubHeader title='React 路由参数'/>
                    <div className='container-rotuer'>
                        <div className='container'>
                            <pre>
                                <div>Route 组件Props 参数中，分别包含有match、history 以及 location对象来表示路径包含的信息：</div>

                                {/* match */}
                                <div>mathc 对象包含有如何匹配url 的信息
                                    <ul>
                                        <li>params：动态路径对应解析，以key-value 形式存在的Object对象</li>
                                        <li>path：匹配URL的模式</li>
                                        <li>url：匹配之后的URL</li>
                                    </ul>
                                </div><br/>

                                {/* location */}
                                <div>location：
                                    <ul>
                                        <li>pathname：url 的路径</li>
                                        <li>search：url中查询的字符串</li>
                                    </ul>
                                </div><br/>

                                {/* history */}
                                <div>history 对象：包含用户在浏览器中访问过历史记录：
                                    <ul>
                                        <li>push(path)：向history 堆栈中添加一个新的记录</li>
                                        <li>replace(path)：替换堆栈中当前记录</li>
                                        <li>go(-1)：返回堆栈中的上一条记录，相当于浏览器的后退按钮</li>
                                        <li>goBack()：相当于 go(-1)</li>
                                    </ul>
                                </div>

                            </pre>
                            <strong>Account</strong>
                            <ul>
                                <li><Link to='/components/accountJD' replace>京东</Link></li>
                                <li><Link to='/components/accountZFB' replace>支付宝</Link></li>

                                <Route exact path='/components/:applicationId' component={Components}></Route>
                            </ul>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default View2;
