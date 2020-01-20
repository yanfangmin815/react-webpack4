import React, {Component, PropTypes} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {hot} from 'react-hot-loader'
import './list.css'
import {
    TransitionGroup, CSSTransition
} from 'react-transition-group'
import {
    BrowserRouter as
    Router,
    Route,
    withRouter,
    Link,
    Switch,
    Prompt,
}from 'react-router-dom'

import { getMockDataGood, changeGood, changeLoading } from '@/redux/index/list/actions'
import { Loading } from '@/component/index'


const Content = withRouter(({history,location,match}) => {
    return(
        <div className='list'>
            <p onClick={() => history.push(`${match.path}/view0`)}>0、React hash 模式路由实现的手段</p>
            <p onClick={() => history.push(`${match.path}/view1`)}>1、React Route 路由的基本配置 以及 实现路由的模糊匹配（动态路由，嵌套路由）</p>
            <p onClick={() => history.push(`${match.path}/view2`)}>2、React 路由参数</p>
            <p onClick={() => history.push(`${match.path}/view3`)}>3、路由重定向</p>
        </div>
    )
})


class List extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { getMockDataGood } = this.props;
        getMockDataGood()
    }

    pushGoods = () => {
        const { changeGood } = this.props;
        changeGood('this is pushed str...')
    }

    changeLoadings = () => {
        const { changeLoading } = this.props;
        changeLoading();
    }

    render() {
        const { goods, loading } = this.props
        return(
            <div className='app-container'>
                <Content />
                {/* <div onClick={this.pushGoods}>改变goods</div>
                <div onClicks={this.changeLoadings}>改变loading</div> */}
                {/* <Loading show={loading}/> */}
                {/* {goods && goods.length && goods.map((good,index) => {
                    return (
                        <span key={index}>{good}</span>
                    )
                })} */}
            </div>
        )
    }
}


const Lists = hot(module)(List);
export default connect(
    state => ({
        goods: state.goods,
        loading: state.loading
    }),
    {   getMockDataGood, 
        changeGood, 
        changeLoading }
)(Lists)
