import React, { Component, PropTypes } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import intl from 'react-intl-universal';
import moment from 'moment'
import { Table, Tree, Checkbox } from '@/mayflyComponent'
import '@/mayflyComponent/component/table/style/css.js';
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

const total = 42
const datacolumn = [
    {
        title: '一',
        prop: '一',
        width: '10%'
    }, {
        title: '二',
        prop: '二',
        width: '10%'
    }, {
        title: '三',
        prop: '三',
        width: '10%'
    }, {
        title: '四',
        width: '10%',
        prop: '四'
    }, {
        title: '五',
        prop: '五',
        width: '10%'
    }, {
        title: '六',
        width: '10%',
        prop: '六'
    }, {
        title: '日',
        width: '10%',
        prop: '日'
    }]
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
            ],
            dayToDate: {
                1: '一',
                2: '二',
                3: '三',
                4: '四',
                5: '五',
                6: '六',
                0: '日'
            },
            data: []
        }
    }

    componentWillMount() {
        const { getMockDataGood } = this.props;
        getMockDataGood()
        // this.CCC()
        // this.AAA()
        this.momentHandle()
    }

    momentHandle = () => {
        // console.log(moment().add(-10, 'd').format('DD'), moment().format('D'), moment().day(), moment().startOf('month').day(), '??????????')
        const { dayToDate } = this.state
        const day = moment().startOf('month').day()
        const dayFirst = moment().startOf('month').format('D')
        const date = moment().format('D')
        const num = moment().daysInMonth() - date
        const beforeArr = []
        const beforeTodayArr = []
        const afterTodayArr = []
        const makeUpArr = []
        for (let i = -1; i > -day; i--) {
            const day = moment().startOf('month').add(i, 'd').day()
            const date = moment().startOf('month').add(i, 'd').format('D')
            let obj = {}
            // obj.title = dayToDate[day]
            obj[dayToDate[day]] = date
            beforeArr.unshift(obj)
        }
        for (let i = 0; i > -date; i--) {
            const day = moment().add(i, 'd').day()
            const date = moment().add(i, 'd').format('D')
            let obj = {}
            // if (dayFirst == date) continue
            obj[dayToDate[day]] = date
            beforeTodayArr.unshift(obj)
        }
        for (let i = 1; i <= num; i++) {
            const day = moment().add(i, 'd').day()
            const date = moment().add(i, 'd').format('D')
            let obj = {}
            obj[dayToDate[day]] = date
            afterTodayArr.push(obj)
        }
        const len = [...beforeArr, ...beforeTodayArr, ...afterTodayArr].length
        const between = total - len
        for (let i = 1; i <= between; i++) {
            const day = moment().endOf('month').add(i, 'd').day()
            const date = moment().endOf('month').add(i, 'd').format('D')
            let obj = {}
            obj[dayToDate[day]] = date
            makeUpArr.push(obj)
        }
        const arrs = [...beforeArr, ...beforeTodayArr, ...afterTodayArr, ...makeUpArr]
        console.log(arrs)
        const dateCon = []
        for (let i = 0; i < arrs.length; i += 7) {
            const arr = arrs.slice(i, i + 7)
            const obj = {}
            arr.map((item, index) => {
                for (let key in item) {
                    obj[key] = item[key]
                }
            })
            console.log(obj)
            dateCon.push(obj)
        }
        this.setState({
            data: dateCon
        }, () => {
            // console.log(this.state.data, '>?????????')
        })
        // console.log(beforeArr, len, '"""""""')
        // console.log(beforeTodayArr)
        console.log(afterTodayArr)
        console.log(makeUpArr)
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
            <Table
                dataconf={datacolumn}
                dataset={this.state.data}
                loading={false}
                isMaintenance={false} />
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
