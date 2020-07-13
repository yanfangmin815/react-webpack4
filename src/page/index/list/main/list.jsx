import React, { Component, PropTypes } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import intl from 'react-intl-universal';
import moment from 'moment'
import { Datepicker, Tree, Checkbox } from '@/mayflyComponent'
import '@/mayflyComponent/component/datepicker/style/css.js';
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
} from 'react-router-dom'

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
        // this.CCC()
        // this.AAA()
    }

    async CCC() {
        await this.BBB()
        await this.BBB()
    }

    async AAA() {
        for (let i = 0; i < 6; i++) {
            const n = await this.BBB()
            console.log(n)
        }
    }


    BBB = () => {
        const mark = true
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('COMGING INTO......')
                if (mark) {
                    resolve(true)
                } else {
                    reject(false)
                }
            }, 5000)
        })

    }

    componentDidUpdate() {
        // console.log('list updated.....')
    }

    pushGoods = () => {
        const { changeGood } = this.props;
        changeGood('this is pushed str...')
    }

    handleGoods = (good, index) => {
        if (index == 0) {
            return (
                <div key={index}>
                    <span>{index}---string</span>
                    <span>{index}---string</span>
                </div>

            )
        } else if (index == 1) {
            return (
                <input key={index} value={index}/>
            )
        }
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
        // const { goods, loading } = this.props
        // const len = goods.length

        return (
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <rect x="50" y="50" width="20" height="150"
                        style={{ fill: 'blue', stroke: 'pink', strokeWidth: 5, fillOpacity: 0.7, strokeOpacity: 0.9 }} />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ height: '200px' }}>
                    <circle cx="120" cy="120" r="40" stroke="black"
                        strokeWidth="2" fill="red" />
                    <circle cx="120" cy="200" r="40" stroke="black"
                        strokeWidth="2" fill="red" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <ellipse cx="240" cy="100" rx="220" ry="30" fill="purple" />
                    <ellipse cx="220" cy="70" rx="190" ry="20" fill="line" />
                    <ellipse cx="210" cy="45" rx="170" ry="15" fill="yellow" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <line x1="0" y1="0" x2="20" y2="20"
                        style={{ stroke: 'rgb(255,0,0)', strokeWidth: 2 }}/>
                    <line x1="20" y1="20" x2="120" y2="20"
                        style={{ stroke: 'blue', strokeWidth: 2 }}/>
                </svg>

                <svg height="210" width="500">
                    <polygon points="100,10 40,198 190,78 10,78 160,198"
                        style={{ fill: 'lime', stroke: 'purple', strokeWidth: 5, fillRule: 'nonzero' }} />
                </svg>

                {/* 椭圆弧 */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="700" width="1700">
                    <path d="M300,200 h-150 a150,150 0 1,0 150,-150 z"
                        fill="red" stroke="blue" strokeWidth="5" />
                    <path d="M275,175 v-150 a150,150 0 0,0 -150,150 z"
                        fill="yellow" stroke="blue" strokeWidth="5" />

                    <path d="M600,350 l 50,-25
                    a25,25 -30 0,1 50,-25 l 50,-25
                    a25,50 -30 0,1 50,-25 l 50,-25
                    a25,75 -30 0,1 50,-25 l 50,-25
                    a25,100 -30 0,1 50,-25 l 50,-25"
                    fill="none" stroke="red" strokeWidth="5" />
                </svg> */}


                {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                    xmlnsXlink="http://www.w3.org/1999/xlink">
                    <defs>
                        <path id="path1" d="M75,20 a12.5,90 30 1,0 100,0" />
                    </defs>
                    <text x="10" y="400" style={{ fill: 'red' }}>
                        <textPath xlinkHref="#path1">I love SVG I love SVG</textPath>
                    </text> */}
                {/* <path d="M275,300 a12.5,90 70 0,0 100,0" fill="blue" stroke="red" strokeWidth="5" /> */}
                {/* </svg> */}

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    {/* <g fill="none"> */}
                    <path stroke="red" d="M5 20 l215 0" />
                    <path stroke="blue" d="M5 40 l215 0" />
                    <path stroke="black" d="M5 60 l215 0" />
                    {/* </g> */}
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                    xmlnsXlink="http://www.w3.org/1999/xlink">
                    <a xlinkHref="//www.baidu.com" target="_blank">
                        <text x="0" y="15" fill="red">I love SVG</text>
                    </a>
                </svg>
                {/* <Datepicker
                    loading={false}
                    isMaintenance={false} /> */}
            </div>
        )
        // switch (len) {
        //     case 1:
        //         return (
        //             <div className="app-container">
        //                 <Content
        //                     lang = {this.state.lang}
        //                     SUPPOER_LOCALES = {this.state.SUPPOER_LOCALES}
        //                     onSelectLocale = {this.onSelectLocale}/>
        //                 {/* <div onClick={this.pushGoods}>改变goods</div>
        //                 <div onClicks={this.changeLoadings}>改变loading</div> */}
        //                 {/* <Loading show={loading}/> */}
        //                 {/* {goods && goods.length ? goods.map((good,index) => {
        //                         return <p>12344</p>
        //                 }) : null} */}

        //             </div>
        //         )
        //         break;
        //     case 2:
        //         return (
        //             <div>123456789</div>
        //         )
        //         break;
        //     default:
        //         return (<p>0</p>)
        // }

    }
}


const Lists = hot(module)(List);
export default connect(
    state => ({
        goods: state.goods,
        loading: state.loading
    }),
    {
        getMockDataGood,
        changeGood,
        changeLoading
    }
)(Lists)
