import React, {Component, PropTypes} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {hot} from 'react-hot-loader'
import intl from 'react-intl-universal';
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
import { Loading, Content } from '@/component/index'


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            lang: localStorage.getItem('lang_type') || 'en-US',
            SUPPOER_LOCALES: [
                {
                  name: 'English',
                  value: 'en-US'
                },
                {
                  name: '简体中文',
                  value: 'zh-CN'
                },
                {
                    name: '文言文',
                    value: 'cl-CN'
                  }
              ] 
        }
    }

    componentWillMount() {
        const { getMockDataGood } = this.props;
        getMockDataGood()
    }

    componentDidUpdate() {
        // console.log('list updated.....')
    }

    pushGoods = () => {
        const { changeGood } = this.props;
        changeGood('this is pushed str...')
    }

    changeLoadings = () => {
        const { changeLoading } = this.props;
        changeLoading();
    }

    onSelectLocale = ev => {
        localStorage.setItem('lang_type', ev.target.value);
        window.location.reload();
      };

    render() {
        const { goods, loading } = this.props
        return(
            <div className='app-container'>
                <Content 
                    lang = {this.state.lang}
                    SUPPOER_LOCALES = {this.state.SUPPOER_LOCALES}
                    onSelectLocale = {this.onSelectLocale}/>
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
