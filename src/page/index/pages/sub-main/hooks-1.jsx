import React, { useReducer, useEffect } from 'react';
import { run, useConcent } from 'concent';
import * as logic from '@/assets/utils/logic';
import './hooks.css'

const setup = ctx => {
    ctx.watch("sex", () => {
        ctx.setState({tag: 'AAAAAAAAAA'})
    });
    //实例级别的计算函数
    const fetchProducts = ({type, sex, addr, keyword}) => {
        console.log(sex, 'STATE')
        setTimeout(() => {
            console.log('request coming back......')
        }, 1000)
    }

    const resetButton = (val) => {
        ctx.setState({tag: val})
    }

    // ctx.effect((title) => {
    //     console.log(title, 'title changed...')
    //     ctx.setState({tag: 'AAAAAAAAAA'})
    // }, ['sex'])

    ctx.effect(({state}) => {
        fetchProducts(state);
    }, ["type", "sex", "addr", "keyword", "tag"]); // 这里只需要传key名称

    ctx.effect(() => {
        return () => {
            // 返回一个清理函数
            // 等价于componentWillUnmout, 这里搞清理事情
        };
    }, []);

    ctx.effectProps(() => {
        // 对props上的变更书写副作用，注意这里不同于ctx.effect，ctx.effect是针对state写副作用
        const curTag = ctx.props.tag;
        if (curTag !== ctx.prevProps.tag) ctx.setState({ tag: curTag });
    }, ["tag"]);//这里只需要传key名称就可以了

    return {// 返回结果收集在ctx.settings里
        fetchProducts,
        resetButton,
        //推荐使用此方式，把方法定义在settings里，下面示例故意直接使用sync语法糖函数
        // changeType: ctx.sync('type'),
        updateType: e=> ctx.invoke(logic.complexUpdate, e.currentTarget.value),
        clickTitle: e=> ctx.invoke(logic.complexUpdateTitle, e.currentTarget.innerHTML)
    }
};

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
