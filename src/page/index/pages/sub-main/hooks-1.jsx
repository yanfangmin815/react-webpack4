import React, { useReducer, useEffect } from 'react';
import { run, useConcent } from 'concent';
import * as logic from '@/assets/utils/logic';
import './hooks.css'
import setup from './public'

const ConcentFnPage = React.memo(function(props) {
    //定义状态构造函数，传递给useConcent
    const iState = () => ({ products:[], type: "", sex: "male", addr: "", keyword: "", tag: "B-B" });
    // useConcent返回ctx，这里直接解构ctx，拿想用的对象或方法
    const { state, settings, sync } = useConcent({ setup, state: iState });
    const { products, type, sex, addr, keyword, tag } = state;
    const { fetchProducts, updateType, clickTitle, resetButton } = settings;

    useEffect(() => {
        console.log('repeat render......', props)
    },[])

    // 下面UI中使用sync语法糖函数同步状态，如果为了最求极致的性能
    // 可将它们定义在setup返回结果里，这样不用每次渲染都生成临时的更新函数
    return (
        <div className="conditionArea">
            <h1 onClick={clickTitle}>concent setup compnent</h1>
            <span>{tag}</span>
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
            <button onClick={fetchProducts}>refresh</button>
            <button onClick={resetButton.bind(this,'BBBBBBBB')}>button</button>
        </div>
    );
});

export default ConcentFnPage;
