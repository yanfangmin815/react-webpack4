import React from 'react'

import {SubHeader} from '@/component/index'

class Api extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectPng:require('@/image/redirect.png'),
            withRouterPng:require('@/image/withRouter.png'),

        }
    }
    render() {
        return(
            <div>
                <SubHeader title='React Router Api'/>
                {/* navigation */}
                <p className='navigation'>
                    <a href="#router">Router</a>
                    <a href="#route">Route</a>
                    <a href="#link">Link</a>
                    <a href="#redirect">Redirect</a>
                    <a href="#switch">Switch</a>
                    <a href="#withRouter">withRouter</a>
                </p>

                {/* code description */}
                <pre id='router'>
                    <span className='color-green'>Router => </span>React Rotuer 主要组件。保持UI和URL 的同步，是所有路由对象的底层组件。在使用路由 时，应当使用Router标签路由组件的对象：<br/><br/>
                    <div>
                        &lt;Router&gt;<br/>
                            &emsp;&lt;Link to='/login'&gt;&lt;/Link&gt;<br/>
                            &emsp;&lt;Link to='/home'&gt;&lt;/Link&gt;<br/><br/>

                            &emsp;&lt;Swith&gt;<br/>
                            &emsp;&emsp;&lt;Route path='/login' component=''  /&gt;<br/>
                            &emsp;&emsp;&lt;Route path='/home' component='' /&gt;<br/>
                            &emsp;&lt;/Swith&gt;<br/>
                        &lt;/Router&gt;
                    </div>
                </pre>

                <pre id='route'>
                    <span className='color-green'>Route =></span> Route 组件是Reacrt Router 中最核心的组成部分。它用户声明路由并以视图的组件上。<br/>
                    <ul>
                        <li>path：匹配的路径,如果没有改参数，则始终匹配！</li>
                        <li>component：匹配成功时渲染组件</li>
                        <li>exact：当添加exact 为true时，只有当路由完全匹配location pathname 时才匹配</li>
                    </ul><hr/>

                    &lt;/Route&gt; 可以理解成是父组件，component 绑定子组件对象。那么子组件接收到Props 对象将会得到match、location以及history 对象：<br/><br/>
                    <ul>
                        <li>
                            <span className='color-red'>history：</span> 浏览器中url 历史堆栈对象。使用该对象可以操作当前url 地址，改变路由的地址,history 对象通常具有如下常用的方法：
                            <ol>
                                <li><span className='color-green'>location =></span> object 对象，当前的位置</li>
                                <li><span className='color-green'>push(path) =></span> 先堆栈中添加一条新的记录</li>
                                <li><span className='color-green'>replace(path) =></span> 替换当前在history 的记录</li>
                                <li><span className='color-green'>go(-1) =></span>相同与浏览器后退按钮</li>
                                <li><span className='color-green'>goBack() =></span>等同于 go(-1)</li>
                                <li><span className='color-green'>goForward() =></span>等同于 go(1)</li>
                            </ol>
                        </li><br/>

                        <li>
                            <span className='color-red'>match：</span> 包含有关匹配url
                            <ol>
                                <li><span className='color-green'>params: => </span>object 对象，key/value 形式的存在，动态路由解析的参数，如："applicationId":"accountZFB"</li>
                                <li><span className='color-green'>path => </span>String,动态路由匹配的模式，如：/components/:applicationId</li>
                                <li><span className='color-green'>url =></span>匹配到部分的URL。如：/components/login</li>
                            </ol>
                        </li><br/>

                        <li><span className='color-red'>location：</span> 表示起始应用程序的位置。location 对象是不会发生改变的，因此我们如果要获取当前url pathname 属性，则应当使用histosy 对象中的location属性中提取！</li>
                    </ul>


                </pre>

                <pre id='link'>
                    <span className='color-green'>Link => </span> 路由导航的主要方式，标签以适当的 href 去访问一个瞄标签。该组件存在于react-router-dom 中，因此当我们需要安装该依赖。<br/>
                    基本参数：
                    <ul>
                        <li>to：跳转链接的地址，String 或者 Object 类型定义</li>
                        <li>replace：boolean，如果为true,则单击链接将替换当历史堆栈中的当前入口</li>
                    </ul><br/>

                    <div>
                        to 也可以是对象属性的声明方式：
                        <ul>
                            <li>pathname：表示将要链接的地址</li>
                            <li>search：查询查询，以字符传的形式。如：?uid='4311'</li>
                            <li>hash：放入URL的hash 值</li>
                            <li>state：保存在location 中的state</li>
                        </ul>
                    </div>
                </pre>

                <pre id='redirect'>
                    <span className='color-green'>Redirect => </span> 重定向。渲染该组件，路由将导航到一个新的位置，并且该地址会覆盖堆栈中的当前记录。<br/><br/>
                    <img src={this.state.redirectPng} alt=""/>
                </pre>

                <pre id='switch'>
                    <span className='color-green'>switch => </span>
                    <div>1、Swithz 组件作为包裹Route 组件的容器。渲染该组件则Router 匹配地址则总是在匹配第一个节点成功时，之后的Route 组件将不在执行匹配。因此该组件可以使用在对路由匹配无效的判断，即404 的处理。</div>
                    <div>2、Swith 专门提供路由的呈现，该组件对于动画的过渡非常有用，因为匹配到的&lt;Route&gt; 总会渲染到前一个相同的位置上。</div>
                    <br/>
                    &lt;Switch&gt;<br/>
                        &emsp;&lt;Route exact path='/login' component /&gt;<br/>
                        &emsp;&lt;Route path='/home' component /&gt;<br/>
                        &emsp;&lt;Route component /&gt;<br/>
                    &lt;/Switch&gt;<br/>
                </pre>

                <pre id='withRouter'>
                    <span className='color-green'>withRouter => </span>可以通过withRouter 进阶组件访问History 、location以及match对象。 使用WithRouter 包裹的自定义组件，那么该组件有能力访问路由对象，作用在于提供组件访问路由对象功能。<br/><br/>
                    <img src={this.state.withRouterPng} alt="" width='100%'/>
                </pre>
            </div>
        )
    }
}

export default Api;
