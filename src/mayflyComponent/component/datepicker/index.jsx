import React, { Component } from 'react';
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { CSSTransitionGroup } from 'react-transition-group'

const total = 42
const datacolumn = [
    {
        title: '一',
        prop: '一',
        // width: '10%'
    }, {
        title: '二',
        prop: '二',
        // width: '10%'
    }, {
        title: '三',
        prop: '三',
        // width: '10%'
    }, {
        title: '四',
        // width: '10%',
        prop: '四'
    }, {
        title: '五',
        prop: '五',
        // width: '10%'
    }, {
        title: '六',
        // width: '10%',
        prop: '六'
    }, {
        title: '日',
        // width: '10%',
        prop: '日'
    }]
export default class Table extends Component {
    constructor() {
        super();
        this.checkboxList = [];
        this.dataCache = {}
        this.customeKeys = ['isEdit', 'customerEditLabel', 'checked']
        this.page = 1
        this.state = {
            isClicked: false,
            currentVal: '',
            hasValue: false,
            dayToDate: {
                1: '一',
                2: '二',
                3: '三',
                4: '四',
                5: '五',
                6: '六',
                0: '日'
            },
            data: [],
            year: '',
            month: ''
        }
    }

    componentDidMount() {
        const year = moment().format('Y')
        const month = moment().format('M')
        const str = `${year}-${month}`
        this.momentHandle(str)
    }

    getCustomStartMonth = (str) => {
        return moment(str).startOf('month')
    }

    getCustomEndMonth = (str) => {
        return moment(str).endOf('month')
    }

    momentHandle = (str) => {
        const _this = this
        // console.log(moment().add(-10, 'd').format('DD'), moment().format('D'), moment().day(), moment().startOf('month').day(), '??????????')
        const { dayToDate } = this.state
        // const moments = moment().startOf('month').add(index, 'M')
        console.log(moment('2021-5').add(1, 'M').format('M'), '??????????')
        const day = this.getCustomStartMonth(str).day()

        const today = this.getCustomStartMonth(str).format('D')
        const year = this.getCustomStartMonth(str).format('Y')
        const month = this.getCustomStartMonth(str).format('M')
        const num = this.getCustomStartMonth(str).daysInMonth()
        const beforeArr = []
        const afterTodayArr = []
        const makeUpArr = []
        for (let i = -1; i > -day; i--) {
            const day = _this.getCustomStartMonth(str).add(i, 'd').day()
            const date = _this.getCustomStartMonth(str).add(i, 'd').format('D')
            let obj = {}
            obj[dayToDate[day]] = {
                date,
                idIn: false,
                isToday: today == date ? true : false,
                time: _this.getCustomStartMonth(str).add(i, 'd')
            }
            beforeArr.unshift(obj)
        }
        for (let i = 0; i < num; i++) {
            const day = _this.getCustomStartMonth(str).add(i, 'd').day()
            const date = _this.getCustomStartMonth(str).add(i, 'd').format('D')
            let obj = {}
            obj[dayToDate[day]] = {
                date: date,
                idIn: true,
                isToday: today == date ? true : false,
                time: _this.getCustomStartMonth(str).add(i, 'd')
            }
            afterTodayArr.push(obj)
        }
        const len = [...beforeArr, ...afterTodayArr].length
        const between = total - len
        for (let i = 1; i <= between; i++) {
            const day = _this.getCustomEndMonth(str).add(i, 'd').day()
            const date = _this.getCustomEndMonth(str).add(i, 'd').format('D')
            let obj = {}
            obj[dayToDate[day]] = {
                date: date,
                idIn: false,
                isToday: today == date ? true : false,
                time: _this.getCustomEndMonth(str).add(i, 'd')
            }
            makeUpArr.push(obj)
        }
        const arrs = [...beforeArr, ...afterTodayArr, ...makeUpArr]
        // console.log(arrs)
        const dateCon = []
        for (let i = 0; i < arrs.length; i += 7) {
            const arr = arrs.slice(i, i + 7)
            const obj = {}
            arr.map((item, index) => {
                for (let key in item) {
                    obj[key] = item[key]
                }
            })
            dateCon.push(obj)
        }
        this.setState({
            data: dateCon,
            year,
            month
        }, () => {
            console.log(this.state.data, '>?????????')
        })
        // console.log(beforeArr, len, '"""""""')
        // console.log(beforeTodayArr)
        // console.log(afterTodayArr)
        // console.log(makeUpArr)
    }

    componentWillReceiveProps(nextProps) {
        // 在重新render之前更新state不会重新触发生命周期
        // console.log('componentWillReceiveProps', nextProps, this.props)
    }

    handleDisplay(callback, data, i) {
        if (callback === undefined) {
            return true;
        }
        return callback(data, i);
    }

    handleClass(btnType) {
        switch (btnType) {
            case 'hollow':
                return 'tag-hollow plr16';
            case 'text':
                return 'tag-text plr8';
            default:
                return 'tag-hollow plr16';
        }
    }

    hanleHandle(handles, data, index) {
        const checked = this.state.data[index].checked ? true : false
        let newData = {
            ...data,
            index: index,
            checked: checked
        }
        return handles && handles(newData)
    }

    handleSelectd = (conf, isSelected) => {
        let isBreak = false
        this.state.data.some((item, index) => {
            for (let key in item) {
                if (item[key].idIn === conf.idIn && item[key].date === conf.date) {
                    item[key].isSelected = isSelected
                    isBreak = true
                    break
                }
            }
            if (isBreak) return true
        })
        this.forceUpdate()
    }

