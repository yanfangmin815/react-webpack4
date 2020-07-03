import React, { Component } from 'react';
import { cloneDeep } from 'lodash'

export default class Table extends Component {
    constructor() {
        super();
        this.checkboxList = [];
        this.dataCache = {}
        this.customeKeys = ['isEdit', 'customerEditLabel', 'checked']
        this.page = 1
        this.state = {
            isClicked: false
        }
    }

    componentWillReceiveProps(nextProps) {
        // 在重新render之前更新state不会重新触发生命周期
        console.log('componentWillReceiveProps', nextProps, this.props)
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
        const checked = this.props.dataset[index].checked ? true : false
        let newData = {
            ...data,
            index: index,
            checked: checked
        }
        return handles && handles(newData)
    }

    selectCell = (conf) => {
        let isBreak = false
        this.props.dataset.some((item, index) => {
            for (let key in item) {
                console.log(item[key])
                if (item[key].idIn === conf.idIn && item[key].date === conf.date) {
                    item[key].isSelected = true
                    isBreak = true
                    break
                }
            }
            if (isBreak) return true
        })
        // console.log(this.props.dataset)
        this.forceUpdate()
    }

    clickDatePicker = () => {

    }

    render() {
        const { isClicked } = this.state
        return (
            <div>
                <div className={['d-f jc-sa ac border-color-d9d9d9'].join(' ')}
                    onClick={this.clickDatePicker}
                >
                    <input type="text" className="mayfly-picker-date-input"/>
                    <span className="mayfly-picker-suffix">
                        <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="calendar" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path></svg>
                    </span>
                </div>
                {<div className="p-r">
                    <div className="slucky-table" style={{ 'width': this.props.maxWidth ? this.props.maxWidth : '100%', 'maxHeight': this.props.maxHeight }}>
                        {/* table header */}
                        <div className={['table-header d-f ac jc-b', this.props.fixTitle ? 'table-fix' : ''].join(' ')}>
                            {
                                this.props.dataconf.map((conf, i) => {
                                    return (
                                        <div key={i} className={['ptb16 d-il ta-c table-title s0', 'plr6'].join(' ')} style={{ 'width': conf.width }}>
                                            <div className="checkbox-box-normalize">
                                                <span className="ta-c">
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
                                this.props.dataset && this.props.dataset.length === 0
                                    ? <div className="ta-c pt32 pb16 c-hint-b" >
                                        <p>暂无数据</p>
                                    </div> : null
                            }
                            {/* main content */}
                            {/* 列循环 */}
                            {
                                this.props.dataset.map((data, i) => {
                                    return (
                                        <div className="table-list d-f ac jc-b p-r h35" key={i}>
                                            {
                                                this.props.dataconf.map((conf, k) => {
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
                </div>}
            </div >
        );
    }
}
