import React, { useReducer, useEffect, useState } from 'react'
import { run, useConcent } from 'concent'
import * as logic from '@/assets/utils/logic'
import { Table } from '@/mayflyComponent'
import './hooks.css'
import setup from './public'
import "@/mayflyComponent/component/table/style/css.js";

// import("./public").then(() => {
//     console.log(12345678)
// })

const ConcentFnPage = React.memo(function(props) {
    //定义状态构造函数，传递给useConcent
    const iState = () => ({ products:[], type: "", sex: "male", addr: "", keyword: "", tag: "B-B" });
    // useConcent返回ctx，这里直接解构ctx，拿想用的对象或方法
    const { state, settings, sync } = useConcent({ setup, state: iState });
    const { products, type, sex, addr, keyword, tag } = state;
    const { fetchProducts, updateType, clickTitle, resetButton } = settings;
    const [value,setValue] = useState('MMMMMMM')

    useEffect(() => {
        console.log('repeat render......', props)
    },['tag'])

    const refreshButon = () => {
        setValue(100)
    }

    const dataset = [{
        id: 1,
        name: 'Apple',
        height: 178
    }, {
        id: 2,
        name: 'Boy',
        height: 177
    }, {
        id: 3,
        name: 'Cat',
        height: 176    
    }]
    const datacolumn = [{
        selection: 'checbox'
        },{
        title: 'ID',
        name: 'id',
        width: '25%'
    }, {
        title: '姓名',
        name: 'name',
        width: '25%'
    }, {
        title: '身高',
        name: 'height',
        width: '25%'
    }, {
        title: '操作',
        width: '20%',
        name: 'action2',
        type: 'action',
        handles: [
            {
                name: 'delete',
                btnType: 'text',
                handle: (data) => {
                    console.log(data);
                }
            }, {
                name: 'edit',
                btnType: 'text',
                handle: (data) => {
                    console.log(data);
                    
                }
            }]
    }]

    // 下面UI中使用sync语法糖函数同步状态，如果为了最求极致的性能
    // 可将它们定义在setup返回结果里，这样不用每次渲染都生成临时的更新函数
    return (
        <div className="conditionArea">
            <h1 onClick={clickTitle}>concent setup compnent</h1>
            <span>{tag}------{value}</span>
            <Table dataconf={datacolumn} dataset={dataset} loading={false} />
            <br/>
            <select value={type} onChange={updateType}>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
            <br/><br/>
            <select data-key="sex" value={sex} onChange={sync('sex')}>
                <option value="1">male</option>
                <option value="0">female</option>
            </select>
            <br/><br/>
            <input data-key="addr" value={addr} onChange={sync('addr')} />
            <input data-key="keyword" value={keyword} onChange={sync('keyword')} />
            <button onClick={refreshButon.bind(this)}>refresh</button>
            <button onClick={resetButton.bind(this,'BBBBBBBB')}>button</button>
        </div>
    );
});

export default ConcentFnPage;