    selectCell = (conf) => {
        const { format = 'YYYY-MM-DD' } = this.props
        this.handleSelectd(conf, true)
        setTimeout(() => {
            this.setState({
                isClicked: false,
                currentVal: conf.time.format(format)
            }, () => {
                this.handleSelectd(conf, false)
            })
        }, 300)
    }

    clickDatePicker = () => {
        this.setState({ isClicked: true })
    }

    datePickerOver = () => {
        const { currentVal } = this.state
        currentVal && this.setState({ hasValue: true })
    }

    datePickerLeave = () => {
        this.setState({ hasValue: false })
    }

    datePickerClear = (e) => {
        e.stopPropagation();
        this.setState({ currentVal: '' })
    }

    handleMonth = (type) => {
        const { year, month } = this.state
        const str = `${year}-${month}`
        let newMonth = moment(str)[type](1, 'M').format('M')
        let newYear = moment(str)[type](1, 'M').format('Y')
        this.setState({
            month: newMonth,
            year: newYear
        }, () => {
            const { year, month } = this.state
            const newStr = `${year}-${month}`
            this.momentHandle(newStr)
        })
    }

    handleYear = (type) => {
        const { year, month } = this.state
        const str = `${year}-${month}`
        let newYear = moment(str)[type](1, 'Y').format('Y')
        this.setState({
            year: newYear
        }, () => {
            const { year, month } = this.state
            const newStr = `${year}-${month}`
            this.momentHandle(newStr)
        })
    }

    render() {
        const { isClicked, currentVal, hasValue, year, month } = this.state
        return (
            <div>
                <div className={['d-f jc-sa ac border-color-d9d9d9'].join(' ')}
                    onClick={this.clickDatePicker} onMouseOver={this.datePickerOver} onMouseLeave={this.datePickerLeave}>
                    <input type="text" className="mayfly-picker-date-input" value={currentVal} readOnly/>
                    {!hasValue ? <span className="mayfly-picker-suffix">
                        <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="calendar" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path></svg>
                    </span> :
                    <span className="mayfly-picker-clear" onClick={e => this.datePickerClear(e)}>
                        <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                    </span>}
                </div>

                <CSSTransitionGroup
                    transitionName="mayfly-dataePicker-wrap"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {isClicked ?
                        <div className="p-r pos-a mayfly-data-picker" key={'123'} style={{ top: '29px', left: 0 }}>
                            <div className="mayfly-datePicker-panel-header d-f ac jc-b" >
                                <div className="prev-container" onClick={() => this.handleYear('subtract')}>
                                    <span className="mayfly-datePicker-panel-header-year-prev"></span>
                                </div>
                                <div className="prev-container" onClick={() => this.handleMonth('subtract')}>
                                    <span className="mayfly-datePicker-panel-header-month-prev"></span>
                                </div>
                                <div className="date-picker-area">
                                    <span className="data-picker-time">{year}年</span>&nbsp;<span className="data-picker-time">{month}月</span>
                                </div>
                                <div className="next-container" onClick={() => this.handleMonth('add')}>
                                    <span className="mayfly-datePicker-panel-header-month-next"></span>
                                </div>
                                <div className="next-container" onClick={() => this.handleYear('add')}>
                                    <span className="mayfly-datePicker-panel-header-year-next"></span>
                                </div>
                            </div>
                            <div className="slucky-table">
                                {/* table header */}
                                <div className={['table-header d-f ac jc-b', this.props.fixTitle ? 'table-fix' : ''].join(' ')}>
                                    {
                                        datacolumn.map((conf, i) => {
                                            return (
                                                <div key={i} className={['ptb4 d-il ta-c table-title s0', 'plr6'].join(' ')} style={{ 'width': conf.width }}>
                                                    <div className="checkbox-box-normalize">
                                                        <span className="ta-c d-il m-w24">
                                                            <span className=" fs12">{conf.title}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {/* table content */}
                                <div className="table-content">
                                    {
                                        this.state.data && this.state.data.length === 0
                                            ? <div className="ta-c pt32 pb16 c-hint-b" >
                                                <p>暂无数据</p>
                                            </div> : null
                                    }
                                    {/* main content */}
                                    {/* 列循环 */}
                                    {
                                        this.state.data.map((data, i) => {
                                            return (
                                                <div className="table-list d-f ac jc-b p-r h35" key={i}>
                                                    {
                                                        datacolumn.map((conf, k) => {
                                                            conf.isSelected = false
                                                            return (
                                                                <div className={['d-f ta-c table-title s0 h35 jc ac box', this.props.textAlign ? this.props.textAlign : 'ta-l', conf.selection ? 'plr20' : 'plr6'].join(' ')}
                                                                    style={{ 'width': conf.width, 'cursor': 'pointer' }} key={k}>
                                                                    {
                                                                        <span className={['va-m p-r d-il m-w24', !data[conf.prop].idIn ? 'not-current-month' : '', data[conf.prop].isToday && data[conf.prop].idIn ? 'mayfly-picker-cell-today' : '', data[conf.prop].isSelected ? 'mayfly-picker-cell-selected' : ''].join(' ')}
                                                                            onClick={this.selectCell.bind(this, data[conf.prop])}>{data[conf.prop].date}</span>
                                                                    }
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div> : null}
                </CSSTransitionGroup>

            </div >
        );
    }
}
